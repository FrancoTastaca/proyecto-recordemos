import express from 'express';
import usuarioController from '../controllers/usuario.controller.js';
import usuarioScheme from '../middlewares/schemes/usuario.scheme.js';
import validate from '../middlewares/validate.js';
import { checkRoleCuidador } from '../middlewares/checkRole.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: Endpoints de usuarios
 */

/**
 * @swagger
 * /api/usuario:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get('/', usuarioController.listar);

/**
 * @swagger
 * /api/usuario/updatePushToken:
 *   post:
 *     summary: Actualizar el token de notificaciones
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               pushToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token de notificaciones actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/updatePushToken', usuarioController.updatePushToken);

/**
 * @swagger
 * /api/usuario/getRole:
 *   get:
 *     summary: Obtener el rol del usuario autenticado
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: Rol obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 role:
 *                   type: string
 */
router.get('/getRole', validate(usuarioScheme.validateId), usuarioController.getRole);

/**
 * @swagger
 * /api/usuario/getRole/{id}:
 *   get:
 *     summary: Obtener el rol de un usuario por ID
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Rol obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 role:
 *                   type: string
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/getRole/:id', validate(usuarioScheme.validateId), usuarioController.getRoleById);

/**
 * @swagger
 * /api/usuario/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', validate(usuarioScheme.validateId), checkRoleCuidador, usuarioController.readUsuario);

/**
 * @swagger
 * /api/usuario/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id', validate(usuarioScheme.update), checkRoleCuidador, usuarioController.updateUsuario);

/**
 * @swagger
 * /api/usuario/{id}:
 *   delete:
 *     summary: Eliminar un usuario existente
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       204:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', validate(usuarioScheme.validateId), checkRoleCuidador, usuarioController.deleteUsuario);

export default router;