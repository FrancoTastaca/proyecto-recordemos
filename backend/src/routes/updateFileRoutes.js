import express from 'express';
import { obtenerImagen} from '../controllers/updateFile.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: UpdateFile
 *   description: Endpoints para manejar archivos
 */

/**
 * @swagger
 * /api/updateFile/obtenerImagen/{type}/{id}:
 *   get:
 *     summary: Obtener una imagen por tipo y ID
 *     tags: [UpdateFile]
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Tipo de imagen (medicamento o pastillero)
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del archivo
 *     responses:
 *       200:
 *         description: Imagen obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Archivo no encontrado
 */
router.get('/obtenerImagen/:type/:id', obtenerImagen);

export default router;