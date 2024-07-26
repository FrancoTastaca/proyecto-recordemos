import app from './app.js';
import sequelize from './config/bd.config.js';
import pico from 'picocolors';

import dotenv from 'dotenv';
dotenv.config();

async function startServer() {
  try {
    await sequelize.authenticate();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(pico.green(`El servidor está corriendo en el puerto ${port}`));
    });
  } catch (error) {
    console.error(pico.red('No se pudo conectar a la base de datos:'), error);
  }
}

startServer();