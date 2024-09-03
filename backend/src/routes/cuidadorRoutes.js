import express from 'express';
import cuidadorController from '../controllers/cuidador.controller.js';
import {checkRoleCuidador}  from '../middlewares/checkRole.js';

const router = express.Router();

router.get('/', cuidadorController.listar);
router.post('/crear', cuidadorController.crearCuidador);
router.put('/:id', checkRoleCuidador, cuidadorController.update);
router.delete('/:id', cuidadorController.remove);
router.post('/generarQR', checkRoleCuidador, cuidadorController.generarQR);

export default router;