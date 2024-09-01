import models from '../bd/models/index.Models.js';
import pc from 'picocolors';
import errors from '../utils/errors.js';
import crypto from 'crypto';

export default {
  listar: async (req, res, next) => {
    try {
      const personas = await models.Persona.findAll();
      res.json(personas);
    } catch (error) {
      console.log(pc.red('Error al obtener las personas:'), error);
      return next(errors.InternalServerError('Error al obtener las personas'));
    }
  },

  read: async (req, res, next) => {
    try {
      const persona = await models.Persona.findByPk(req.params.id);
      if (!persona) {
        return next(errors.NotFound('Persona no encontrada'));
      }
      res.json(persona);
    } catch (error) {
      console.log(pc.red('Error al obtener la persona:'), error);
      return next(errors.InternalServerError('Error al obtener la persona'));
    }
  },

  crearPersona: async (datosPersona, tipo, transaction, codVinculacion = null) => {
    try {
      if (!codVinculacion) {
        codVinculacion = crypto.randomBytes(4).toString('hex').toUpperCase();
      }

      const nuevaPersona = await models.Persona.create({
        ...datosPersona,
        tipo,
        codVinculacion
      }, { transaction });

      return { nuevaPersona, codVinculacion };
    } catch (error) {
      console.log(pc.red('Error al crear la persona:'), error);
      throw errors.InternalServerError('Error al crear la persona');
    }
  },

  update: async (req, res, next) => {
    const transaction = await models.sequelize.transaction();
    try {
      const [updated] = await models.Persona.update(req.body, {
        where: { ID: req.params.id },
        transaction
      });
      if (updated) {
        const updatedPersona = await models.Persona.findByPk(req.params.id, { transaction });
        await transaction.commit();
        res.json({ mensaje: 'Persona actualizada exitosamente', data: updatedPersona });
      } else {
        await transaction.rollback();
        return next(errors.NotFound('Persona no encontrada'));
      }
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al actualizar la persona:'), error);
      return next(errors.InternalServerError('Error al actualizar la persona'));
    }
  },

  remove: async (req, res, next) => {
    const transaction = await models.sequelize.transaction();
    try {
      const result = await models.Persona.destroy({
        where: { ID: req.params.id },
        transaction
      });
      if (result) {
        await transaction.commit();
        res.status(204).end();
      } else {
        await transaction.rollback();
        return next(errors.NotFound('Persona no encontrada'));
      }
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al eliminar la persona:'), error);
      return next(errors.InternalServerError('Error al eliminar la persona'));
    }
  }
};