import express from 'express';
import historialDosisController from '../controllers/historialDosis.controller.js';

const router = express.Router();

router.get('/', historialDosisController.obtenerHistorialDosis);
router.get('/:id', historialDosisController.obtenerHistorialDosisPorId);
router.post('/', historialDosisController.crearHistorialDosis);
router.put('/:id', historialDosisController.actualizarHistorialDosis);
router.delete('/:id', historialDosisController.eliminarHistorialDosis);

export default router;