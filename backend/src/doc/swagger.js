import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import express from 'express'

const router = express.Router()

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API REST - APP RECUERDAME 2024 - Documentación 💊⏰💉',
            version: '1.0.0',
            description: 'Documentación de la API del backend de la aplicación del Proyecto PS - APP Recuerdame 2024 - UTN FRLP 🎓'
        }
    },
    apis: ['./src/routes/*.js']
}

const specs = swaggerJsdoc(options)

router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))

export default router

