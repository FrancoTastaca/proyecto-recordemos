import express from 'express'
import HistorialDosis from '../models/historialDosis.js'
const router = express.Router()

// GET /historialdosis
router.get('/', async (req, res) => {
  try {
    const historialDosis = await HistorialDosis.findAll()
    res.json(historialDosis)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /historialdosis/:id
router.get('/:id', async (req, res) => {
  try {
    const historialDosis = await HistorialDosis.readHistorialDosis(req.params.id)
    if (historialDosis) {
      res.json(historialDosis)
    } else {
      res.status(404).json({ error: 'Historial Dosis not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /historialdosis
router.post('/', async (req, res) => {
  try {
    const nuevoHistorialDosis = await HistorialDosis.createHistorialDosis(req.body)
    res.status(201).json(nuevoHistorialDosis)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PUT /historialdosis/:id
router.put('/:id', async (req, res) => {
  try {
    const historialDosisActualizado = await HistorialDosis.updateHistorialDosis(req.params.id, req.body)
    if (historialDosisActualizado[0] === 1) {
      res.json(await HistorialDosis.readHistorialDosis(req.params.id))
    } else {
      res.status(404).json({ error: 'Historial Dosis not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE /historialdosis/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await HistorialDosis.deleteHistorialDosis(req.params.id)
    if (result === 1) {
      res.status(204).end()
    } else {
      res.status(404).json({ error: 'Historial Dosis not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
