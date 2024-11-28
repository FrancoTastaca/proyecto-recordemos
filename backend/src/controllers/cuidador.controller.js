import models from '../bd/models/index.Models.js'
import pc from 'picocolors'
import personaController from './persona.controller.js'
import errors from '../utils/errors.js'
import QRCode from 'qrcode'
import crypto from 'crypto'

export default {
  listar: async (req, res, next) => {
    const transaction = await models.sequelize.transaction()
    try {
      const cuidadores = await models.Cuidador.findAll({ transaction })
      await transaction.commit()
      res.json(cuidadores)
    } catch (error) {
      if (!transaction.finished) {
        await transaction.rollback()
      }
      console.log(pc.red('Error al obtener los cuidadores:'), error)
      next({
        ...errors.InternalServerError,
        details: 'Error al obtener los cuidadores'
      })
    }
  },

  crearCuidador: async (req, res, next) => {
    const transaction = await models.sequelize.transaction()
    try {
      const codVinculacion = crypto.randomBytes(4).toString('hex').toUpperCase()
      const nombre = req.body.nombre
      const apellido = req.body.apellido
      const dni = req.body.dni
      const nuevaPersona = await personaController.crearPersona(nombre, apellido, dni, 'C', transaction, codVinculacion, next)
      const nuevoCuidador = await models.Cuidador.create({
        ID: nuevaPersona.ID,
        relacion_paciente: req.body.relacion_paciente || null,
        especialidad: req.body.especialidad || null,
        contacto: req.body.celular || null
      }, { transaction })

      await transaction.commit()

      res.status(201).json({
        success: true,
        message: 'Cuidador creado correctamente',
        data: {
          cuidador: nuevoCuidador,
          datosPersonaCuidador: nuevaPersona
        }
      })
    } catch (err) {
      if (!transaction.finished) {
        await transaction.rollback()
      }
      console.log(pc.red('Error en el proceso de creación del cuidador:'), err)
      next({
        ...errors.InternalServerError,
        details: 'Ocurrió un error al intentar crear el cuidador. Por favor, inténtelo más tarde.'
      })
    }
  },


  update: async (req, res, next) => {
    const transaction = await models.sequelize.transaction()
    try {
      const [updated] = await models.Cuidador.update(req.body, {
        where: { id: req.params.id },
        transaction
      })
      if (updated) {
        const updatedCuidador = await models.Cuidador.findByPk(req.params.id, { transaction })
        await transaction.commit()
        res.json({ mensaje: 'Cuidador actualizado exitosamente', data: updatedCuidador })
      } else {
        await transaction.rollback()
        next({
          ...errors.NotFoundError,
          details: 'Cuidador no encontrado'
        })
      }
    } catch (error) {
      if (!transaction.finished) {
        await transaction.rollback()
      }
      console.log(pc.red('Error al actualizar el cuidador:'), error)
      next({
        ...errors.InternalServerError,
        details: 'Error al actualizar el cuidador'
      })
    }
  },

  remove: async (req, res, next) => {
    const transaction = await models.sequelize.transaction()
    try {
      const result = await models.Cuidador.destroy({
        where: { id: req.params.id },
        transaction
      })
      if (result) {
        await transaction.commit()
        res.status(204).end()
      } else {
        await transaction.rollback()
        next({
          ...errors.NotFoundError,
          details: 'Cuidador no encontrado'
        })
      }
    } catch (error) {
      if (!transaction.finished) {
        await transaction.rollback()
      }
      console.log(pc.red('Error al eliminar el cuidador:'), error)
      next({
        ...errors.InternalServerError,
        details: 'Error al eliminar el cuidador'
      })
    }
  },

  generarQR: async (req, res, next) => {
    const transaction = await models.sequelize.transaction()
    try {
      const usuarioCuidador = res.locals.usuario
      const { codVinculacion } = usuarioCuidador.Persona

      const personaPaciente = await models.Persona.findOne({
        where: { codVinculacion, tipo: 'P' },
        transaction
      })

      if (!personaPaciente) {
        await transaction.rollback()
        return next({
          ...errors.NotFoundError,
          details: 'Paciente no encontrado.'
        })
      }

      const qrCode = await QRCode.toDataURL(codVinculacion)

      await transaction.commit()

      res.status(200).json({
        success: true,
        message: 'Código QR generado correctamente',
        data: {
          qrCode
        }
      })
    } catch (err) {
      if (!transaction.finished) {
        await transaction.rollback()
      }
      console.log(pc.red('Error al generar el código QR:'), err)
      next({
        ...errors.InternalServerError,
        details: 'Ocurrió un error al generar el código QR. Por favor, inténtelo más tarde.'
      })
    }
  },
  getCuidador: async (req, res, next) => {
    try {
      const cuidador = res.locals.usuario.persona
      const cuidadorDetails = await models.Cuidador.findOne({
        where: { ID: cuidador.ID }
      })
      if (!cuidadorDetails) {
        return next({
          ...errors.NotFoundError,
          details: `Cuidador con ${cuidador.ID} no encontrado`
        })
      }
      res.status(200).json({
        nombre: cuidador.nombre,
        apellido: cuidador.apellido,
        dni: cuidador.dni,
        tipo: cuidador.tipo,
        codVinculacion: cuidador.codVinculacion,
        relacion_paciente: cuidadorDetails.relacion_paciente,
        especialidad: cuidadorDetails.especialidad,
        contacto: cuidadorDetails.contacto
      })
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Error al obtener la información del cuidador'
      })
    }
  }
}
