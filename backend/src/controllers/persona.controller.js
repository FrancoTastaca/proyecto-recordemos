import models from '../bd/models/index.Models.js'
import pc from 'picocolors'
import errors from '../utils/errors.js'

export default {
  listar: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /persona:'))
    try {
      const personas = await models.Persona.findAll()
      res.json(personas)
    } catch (error) {
      console.log(pc.red('Error al obtener las personas:'), error)
      next({
        ...errors.InternalServerError,
        details: 'Error al obtener las personas'
      })
    }
  },

  read: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /persona/:id:'), req.params.id)
    try {
      const persona = await models.Persona.findByPk(req.params.id)
      if (!persona) {
        console.log(pc.red('Persona no encontrada'))
        return next({
          ...errors.NotFoundError,
          details: 'Persona no encontrada'
        })
      }
      res.json(persona)
    } catch (error) {
      console.log(pc.red('Error al obtener la persona:'), error)
      next({
        ...errors.InternalServerError,
        details: 'Error al obtener la persona'
      })
    }
  },

  crearPersona: async (nombre, apellido, dni, tipo, transaction, codVinculacion, next) => {
    try {
      const nuevaPersona = await models.Persona.create({
        nombre,
        apellido,
        dni,
        tipo,
        codVinculacion
      }, { transaction })

      return nuevaPersona
    } catch (error) {
      console.log(pc.red('Error al crear la persona:'), error)
      next({ ...errors.InternalServerError, details: `Error al crear la persona: ${error}` })
    }
  },

  update: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /persona/:id:'), req.params.id, req.body)
    const transaction = await models.sequelize.transaction()
    try {
      const [updated] = await models.Persona.update(req.body, {
        where: { ID: req.params.id },
        transaction
      })
      if (updated) {
        const updatedPersona = await models.Persona.findByPk(req.params.id, { transaction })
        await transaction.commit()
        res.json({ mensaje: 'Persona actualizada exitosamente', data: updatedPersona })
      } else {
        await transaction.rollback()
        console.log(pc.red('Persona no encontrada'))
        next({
          ...errors.NotFoundError,
          details: 'Persona no encontrada'
        })
      }
    } catch (error) {
      await transaction.rollback()
      console.log(pc.red('Error al actualizar la persona:'), error)
      next({
        ...errors.InternalServerError,
        details: 'Error al actualizar la persona'
      })
    }
  },

  remove: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /persona/:id:'), req.params.id)
    const transaction = await models.sequelize.transaction()
    try {
      const result = await models.Persona.destroy({
        where: { ID: req.params.id },
        transaction
      })
      if (result) {
        await transaction.commit()
        res.status(204).end()
      } else {
        await transaction.rollback()
        console.log(pc.red('Persona no encontrada'))
        next({
          ...errors.NotFoundError,
          details: 'Persona no encontrada'
        })
      }
    } catch (error) {
      await transaction.rollback()
      console.log(pc.red('Error al eliminar la persona:'), error)
      next({
        ...errors.InternalServerError,
        details: 'Error al eliminar la persona'
      })
    }
  }
}

