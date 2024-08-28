import models from '../bd/models/index.Models.js';
import errors from '..//utils/errors.js';

export default {
  listar: async (req, res) => {
    try {
      const personas = await models.Persona.findAll();
      res.json({
        success: true,
        data: {
          personas: personas
        }
      });
    } catch (error) {
      res.status(errors.InternalServerError.code).json({
        success: false,
        message: errors.InternalServerError.message
      });
    }
  },

  read: async (req, res) => {
    try {
      const persona = await models.Persona.findByPk(req.params.id);
      if (!persona) {
        return res.status(errors.PersonaNoEncontrada.code).json({
          success: false,
          message: errors.PersonaNoEncontrada.message
        });
      }
      res.json({ success: true, data: persona });
    } catch (error) {
      res.status(errors.InternalServerError.code).json({
        success: false,
        message: errors.InternalServerError.message
      });
    }
  },

  create: async (req, res) => {
    try {
      const data = req.body;
      const persona = await models.Persona.create(data);
      res.json({
        success: true,
        message: 'Persona creada correctamente',
        data: persona
      });
    } catch (error) {
      res.status(errors.InternalServerError.code).json({
        success: false,
        message: errors.InternalServerError.message
      });
    }
  },

  update: async (req, res) => {
    try {
      const data = req.body;
      const result = await models.Persona.update(data, {
        where: { id: req.params.id }
      });
      if (result[0] === 0) {
        return res.status(errors.PersonaNoEncontrada.code).json({
          success: false,
          message: errors.PersonaNoEncontrada.message
        });
      }
      res.json({ success: true, message: 'Persona actualizada correctamente' });
    } catch (error) {
      res.status(errors.InternalServerError.code).json({
        success: false,
        message: errors.InternalServerError.message
      });
    }
  },

  remove: async (req, res) => {
    try {
      const result = await models.Persona.destroy({
        where: { id: req.params.id }
      });
      if (result === 0) {
        return res.status(errors.PersonaNoEncontrada.code).json({
          success: false,
          message: errors.PersonaNoEncontrada.message
        });
      }
      res.json({ success: true, message: 'Persona eliminada correctamente' });
    } catch (error) {
      res.status(errors.InternalServerError.code).json({
        success: false,
        message: errors.InternalServerError.message
      });
    }
  }
}