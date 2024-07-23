import express from 'express';
import bodyParser from 'body-parser';
//import router from './routes;'; // Importar rutas
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.send('Bienvenido al backend de la aplicación');
});

// Importar y usar rutas adicionales
// const userRoutes = require('./routes/userRoutes');
//app.use('/', router);

export default app;
