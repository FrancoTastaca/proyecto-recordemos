import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index-routes.js';
import models from './models/index.Models.js';
import errorHandler from './middlewares/error.js'; // Importa el middleware de manejo de errores

const app = express();
models.initAssociations();
const inTest = false; // Define esta variable según sea necesario

// Configuración de CORS
app.use(cors({
  origin: process.env.RUTA_FRONT, // La URL del frontend
  credentials: true
}));

// Configuración de mensajes flash
app.use((req, res, next) => {
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.signinMessage = req.flash('signinMessage');
  console.log(app.locals.signinMessage);
  next();
});

if (!inTest) {
  app.use(morgan('dev'));
}

// Configuración middleware body-parser, cookie-parser y rutas de la API 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', router);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido al backend de la aplicación del Proyecto Recordemos 2024');
});

// Middleware de manejo de errores
app.use(errorHandler);

export default app;