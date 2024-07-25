import express from 'express';
import Paciente from '../models/Paciente.js';
const router = express.Router();

// GET /paciente
router.get('/', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /paciente/:id
router.get('/:id', async (req, res) => {
  try {
    const paciente = await Paciente.readPaciente(req.params.id);
    if (paciente) {
      res.json(paciente);
    } else {
      res.status(404).json({ error: 'Paciente not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /paciente
router.post('/', async (req, res) => {
  try {
    const nuevoPaciente = await Paciente.createPaciente(req.body);
    res.status(201).json(nuevoPaciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /paciente/:id
router.put('/:id', async (req, res) => {
  try {
    const pacienteActualizado = await Paciente.updatePaciente(req.params.id, req.body);
    if (pacienteActualizado[0] === 1) {
      res.json(await Paciente.readPaciente(req.params.id));
    } else {
      res.status(404).json({ error: 'Paciente not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /paciente/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Paciente.deletePaciente(req.params.id);
    if (result === 1) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Paciente not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
