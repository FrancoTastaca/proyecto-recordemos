import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes/index-Routes.js'
import models from './bd/models/index.Models.js'
import errorHandler from './middlewares/error.js'
import manageTempFiles from './middlewares/archivosTemporales.js'
import swaggerRouter from './doc/swagger.js'
import { scheduleReminders } from './services/reminderService.js'
import { checkUnconfirmedAlarms } from './services/notificationService.js'

const app = express()
models.initAssociations()
const inTest = false // Define esta variable según sea necesario

// Función para configurar la API
const configuracionApi = (app) => {
  // Configuración de CORS
  app.use(cors({
    origin: process.env.RUTA_FRONT, // La URL del frontend
    credentials: true
  }))

  // Middleware para manejar archivos temporales
  app.use(manageTempFiles)

  // Middleware de logging
  if (!inTest) {
    app.use(morgan('dev'))
  }

  // Configuración middleware body-parser y cookie-parser
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(errorHandler)
}

// Función para configurar las rutas
const configuracionRutas = (app) => {
  // Rutas de la API
  app.use('/api', router)
  app.use('/api', swaggerRouter)

  // Ruta de prueba
  app.get('/', (req, res) => {
    res.send('Bienvenido al backend de la aplicación del Proyecto Recordemos 2024')
  })

  // Middleware de manejo de errores
  app.use(errorHandler)
}

// Configurar la API y las rutas
configuracionApi(app)
configuracionRutas(app)

// Iniciar el servicio de recordatorios
scheduleReminders()

// Configurar el chequeo de alarmas no confirmadas cada 5 segundos
setInterval(checkUnconfirmedAlarms, 5000)
export default app
