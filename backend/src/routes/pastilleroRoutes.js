import express from 'express';
import pastilleroController from '../controllers/pastillero.controller.js';
import pastilleroScheme from '../middlewares/schemes/pastillero.scheme.js';
import validate from '../middlewares/validate.js';
import { checkRoleCuidador } from '../middlewares/checkRole.js';

const router = express.Router();

router.get('/', pastilleroController.obtenerPastilleros);
router.post('/', validate(pastilleroScheme.save), pastilleroController.crearPastillero);

router.get('/:id', validate(pastilleroScheme.read), checkRoleCuidador, pastilleroController.obtenerPastilleroPorId);
router.put('/:id', validate(pastilleroScheme.save), checkRoleCuidador, pastilleroController.actualizarPastillero);
router.delete('/:id', validate(pastilleroScheme.remove), checkRoleCuidador, pastilleroController.eliminarPastillero);

export default router;