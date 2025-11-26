import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize default admin user and load current user
  useEffect(() => {
    // Migrate old data structure if needed
    try {
      const savedUser = localStorage.getItem('usuarioActual');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        // If user object doesn't have the expected structure, clear it
        if (typeof parsed !== 'object' || Array.isArray(parsed)) {
          console.warn('⚠️ Limpiando datos de usuario inválidos');
          localStorage.removeItem('usuarioActual');
        }
      }
    } catch (error) {
      console.error('Error al migrar datos:', error);
      localStorage.removeItem('usuarioActual');
    }

    // Create default admin user if it doesn't exist
    const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const adminExists = users.some(u => u.email === 'admin@pasoxpaso.cl');
    
    if (!adminExists) {
      const defaultAdmin = {
        id: 1,
        nombre: 'Administrador',
        email: 'admin@pasoxpaso.cl',
        password: 'admin123',
        telefono: '+56 9 1234 5678',
        rut: '12.345.678-9',
        direccion: 'Av. Providencia 1234',
        region: 'Región Metropolitana',
        comuna: 'Santiago',
        rol: 'admin',
        fechaRegistro: new Date().toISOString()
      };
      
      users.push(defaultAdmin);
      localStorage.setItem('usuarios', JSON.stringify(users));
      console.log('✅ Usuario admin creado por defecto');
      console.log('📧 Email: admin@pasoxpaso.cl');
      console.log('🔑 Password: admin123');
    }
    
    // Load current user from authService
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const { token, usuario } = await authService.login(credentials.email, credentials.password);
      setUser(usuario);
      return { success: true, user: usuario };
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = typeof error === 'string' ? error : (error?.message || 'Error al iniciar sesión');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      // Mapear campos del formulario al formato del backend
      const registerData = {
        nombre: userData.nombre,
        email: userData.email,
        password: userData.password,
        rut: userData.run, // El formulario usa 'run' pero el backend espera 'rut'
        telefono: userData.telefono,
        direccion: userData.direccion,
        region: userData.region,
        comuna: userData.comuna
      };

      const { token, usuario } = await authService.register(registerData);
      setUser(usuario);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = typeof error === 'string' ? error : (error?.message || 'Error al registrar usuario');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.rol === 'ADMIN' || user?.rol === 'admin' || user?.isAdmin || false
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
