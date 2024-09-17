import models from '../bd/models/index.Models.js';
import pc from 'picocolors';
import errors from '../utils/errors.js';

export default {

  listar: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /pastillero:'));
    try {
      const pastilleros = await models.PastilleroAlarma.findAll();
      res.json(pastilleros);
    } catch (error) {
      console.log(pc.red('Error al obtener los pastilleros:'), error);
      next({
        ...errors.InternalServerError,
        details: 'Error al obtener los pastilleros'
      });
    }
  },

  listarPoridPersona: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /pastillero:'));
    try {
      const idPersona = req.params.id;
      const pastilleros = await models.PastilleroAlarma.findAll({
        where: {
          [Op.or]: [
            { Paciente_ID: idPersona },
            { Cuidador_ID: idPersona }
          ]
        }
      });
      res.json(pastilleros);
    } catch (error) {
      console.log(pc.red('Error al obtener los pastilleros:'), error);
      next({
        ...errors.InternalServerError,
        details: 'Error al obtener los pastilleros'
      });
    }
  },

  read: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /pastillero/:id:'), req.params.id);
    try {
      const pastillero = await models.PastilleroAlarma.findByPk(req.params.id);
      if (!pastillero) {
        console.log(pc.red('Pastillero no encontrado'));
        return next({
          ...errors.NotFoundError,
          details: 'Pastillero no encontrado'
        });
      }
      res.json(pastillero);
    } catch (error) {
      console.log(pc.red('Error al obtener el pastillero:'), error);
      next({
        ...errors.InternalServerError,
        details: 'Error al obtener el pastillero'
      });
    }
  },

  create: async (req, res, next) => {
    console.log(pc.green('Datos recibidos en /pastillero:'), req.body);
    const transaction = await models.sequelize.transaction();
    try {
      const nuevoPastillero = await models.PastilleroAlarma.create(req.body, { transaction });
      await transaction.commit();
      console.log(pc.green('Pastillero creado exitosamente:', nuevoPastillero));
      res.status(201).json({ mensaje: 'Pastillero creado exitosamente', data: nuevoPastillero });
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al crear el pastillero:'), error);
      next({
        ...errors.InternalServerError,
        details: 'Error al crear el pastillero',
        originalError: error
      });
    }
  },

  update: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /pastillero/:id:'), req.params.id, req.body);
    const transaction = await models.sequelize.transaction();
    try {
      const [updated] = await models.PastilleroAlarma.update(req.body, {
        where: { id: req.params.id },
        transaction
      });
      if (updated) {
        const updatedPastillero = await models.PastilleroAlarma.findByPk(req.params.id, { transaction });
        await transaction.commit();
        res.json({ mensaje: 'Pastillero actualizado exitosamente', data: updatedPastillero });
      } else {
        await transaction.rollback();
        console.log(pc.red('Pastillero no encontrado'));
        next({
          ...errors.NotFoundError,
          details: 'Pastillero no encontrado'
        });
      }
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al actualizar el pastillero:'), error);
      next({
        ...errors.InternalServerError,
        details: 'Error al actualizar el pastillero',
        originalError: error
      });
    }
  },

  remove: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /pastillero/:id:'), req.params.id);
    const transaction = await models.sequelize.transaction();
    try {
      const result = await models.PastilleroAlarma.destroy({
        where: { id: req.params.id },
        transaction
      });
      if (result) {
        await transaction.commit();
        res.status(204).end();
      } else {
        await transaction.rollback();
        console.log(pc.red('Pastillero no encontrado'));
        next({
          ...errors.NotFoundError,
          details: 'Pastillero no encontrado'
        });
      }
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al eliminar el pastillero:'), error);
      next({
        ...errors.InternalServerError,
        details: 'Error al eliminar el pastillero',
        originalError: error
      });
    }
  },

  obtenerHorarioDiario: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /horario_diario/:id'), req.params.id);
    try {
      const pastillero = await models.PastilleroAlarma.findByPk(req.params.id, {
        attributes: ['horario_diario']
      });
      if (!pastillero) {
        console.log(pc.red('Pastillero no encontrado'));
        return next({
          ...errors.NotFoundError,
          details: 'Pastillero no encontrado'
        });
      }
      res.json({ horario_diario: pastillero.horario_diario });
    } catch (error) {
      console.log(pc.red('Error al obtener el horario diario del pastillero:'), error);
      next({
        ...errors.InternalServerError,
        details: 'Error al obtener el horario diario del pastillero',
        originalError: error
      });
    }
  }
};