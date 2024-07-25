import express from 'express';
import Cuidador from '../models/Cuidador.js';
const router = express.Router();

// GET /cuidador
router.get('/', async (req, res) => {
  try {
    const cuidadores = await Cuidador.findAll();
    res.json(cuidadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /cuidador/:id
router.get('/:id', async (req, res) => {
  try {
    const cuidador = await Cuidador.readCuidador(req.params.id);
    if (cuidador) {
      res.json(cuidador);
    } else {
      res.status(404).json({ error: 'Cuidador not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /cuidador
router.post('/', async (req, res) => {
  try {
    const nuevoCuidador = await Cuidador.createCuidador(req.body);
    res.status(201).json(nuevoCuidador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /cuidador/:id
router.put('/:id', async (req, res) => {
  try {
    const cuidadorActualizado = await Cuidador.updateCuidador(req.params.id, req.body);
    if (cuidadorActualizado[0] === 1) {
      res.json(await Cuidador.readCuidador(req.params.id));
    } else {
      res.status(404).json({ error: 'Cuidador not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /cuidador/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Cuidador.deleteCuidador(req.params.id);
    if (result === 1) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Cuidador not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
