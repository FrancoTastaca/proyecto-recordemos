import models from '../bd/models/index.Models.js'
import bcrypt from 'bcryptjs'
import errors from '../utils/errors.js'

export default {
  listar: async (req, res, next) => {
    try {
      const users = await models.Usuario.findAll()
      res.json({
        success: true,
        data: {
          usuarios: users
        }
      })
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Ocurrió un error al listar los usuarios. Por favor, inténtelo más tarde.'
      })
    }
  },

  readUsuario: async (req, res, next) => {
    try {
      const usuario = await models.Usuario.findByPk(req.params.id, {
        include: [{ model: models.Persona }]
      })
      if (!usuario) {
        return next({
          ...errors.UsuarioNoEncontrado,
          details: 'El usuario especificado no fue encontrado.'
        })
      }
      res.json({ success: true, data: usuario })
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Ocurrió un error al obtener el usuario. Por favor, inténtelo más tarde.'
      })
    }
  },

  updateUsuario: async (req, res, next) => {
    try {
      const data = req.body
      if (data.password) {
        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt(12))
      }
      const result = await models.Usuario.update(data, {
        where: { ID: req.params.id }
      })
      if (result[0] === 0) {
        return next({
          ...errors.UsuarioNoEncontrado,
          details: 'El usuario especificado no fue encontrado.'
        })
      }
      res.json({ success: true, message: 'Usuario actualizado correctamente' })
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Ocurrió un error al actualizar el usuario. Por favor, inténtelo más tarde.'
      })
    }
  },

  deleteUsuario: async (req, res, next) => {
    try {
      const result = await models.Usuario.destroy({
        where: { id: req.params.id }
      })
      if (result === 0) {
        return next({
          ...errors.UsuarioNoEncontrado,
          details: 'El usuario especificado no fue encontrado.'
        })
      }
      res.json({ success: true, message: 'Usuario eliminado correctamente' })
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Ocurrió un error al eliminar el usuario. Por favor, inténtelo más tarde.'
      })
    }
  },

  getRole: async (req, res, next) => {
    try {
      const personaID = res.locals.usuario.persona.ID
      const persona = await models.Persona.findByPk(personaID, {
        attributes: ['tipo']
      })

      if (!persona) {
        return next({
          ...errors.UsuarioNoEncontrado,
          details: 'La persona asociada no fue encontrada.'
        })
      }

      let role
      switch (persona.tipo) {
        case 'C':
          role = 'Cuidador'
          break
        case 'P':
          role = 'Paciente'
          break
        default:
          role = 'Desconocido'
      }

      res.json({ success: true, role })
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Ocurrió un error al obtener el rol. Por favor, inténtelo más tarde.'
      })
    }
  },

  getRoleById: async (req, res, next) => {
    try {
      const personaID = req.params.id
      const persona = await models.Persona.findByPk(personaID, {
        attributes: ['tipo']
      })

      if (!persona) {
        return next({
          ...errors.UsuarioNoEncontrado,
          details: 'La persona especificada no fue encontrada.'
        })
      }

      let role
      switch (persona.tipo) {
        case 'C':
          role = 'Cuidador'
          break
        case 'P':
          role = 'Paciente'
          break
        default:
          role = 'Desconocido'
      }

      res.json({ success: true, role })
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Ocurrió un error al obtener el rol por ID. Por favor, inténtelo más tarde.'
      })
    }
  }
}
