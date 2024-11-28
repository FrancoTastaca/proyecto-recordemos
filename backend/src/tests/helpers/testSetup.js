import dotenv from 'dotenv';
import models from '../../bd/models/index.Models.js';
import cron from 'node-cron';
import { startServer } from '../../index.js';
import app from '../../app.js';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_IP, MYSQL_PUERTO } = process.env;
console.log('Variables de entorno:', MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_IP, MYSQL_PUERTO);
let server;

// Configuración global de tests
beforeAll(async () => {
  // Iniciar el servidor
  server = await startServer(app, 0); // Usar un puerto aleatorio disponible
  console.log(`El test server está corriendo en el puerto: ${server.address().port}`);

  console.log('Sincronizando modelos con force: false...');
  await models.sequelize.sync({ force: false });
  console.log('Sincronización completada.');
});

afterAll(async () => {
  // Cerrar la conexión a la base de datos
  await models.sequelize.close();

  // Cerrar el servidor HTTP si está definido
  if (server && server.close) {
    await new Promise((resolve) => {
      server.close(() => {
        console.log('......Test server closed');
        resolve();
      });
    });
  }

  // Detener todas las tareas programadas de cron
  const scheduledTasks = cron.getTasks();
  scheduledTasks.forEach(task => task.stop());
});

export { app };