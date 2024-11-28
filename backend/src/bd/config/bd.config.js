import Sequelize from 'sequelize';
import pico from 'picocolors';
import dotenv from 'dotenv';

dotenv.config()
const host = process.env.MYSQL_IP
const port = process.env.MYSQL_PUERTO
const database = process.env.MYSQL_DATABASE
const user = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD

// Crear una nueva instancia de Sequelize
const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
  port,
  logging: console.log
})

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(pico.yellow('Conexión establecida exitosamente.'));
    await sequelize.sync();
    console.log(pico.green('Base de datos sincronizada exitosamente.'));
  } catch (err) {
    console.error(pico.red('Error al conectarse a la base:'), pico.red(err));
    throw err; // Re-throw the error so tests can catch it
  }
};
// Conectar a la base de datos solo si no estamos en el entorno de pruebas
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}
export { connectDB, sequelize };