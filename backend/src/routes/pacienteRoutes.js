import express from 'express';
import pacienteController from '../controllers/paciente.controller.js';

const router = express.Router();

router.get('/', pacienteController.listar);
router.get('/:id', pacienteController.read);
router.post('/', pacienteController.create);
router.put('/:id', pacienteController.update);
router.delete('/:id', pacienteController.remove);

export default router;