import app from './app.js'
import {sequelize} from './bd/config/bd.config.js'
import pico from 'picocolors'
import { PORT } from './utils/globalConstant.js'

import dotenv from 'dotenv'
dotenv.config()

async function startServer () {
  try {
    await sequelize.authenticate()

    const server = app.listen(PORT, () => {
      console.log(pico.green(`El servidor está corriendo en http://localhost:${PORT}/`))
    })

    return server
  } catch (error) {
    console.error(pico.red('No se pudo conectar al servidor:'), error)
    throw error
  }
}

export { startServer }
