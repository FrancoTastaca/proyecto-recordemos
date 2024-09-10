import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes/index-Routes.js'
import models from './bd/models/index.Models.js'
import errorHandler from './middlewares/error.js'

const app = express()
models.initAssociations()
const inTest = false // Define esta variable según sea necesario

// Configuración de CORS
app.use(cors({
  origin: process.env.RUTA_FRONT, // La URL del frontend
  credentials: true
}))

if (!inTest) {
  app.use(morgan('dev'))
}

// Configuración middleware body-parser, cookie-parser y rutas de la API
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api', router)

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido al backend de la aplicación del Proyecto Recordemos 2024')
})

// Middleware de manejo de errores
app.use(errorHandler)

export default app
