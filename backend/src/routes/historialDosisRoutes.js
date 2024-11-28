import express from 'express';
import historialDosisController from '../controllers/historialDosis.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: HistorialDosis
 *   description: Endpoints de historial de dosis
 */

/**
 * @swagger
 * /api/historialDosis:
 *   get:
 *     summary: Listar todo el historial de dosis
 *     tags: [HistorialDosis]
 *     responses:
 *       200:
 *         description: Historial de dosis obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HistorialDosis'
 */
router.get('/', historialDosisController.listarTodo);

/**
 * @swagger
 * /api/historialDosis/historial/{id}:
 *   get:
 *     summary: Obtener historial de dosis por ID de persona
 *     tags: [HistorialDosis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Historial de dosis obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HistorialDosis'
 *       404:
 *         description: Historial de dosis no encontrado
 */
router.get('/historial/:id', historialDosisController.historialDosisPersonaID);

/**
 * @swagger
 * /api/historialDosis/porFechas/{id}:
 *   get:
 *     summary: Listar dosis de una persona por fechas
 *     tags: [HistorialDosis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la persona
 *       - in: query
 *         name: fechaInicio
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Fecha de inicio
 *       - in: query
 *         name: fechaFin
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Fecha de fin
 *     responses:
 *       200:
 *         description: Historial de dosis obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HistorialDosis'
 *       404:
 *         description: Historial de dosis no encontrado
 */
router.get('/porFechas/:id', historialDosisController.listarDosisPersonaPorFechas);

/**
 * @swagger
 * /api/historialDosis/{id}:
 *   get:
 *     summary: Obtener historial de dosis por ID
 *     tags: [HistorialDosis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del historial de dosis
 *     responses:
 *       200:
 *         description: Historial de dosis obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HistorialDosis'
 *       404:
 *         description: Historial de dosis no encontrado
 */
router.get('/:id', historialDosisController.read);

/**
 * @swagger
 * /api/historialDosis:
 *   post:
 *     summary: Crear un nuevo historial de dosis
 *     tags: [HistorialDosis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dosisRegistrada:
 *                 type: string
 *               horaPrimerNotificacion:
 *                 type: string
 *               horaSegundaNotificacion:
 *                 type: string
 *               primerTomoDosis:
 *                 type: boolean
 *               segundoTomoDosis:
 *                 type: boolean
 *               Pastillero_ID:
 *                 type: string
 *     responses:
 *       201:
 *         description: Historial de dosis creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HistorialDosis'
 *       400:
 *         description: Error de validación
 */
router.post('/', historialDosisController.create);

/**
 * @swagger
 * /api/historialDosis/{id}:
 *   put:
 *     summary: Actualizar un historial de dosis existente
 *     tags: [HistorialDosis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del historial de dosis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dosisRegistrada:
 *                 type: string
 *               horaPrimerNotificacion:
 *                 type: string
 *               horaSegundaNotificacion:
 *                 type: string
 *               primerTomoDosis:
 *                 type: boolean
 *               segundoTomoDosis:
 *                 type: boolean
 *               Pastillero_ID:
 *                 type: string
 *     responses:
 *       200:
 *         description: Historial de dosis actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HistorialDosis'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Historial de dosis no encontrado
 */
router.put('/:id', historialDosisController.update);

/**
 * @swagger
 * /api/historialDosis/{id}:
 *   delete:
 *     summary: Eliminar un historial de dosis existente
 *     tags: [HistorialDosis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del historial de dosis
 *     responses:
 *       204:
 *         description: Historial de dosis eliminado correctamente
 *       404:
 *         description: Historial de dosis no encontrado
 */
router.delete('/:id', historialDosisController.remove);

/**
 * @swagger
 * /api/historialDosis/respuesta:
 *   post:
 *     summary: Registrar respuesta de toma de dosis
 *     tags: [HistorialDosis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               historialId:
 *                 type: string
 *               respuesta:
 *                 type: string
 *               tipo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Respuesta registrada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Error de validación
 */
router.post('/respuesta', historialDosisController.registrarRespuesta);

export default router;