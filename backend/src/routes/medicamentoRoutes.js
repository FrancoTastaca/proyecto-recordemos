import express from 'express'
import medicamentoCuidador from '../controllers/medicamentoCuidador.controller.js'
import medCuidadorScheme from '../middlewares/schemes/medicamentoCuidador.scheme.js'
import validate from '../middlewares/validate.js'
const router = express.Router()

router.get('/', medicamentoCuidador.listar)
router.post('/agregar', validate(medCuidadorScheme.create), medicamentoCuidador.create)
router.get('/cuidador/:id', validate(medCuidadorScheme.validateId), medicamentoCuidador.listarPorIdCuidador)
export default router
