import express from 'express';
import Pastillero from '../models/Pastillero.js';
const router = express.Router();

// GET /pastillero
router.get('/', async (req, res) => {
  try {
    const pastilleros = await Pastillero.findAll();
    res.json(pastilleros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /pastillero/:id
router.get('/:id', async (req, res) => {
  try {
    const pastillero = await Pastillero.readPastillero(req.params.id);
    if (pastillero) {
      res.json(pastillero);
    } else {
      res.status(404).json({ error: 'Pastillero not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /pastillero
router.post('/', async (req, res) => {
  try {
    const nuevoPastillero = await Pastillero.createPastillero(req.body);
    res.status(201).json(nuevoPastillero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /pastillero/:id
router.put('/:id', async (req, res) => {
  try {
    const pastilleroActualizado = await Pastillero.updatePastillero(req.params.id, req.body);
    if (pastilleroActualizado[0] === 1) {
      res.json(await Pastillero.readPastillero(req.params.id));
    } else {
      res.status(404).json({ error: 'Pastillero not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /pastillero/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Pastillero.deletePastillero(req.params.id);
    if (result === 1) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Pastillero not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
