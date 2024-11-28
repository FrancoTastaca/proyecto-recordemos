import express from 'express';
import personaController from '../controllers/persona.controller.js';
import personaScheme from '../middlewares/schemes/persona.scheme.js';
import validate from '../middlewares/validate.js';
import { checkRoleCuidador } from '../middlewares/checkRole.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Persona
 *   description: Endpoints de personas
 */

/**
 * @swagger
 * /api/persona:
 *   get:
 *     summary: Listar todas las personas
 *     tags: [Persona]
 *     responses:
 *       200:
 *         description: Lista de personas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Persona'
 */
router.get('/', personaController.listar);

/**
 * @swagger
 * /api/persona/{id}:
 *   get:
 *     summary: Obtener una persona por ID
 *     tags: [Persona]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Persona obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Persona'
 *       404:
 *         description: Persona no encontrada
 */
router.get('/:id', personaController.read);

/**
 * @swagger
 * /api/persona/{id}:
 *   put:
 *     summary: Actualizar una persona
 *     tags: [Persona]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la persona
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Persona'
 *     responses:
 *       200:
 *         description: Persona actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Persona'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Persona no encontrada
 */
router.put('/:id', validate(personaScheme.update), checkRoleCuidador, personaController.update);

/**
 * @swagger
 * /api/persona/{id}:
 *   delete:
 *     summary: Eliminar una persona
 *     tags: [Persona]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la persona
 *     responses:
 *       204:
 *         description: Persona eliminada correctamente
 *       404:
 *         description: Persona no encontrada
 */
router.delete('/:id', validate(personaScheme.remove), checkRoleCuidador, personaController.remove);

export default router;