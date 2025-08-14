# 💊 RecuérdaMe - Sistema de Recordatorios de Medicamentos

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

## 📋 Descripción

**RecuérdaMe** es una aplicación completa para el manejo y recordatorio de medicamentos, diseñada para ayudar a pacientes y cuidadores a mantener un control preciso de las dosis y horarios de medicación.

### ✨ Características Principales

- 🏥 **Gestión de Pacientes y Cuidadores**: Sistema completo de usuarios con roles diferenciados
- 💊 **Control de Medicamentos**: Integración con vademécum para información precisa
- ⏰ **Recordatorios Inteligentes**: Notificaciones push personalizables
- 📊 **Historial de Dosis**: Seguimiento completo del cumplimiento de tratamientos
- 🔐 **Autenticación Segura**: JWT con roles y permisos
- 📱 **Aplicación Móvil**: Interfaz nativa para iOS y Android

## 🏗️ Arquitectura del Sistema

```
RecuérdaMe/
├── backend/                 # API REST con Node.js + Express
│   ├── src/
│   │   ├── controllers/     # Lógica de negocio
│   │   ├── models/          # Modelos de base de datos
│   │   ├── routes/          # Rutas de la API
│   │   ├── middlewares/     # Autenticación y validaciones
│   │   └── services/        # Servicios externos (notificaciones, etc.)
│   └── Dockerfile
├── frontend/                # Aplicación móvil React Native
│   └── recuerdame_app/
└── database/               # Scripts y migraciones de BD
```

## 🚀 Tecnologías Utilizadas

### Backend
- **Node.js + Express**: API REST robusta y escalable
- **Sequelize ORM**: Manejo de base de datos con modelos relacionales
- **MySQL**: Base de datos principal
- **JWT**: Autenticación y autorización
- **Joi**: Validación de esquemas
- **Swagger**: Documentación automática de API

### Frontend
- **React Native**: Aplicación móvil multiplataforma
- **Expo**: Herramientas de desarrollo y despliegue
- **Axios**: Cliente HTTP para consumo de API

### DevOps
- **Docker**: Containerización de servicios
- **GitHub Actions**: CI/CD pipeline
- **Render/AWS**: Despliegue en producción

## 📦 Instalación y Configuración

### Prerrequisitos
```bash
node >= 18.0.0
npm >= 9.0.0
mysql >= 8.0
docker (opcional)
```

### 🔧 Configuración del Backend

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/proyecto-recuerdame.git
cd proyecto-recuerdame/backend
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura las variables de entorno**
```bash
cp .env.example .env
# Edita .env con tus configuraciones
```

4. **Configura la base de datos**
```bash
# Crea la base de datos
mysql -u root -p -e "CREATE DATABASE recuerdame_db;"

# Ejecuta las migraciones
npm run migrate
```

5. **Inicia el servidor**
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

### 📱 Configuración del Frontend

```bash
cd frontend/recuerdame_app
npm install
npx expo start
```

## 🐳 Docker

### Desarrollo con Docker Compose
```bash
docker-compose up -d
```

### Construcción de imagen personalizada
```bash
docker build -t recuerdame-backend ./backend
docker run -p 3000:3000 recuerdame-backend
```

## 📡 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/refresh` - Renovar token

### Pacientes
- `GET /api/pacientes` - Listar pacientes
- `POST /api/pacientes` - Crear paciente
- `PUT /api/pacientes/:id` - Actualizar paciente
- `DELETE /api/pacientes/:id` - Eliminar paciente

### Medicamentos
- `GET /api/medicamentos` - Listar medicamentos
- `POST /api/medicamentos` - Asignar medicamento
- `PUT /api/medicamentos/:id` - Actualizar medicamento

### Recordatorios
- `GET /api/alarmas` - Listar alarmas
- `POST /api/alarmas` - Crear alarma
- `PUT /api/alarmas/:id/confirmar` - Confirmar toma

> 📚 **Documentación completa**: Disponible en `/api/docs` (Swagger UI)

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm test

# Coverage
npm run test:coverage

# Tests de integración
npm run test:integration
```

## 🚀 Despliegue

### Render (Recomendado)
1. Conecta tu repositorio con Render
2. Configura las variables de entorno
3. Despliega automáticamente desde `main`

### AWS EC2
```bash
# Script de despliegue incluido
./scripts/deploy-aws.sh
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### 📋 Estándares de Código
- ESLint + Prettier configurado
- Commits convencionales (feat, fix, docs, etc.)
- Tests obligatorios para nuevas funcionalidades

## 📈 Roadmap

- [ ] **v1.0** - Sistema básico de recordatorios
- [ ] **v1.1** - Integración con MercadoPago
- [ ] **v1.2** - Reportes avanzados y analytics
- [ ] **v1.3** - Integración con dispositivos IoT
- [ ] **v2.0** - Inteligencia artificial para predicciones

## 💳 Integración MercadoPago

Próximamente se agregará la funcionalidad de pagos para suscripciones premium:
- Planes de suscripción
- Recordatorios ilimitados
- Soporte prioritario

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- Email: tu-email@ejemplo.com

## 🙏 Agradecimientos

- Equipo de desarrollo
- Contribuidores de la comunidad
- [Lista completa de dependencias](package.json)

---
⭐ **¡Dale una estrella si te gusta el proyecto!** ⭐