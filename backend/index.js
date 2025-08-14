require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Middleware de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Configuración de CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // límite de requests por ventana
  message: {
    error: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.',
    retryAfter: Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000)
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Middleware para parsing
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware personalizado
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
  next();
});

// Rutas básicas
app.get('/', (req, res) => {
  res.json({
    message: '🩺 RecuérdaMe API - Sistema de recordatorios de medicamentos',
    version: '1.0.0',
    status: 'active',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      docs: '/api/docs',
      api: '/api/v1'
    }
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error stack:', err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Ha ocurrido un error interno del servidor' 
    : err.message;

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString(),
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    }
  });
});

// Ruta 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Ruta ${req.originalUrl} no encontrada`,
      statusCode: 404,
      timestamp: new Date().toISOString()
    }
  });
});

// Manejo graceful de cierre del servidor
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM recibido. Cerrando servidor HTTP gracefully...');
  server.close(() => {
    console.log('✅ Servidor HTTP cerrado.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT recibido. Cerrando servidor HTTP gracefully...');
  server.close(() => {
    console.log('✅ Servidor HTTP cerrado.');
    process.exit(0);
  });
});

// Iniciar servidor
const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor RecuérdaMe corriendo en http://${HOST}:${PORT}`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🛡️  Seguridad: Rate limiting activado`);
  console.log(`📚 Documentación disponible en: http://${HOST}:${PORT}/api/docs`);
});

module.exports = app;
