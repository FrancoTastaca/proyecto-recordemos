import express from 'express';
import pastilleroController from '../controllers/pastilleroAlarma.controller.js';
import pastilleroScheme from '../middlewares/schemes/pastillero.scheme.js';
import validate from '../middlewares/validate.js';
import { checkRoleCuidador } from '../middlewares/checkRole.js';
import { uploadImagenes } from '../middlewares/multerConfig.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pastillero
 *   description: Endpoints de pastilleros
 */

/**
 * @swagger
 * /api/pastilleroAlarma:
 *   get:
 *     summary: Listar todos los pastilleros
 *     tags: [Pastillero]
 *     responses:
 *       200:
 *         description: Lista de pastilleros obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pastillero'
 */
router.get('/', pastilleroController.listar);

/**
 * @swagger
 * /api/pastilleroAlarma/{type}:
 *   get:
 *     summary: Listar pastilleros por tipo de usuario
 *     tags: [Pastillero]
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Tipo de usuario (cuidador o paciente)
 *     responses:
 *       200:
 *         description: Lista de pastilleros obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pastillero'
 *       400:
 *         description: Tipo de consulta no válido
 */
router.get('/:type', validate(pastilleroScheme.validateType, 'params'), pastilleroController.listarPorIdlogin);

/**
 * @swagger
 * /api/pastilleroAlarma:
 *   post:
 *     summary: Crear un nuevo pastillero
 *     tags: [Pastillero]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagenURL:
 *                 type: string
 *               PacienteID:
 *                 type: string
 *               MedCuidadorID:
 *                 type: string
 *               colorPastillero:
 *                 type: string
 *               horarioDiario:
 *                 type: string
 *               dosis:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Pastillero creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pastillero'
 *       400:
 *         description: Error de validación
 */
router.post('/', uploadImagenes, validate(pastilleroScheme.save, 'body'), checkRoleCuidador, pastilleroController.create);

/**
 * @swagger
 * /api/pastilleroAlarma/{id}:
 *   put:
 *     summary: Actualizar un pastillero existente
 *     tags: [Pastillero]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del pastillero
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagenURL:
 *                 type: string
 *               PacienteID:
 *                 type: string
 *               MedCuidadorID:
 *                 type: string
 *               colorPastillero:
 *                 type: string
 *               horarioDiario:
 *                 type: string
 *               dosis:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Pastillero actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pastillero'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Pastillero no encontrado
 */
router.put('/:id', uploadImagenes, validate(pastilleroScheme.validateId, 'params'), validate(pastilleroScheme.save, 'body'), checkRoleCuidador, pastilleroController.update);

/**
 * @swagger
 * /api/pastilleroAlarma/{id}:
 *   delete:
 *     summary: Eliminar un pastillero existente
 *     tags: [Pastillero]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del pastillero
 *     responses:
 *       204:
 *         description: Pastillero eliminado correctamente
 *       404:
 *         description: Pastillero no encontrado
 */
router.delete('/:id', validate(pastilleroScheme.validateId), checkRoleCuidador, pastilleroController.remove);

/**
 * @swagger
 * /api/pastilleroAlarma/cuidador/{id}:
 *   get:
 *     summary: Obtener el cuidador de un pastillero
 *     tags: [Pastillero]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del pastillero
 *     responses:
 *       200:
 *         description: Cuidador obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cuidador'
 *       404:
 *         description: Pastillero no encontrado
 */
router.get('/cuidador/:id', pastilleroController.obtenerCuidadorDePastillero);

/**
 * @swagger
 * /api/pastilleroAlarma/{id}:
 *   get:
 *     summary: Obtener un pastillero por ID
 *     tags: [Pastillero]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del pastillero
 *     responses:
 *       200:
 *         description: Pastillero obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pastillero'
 *       404:
 *         description: Pastillero no encontrado
 */
router.get('/:id', validate(pastilleroScheme.validateId), pastilleroController.read);

/**
 * @swagger
 * /api/pastilleroAlarma/horarioDiario/{id}:
 *   get:
 *     summary: Obtener el horario diario de un pastillero
 *     tags: [Pastillero]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del pastillero
 *     responses:
 *       200:
 *         description: Horario diario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 horario_diario:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Pastillero no encontrado
 */
router.get('/horarioDiario/:id', validate(pastilleroScheme.validateId), pastilleroController.obtenerHorarioDiario);

export default router;