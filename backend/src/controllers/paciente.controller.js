import models from '../bd/models/index.Models.js';
import pc from 'picocolors';

export default {
  listar: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /paciente:'));
    try {
      const pacientes = await models.Paciente.findAll();
      res.json(pacientes);
    } catch (error) {
      console.log(pc.red('Error al obtener los pacientes:'), error);
      res.status(500).json({ mensaje: 'Error al obtener los pacientes' });
    }
  },

  read: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /paciente/:id:'), req.params.id);
    try {
      const paciente = await models.Paciente.findByPk(req.params.id);
      if (!paciente) {
        console.log(pc.red('Paciente no encontrado'));
        return res.status(404).json({ mensaje: 'Paciente no encontrado' });
      }
      res.json(paciente);
    } catch (error) {
      console.log(pc.red('Error al obtener el paciente:'), error);
      res.status(500).json({ mensaje: 'Error al obtener el paciente' });
    }
  },

  create: async (req, res, next) => {
    console.log(pc.green('Datos recibidos en /paciente:'), req.body);
    const transaction = await models.sequelize.transaction();
    try {
      const nuevoPaciente = await models.Paciente.create(req.body, { transaction });
      await transaction.commit();
      res.status(201).json({ mensaje: 'Paciente creado exitosamente', data: nuevoPaciente });
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al crear el paciente:'), error);
      res.status(500).json({ mensaje: 'Error al crear el paciente' });
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
        res.status(404).json({ mensaje: 'Paciente no encontrado' });
      }
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al actualizar el paciente:'), error);
      res.status(500).json({ mensaje: 'Error al actualizar el paciente' });
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
        res.status(404).json({ mensaje: 'Paciente no encontrado' });
      }
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al eliminar el paciente:'), error);
      res.status(500).json({ mensaje: 'Error al eliminar el paciente' });
    }
  }
};