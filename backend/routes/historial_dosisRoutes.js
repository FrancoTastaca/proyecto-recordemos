import express from 'express';
import Historial_Dosis from '../models/historial_dosis.js';
const router = express.Router();

// GET /historial_dosis
router.get('/', async (req, res) => {
  try {
    const historialDosis = await Historial_Dosis.findAll();
    res.json(historialDosis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /historial_dosis/:id
router.get('/:id', async (req, res) => {
  try {
    const historialDosis = await Historial_Dosis.readHistorialDosis(req.params.id);
    if (historialDosis) {
      res.json(historialDosis);
    } else {
      res.status(404).json({ error: 'Historial Dosis not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /historial_dosis
router.post('/', async (req, res) => {
  try {
    const nuevoHistorialDosis = await Historial_Dosis.createHistorialDosis(req.body);
    res.status(201).json(nuevoHistorialDosis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /historial_dosis/:id
router.put('/:id', async (req, res) => {
  try {
    const historialDosisActualizado = await Historial_Dosis.updateHistorialDosis(req.params.id, req.body);
    if (historialDosisActualizado[0] === 1) {
      res.json(await Historial_Dosis.readHistorialDosis(req.params.id));
    } else {
      res.status(404).json({ error: 'Historial Dosis not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /historial_dosis/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Historial_Dosis.deleteHistorialDosis(req.params.id);
    if (result === 1) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Historial Dosis not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
