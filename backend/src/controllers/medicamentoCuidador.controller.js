import models from '../bd/models/index.Models.js'
import errors from '../utils/errors.js'
import { handleTransaction } from '../utils/transactionHelper.js'

export default {
  create: async (req, res, next) => {
    try {
      const { idVademecum, notas, marca, medicamentoImagen, idCuidador } = req.body

      // Verificar que el idCuidador existe
      const cuidador = await models.Cuidador.findByPk(idCuidador)
      if (!cuidador) {
        return next({
          ...errors.UsuarioNoEncontrado,
          details: `El cuidador especificado con ID ${idCuidador} no existe en la base de datos.`
        })
      }

      // Verificar que el idVademecum existe
      const vademecum = await models.Vademecum.findByPk(idVademecum)
      if (!vademecum) {
        return next({
          ...errors.NotFoundError,
          details: `El vademécum especificado con ID ${idVademecum} no existe en la base de datos.`
        })
      }

      // Verificar si el medicamento ya existe
      const medicamentoExistente = await models.MedicamentoCuidador.findOne({
        where: {
          Vademecum_ID: idVademecum,
          marca,
          Cuidador_ID: idCuidador
        }
      })

      if (medicamentoExistente) {
        return next({
          ...errors.ConflictError,
          details: `El medicamento que intenta agregar ya se encuentra en la bd, con un ID ${medicamentoExistente.id}`
        })
      }

      // Crear el nuevo medicamento dentro de una transacción
      const nuevoMedicamento = await handleTransaction(async (transaction) => {
        return await models.MedicamentoCuidador.create({
          Vademecum_ID: idVademecum,
          notas,
          marca,
          medicamento_imagen: medicamentoImagen,
          Cuidador_ID: idCuidador
        }, { transaction })
      }, next)

      res.status(201).json(nuevoMedicamento)
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Error al intentar agregar el medicamento al servidor - ' + error.message
      })
    }
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

  update: async (req, res, next) => {
    try {
      const { id } = req.params
      const { idVademecum, notas, marca, medicamentoImagen, idCuidador } = req.body

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

      // Actualizar el medicamento dentro de una transacción
      const medicamentoActualizado = await handleTransaction(async (transaction) => {
        medicamento.Vademecum_ID = idVademecum
        medicamento.notas = notas
        medicamento.marca = marca
        medicamento.medicamento_imagen = medicamentoImagen
        medicamento.Cuidador_ID = idCuidador

        await medicamento.save({ transaction })
        return medicamento
      }, next)

      res.status(200).json(medicamentoActualizado)
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Error al intentar actualizar el medicamento - ' + error.message
      })
    }
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
