import models from '../bd/models/index.Models.js'
import errors from '../utils/errors.js'
import { handleTransaction } from '../utils/transactionHelper.js'
import { handleFileCreateOrUpdate } from './updateFile.controller.js'

export default {
  create: (req, res, next) => {
    req.params.type = 'pastillero' // Definimos el tipo 'pastillero'
    return handleFileCreateOrUpdate(req, res, next)
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
  listarPorIdlogin: async (req, res, next) => {
    try {
      const { type } = req.params
      const id = res.locals.usuario.Persona.ID
      let pastilleros
      if (type === 'cuidador') {
        pastilleros = await models.PastilleroAlarma.findAll({
          include: {
            model: models.MedicamentoCuidador,
            where: { Cuidador_ID: id },
            include: [{
              model: models.Vademecum,
              attributes: ['principio_activo', 'presentacion']
            }],
            attributes: ['Cuidador_ID', 'medicamento_imagen', 'marca']
          }
        })
      } else if (type === 'paciente') {
        pastilleros = await models.PastilleroAlarma.findAll({
          where: { Paciente_ID: id },
          include: {
            model: models.MedicamentoCuidador,
            include: [{
              model: models.Vademecum,
              attributes: ['principio_activo', 'presentacion']
            }],
            attributes: ['Cuidador_ID', 'medicamento_imagen', 'marca']
          }
        })
      } else {
        return next({
          ...errors.BadRequest,
          details: 'Tipo de consulta no válido. Debe ser "cuidador" o "paciente".'
        })
      }
      res.status(200).json(
        pastilleros.map(pastillero => ({
          ID: pastillero.ID,
          Medicamento_ID: pastillero.MedicamentoCuidador_ID,
          Cuidador_ID: pastillero.MedicamentoCuidador.Cuidador_ID,
          horario_diario: pastillero.horario_diario,
          dosis: pastillero.dosis,
          color_pastillero: pastillero.color_pastillero,
          pastillero_imagen: pastillero.imagen_url,
          medicamento_imagen: pastillero.MedicamentoCuidador.medicamento_imagen,
          medicamentoNombre: pastillero.MedicamentoCuidador.Vademecum
            ? `${pastillero.MedicamentoCuidador.Vademecum.principio_activo} - ${pastillero.MedicamentoCuidador.marca}`
            : pastillero.MedicamentoCuidador.marca,
          marca: pastillero.MedicamentoCuidador.marca,
          principio_activo: pastillero.MedicamentoCuidador.Vademecum.principio_activo
        }))
      )
    } catch (error) {
      console.log('Error al intentar listar los pastilleros:', error)
      next({
        ...errors.InternalServerError,
        details: 'Error al intentar listar los pastilleros - ' + error
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

  update: (req, res, next) => {
    req.params.type = 'pastillero' // Definimos el tipo 'pastillero'
    return handleFileCreateOrUpdate(req, res, next)
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
          include: {
            model: models.Cuidador
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

