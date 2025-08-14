# 📱 Recuerdame Frontend - React Native App

<div align="center">

[![React Native](https://img.shields.io/badge/React%20Native-0.74.5-blue?style=flat-square&logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51.0.0-black?style=flat-square&logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![iOS](https://img.shields.io/badge/iOS-Compatible-lightgrey?style=flat-square&logo=ios)](https://developer.apple.com/ios/)
[![Android](https://img.shields.io/badge/Android-Compatible-green?style=flat-square&logo=android)](https://developer.android.com/)

**Aplicación móvil multiplataforma para la gestión inteligente de medicamentos**

[📱 Características](#-características) • [🚀 Instalación](#-instalación) • [🏗️ Arquitectura](#️-arquitectura) • [📊 Estructura](#-estructura-del-proyecto) • [🤝 Contribuir](#-contribuir)

</div>

---

## 📱 Características

### 🎯 **Funcionalidades Principales**
- **Gestión de Medicamentos**: Agregar, editar y organizar medicamentos
- **Recordatorios Inteligentes**: Alarmas personalizables por medicamento
- **Escaneo QR**: Identificación rápida de medicamentos mediante códigos QR
- **Historial de Adherencia**: Seguimiento completo de tomas de medicamentos
- **Notificaciones Push**: Recordatorios automáticos en tiempo real
- **Múltiples Perfiles**: Gestión de pacientes por cuidadores

### 🔐 **Autenticación y Seguridad**
- Login/registro con validación robusta
- Gestión de sesiones con tokens JWT
- Almacenamiento seguro con Expo SecureStore
- Roles diferenciados (Paciente/Cuidador)

### 📸 **Tecnología Avanzada**
- Cámara integrada para escaneo QR
- Notificaciones push con Expo
- Navegación fluida con React Navigation
- Componentes reutilizables y modulares
- AsyncStorage para persistencia local

### 🎨 **Experiencia de Usuario**
- Diseño intuitivo y moderno
- Iconos FontAwesome profesionales
- Animaciones y transiciones suaves
- Soporte para tema claro/oscuro
- Accesibilidad implementada

---

## 🏗️ Arquitectura de la App

```
📱 Frontend Architecture
├── 🎨 Presentation Layer
│   ├── Screens/Components
│   ├── Navigation
│   └── UI Elements
│
├── 🔄 State Management
│   ├── Local State (useState)
│   ├── AsyncStorage
│   └── Secure Storage
│
├── 🌐 Network Layer
│   ├── Axios HTTP Client
│   ├── API Endpoints
│   └── Token Management
│
├── 🔔 Services Layer
│   ├── Push Notifications
│   ├── Camera/QR Scanner
│   └── Audio Alerts
│
└── 📱 Native Features
    ├── Device Storage
    ├── Camera Access
    └── Notification System
```

---

## 🚀 Instalación

### Prerrequisitos
- Node.js >= 18.0.0
- npm o yarn
- Expo CLI
- Android Studio (para Android)
- Xcode (para iOS, solo en macOS)

### 1. **Instalación de Dependencias**
```bash
# Instalar Expo CLI globalmente
npm install -g @expo/cli

# Instalar dependencias del proyecto
npm install
```

### 2. **Configuración del Entorno**
```bash
# Crear archivo de configuración (si es necesario)
cp .env.example .env

# Configurar la URL del backend
echo "EXPO_PUBLIC_API_URL=http://localhost:3000/api" > .env
```

### 3. **Ejecutar en Desarrollo**
```bash
# Iniciar el servidor de desarrollo
npx expo start

# Ejecutar en simulador iOS (solo macOS)
npx expo start --ios

# Ejecutar en emulador Android
npx expo start --android

# Ejecutar en navegador web
npx expo start --web
```

### 4. **Instalación en Dispositivo**
1. Descargar **Expo Go** desde App Store o Google Play
2. Escanear el código QR desde la terminal
3. La app se cargará automáticamente

---

## 📚 Guía de Uso

### 🏠 **Pantalla de Bienvenida**
- Carousel informativo sobre funcionalidades
- Acceso directo a login/registro
- Onboarding para nuevos usuarios

### 🔐 **Autenticación**
```javascript
// Login de usuario
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}

// Registro de nuevo paciente/cuidador
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@ejemplo.com",
  "password": "password123",
  "rol": "paciente"
}
```

### 💊 **Gestión de Medicamentos**
- **Agregar Medicamento**: Buscar en vademécum o agregar manual
- **Configurar Alarmas**: Horarios específicos y días de la semana
- **Generar QR**: Código único para identificación
- **Editar/Eliminar**: Gestión completa del medicamento

### ⏰ **Recordatorios**
- Notificaciones push automáticas
- Sonidos de alarma personalizables
- Confirmación de toma con un tap
- Reprogramación de dosis perdidas

### 📊 **Historial y Estadísticas**
- Registro completo de tomas
- Gráficos de adherencia
- Reportes exportables
- Alertas de medicamentos faltantes

---

## 🛠️ Stack Tecnológico

### **Core Framework**
- **React Native** 0.74.5 - Framework multiplataforma
- **Expo** 51.0.0 - Herramientas de desarrollo y distribución
- **React** 18.2.0 - Biblioteca principal de componentes

### **Navegación y UI**
- **React Navigation** - Navegación entre pantallas
- **FontAwesome** - Iconografía profesional
- **React Native SVG** - Gráficos vectoriales
- **Toast Message** - Notificaciones in-app

### **Funcionalidades Nativas**
- **Expo Camera** - Acceso a cámara para QR
- **Expo Barcode Scanner** - Escaneo de códigos
- **Expo Notifications** - Push notifications
- **Expo SecureStore** - Almacenamiento seguro

### **Networking y Estado**
- **Axios** - Cliente HTTP para API calls
- **AsyncStorage** - Persistencia local
- **React Native Picker** - Selectores nativos

---

## 📊 Estructura del Proyecto

```
frontend/recuerdame_app/
├── 📁 components/              # Componentes principales
│   ├── WelcomeScreen.js       # Pantalla de bienvenida
│   ├── SignInScreen.js        # Login de usuarios
│   ├── RegisterCuidadorScreen.js  # Registro cuidador
│   ├── RegisterPacienteScreen.js  # Registro paciente
│   ├── HomeScreen.js          # Dashboard principal
│   ├── AgregarMedicamento.js  # Gestión medicamentos
│   ├── AgregarAlarma.js       # Configurar alarmas
│   ├── Alarmas.js             # Lista de alarmas
│   ├── EscanearQR.js          # Escáner QR
│   ├── GenerarQR.js           # Generador QR
│   ├── PastillerosScreen.js   # Gestión pastilleros
│   ├── ProfileCuidadorScreen.js  # Perfil cuidador
│   ├── CarouselScreen.js      # Carousel onboarding
│   ├── ConfirmScreen.js       # Confirmación acciones
│   └── EndDayScreen.js        # Resumen diario
│
├── 📁 shared/                 # Configuración compartida
│   ├── auth.js               # Gestión autenticación
│   ├── axiosConfig.js        # Configuración HTTP
│   ├── Header.jsx            # Header reutilizable
│   └── notificationService.js # Servicio notificaciones
│
├── 📁 assets/                # Recursos multimedia
│   ├── 📁 sounds/           # Sonidos de alarma
│   ├── 📁 images/           # Imágenes e iconos
│   └── ...
│
├── 📄 App.js                 # Componente principal
├── 📄 data.js                # Datos estáticos
├── 📄 app.json               # Configuración Expo
├── 📄 babel.config.js        # Configuración Babel
├── 📄 package.json           # Dependencias
└── 📄 README.md             # Esta documentación
```

---

## 🔧 Configuración Avanzada

### **Variables de Entorno**
```bash
# .env
EXPO_PUBLIC_API_URL=http://localhost:3000/api
EXPO_PUBLIC_ENV=development
EXPO_PUBLIC_APP_VERSION=1.0.0
```

### **Configuración de Build**
```json
// eas.json
{
  "cli": {
    "version": ">= 0.52.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
```

### **Configuración de Notificaciones**
```javascript
// app.json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#ffffff"
        }
      ]
    ]
  }
}
```

---

## 🧪 Testing

### **Estructura de Tests**
```
tests/
├── __tests__/
│   ├── components/          # Tests de componentes
│   ├── utils/              # Tests de utilidades
│   └── integration/        # Tests de integración
├── __mocks__/              # Mocks de módulos
└── setupTests.js           # Configuración tests
```

### **Ejecutar Tests**
```bash
# Tests unitarios
npm test

# Tests con coverage
npm run test:coverage

# Tests específicos
npm test -- --testNamePattern="Auth"
```

---

## 📦 Build y Distribución

### **Build de Desarrollo**
```bash
# Build para desarrollo
eas build --profile development

# Build para preview
eas build --profile preview
```

### **Build de Producción**
```bash
# Build para Android
eas build --platform android

# Build para iOS
eas build --platform ios

# Build para ambas plataformas
eas build --platform all
```

### **Distribución**
```bash
# Subir a tiendas
eas submit --platform android
eas submit --platform ios

# Actualización OTA
eas update --branch production
```

---

## 🐛 Debugging

### **Herramientas de Debug**
- **Flipper** - Inspector de red y estado
- **React Native Debugger** - Debug completo
- **Expo Dev Tools** - Herramientas integradas

### **Logs y Monitoreo**
```javascript
// Configurar logging
import { logger } from './src/utils/logger'

logger.info('Usuario autenticado', { userId: user.id })
logger.error('Error en API', { error: error.message })
```

---

## 🚀 Scripts Disponibles

```bash
npm start              # Iniciar servidor desarrollo
npm run android        # Ejecutar en Android
npm run ios            # Ejecutar en iOS
npm run web            # Ejecutar en navegador web
npm run lint           # Ejecutar ESLint
npm test               # Ejecutar tests
npm run build          # Build de producción
```

---

## 🤝 Contribuir

### **Proceso de Contribución**
1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

### **Convenciones de Código**
- Usar ESLint y Prettier
- Componentes en PascalCase
- Archivos en camelCase
- Comentarios en español
- Tests para nuevas funcionalidades

### **Convenciones de Commits**
```bash
feat: agregar nueva funcionalidad
fix: corregir bug específico
docs: actualizar documentación
style: cambios de formato
refactor: refactorizar código
test: agregar o actualizar tests
```

---

## 📱 Capturas de Pantalla

### Pantallas Principales
| Bienvenida | Login | Dashboard | Medicamentos |
|------------|-------|-----------|--------------|
| ![Welcome](./docs/screenshots/welcome.png) | ![Login](./docs/screenshots/login.png) | ![Home](./docs/screenshots/home.png) | ![Meds](./docs/screenshots/meds.png) |

### Funcionalidades Avanzadas
| Escaneo QR | Alarmas | Historial | Perfil |
|------------|---------|-----------|--------|
| ![QR](./docs/screenshots/qr.png) | ![Alarms](./docs/screenshots/alarms.png) | ![History](./docs/screenshots/history.png) | ![Profile](./docs/screenshots/profile.png) |

---

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

---

## 📞 Soporte y Contacto

- **Issues**: [GitHub Issues](https://github.com/tu-usuario/proyecto-recordemos/issues)
- **Email**: franco.tastaca@ejemplo.com
- **Documentación**: [Wiki del Proyecto](https://github.com/tu-usuario/proyecto-recordemos/wiki)

---

<div align="center">

**📱 Frontend desarrollado con ❤️ usando React Native y Expo**

![Made with React Native](https://img.shields.io/badge/Made%20with-React%20Native-blue?style=for-the-badge&logo=react)

</div>
