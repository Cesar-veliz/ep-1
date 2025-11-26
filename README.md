# 🛒 PasoxPaso E-commerce

Aplicación full-stack de e-commerce de zapatillas desarrollada con React y Spring Boot.

## 🚀 Tecnologías

### Frontend
- React 18
- React Router
- Bootstrap 5
- Context API
- Jasmine + Karma (Testing)

### Backend
- Spring Boot 3.5.7
- Spring Security + JWT
- Spring Data JPA
- MySQL
- Swagger/OpenAPI

## 📋 Requisitos

- Node.js 16+
- Java 17+
- MySQL 8+
- Maven

## 🔧 Instalación Local

### 1. Clonar repositorio
```bash
git clone <tu-repo>
cd ep-2-full-stack-react-app-main
```

### 2. Configurar Base de Datos
```sql
CREATE DATABASE pasoxpasodb;
```

### 3. Backend
```bash
cd backend
mvnw.cmd spring-boot:run
```

El backend estará en: `http://localhost:8080`

### 4. Frontend
```bash
cd react-app
npm install
npm start
```

El frontend estará en: `http://localhost:3000`

## 👤 Usuario de Prueba

- **Email:** admin@pasoxpaso.cl
- **Password:** admin123
- **Rol:** ADMIN

## 📚 Documentación API

Una vez iniciado el backend, accede a:
- Documentación: `http://localhost:8080/api-docs.html`

## 🧪 Tests

```bash
cd react-app
npm test
```

**Cobertura:** 41 tests pasando (100%)

## 🌐 Deploy

### Railway (Backend + MySQL)
Ver guía completa en `DEPLOY_RAILWAY.md`

### Vercel (Frontend)
```bash
cd react-app
vercel
```

## 📁 Estructura del Proyecto

```
├── backend/                 # Spring Boot API
│   ├── src/main/java/
│   │   └── com/pasoxpaso/backend/
│   │       ├── config/     # Configuraciones
│   │       ├── controller/ # REST Controllers
│   │       ├── dto/        # Data Transfer Objects
│   │       ├── entity/     # Entidades JPA
│   │       ├── repository/ # Repositorios
│   │       ├── security/   # JWT & Security
│   │       └── service/    # Lógica de negocio
│   └── src/main/resources/
│       ├── application.properties
│       └── static/         # Documentación API
│
├── react-app/              # React Frontend
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── context/       # Context API
│   │   ├── pages/         # Páginas
│   │   ├── services/      # API Services
│   │   └── utils/         # Utilidades
│   └── karma.conf.js      # Configuración tests
│
└── imagenes/              # Assets estáticos
```

## ✨ Características

- ✅ Autenticación JWT
- ✅ Roles (Admin/Usuario)
- ✅ CRUD Productos
- ✅ Carrito de compras
- ✅ Gestión de pedidos
- ✅ Panel de administración
- ✅ Responsive design
- ✅ Validaciones de formularios
- ✅ Tests unitarios
- ✅ API REST documentada

## 📊 Endpoints Principales

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario

### Productos
- `GET /api/productos` - Listar productos
- `GET /api/productos/{id}` - Detalle producto
- `POST /api/productos` - Crear producto (Admin)
- `PUT /api/productos/{id}` - Actualizar producto (Admin)
- `DELETE /api/productos/{id}` - Eliminar producto (Admin)

### Pedidos
- `GET /api/pedidos` - Mis pedidos
- `POST /api/pedidos` - Crear pedido
- `GET /api/pedidos/admin/todos` - Todos los pedidos (Admin)
- `PUT /api/pedidos/{id}/estado` - Actualizar estado (Admin)

## 🔒 Seguridad

- Autenticación JWT
- Passwords encriptados con BCrypt
- CORS configurado
- Protección de rutas por rol
- Validación de datos

## 📝 Licencia

Proyecto académico - DuocUC

## 👥 Autor

Franco Ruiz

---
Desplegado en Railway
