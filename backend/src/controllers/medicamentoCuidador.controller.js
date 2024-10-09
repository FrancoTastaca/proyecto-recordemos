import models from '../bd/models/index.Models.js'
import errors from '../utils/errors.js'
import { handleTransaction } from '../utils/transactionHelper.js'
import { handleFileCreateOrUpdate } from './updateFile.controller.js'

export default {
  create: (req, res, next) => {
    req.params.type = 'medicamento' // Definimos el tipo 'medicamento'
    return handleFileCreateOrUpdate(req, res, next)
  },

  listar: async (req, res, next) => {
    try {
      const medicamentos = await models.MedicamentoCuidador.findAll({
        attributes: ['ID', 'notas', 'marca', 'medicamento_imagen', 'Vademecum_ID', 'Cuidador_ID']
      })

      res.status(200).json(medicamentos)
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Ocurrió un error al intentar listar los medicamentos. Por favor, inténtelo más tarde.'
      })
    }
  },

  listarPorIdCuidador: async (req, res, next) => {
    try {
      const medicamentos = await models.MedicamentoCuidador.findAll({
        where: { Cuidador_ID: res.locals.usuario.persona.ID },
        attributes: ['ID', 'notas', 'marca', 'medicamento_imagen', 'Vademecum_ID', 'Cuidador_ID']
      })

      res.status(200).json(medicamentos)
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Error al intentar listar los medicamentos del cuidador - ' + error.message
      })
    }
  },

  update: (req, res, next) => {
    req.params.type = 'medicamento'
    return handleFileCreateOrUpdate(req, res, next)
  },

  remove: async (req, res, next) => {
    try {
      const { id } = req.params

      // Verificar que el medicamento existe y pertenece al cuidador logueado
      const medicamento = await models.MedicamentoCuidador.findOne({
        where: {
          ID: id,
          Cuidador_ID: res.locals.usuario.persona.ID
        }
      })
      if (!medicamento) {
        return next({
          ...errors.NotFoundError,
          details: `El medicamento con ID ${id} no existe en la base de datos o no pertenece al cuidador logueado.`
        })
      }

      // Eliminar el medicamento dentro de una transacción
      await handleTransaction(async (transaction) => {
        await medicamento.destroy({ transaction })
      }, next)

      res.status(200).json({ message: 'Medicamento eliminado exitosamente.' })
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Error al intentar eliminar el medicamento - ' + error.message
      })
    }
  }
}
