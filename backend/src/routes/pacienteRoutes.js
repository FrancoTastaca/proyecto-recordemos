import express from 'express';
import pacienteController from '../controllers/paciente.controller.js';
import validate from '../middlewares/validate.js';
import pacienteScheme from '../middlewares/schemes/paciente.scheme.js';
const router = express.Router();

router.get('/', pacienteController.listar);
router.get('/:id', validate(pacienteScheme.read), pacienteController.read);
router.post('/crear', validate(pacienteScheme.crearPaciente), pacienteController.crearPaciente);
router.put('/:id', validate(pacienteScheme.update), pacienteController.update);
router.delete('/:id', validate(pacienteScheme.remove), pacienteController.remove);

export default router;