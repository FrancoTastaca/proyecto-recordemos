import express from 'express';
import cuidadorController from '../controllers/cuidador.controller.js';
import { checkRoleCuidador } from '../middlewares/checkRole.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cuidador
 *   description: Endpoints de cuidadores
 */

/**
 * @swagger
 * /api/cuidador/generarQR:
 *   post:
 *     summary: Generar un código QR para el cuidador
 *     tags: [Cuidador]
 *     responses:
 *       200:
 *         description: Código QR generado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     qrCode:
 *                       type: string
 */
router.post('/generarQR', checkRoleCuidador, cuidadorController.generarQR);

/**
 * @swagger
 * /api/cuidador/listarCuidadores:
 *   get:
 *     summary: Listar todos los cuidadores
 *     tags: [Cuidador]
 *     responses:
 *       200:
 *         description: Lista de cuidadores obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cuidador'
 */
router.get('/listarCuidadores', cuidadorController.listar);

/**
 * @swagger
 * /api/cuidador:
 *   get:
 *     summary: Obtener la información del cuidador autenticado
 *     tags: [Cuidador]
 *     responses:
 *       200:
 *         description: Información del cuidador obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 apellido:
 *                   type: string
 *                 dni:
 *                   type: string
 *                 tipo:
 *                   type: string
 *                 codVinculacion:
 *                   type: string
 *                 relacion_paciente:
 *                   type: string
 *                 especialidad:
 *                   type: string
 *                 contacto:
 *                   type: string
 */
router.get('/', checkRoleCuidador, cuidadorController.getCuidador);

/**
 * @swagger
 * /api/cuidador/crear:
 *   post:
 *     summary: Crear un nuevo cuidador
 *     tags: [Cuidador]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               dni:
 *                 type: string
 *               relacion_paciente:
 *                 type: string
 *               especialidad:
 *                 type: string
 *               celular:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cuidador creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     cuidador:
 *                       $ref: '#/components/schemas/Cuidador'
 *                     datosPersonaCuidador:
 *                       $ref: '#/components/schemas/Persona'
 *       400:
 *         description: Error de validación
 */
router.post('/crear', cuidadorController.crearCuidador);

/**
 * @swagger
 * /api/cuidador/{id}:
 *   put:
 *     summary: Actualizar un cuidador existente
 *     tags: [Cuidador]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cuidador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               relacion_paciente:
 *                 type: string
 *               especialidad:
 *                 type: string
 *               contacto:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cuidador actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Cuidador'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Cuidador no encontrado
 */
router.put('/:id', checkRoleCuidador, cuidadorController.update);

/**
 * @swagger
 * /api/cuidador/{id}:
 *   delete:
 *     summary: Eliminar un cuidador existente
 *     tags: [Cuidador]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cuidador
 *     responses:
 *       204:
 *         description: Cuidador eliminado correctamente
 *       404:
 *         description: Cuidador no encontrado
 */
router.delete('/:id', cuidadorController.remove);

export default router;