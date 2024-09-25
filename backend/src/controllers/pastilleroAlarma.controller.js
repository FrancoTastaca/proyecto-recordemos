import models from '../bd/models/index.Models.js'
import errors from '../utils/errors.js'
import { handleTransaction } from '../utils/transactionHelper.js'
import pc from 'picocolors'

export default {
  create: async (req, res, next) => {
    console.log(pc.green('Datos recibidos en /pastillero:'), req.body)
    const { imagenURL, PacienteID, MedCuidadorID, colorPastillero, horarioDiario, dosis } = req.body

    try {
      // Verificar que el PacienteID existe
      const paciente = await models.Paciente.findByPk(PacienteID)
      if (!paciente) {
        return next({
          ...errors.NotFoundError,
          details: `El paciente especificado con ID ${PacienteID} no existe en la base de datos.`
        })
      }

      // Verificar que el MedCuidadorID existe
      const medicamentoCuidador = await models.MedicamentoCuidador.findByPk(MedCuidadorID)
      if (!medicamentoCuidador) {
        return next({
          ...errors.NotFoundError,
          details: `El medicamento cuidador especificado con ID ${MedCuidadorID} no existe en la base de datos.`
        })
      }

      // Crear el nuevo pastillero dentro de una transacción
      const nuevoPastillero = await handleTransaction(async (transaction) => {
        return await models.PastilleroAlarma.create({
          imagen_url: imagenURL,
          Paciente_ID: PacienteID,
          MedicamentoCuidador_ID: MedCuidadorID,
          color_pastillero: colorPastillero,
          horario_diario: horarioDiario,
          dosis
        }, { transaction })
      }, next)

      console.log(pc.green('Pastillero creado exitosamente:', nuevoPastillero))
      res.status(201).json(nuevoPastillero)
    } catch (error) {
      console.log(pc.red('Error al crear el pastillero:'), error)
      next({
        ...errors.InternalServerError,
        details: 'Error al crear el pastillero',
        originalError: error
      })
    }
  },

  listar: async (req, res, next) => {
    try {
      const pastilleros = await models.PastilleroAlarma.findAll()
      res.status(200).json(pastilleros)
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Ocurrió un error al intentar listar los pastilleros. Por favor, inténtelo más tarde.'
      })
    }
  },

  listarPorIdPersona: async (req, res, next) => {
    try {
      const { id } = req.params
      const pastilleros = await models.PastilleroAlarma.findAll({
        where: { Paciente_ID: id }
      })
      res.status(200).json(pastilleros)
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Error al intentar listar los pastilleros del paciente - ' + error.message
      })
    }
  },

  read: async (req, res, next) => {
    const { id } = req.params

    try {
      const pastillero = await models.PastilleroAlarma.findByPk(id)
      if (!pastillero) {
        return next({
          ...errors.NotFoundError,
          details: `El pastillero con ID ${id} no existe en la base de datos.`
        })
      }

      res.status(200).json(pastillero)
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Error al intentar leer el pastillero - ' + error.message
      })
    }
  },

  update: async (req, res, next) => {
    const { id } = req.params
    const { imagenURL, PacienteID, MedCuidadorID, colorPastillero, horarioDiario, dosis } = req.body

    try {
      // Verificar que el pastillero existe
      const pastillero = await models.PastilleroAlarma.findByPk(id)
      if (!pastillero) {
        return next({
          ...errors.NotFoundError,
          details: `El pastillero con ID ${id} no existe en la base de datos.`
        })
      }

      // Verificar que el PacienteID existe
      const paciente = await models.Paciente.findByPk(PacienteID)
      if (!paciente) {
        return next({
          ...errors.NotFoundError,
          details: `El paciente especificado con ID ${PacienteID} no existe en la base de datos.`
        })
      }

      // Verificar que el MedCuidadorID existe
      const medicamentoCuidador = await models.MedicamentoCuidador.findByPk(MedCuidadorID)
      if (!medicamentoCuidador) {
        return next({
          ...errors.NotFoundError,
          details: `El medicamento cuidador especificado con ID ${MedCuidadorID} no existe en la base de datos.`
        })
      }

      // Actualizar el pastillero dentro de una transacción
      const pastilleroActualizado = await handleTransaction(async (transaction) => {
        pastillero.imagen_url = imagenURL
        pastillero.Paciente_ID = PacienteID
        pastillero.MedicamentoCuidador_ID = MedCuidadorID
        pastillero.color_pastillero = colorPastillero
        pastillero.horario_diario = horarioDiario
        pastillero.dosis = dosis

        await pastillero.save({ transaction })
        return pastillero
      }, next)

      res.status(200).json(pastilleroActualizado)
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Error al intentar actualizar el pastillero - ' + error.message
      })
    }
  },

  remove: async (req, res, next) => {
    const { id } = req.params

    try {
      // Verificar que el pastillero existe
      const pastillero = await models.PastilleroAlarma.findByPk(id)
      if (!pastillero) {
        return next({
          ...errors.NotFoundError,
          details: `El pastillero con ID ${id} no existe en la base de datos.`
        })
      }

      // Eliminar el pastillero dentro de una transacción
      await handleTransaction(async (transaction) => {
        await pastillero.destroy({ transaction })
      }, next)

      res.status(200).json({ message: 'Pastillero eliminado exitosamente.' })
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Error al intentar eliminar el pastillero - ' + error.message
      })
    }
  },

  obtenerCuidadorDePastillero: async (req, res, next) => {
    const { id } = req.params

    try {
      const pastillero = await models.PastilleroAlarma.findByPk(id, {
        include: {
          model: models.MedicamentoCuidador,
          as: 'medicamento',
          include: {
            model: models.Cuidador,
            as: 'cuidador'
          }
        }
      })

      if (!pastillero) {
        return next({
          ...errors.NotFoundError,
          details: `El pastillero con ID ${id} no existe en la base de datos.`
        })
      }

      res.status(200).json(pastillero.medicamento.cuidador)
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Error al intentar obtener el cuidador del pastillero - ' + error.message
      })
    }
  },

  obtenerHorarioDiario: async (req, res, next) => {
    const { id } = req.params

    try {
      const pastillero = await models.PastilleroAlarma.findByPk(id)
      if (!pastillero) {
        return next({
          ...errors.NotFoundError,
          details: `El pastillero con ID ${id} no existe en la base de datos.`
        })
      }

      res.status(200).json({
        horario_diario: pastillero.horario_diario
      })
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Error al intentar obtener el horario diario del pastillero - ' + error.message
      })
    }
  },

  obtenerHorarioDiarioDosisPaciente: async (req, res, next) => {
    const { id } = req.params

    try {
      const pastillero = await models.PastilleroAlarma.findByPk(id, {
        include: {
          model: models.Paciente,
          as: 'paciente' // Especificar el alias
        }
      })

      if (!pastillero) {
        return next({
          ...errors.NotFoundError,
          details: `El pastillero con ID ${id} no existe en la base de datos.`
        })
      }

      res.status(200).json({
        horario_diario: pastillero.horario_diario,
        dosis: pastillero.dosis,
        paciente: pastillero.paciente
      })
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Error al intentar obtener el horario diario, dosis y paciente del pastillero - ' + error.message
      })
    }
  }
}
