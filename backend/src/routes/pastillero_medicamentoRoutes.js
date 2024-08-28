import express from 'express';
import pastilleroMedicamentoController from '../controllers/pastillero_medicamento.controller.js';
import pmScheme from '../middlewares/schemes/pastilleroMedicamento.scheme.js';
import validate from '../middlewares/validate.js';
import { checkRoleCuidador } from '../middlewares/checkRole.js';

const router = express.Router();

router.get('/', pastilleroMedicamentoController.listar);
router.post('/', validate(pmScheme.create), pastilleroMedicamentoController.create);

router.get('/:id', validate(pmScheme.read), checkRoleCuidador, pastilleroMedicamentoController.read);
router.put('/:id', validate(pmScheme.update), checkRoleCuidador, pastilleroMedicamentoController.update);
router.delete('/:id', validate(pmScheme.remove), checkRoleCuidador, pastilleroMedicamentoController.remove);

export default router;