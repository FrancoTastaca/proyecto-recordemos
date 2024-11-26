import Sequelize from 'sequelize';
import pico from 'picocolors';
import dotenv from 'dotenv';

dotenv.config()

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_IP,
    port: process.env.MYSQL_PUERTO,
    dialect: 'mysql',
    logging: process.env.NODE_ENV !== 'test', // Desactivar logging en pruebas
    dialectOptions: {
      charset: 'utf8mb4',
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true
    }
  }
);

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