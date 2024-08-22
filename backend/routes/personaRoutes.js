import express from 'express'
import Persona from '../models/persona.js'
const router = express.Router()

// GET /persona
router.get('/', async (req, res) => {
  try {
    const personas = await Persona.findAll()
    res.json(personas)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /persona/:id
router.get('/:id', async (req, res) => {
  try {
    const persona = await Persona.readPersona(req.params.id)
    if (persona) {
      res.json(persona)
    } else {
      res.status(404).json({ error: 'Persona not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /persona
router.post('/', async (req, res) => {
  try {
    const nuevaPersona = await Persona.createPersona(req.body)
    res.status(201).json(nuevaPersona)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PUT /persona/:id
router.put('/:id', async (req, res) => {
  try {
    const personaActualizada = await Persona.updatePersona(req.params.id, req.body)
    if (personaActualizada[0] === 1) {
      res.json(await Persona.readPersona(req.params.id))
    } else {
      res.status(404).json({ error: 'Persona not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE /persona/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Persona.deletePersona(req.params.id)
    if (result === 1) {
      res.status(204).end()
    } else {
      res.status(404).json({ error: 'Persona not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
