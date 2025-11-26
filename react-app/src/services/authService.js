import api from './api';

const authService = {
  // Registrar nuevo usuario
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, usuario } = response.data;
      
      // Guardar token y usuario en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(usuario));
      
      return { token, usuario };
    } catch (error) {
      throw error.message || 'Error al registrar usuario';
    }
  },

  // Iniciar sesión
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, usuario } = response.data;
      
      // Guardar token y usuario en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(usuario));
      
      return { token, usuario };
    } catch (error) {
      throw error.message || 'Error al iniciar sesión';
    }
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Verificar si es admin
  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.rol === 'ADMIN';
  }
};

export default authService;
