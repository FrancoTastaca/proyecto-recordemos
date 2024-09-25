import express from 'express'
import pastilleroController from '../controllers/pastilleroAlarma.controller.js'
import pastilleroScheme from '../middlewares/schemes/pastillero.scheme.js'
import validate from '../middlewares/validate.js'
import { checkRoleCuidador } from '../middlewares/checkRole.js'

const router = express.Router()

router.get('/', pastilleroController.listar)
router.get('/persona/:id', validate(pastilleroScheme.validateId), pastilleroController.listarPorIdPersona)
router.post('/', validate(pastilleroScheme.save), checkRoleCuidador, pastilleroController.create)
router.put('/:id', validate(pastilleroScheme.validateId, 'params'), validate(pastilleroScheme.save, 'body'), checkRoleCuidador, pastilleroController.update)
router.delete('/:id', validate(pastilleroScheme.validateId), checkRoleCuidador, pastilleroController.remove)
router.get('/cuidador/:id', pastilleroController.obtenerCuidadorDePastillero)
router.get('/:id', validate(pastilleroScheme.validateId), pastilleroController.read)
router.get('/horarioDiario/:id', validate(pastilleroScheme.validateId), pastilleroController.obtenerHorarioDiario)
export default router
