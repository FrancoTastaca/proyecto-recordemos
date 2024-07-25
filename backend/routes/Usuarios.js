import express from 'express';
import Usuario from '../models/Usuario.js';
const router = express.Router();

// GET /usuario
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /usuario/:id
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.readUsuario(req.params.id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /usuario
router.post('/', async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.createUsuario(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /usuario/:id
router.put('/:id', async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.updateUsuario(req.params.id, req.body);
    if (usuarioActualizado[0] === 1) {
      res.json(await Usuario.readUsuario(req.params.id));
    } else {
      res.status(404).json({ error: 'Usuario not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /usuario/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Usuario.deleteUsuario(req.params.id);
    if (result === 1) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Usuario not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
