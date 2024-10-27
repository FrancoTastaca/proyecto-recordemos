import express from 'express'
import pastilleroController from '../controllers/pastilleroAlarma.controller.js'
import pastilleroScheme from '../middlewares/schemes/pastillero.scheme.js'
import validate from '../middlewares/validate.js'
import { checkRoleCuidador } from '../middlewares/checkRole.js'
import { uploadImagenes } from '../middlewares/multerConfig.js'
const router = express.Router()

router.get('/', pastilleroController.listar)
router.get('/paciente/:id', validate(pastilleroScheme.validateId), pastilleroController.listarPastilleroPaciente)
router.get('/cuidador/:id', pastilleroController.listarPorIdCuidador)
router.post('/', uploadImagenes, validate(pastilleroScheme.save, 'body'), checkRoleCuidador, pastilleroController.create)
router.put('/:id', uploadImagenes, validate(pastilleroScheme.validateId, 'params'), validate(pastilleroScheme.save, 'body'), checkRoleCuidador, pastilleroController.update)
router.delete('/:id', validate(pastilleroScheme.validateId), checkRoleCuidador, pastilleroController.remove)
router.get('/:id', validate(pastilleroScheme.validateId), pastilleroController.read)
router.get('/horarioDiario/:id', validate(pastilleroScheme.validateId), pastilleroController.obtenerHorarioDiario)
export default router
