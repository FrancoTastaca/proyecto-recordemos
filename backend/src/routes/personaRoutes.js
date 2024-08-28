import express from 'express';
import personaController from '../controllers/persona.controller.js';
import personaScheme from '../middlewares/schemes/persona.scheme.js';
import validate from '../middlewares/validate.js';
import { checkRoleCuidador } from '../middlewares/checkRole.js';

const router = express.Router()

router.get('/', personaController.listar);
router.post('/', validate(personaScheme.save), personaController.create);

router.get('/:id', validate(personaScheme.read), checkRoleCuidador, personaController.read);
router.put('/:id', validate(personaScheme.save), checkRoleCuidador, personaController.update);
router.delete('/:id', validate(personaScheme.remove),checkRoleCuidador, personaController.remove);

export default router;