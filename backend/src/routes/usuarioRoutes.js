import express from 'express'
import usuarioController from '../controllers/usuario.controller.js'
import usuarioScheme from '../middlewares/schemes/usuario.scheme.js'
import validate from '../middlewares/validate.js'
import { checkRoleCuidador } from '../middlewares/checkRole.js'

const router = express.Router()

router.get('/', usuarioController.listar)
router.post('/updatePushToken', usuarioController.updatePushToken)
router.get('/getRole', usuarioController.getRole)
router.get('/getRole/:id', validate(usuarioScheme.validateId), usuarioController.getRoleById)
router.get('/:id', validate(usuarioScheme.validateId), checkRoleCuidador, usuarioController.readUsuario)
router.put('/:id', validate(usuarioScheme.update), checkRoleCuidador, usuarioController.updateUsuario)
router.delete('/:id', validate(usuarioScheme.validateId), checkRoleCuidador, usuarioController.deleteUsuario)
export default router
