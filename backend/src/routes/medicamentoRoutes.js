import express from 'express'
import medicamentoCuidador from '../controllers/medicamentoCuidador.controller.js'
import medCuidadorScheme from '../middlewares/schemes/medicamentoCuidador.scheme.js'
import { uploadImagenes } from '../middlewares/multerConfig.js'
import validate from '../middlewares/validate.js'
const router = express.Router()

router.get('/', medicamentoCuidador.listar)
router.post('/agregar', uploadImagenes, validate(medCuidadorScheme.base, 'body'), medicamentoCuidador.create)
router.get('/cuidador', medicamentoCuidador.listarPorIdCuidador)
router.put('/modificar/:id', uploadImagenes, validate(medCuidadorScheme.validateId, 'params'), validate(medCuidadorScheme.base, 'body'), medicamentoCuidador.update)
router.delete('/borrar/:id', validate(medCuidadorScheme.validateId, 'params'), medicamentoCuidador.remove)

export default router

