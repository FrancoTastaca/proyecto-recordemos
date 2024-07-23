import Sequelize from 'sequelize';
import pico from 'picocolors';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde el archivo .env


const host = process.env.MYSQL_IP; 
const port = process.env.MYSQL_PUERTO;
const database = process.env.MYSQL_DATABASE;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;

// Crear una nueva instancia de Sequelize

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    port: port,
});

sequelize.authenticate()
    .then(() => {
        console.log(pico.yellow('Conexión establecida exitosamente.'));
        return sequelize.sync(); // Sincroniza todos los modelos definidos
    })
    .then(() => {
        console.log(pico.green('Base de datos sincronizada exitosamente.'));
    })
    .catch(err => {
        console.error(pico.red('Error al conectarse a la base:'), pico.red(err));
    });


export default sequelize;