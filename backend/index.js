import app from './app.js';
import sequelize from './config/bd.config.js';
import pico from 'picocolors';
import { PORT } from './utils/globalConstant.js';

import dotenv from 'dotenv';
dotenv.config();

async function startServer() {
  try {
    await sequelize.authenticate();

    app.listen(PORT, () => {
      console.log(pico.green(`El servidor está corriendo en el puerto ${PORT}`));
    });
  } catch (error) {
    console.error(pico.red('No se pudo conectar al servidor:'), error);
  }
}

startServer();