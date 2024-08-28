import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import express from 'express';
import { verifyJWT } from '../middlewares/verifyJWT.js';

const router = express.Router();

/* eslint-disable-next-line no-undef */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const routesPath = join(__dirname);

const loadedRoutes = new Set();
const publicRoutes = ['/auth', '/persona'];

async function loadRoutes() {
  const files = readdirSync(routesPath);
  for (const file of files) {
    if (file !== 'index-Routes.js' && file.endsWith('Routes.js')) 
      {
      const routePath = `/${file.replace('Routes.js', '')}`;

      if (!loadedRoutes.has(routePath)) {
        const filePath = pathToFileURL(join(routesPath, file)).href;
        try {
          const route = await import(filePath);
          
          // Comprueba si la ruta debe ser pública
          if (publicRoutes.includes(routePath)) {
            router.use(routePath, route.default);
          } else {
            router.use(routePath, verifyJWT, route.default);
          }
          
          loadedRoutes.add(routePath);
        } catch (error) {
          console.error(`Error al cargar la ruta ${routePath}:`, error);
        }
      } else {
        console.log(`Ruta ${routePath} ya cargada, omitiendo.`);
      }
    }
  }
}

loadRoutes().catch(error => {
  console.error('Error al cargar las rutas:', error);
});

export default router;