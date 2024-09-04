import models from '../bd/models/index.Models.js';
import pc from 'picocolors';
import personaController from './persona.controller.js';
import errors from '../utils/errors.js';

export default {
  listar: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /paciente:'));
    try {
      const pacientes = await models.Paciente.findAll();
      res.json(pacientes);
    } catch (error) {
      console.log(pc.red('Error al obtener los pacientes:'), error);
      next({
        ...errors.InternalServerError,
        details: 'Error al obtener los pacientes'
      });
    }
  },

  read: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /paciente/:id:'), req.params.id);
    try {
      const paciente = await models.Paciente.findByPk(req.params.id);
      if (!paciente) {
        console.log(pc.red('Paciente no encontrado'));
        return next({
          ...errors.UsuarioNoEncontrado,
          details: 'Paciente no encontrado'
        });
      }
      res.json(paciente);
    } catch (error) {
      console.log(pc.red('Error al obtener el paciente:'), error);
      next({
        ...errors.InternalServerError,
        details: 'Error al obtener el paciente'
      });
    }
  },

  crearPaciente: async (req, res, next) => {
    console.log(pc.green('Datos recibidos en /crearPaciente:'), req.body);
    const transaction = await models.sequelize.transaction();
    try {
      const { codVinculacion } = req.body;
      const nuevaPersona = await personaController.crearPersona(req.body, 'P', transaction, codVinculacion);

      const nuevoPaciente = await models.Paciente.create({
        ID: nuevaPersona.ID,
        historial_medico: req.body.historial_medico || null,
        contacto_emergencia: req.body.contacto_emergencia || null,
      }, { transaction });

      await transaction.commit();

      res.status(201).json({
        success: true,
        message: "Paciente creado correctamente",
        data: {
          paciente: nuevoPaciente,
          datosPersonaPaciente: nuevaPersona
        }
      });
    } catch (err) {
      await transaction.rollback();
      console.log(pc.red('Error en el proceso de creación del paciente:'), err);
      next({
        ...errors.InternalServerError,
        details: 'Ocurrió un error al intentar crear el paciente. Por favor, inténtelo más tarde.'
      });
    }
  },

  update: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /paciente/:id:'), req.params.id, req.body);
    const transaction = await models.sequelize.transaction();
    try {
      const [updated] = await models.Paciente.update(req.body, {
        where: { id: req.params.id },
        transaction
      });
      if (updated) {
        const updatedPaciente = await models.Paciente.findByPk(req.params.id, { transaction });
        await transaction.commit();
        res.json({ mensaje: 'Paciente actualizado exitosamente', data: updatedPaciente });
      } else {
        await transaction.rollback();
        console.log(pc.red('Paciente no encontrado'));
        next({
          ...errors.UsuarioNoEncontrado,
          details: 'Paciente no encontrado'
        });
      }
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al actualizar el paciente:'), error);
      next({
        ...errors.InternalServerError,
        details: 'Error al actualizar el paciente'
      });
    }
  },

  remove: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /paciente/:id:'), req.params.id);
    const transaction = await models.sequelize.transaction();
    try {
      const result = await models.Paciente.destroy({
        where: { id: req.params.id },
        transaction
      });
      if (result) {
        await transaction.commit();
        res.status(204).end();
      } else {
        await transaction.rollback();
        console.log(pc.red('Paciente no encontrado'));
        next({
          ...errors.UsuarioNoEncontrado,
          details: 'Paciente no encontrado'
        });
      }
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al eliminar el paciente:'), error);
      next({
        ...errors.InternalServerError,
        details: 'Error al eliminar el paciente'
      });
    }
  },
};