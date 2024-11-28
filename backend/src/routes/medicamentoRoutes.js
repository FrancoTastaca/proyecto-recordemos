import express from 'express';
import medicamentoCuidador from '../controllers/medicamentoCuidador.controller.js';
import medCuidadorScheme from '../middlewares/schemes/medicamentoCuidador.scheme.js';
import { uploadImagenes } from '../middlewares/multerConfig.js';
import validate from '../middlewares/validate.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Medicamento
 *   description: Endpoints de medicamentos
 */

/**
 * @swagger
 * /api/medicamento:
 *   get:
 *     summary: Listar todos los medicamentos
 *     tags: [Medicamento]
 *     responses:
 *       200:
 *         description: Lista de medicamentos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medicamento'
 */
router.get('/', medicamentoCuidador.listar);

/**
 * @swagger
 * /api/medicamento/agregar:
 *   post:
 *     summary: Agregar un nuevo medicamento
 *     tags: [Medicamento]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               idVademecum:
 *                 type: string
 *               notas:
 *                 type: string
 *               marca:
 *                 type: string
 *               idCuidador:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Medicamento agregado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicamento'
 *       400:
 *         description: Error de validación
 */
router.post('/agregar', uploadImagenes, validate(medCuidadorScheme.base, 'body'), medicamentoCuidador.create);

/**
 * @swagger
 * /api/medicamento/cuidador:
 *   get:
 *     summary: Listar medicamentos por ID de cuidador
 *     tags: [Medicamento]
 *     responses:
 *       200:
 *         description: Lista de medicamentos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medicamento'
 */
router.get('/cuidador', medicamentoCuidador.listarPorIdCuidador);

/**
 * @swagger
 * /api/medicamento/modificar/{id}:
 *   put:
 *     summary: Actualizar un medicamento existente
 *     tags: [Medicamento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del medicamento
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               idVademecum:
 *                 type: string
 *               notas:
 *                 type: string
 *               marca:
 *                 type: string
 *               idCuidador:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Medicamento actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicamento'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Medicamento no encontrado
 */
router.put('/modificar/:id', uploadImagenes, validate(medCuidadorScheme.validateId, 'params'), validate(medCuidadorScheme.base, 'body'), medicamentoCuidador.update);

/**
 * @swagger
 * /api/medicamento/borrar/{id}:
 *   delete:
 *     summary: Eliminar un medicamento existente
 *     tags: [Medicamento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del medicamento
 *     responses:
 *       204:
 *         description: Medicamento eliminado correctamente
 *       404:
 *         description: Medicamento no encontrado
 */
router.delete('/borrar/:id', validate(medCuidadorScheme.validateId, 'params'), medicamentoCuidador.remove);

export default router;