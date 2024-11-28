import express from 'express';
import vademecumController from '../controllers/vademecum.controller.js';
import { checkRoleCuidador } from '../middlewares/checkRole.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vademecum
 *   description: Endpoints de vademecum
 */

/**
 * @swagger
 * /api/vademecum/desplegable:
 *   get:
 *     summary: Obtener vademecum para desplegable
 *     tags: [Vademecum]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Texto para filtrar el vademecum
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Límite de resultados
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Desplazamiento de resultados
 *     responses:
 *       200:
 *         description: Vademecum obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nombre:
 *                     type: string
 */
router.get('/desplegable', checkRoleCuidador, vademecumController.obtenerVademecumParaDesplegable);

/**
 * @swagger
 * /api/vademecum/listarSegunTipo:
 *   get:
 *     summary: Listar vademecum según tipo
 *     tags: [Vademecum]
 *     parameters:
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *         required: true
 *         description: Tipo de filtro (droga, presentacion, marca)
 *       - in: query
 *         name: valor
 *         schema:
 *           type: string
 *         required: true
 *         description: Valor del filtro
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Límite de resultados
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Desplazamiento de resultados
 *     responses:
 *       200:
 *         description: Vademecum listado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vademecum'
 */
router.get('/listarSegunTipo', checkRoleCuidador, vademecumController.listarSegunTipo);

/**
 * @swagger
 * /api/vademecum/drogaDesplegable:
 *   get:
 *     summary: Obtener droga para desplegable
 *     tags: [Vademecum]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Texto para filtrar la droga
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Límite de resultados
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Desplazamiento de resultados
 *     responses:
 *       200:
 *         description: Droga obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   droga:
 *                     type: string
 */
router.get('/drogaDesplegable', checkRoleCuidador, vademecumController.obtenerDrogaParaDesplegable);

/**
 * @swagger
 * /api/vademecum/{id}:
 *   get:
 *     summary: Obtener vademecum por ID
 *     tags: [Vademecum]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del vademecum
 *     responses:
 *       200:
 *         description: Vademecum obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vademecum'
 *       404:
 *         description: Vademecum no encontrado
 */
router.get('/:id', checkRoleCuidador, vademecumController.read);

export default router;