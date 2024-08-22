import express from 'express'
import Medicamento from '../models/medicamento.js'
const router = express.Router()

// GET /medicamento
router.get('/', async (req, res) => {
  try {
    const medicamentos = await Medicamento.getAllMedicamentos()
    res.json(medicamentos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /medicamento/:id
router.get('/:id', async (req, res) => {
  try {
    const medicamento = await Medicamento.findByPk(req.params.id)
    if (medicamento) {
      res.json(medicamento)
    } else {
      res.status(404).json({ error: 'Medicamento not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /medicamento
router.post('/', async (req, res) => {
  try {
    const nuevoMedicamento = await Medicamento.createMedicamento(req.body)
    res.status(201).json(nuevoMedicamento)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PUT /medicamento/:id
router.put('/:id', async (req, res) => {
  try {
    const medicamentoActualizado = await Medicamento.update(req.params.id, req.body)
    if (medicamentoActualizado[0] === 1) {
      res.json(await Medicamento.findByPk(req.params.id))
    } else {
      res.status(404).json({ error: 'Medicamento not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE /medicamento/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Medicamento.destroy({
      where: { ID: req.params.id }
    })
    if (result === 1) {
      res.status(204).end()
    } else {
      res.status(404).json({ error: 'Medicamento not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
