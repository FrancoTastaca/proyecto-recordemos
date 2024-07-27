import express from 'express';
import Pastillero_Medicamento from '../models/pastillero_medicamento.js';
const router = express.Router();

// GET /pastillero_medicamento
router.get('/', async (req, res) => {
  try {
    const pastilleroMedicamentos = await Pastillero_Medicamento.findAll();
    res.json(pastilleroMedicamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /pastillero_medicamento/:id
router.get('/:id', async (req, res) => {
  try {
    const pastilleroMedicamento = await Pastillero_Medicamento.readPastilleroMedicamento(req.params.id);
    if (pastilleroMedicamento) {
      res.json(pastilleroMedicamento);
    } else {
      res.status(404).json({ error: 'Pastillero Medicamento not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /pastillero_medicamento
router.post('/', async (req, res) => {
  try {
    const nuevoPastilleroMedicamento = await Pastillero_Medicamento.createPastilleroMedicamento(req.body);
    res.status(201).json(nuevoPastilleroMedicamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /pastillero_medicamento/:id
router.put('/:id', async (req, res) => {
  try {
    const pastilleroMedicamentoActualizado = await Pastillero_Medicamento.updatePastilleroMedicamento(req.params.id, req.body);
    if (pastilleroMedicamentoActualizado[0] === 1) {
      res.json(await Pastillero_Medicamento.readPastilleroMedicamento(req.params.id));
    } else {
      res.status(404).json({ error: 'Pastillero Medicamento not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /pastillero_medicamento/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Pastillero_Medicamento.deletePastilleroMedicamento(req.params.id);
    if (result === 1) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Pastillero Medicamento not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
