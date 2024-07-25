import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import express from 'express';

const router = express.Router();

// Convertir import.meta.url a una ruta de archivo para obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const routesPath = join(__dirname);

// Leer todos los archivos en el directorio de rutas
readdirSync(routesPath).forEach(async (file) => {
  if (file !== 'index.router.js' && file.endsWith('.js')) {
    const routePath = `/${file.replace('.js', '')}`;
    // Convertir la ruta del archivo a una URL válida para importar
    const filePath = pathToFileURL(join(routesPath, file)).href;
    // Importar el módulo de ruta de forma dinámica
    const route = await import(filePath);
    router.use(routePath, route.default);
  }
});

export default router;