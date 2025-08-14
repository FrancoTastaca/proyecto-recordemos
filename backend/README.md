# 🚀 Recuerdame Backend - API REST

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19.2-blue?style=flat-square&logo=express)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange?style=flat-square&logo=mysql)](https://mysql.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.37.3-red?style=flat-square&logo=sequelize)](https://sequelize.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-purple?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-green?style=flat-square&logo=swagger)](https://swagger.io/)

**API REST robusta y escalable para el sistema de gestión de medicamentos Recuerdame**

</div>

---

## 📋 Tabla de Contenidos

- [🎯 Características](#-características)
- [🏗️ Arquitectura](#️-arquitectura)
- [🚀 Instalación](#-instalación)
- [📚 Documentación API](#-documentación-api)
- [🔐 Autenticación](#-autenticación)
- [🗄️ Base de Datos](#️-base-de-datos)
- [🧪 Testing](#-testing)
- [🐳 Docker](#-docker)
- [📊 Estructura del Proyecto](#-estructura-del-proyecto)

---

## 🎯 Características

### ✨ **API REST Completa**
- Endpoints RESTful bien estructurados
- Versionado de API preparado
- Respuestas JSON consistentes
- Manejo robusto de errores
- Validación de datos con Joi

### 🔐 **Seguridad Avanzada**
- Autenticación JWT con refresh tokens
- Hashing seguro de contraseñas (bcrypt)
- Middleware de validación de permisos
- Rate limiting para prevenir ataques
- CORS configurado correctamente

### 📊 **Gestión de Datos**
- ORM Sequelize con MySQL
- Migraciones y seeders
- Relaciones complejas entre modelos
- Transacciones de base de datos
- Soft deletes implementado

### ⏰ **Servicios Automatizados**
- Recordatorios programados con node-cron
- Notificaciones push con Expo SDK
- Limpieza automática de archivos temporales
- Monitoreo de adherencia terapéutica

### ☁️ **Integraciones Externas**
- Google Drive API para backup
- Expo Push Notifications
- Generación y lectura de códigos QR
- APIs de servicios médicos

---

## 🏗️ Arquitectura

```
📦 Backend Architecture
├── 🛡️ Security Layer
│   ├── JWT Authentication
│   ├── Rate Limiting
│   └── Input Validation
│
├── 🎯 API Layer (Express)
│   ├── Routes (/api/*)
│   ├── Controllers
│   └── Middlewares
│
├── 🔄 Business Logic Layer
│   ├── Services
│   ├── Utilities
│   └── Helpers
│
├── 🗄️ Data Access Layer
│   ├── Sequelize Models
│   ├── Database Config
│   └── Migrations
│
└── 🔌 External Services
    ├── Google Drive
    ├── Push Notifications
    └── QR Code Generation
```

---

## 🚀 Instalación

### Prerrequisitos
- Node.js >= 18.0.0
- MySQL >= 8.0
- Git

### 1. **Instalación de Dependencias**
```bash
npm install
```

### 2. **Configuración de Variables de Entorno**
```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita el archivo .env con tus configuraciones
nano .env
```

### 3. **Configuración de Base de Datos**
```bash
# Crear base de datos
mysql -u root -p
CREATE DATABASE recuerdame_db;

# Ejecutar migraciones (si existen)
npm run migrate

# Ejecutar seeders (opcional)
npm run seed
```

### 4. **Ejecutar en Desarrollo**
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

### 5. **Verificar Instalación**
```bash
# El servidor debería estar corriendo en:
curl http://localhost:3000/

# Verificar documentación API:
# http://localhost:3000/api/docs
```

---

## 📚 Documentación API

### 🔗 **Swagger UI**
La documentación completa de la API está disponible en:
**[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

### 📋 **Endpoints Principales**

#### **Autenticación**
```http
POST /api/auth/login          # Login de usuario
POST /api/auth/register       # Registro de usuario
POST /api/auth/refresh        # Renovar token
POST /api/auth/logout         # Cerrar sesión
```

#### **Usuarios y Perfiles**
```http
GET    /api/usuarios          # Listar usuarios
GET    /api/usuarios/:id      # Obtener usuario
PUT    /api/usuarios/:id      # Actualizar usuario
DELETE /api/usuarios/:id      # Eliminar usuario
```

#### **Medicamentos**
```http
GET    /api/medicamentos      # Listar medicamentos
POST   /api/medicamentos      # Crear medicamento
GET    /api/medicamentos/:id  # Obtener medicamento
PUT    /api/medicamentos/:id  # Actualizar medicamento
DELETE /api/medicamentos/:id  # Eliminar medicamento
```

#### **Alarmas y Recordatorios**
```http
GET    /api/alarmas           # Listar alarmas
POST   /api/alarmas           # Crear alarma
PUT    /api/alarmas/:id       # Actualizar alarma
DELETE /api/alarmas/:id       # Eliminar alarma
```

#### **Historial de Dosis**
```http
GET    /api/historial         # Obtener historial
POST   /api/historial         # Registrar dosis
GET    /api/historial/stats   # Estadísticas de adherencia
```

#### **Códigos QR**
```http
POST   /api/qr/generar        # Generar código QR
POST   /api/qr/leer           # Leer código QR
```

---

## 🔐 Autenticación

### **JWT Token Flow**
```javascript
// 1. Login
POST /api/auth/login
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}

// 2. Respuesta con tokens
{
  "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refreshToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": { /* datos del usuario */ }
}

// 3. Usar token en requests
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

### **Roles y Permisos**
- **Paciente**: Gestión de sus propios datos y medicamentos
- **Cuidador**: Gestión de múltiples pacientes
- **Administrador**: Acceso completo al sistema

---

## 🗄️ Base de Datos

### **Modelos Principales**
```sql
-- Usuarios del sistema
usuarios (id, email, password, rol, created_at, updated_at)

-- Información personal
personas (id, usuario_id, nombre, apellido, fecha_nacimiento)

-- Relación paciente-cuidador
cuidadores (id, usuario_cuidador_id, usuario_paciente_id)

-- Catálogo de medicamentos
vademecum (id, nombre, principio_activo, laboratorio)

-- Medicamentos asignados
medicamento_cuidador (id, vademecum_id, cuidador_id, dosis)

-- Alarmas programadas
pastillero_alarma (id, medicamento_id, hora, dias_semana)

-- Registro de tomas
historial_dosis (id, medicamento_id, fecha_hora, confirmado)
```

### **Relaciones**
```
Usuario 1:1 Persona
Usuario 1:N Cuidador (como cuidador)
Usuario 1:N Cuidador (como paciente)
Cuidador 1:N MedicamentoCuidador
MedicamentoCuidador 1:N PastilleroAlarma
MedicamentoCuidador 1:N HistorialDosis
```

---

## 🧪 Testing

### **Ejecutar Tests**
```bash
# Todos los tests
npm test

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch

# Tests específicos
npm test -- --grep "Authentication"
```

### **Estructura de Tests**
```
tests/
├── unit/           # Tests unitarios
├── integration/    # Tests de integración
├── fixtures/       # Datos de prueba
└── helpers/        # Utilidades de testing
```

### **Ejemplo de Test**
```javascript
import { describe, it } from 'node:test'
import assert from 'node:assert'
import request from 'supertest'
import app from '../src/app.js'

describe('Authentication', () => {
  it('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })
    
    assert.strictEqual(response.status, 200)
    assert.ok(response.body.accessToken)
  })
})
```

---

## 🐳 Docker

### **Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### **docker-compose.yml**
```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - database
  
  database:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: recuerdame_db
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

### **Comandos Docker**
```bash
# Construir imagen
docker build -t recuerdame-backend .

# Ejecutar con docker-compose
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Ejecutar comandos en contenedor
docker-compose exec backend npm test
```

---

## 📊 Estructura del Proyecto

```
backend/
├── 📁 src/
│   ├── 📁 controllers/          # Controladores de rutas
│   │   ├── auth.controller.js
│   │   ├── usuario.controller.js
│   │   ├── medicamento.controller.js
│   │   └── ...
│   │
│   ├── 📁 models/              # Modelos de Sequelize
│   │   ├── index.Models.js
│   │   ├── usuario.js
│   │   ├── persona.js
│   │   └── ...
│   │
│   ├── 📁 routes/              # Definición de rutas
│   │   ├── index-Routes.js
│   │   ├── authRoutes.js
│   │   ├── usuarioRoutes.js
│   │   └── ...
│   │
│   ├── 📁 services/            # Lógica de negocio
│   │   ├── notificationService.js
│   │   ├── reminderService.js
│   │   ├── GoogleDriveService.js
│   │   └── ...
│   │
│   ├── 📁 middlewares/         # Middleware personalizado
│   │   ├── verifyJWT.js
│   │   ├── checkRole.js
│   │   ├── validate.js
│   │   └── ...
│   │
│   ├── 📁 utils/              # Utilidades y helpers
│   │   ├── errors.js
│   │   ├── globalConstant.js
│   │   ├── transactionHelper.js
│   │   └── ...
│   │
│   ├── 📁 bd/                 # Configuración de BD
│   │   └── config/
│   │       └── bd.config.js
│   │
│   └── 📁 doc/                # Documentación
│       └── swagger.js
│
├── 📁 tests/                  # Tests automatizados
├── 📁 uploads/               # Archivos subidos
├── 📄 .env.example          # Variables de entorno
├── 📄 package.json          # Dependencias y scripts
└── 📄 README.md            # Esta documentación
```

---

## 🔧 Scripts Disponibles

```bash
npm start              # Ejecutar en producción
npm run dev            # Ejecutar en desarrollo (nodemon)
npm test               # Ejecutar tests
npm run test:watch     # Tests en modo watch
npm run test:coverage  # Tests con coverage
npm run lint           # Ejecutar ESLint
npm run lint:fix       # Corregir errores de linting
```

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

### **Convenciones de Código**
- Usar ESLint Standard style
- Comentarios en español para lógica compleja
- Tests para nuevas funcionalidades
- Documentar endpoints en Swagger

---

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

---

## 📞 Soporte

- **Documentación**: [Swagger UI](http://localhost:3000/api/docs)
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/proyecto-recordemos/issues)
- **Email**: franco.tastaca@ejemplo.com

---

<div align="center">

**🚀 Backend desarrollado con ❤️ por Franco Tastaca**

</div>