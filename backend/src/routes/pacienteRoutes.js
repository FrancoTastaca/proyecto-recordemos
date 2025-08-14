import express from 'express'
import pacienteController from '../controllers/paciente.controller.js'
import validate from '../middlewares/validate.js'
import pacienteScheme from '../middlewares/schemes/paciente.scheme.js'
import { checkRolePaciente } from '../middlewares/checkRole.js'
const router = express.Router()

router.get('/listarPacientes', pacienteController.listar)
router.get('/:id', validate(pacienteScheme.read), pacienteController.read)
router.post('/crear', validate(pacienteScheme.crearPaciente, 'body'), pacienteController.crearPaciente)
router.put('/:id', validate(pacienteScheme.update), pacienteController.update)
router.delete('/:id', validate(pacienteScheme.remove), pacienteController.remove)
router.get('/', checkRolePaciente, pacienteController.getPaciente)
export default router

