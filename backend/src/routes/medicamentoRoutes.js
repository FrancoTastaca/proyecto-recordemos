import express from 'express'
import medicamentoCuidador from '../controllers/medicamentoCuidador.controller.js'
import medCuidadorScheme from '../middlewares/schemes/medicamentoCuidador.scheme.js'
import validate from '../middlewares/validate.js'
const router = express.Router()

router.get('/', medicamentoCuidador.listar)
router.post('/agregar', validate(medCuidadorScheme.base), medicamentoCuidador.create)
router.get('/cuidador', medicamentoCuidador.listarPorIdCuidador)
router.put('/:id', validate(medCuidadorScheme.validateId, 'params'), validate(medCuidadorScheme.base, 'body'), medicamentoCuidador.update)
router.delete('/:id', validate(medCuidadorScheme.validateId), medicamentoCuidador.remove)

export default router
