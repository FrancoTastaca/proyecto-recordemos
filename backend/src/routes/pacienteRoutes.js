import express from 'express';
import pacienteController from '../controllers/paciente.controller.js';
import validate from '../middlewares/validate.js';
import pacienteScheme from '../middlewares/schemes/paciente.scheme.js';
import { checkRolePaciente } from '../middlewares/checkRole.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Paciente
 *   description: Endpoints de pacientes
 */

/**
 * @swagger
 * /api/paciente/listarPacientes:
 *   get:
 *     summary: Listar todos los pacientes
 *     tags: [Paciente]
 *     responses:
 *       200:
 *         description: Lista de pacientes obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente'
 */
router.get('/listarPacientes', pacienteController.listar);

/**
 * @swagger
 * /api/paciente/{id}:
 *   get:
 *     summary: Obtener un paciente por ID
 *     tags: [Paciente]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del paciente
 *     responses:
 *       200:
 *         description: Paciente obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente no encontrado
 */
router.get('/:id', validate(pacienteScheme.read), pacienteController.read);

/**
 * @swagger
 * /api/paciente/crear:
 *   post:
 *     summary: Crear un nuevo paciente
 *     tags: [Paciente]
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
 *               codVinculacion:
 *                 type: string
 *               historial_medico:
 *                 type: string
 *               contacto_emergencia:
 *                 type: string
 *     responses:
 *       201:
 *         description: Paciente creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       400:
 *         description: Error de validación
 */
router.post('/crear', validate(pacienteScheme.crearPaciente, 'body'), pacienteController.crearPaciente);

/**
 * @swagger
 * /api/paciente/{id}:
 *   put:
 *     summary: Actualizar un paciente existente
 *     tags: [Paciente]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del paciente
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
 *               codVinculacion:
 *                 type: string
 *               historial_medico:
 *                 type: string
 *               contacto_emergencia:
 *                 type: string
 *     responses:
 *       200:
 *         description: Paciente actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Paciente no encontrado
 */
router.put('/:id', validate(pacienteScheme.update), pacienteController.update);

/**
 * @swagger
 * /api/paciente/{id}:
 *   delete:
 *     summary: Eliminar un paciente existente
 *     tags: [Paciente]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del paciente
 *     responses:
 *       204:
 *         description: Paciente eliminado correctamente
 *       404:
 *         description: Paciente no encontrado
 */
router.delete('/:id', validate(pacienteScheme.remove), pacienteController.remove);

/**
 * @swagger
 * /api/paciente:
 *   get:
 *     summary: Obtener la información del paciente autenticado
 *     tags: [Paciente]
 *     responses:
 *       200:
 *         description: Información del paciente obtenida correctamente
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
 *                 historial_medico:
 *                   type: string
 *                 contacto_emergencia:
 *                   type: string
 */
router.get('/', checkRolePaciente, pacienteController.getPaciente);

export default router;