import app from './app.js';
import { sequelize } from './bd/config/bd.config.js';
import pico from 'picocolors';
import { PORT } from './utils/globalConstant.js';
import cron from 'node-cron';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

async function startServer(app, port) {
  try {
    await sequelize.authenticate();

    const server = app.listen(port, () => {
      console.log(pico.green(`El servidor está corriendo en http://localhost:${port}/`));
      
      // Configurar cron job
      cron.schedule('0 0 * * *', () => {
        console.log('Ejecutando verificación de penalidades...');
        // Llama a tu función de verificación de penalidades aquí
        // verificarPenalidadesBackground();
      });
    });

    return server;
  } catch (error) {
    console.error(pico.red('No se pudo conectar al servidor:'), error);
    throw error;
  }
}

// Se inicia el servidor si es el archivo principal y no cuando se requiere como un módulo en otros archivos (ej: tests)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.argv[1] === __filename) {
  startServer(app, PORT).catch(err => {
    console.error('Error al conectarse a la base:', err);
  });
}

export { startServer }