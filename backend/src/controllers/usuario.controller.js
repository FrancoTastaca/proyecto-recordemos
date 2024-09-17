import models from '../bd/models/index.Models.js';
import bcrypt from 'bcryptjs';
import errors from '../utils/errors.js';

export default {
  listar: async (req, res) => {
    try {
      const users = await models.Usuario.findAll();
      res.json({
        success: true,
        data: {
          usuarios: users
        }
      });
    } catch (error) {
      res.status(errors.InternalServerError.code).json({
        success: false,
        message: errors.InternalServerError.message
      });
    }
  },

  readUsuario: async (req, res) => {
    try {
      const usuario = await models.Usuario.findByPk(req.params.id, {
        include: [{ model: models.Persona }]
      });
      if (!usuario) {
        return res.status(errors.UsuarioNoEncontrado.code).json({
          success: false,
          message: errors.UsuarioNoEncontrado.message
        });
      }
      res.json({ success: true, data: usuario });
    } catch (error) {
      res.status(errors.InternalServerError.code).json({
        success: false,
        message: errors.InternalServerError.message
      });
    }
  },

  updateUsuario: async (req, res) => {
    try {
      const data = req.body;
      if (data.password) {
        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt(12));
      }
      const result = await models.Usuario.update(data, {
        where: { ID: req.params.id }
      });
      if (result[0] === 0) {
        return res.status(errors.UsuarioNoEncontrado.code).json({
          success: false,
          message: errors.UsuarioNoEncontrado.message
        });
      }
      res.json({ success: true, message: 'Usuario actualizado correctamente' });
    } catch (error) {
      res.status(errors.InternalServerError.code).json({
        success: false,
        message: errors.InternalServerError.message
      });
    }
  },

  deleteUsuario: async (req, res) => {
    try {
      const result = await models.Usuario.destroy({
        where: { id: req.params.id }
      });
      if (result === 0) {
        return res.status(errors.UsuarioNoEncontrado.code).json({
          success: false,
          message: errors.UsuarioNoEncontrado.message
        });
      }
      res.json({ success: true, message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(errors.InternalServerError.code).json({
        success: false,
        message: errors.InternalServerError.message
      });
    }
  },

  getRole: async (req, res) => {
    try {
        const personaID = res.locals.usuario.persona.ID;
        const persona = await models.Persona.findByPk(personaID, {
            attributes: ['tipo']
        });

        if (!persona) {
            return res.status(404).json({ success: false, message: 'Persona no encontrada' });
        }

        let role;
        switch (persona.tipo) {
            case 'C':
                role = 'Cuidador';
                break;
            case 'P':
                role = 'Paciente';
                break;
            default:
                role = 'Desconocido';
        }

        res.json({ success: true, role });
    } catch (error) {
        res.status(errors.InternalServerError.code).json({
            success: false,
            message: errors.InternalServerError.message
        });
    }
  }
}