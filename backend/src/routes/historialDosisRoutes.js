import express from 'express'
import historialDosisController from '../controllers/historialDosis.controller.js'

const router = express.Router()

router.get('/', historialDosisController.listarTodo)
router.get('/historial/:id', historialDosisController.historialDosisPersonaID)
router.get('/porFechas/:id', historialDosisController.listarDosisPersonaPorFechas)
router.get('/:id', historialDosisController.read)
router.post('/', historialDosisController.create)
router.put('/:id', historialDosisController.update)
router.delete('/:id', historialDosisController.remove)
router.post('/historialDosis/respuesta', historialDosisController.registrarRespuesta)
export default router
