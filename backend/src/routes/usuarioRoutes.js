import express from 'express';
import usuarioController from '../controllers/usuario.controller.js';
import usuarioScheme from '../middlewares/schemes/usuario.scheme.js'
import validate from '../middlewares/validate.js';
import { checkRoleCuidador } from '../middlewares/checkRole.js';

const router = express.Router()

router.get('/', usuarioController.listar);
router.get('/getRole', usuarioController.getRole);
// Rutas CRUD de usuario por ID
router.get('/:id', validate(usuarioScheme.read), checkRoleCuidador, usuarioController.readUsuario);
router.put('/:id', validate(usuarioScheme.update), checkRoleCuidador, usuarioController.updateUsuario);
router.delete('/:id', validate(usuarioScheme.remove), checkRoleCuidador, usuarioController.deleteUsuario);
export default router;