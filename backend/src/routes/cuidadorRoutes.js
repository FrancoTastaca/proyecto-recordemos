import express from 'express'
import cuidadorController from '../controllers/cuidador.controller.js'
import { checkRoleCuidador } from '../middlewares/checkRole.js'

const router = express.Router()

/**
 * @swagger
 * /api/cuidador/:
 *   get:
 *     summary: Listar todos los cuidadores
 *     responses:
 *       200:
 *         description: Lista de cuidadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: "Juan Pérez"
 */
/**
 * @swagger
 * /api/cuidador/crear:
 *   post:
 *     summary: Crear un nuevo cuidador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               relacion_paciente:
 *                 type: string
 *                 example: "Padre"
 *               especialidad:
 *                 type: string
 *                 example: "Geriatría"
 *               contacto:
 *                 type: string
 *                 example: "123456789"
 *     responses:
 *       201:
 *         description: Cuidador creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Cuidador creado correctamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     cuidador:
 *                       type: object
 *                       properties:
 *                         ID:
 *                           type: integer
 *                           example: 1
 *                         relacion_paciente:
 *                           type: string
 *                           example: "Padre"
 *                         especialidad:
 *                           type: string
 *                           example: "Geriatría"
 *                         contacto:
 *                           type: string
 *                           example: "123456789"
 *                     datosPersonaCuidador:
 *                       type: object
 *                       properties:
 *                         ID:
 *                           type: integer
 *                           example: 1
 *                         nombre:
 *                           type: string
 *                           example: "Juan Pérez"
 *                         email:
 *                           type: string
 *                           example: "juan.perez@example.com"
 */
/**
 * @swagger
 * /api/cuidador/{id}:
 *   put:
 *     summary: Actualizar un cuidador
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               relacion_paciente:
 *                 type: string
 *                 example: "Padre"
 *               especialidad:
 *                 type: string
 *                 example: "Geriatría"
 *               contacto:
 *                 type: string
 *                 example: "123456789"
 *     responses:
 *       200:
 *         description: Cuidador actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Cuidador actualizado exitosamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     ID:
 *                       type: integer
 *                       example: 1
 *                     relacion_paciente:
 *                       type: string
 *                       example: "Padre"
 *                     especialidad:
 *                       type: string
 *                       example: "Geriatría"
 *                     contacto:
 *                       type: string
 *                       example: "123456789"
 */
/**
 * @swagger
 * /api/cuidador/{id}:
 *   delete:
 *     summary: Eliminar un cuidador
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Cuidador eliminado
 */
/**
 * @swagger
 * /api/cuidador/generarQR:
 *   post:
 *     summary: Generar un código QR para el cuidador
 *     responses:
 *       200:
 *         description: Código QR generado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Código QR generado correctamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     qrCode:
 *                       type: string
 *                       example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
 */

router.get('/', cuidadorController.listar)
router.post('/crear', cuidadorController.crearCuidador)
router.put('/:id', checkRoleCuidador, cuidadorController.update)
router.delete('/:id', cuidadorController.remove)
router.post('/generarQR', checkRoleCuidador, cuidadorController.generarQR)

export default router
