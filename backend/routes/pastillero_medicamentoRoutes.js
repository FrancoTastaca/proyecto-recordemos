import express from 'express'
import PastilleroMedicamento from '../models/pastillero_medicamento.js'
const router = express.Router()

// GET /pastilleromedicamento
router.get('/', async (req, res) => {
  try {
    const pastilleroMedicamentos = await PastilleroMedicamento.findAll()
    res.json(pastilleroMedicamentos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /pastilleromedicamento/:id
router.get('/:id', async (req, res) => {
  try {
    const pastilleroMedicamento = await PastilleroMedicamento.readPastilleroMedicamento(req.params.id)
    if (pastilleroMedicamento) {
      res.json(pastilleroMedicamento)
    } else {
      res.status(404).json({ error: 'Pastillero Medicamento not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /pastilleromedicamento
router.post('/', async (req, res) => {
  try {
    const nuevoPastilleroMedicamento = await PastilleroMedicamento.createPastilleroMedicamento(req.body)
    res.status(201).json(nuevoPastilleroMedicamento)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PUT /pastilleromedicamento/:id
router.put('/:id', async (req, res) => {
  try {
    const pastilleroMedicamentoActualizado = await PastilleroMedicamento.updatePastilleroMedicamento(req.params.id, req.body)
    if (pastilleroMedicamentoActualizado[0] === 1) {
      res.json(await PastilleroMedicamento.readPastilleroMedicamento(req.params.id))
    } else {
      res.status(404).json({ error: 'Pastillero Medicamento not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE /pastilleromedicamento/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await PastilleroMedicamento.deletePastilleroMedicamento(req.params.id)
    if (result === 1) {
      res.status(204).end()
    } else {
      res.status(404).json({ error: 'Pastillero Medicamento not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
