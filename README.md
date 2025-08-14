# 💊 Recuerdame - Sistema Inteligente de Gestión de Medicamentos

<div align="center">

![Recuerdame Logo](https://img.shields.io/badge/Recuerdame-Sistema%20de%20Medicamentos-blue?style=for-the-badge&logo=medical-cross)

[![React Native](https://img.shields.io/badge/React%20Native-0.74.5-blue?style=flat-square&logo=react)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-ES%20Modules-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Expo](https://img.shields.io/badge/Expo-51.0.0-black?style=flat-square&logo=expo)](https://expo.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange?style=flat-square&logo=mysql)](https://mysql.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-purple?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)

**Una aplicación móvil completa para la gestión inteligente de medicamentos con recordatorios automáticos, códigos QR y seguimiento de adherencia terapéutica.**

[🚀 Demo](#demo) • [📱 Características](#características) • [🔧 Instalación](#instalación) • [📚 API Docs](#documentación-api) • [🤝 Contribuir](#contribuir)

</div>

---

## 📱 Características

### 🔐 **Sistema de Autenticación Robusto**
- Autenticación JWT con refresh tokens
- Roles de usuario (Paciente/Cuidador)
- Gestión segura de sesiones
- Encriptación bcrypt para contraseñas

### 💊 **Gestión Inteligente de Medicamentos**
- Catálogo completo de medicamentos (Vademécum)
- Códigos QR únicos para identificación
- Gestión de principios activos
- Seguimiento de inventario de pastilleros

### ⏰ **Sistema de Recordatorios Avanzado**
- Notificaciones push programables
- Alarmas personalizables por medicamento
- Recordatorios automáticos con node-cron
- Confirmación de toma de medicamentos

### 📊 **Monitoreo y Estadísticas**
- Historial completo de dosis
- Seguimiento de adherencia terapéutica
- Reportes de cumplimiento
- Dashboard para cuidadores

### 🔍 **Tecnología QR Integrada**
- Generación automática de códigos QR
- Escaneo con cámara del dispositivo
- Identificación rápida de medicamentos
- Verificación de autenticidad

### ☁️ **Sincronización en la Nube**
- Integración con Google Drive
- Backup automático de datos
- Sincronización multiplataforma
- Almacenamiento seguro

---

## 🏗️ Arquitectura del Sistema

```
📦 Recuerdame
├── 🎯 Frontend (React Native + Expo)
│   ├── 📱 App móvil multiplataforma
│   ├── 📸 Escáner QR integrado
│   ├── 🔔 Notificaciones push
│   └── 💾 Almacenamiento local
│
├── 🚀 Backend (Node.js + Express)
│   ├── 🛡️ API REST segura
│   ├── 🔐 Autenticación JWT
│   ├── 📊 Base de datos MySQL
│   ├── ⏰ Servicios de recordatorios
│   ├── 📚 Documentación Swagger
│   └── ☁️ Integración Google Drive
│
└── 🗄️ Base de Datos (MySQL + Sequelize)
    ├── 👤 Gestión de usuarios
    ├── 💊 Catálogo de medicamentos
    ├── 🕐 Programación de alarmas
    └── 📈 Historial de adherencia
```

---

## 🛠️ Stack Tecnológico

### **Frontend**
- **React Native** 0.74.5 - Framework móvil multiplataforma
- **Expo** 51.0.0 - Herramientas de desarrollo y distribución
- **React Navigation** - Navegación entre pantallas
- **Expo Camera** - Acceso a cámara para QR
- **Axios** - Cliente HTTP para API calls
- **AsyncStorage** - Almacenamiento local persistente

### **Backend**
- **Node.js** con ES Modules - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **Sequelize** - ORM para base de datos
- **MySQL2** - Driver de base de datos
- **JWT** - Autenticación stateless
- **bcryptjs** - Hashing de contraseñas
- **node-cron** - Programación de tareas
- **Swagger** - Documentación de API

### **Servicios Externos**
- **Expo Push Notifications** - Notificaciones móviles
- **Google Drive API** - Almacenamiento en la nube
- **QR Code** - Generación de códigos QR

---

## 🚀 Instalación

### Prerrequisitos
- Node.js >= 18.0.0
- MySQL >= 8.0
- Expo CLI
- Android Studio o Xcode (para desarrollo)

### 1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/proyecto-recordemos.git
cd proyecto-recordemos
```

### 2. **Configuración del Backend**
```bash
cd backend
npm install
```

Crea el archivo `.env`:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=recuerdame_db
DB_USER=tu_usuario
DB_PASSWORD=tu_password
JWT_SECRET=tu_jwt_secret_super_seguro
RUTA_FRONT=http://localhost:8081
GOOGLE_DRIVE_CREDENTIALS=ruta_a_tus_credenciales.json
```

### 3. **Configuración de la Base de Datos**
```bash
# Crear la base de datos
mysql -u root -p
CREATE DATABASE recuerdame_db;

# Ejecutar migraciones (si aplica)
npm run migrate
```

### 4. **Configuración del Frontend**
```bash
cd frontend/recuerdame_app
npm install
```

### 5. **Ejecutar el Proyecto**

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend/recuerdame_app
npx expo start
```

---

## 📚 Documentación API

La API REST está completamente documentada con Swagger. Una vez que el backend esté ejecutándose, accede a:

🔗 **[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

### Endpoints Principales:

- `POST /api/auth/login` - Autenticación de usuarios
- `GET /api/medicamentos` - Listado de medicamentos
- `POST /api/alarmas` - Crear recordatorios
- `GET /api/historial` - Historial de dosis
- `POST /api/qr/generar` - Generar código QR

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Con coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

---

## 🐳 Docker

```bash
# Construir imagen del backend
docker build -t recuerdame-backend ./backend

# Ejecutar con docker-compose
docker-compose up -d
```

---

## 📊 Estructura del Proyecto

```
📁 backend/
├── 📁 src/
│   ├── 📁 controllers/     # Lógica de negocio
│   ├── 📁 models/         # Modelos de base de datos
│   ├── 📁 routes/         # Definición de rutas
│   ├── 📁 services/       # Servicios externos
│   ├── 📁 middlewares/    # Middleware personalizado
│   └── 📁 utils/          # Utilidades y helpers
│
📁 frontend/recuerdame_app/
├── 📁 components/         # Componentes React Native
├── 📁 shared/            # Configuración compartida
├── 📁 assets/            # Recursos multimedia
└── 📁 data/              # Datos estáticos
```

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### 📋 Guidelines de Contribución
- Seguir el estilo de código ESLint
- Escribir tests para nuevas funcionalidades
- Actualizar la documentación según corresponda
- Usar conventional commits

---

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**Franco Tastaca**
- GitHub: [@FrancoTastaca](https://github.com/FrancoTastaca)
- LinkedIn: [Franco Tastaca](https://linkedin.com/in/franco-tastaca)

---

## 🙏 Agradecimientos

- Expo team por las herramientas de desarrollo
- React Native community
- Todas las librerías open source utilizadas

---

<div align="center">

**⭐ Si este proyecto te resultó útil, no olvides darle una estrella ⭐**

</div>