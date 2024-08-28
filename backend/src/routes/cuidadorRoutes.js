import express from 'express';
import cuidadorController from '../controllers/cuidador.controller.js';

const router = express.Router();

router.get('/', cuidadorController.listar);
router.get('/:id', cuidadorController.read);
router.post('/', cuidadorController.create);
router.put('/:id', cuidadorController.update);
router.delete('/:id', cuidadorController.remove);

export default router;