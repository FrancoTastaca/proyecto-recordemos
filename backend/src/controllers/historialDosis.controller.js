import models from '../bd/models/index.Models.js'
import pc from 'picocolors'
import errors from '../utils/errors.js'
import { Op } from 'sequelize'

export default {
  listarTodo: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /historialDosis:'))
    try {
      const historialDosis = await models.HistorialDosis.findAll()
      res.json(historialDosis)
    } catch (error) {
      console.log(pc.red('Error al obtener el historial de dosis:'), error)
      next({
        ...errors.InternalServerError,
        details: 'Error al obtener el historial de dosis'
      })
    }
  },

  historialDosisPersonaID: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /historialDosis:'))
    const idPersona = req.params.id
    try {
      const pastilleros = await models.Pastillero.findAll({
        where: {
          [Op.or]: [
            { Paciente_ID: idPersona },
            { Cuidador_ID: idPersona }
          ]
        }
      })
      const pastilleroIds = pastilleros.map(p => p.id)
      const historialDosis = await models.HistorialDosis.findAll({
        where: { Pastillero_ID: pastilleroIds },
        order: [['createdAt', 'DESC']]
      })
      res.json(historialDosis)
    } catch (error) {
      console.log(pc.red('Error al obtener el historial de dosis:'), error)
      next({
        ...errors.InternalServerError,
        details: 'Error al obtener el historial de dosis'
      })
    }
  },

  create: async (req, res, next) => {
    console.log(pc.green('Datos recibidos en /historialDosis:'), req.body)
    const transaction = await models.sequelize.transaction()
    try {
      const {
        dosisRegistrada,
        horaPrimerNotificacion = null,
        horaSegundaNotificacion = null,
        primerTomoDosis = null,
        segundoTomoDosis = null,
        Pastillero_ID
      } = req.body

      const nuevoHistorialDosis = await models.HistorialDosis.create({
        fechaRegistrada: Date.now(),
        dosisRegistrada,
        horaPrimerNotificacion,
        horaSegundaNotificacion,
        primerTomoDosis,
        segundoTomoDosis,
        Pastillero_ID
      }, { transaction })

      await transaction.commit()
      res.status(201).json(nuevoHistorialDosis)
    } catch (error) {
      await transaction.rollback()
      console.log(pc.red('Error al crear el historial de dosis:'), error)
      next({
        ...errors.InternalServerError,
        details: 'Error al crear el historial de dosis'
      })
    }
  },

  read: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /historialDosis/:id:'), req.params.id)
    try {
      const historialDosis = await models.HistorialDosis.findByPk(req.params.id)
      if (!historialDosis) {
        console.log(pc.red('Historial de dosis no encontrado'))
        return next({
          ...errors.NotFoundError,
          details: 'Historial de dosis no encontrado'
        })
      }
      res.json(historialDosis)
    } catch (error) {
      console.log(pc.red('Error al obtener el historial de dosis:'), error)
      next({
        ...errors.InternalServerError,
        details: 'Error al obtener el historial de dosis'
      })
    }
  },

  update: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /historialDosis/:id:'), req.params.id, req.body)
    const transaction = await models.sequelize.transaction()
    try {
      const [updated] = await models.HistorialDosis.update(req.body, {
        where: { id: req.params.id },
        transaction
      })
      if (updated) {
        const updatedHistorialDosis = await models.HistorialDosis.findByPk(req.params.id, { transaction })
        await transaction.commit()
        res.json(updatedHistorialDosis)
      } else {
        await transaction.rollback()
        console.log(pc.red('Historial de dosis no encontrado'))
        next({
          ...errors.NotFoundError,
          details: 'Historial de dosis no encontrado'
        })
      }
    } catch (error) {
      await transaction.rollback()
      console.log(pc.red('Error al actualizar el historial de dosis:'), error)
      next({
        ...errors.InternalServerError,
        details: 'Error al actualizar el historial de dosis'
      })
    }
  },

  remove: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /historialDosis/:id:'), req.params.id)
    const transaction = await models.sequelize.transaction()
    try {
      const result = await models.HistorialDosis.destroy({
        where: { id: req.params.id },
        transaction
      })
      if (result) {
        await transaction.commit()
        res.status(204).end()
      } else {
        await transaction.rollback()
        console.log(pc.red('Historial de dosis no encontrado'))
        next({
          ...errors.NotFoundError,
          details: 'Historial de dosis no encontrado'
        })
      }
    } catch (error) {
      await transaction.rollback()
      console.log(pc.red('Error al eliminar el historial de dosis:'), error)
      next({
        ...errors.InternalServerError,
        details: 'Error al eliminar el historial de dosis'
      })
    }
  },

  listarDosisPersonaPorFechas: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /historialDosis/porFechas:'))
    const idPersona = req.params.id
    const { fechaInicio, fechaFin } = req.query
    try {
      const pastilleros = await models.Pastillero.findAll({
        where: {
          [Op.or]: [
            { Paciente_ID: idPersona },
            { Cuidador_ID: idPersona }
          ]
        }
      })
      const pastilleroIds = pastilleros.map(p => p.id)
      const historialDosis = await models.HistorialDosis.findAll({
        where: {
          Pastillero_ID: pastilleroIds,
          createdAt: {
            [Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
          }
        },
        order: [['createdAt', 'DESC']]
      })
      res.json(historialDosis)
    } catch (error) {
      console.log(pc.red('Error al obtener el historial de dosis por fechas:'), error)
      next({
        ...errors.InternalServerError,
        details: 'Error al obtener el historial de dosis por fechas'
      })
    }
  },
  registrarRespuesta: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /historialDosis/respuesta:'), req.body)
    const { historialId, respuesta, tipo } = req.body
    try {
      // Determinar qué campo actualizar basado en el tipo
      let updateData = {}
      if (tipo === 'primer') {
        updateData = respuesta === 'si' ? { primerTomoDosis: true } : { primerTomoDosis: false }
      } else if (tipo === 'segundo') {
        updateData = respuesta === 'si' ? { segundoTomoDosis: true } : { segundoTomoDosis: false }
      } else {
        console.log(pc.red('Tipo de respuesta no válido'))
        return next({ ...errors.ValidationError, details: 'Tipo de respuesta no válido' })
      }

      // Actualizar HistorialDosis con la respuesta del usuario
      await models.HistorialDosis.update(
        updateData,
        { where: { ID: historialId } }
      )

      res.status(200).json({ message: 'Respuesta registrada correctamente' })
    } catch (error) {
      console.error('Error al registrar la respuesta del usuario:', error)
      next({
        ...errors.InternalServerError,
        details: 'Error al registrar la respuesta del usuario'
      })
    }
  }
}
