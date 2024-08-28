import { readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import express from 'express'
import { verifyJWT } from '../middlewares/verifyJWT.js';


const router = express.Router()

// Convierte la URL del archivo en una ruta de archivo
/* eslint-disable-next-line no-undef */
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const routesPath = join(__dirname)

// Usa un Set para mantener un registro de las rutas ya cargadas
const loadedRoutes = new Set()

async function loadRoutes () {
  const files = readdirSync(routesPath)
  for (const file of files) {
    if (file !== 'index-Routes.js' && file.endsWith('Routes.js')) {
      const routePath = `/${file.replace('Routes.js', '')}`

      // Verifica si la ruta ya ha sido cargada
      if (!loadedRoutes.has(routePath)) {
        const filePath = pathToFileURL(join(routesPath, file)).href
        try {
          const route = await import(filePath)
          router.use(routePath, verifyJWT, route.default);
          // Marca la ruta como cargada
          loadedRoutes.add(routePath)
        } catch (error) {
          console.error(`Error al cargar la ruta ${routePath}:`, error)
        }
      } else {
        console.log(`Ruta ${routePath} ya cargada, omitiendo.`)
      }
    }
  }
}

// Ejecuta la función de carga de rutas
loadRoutes().catch(error => {
  console.error('Error al cargar las rutas:', error)
})

export default router