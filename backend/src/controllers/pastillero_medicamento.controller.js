import models from '../bd/models/index.Models.js';
import pc from 'picocolors';

export default {
  listar: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /pastillero_medicamentos:'));
    const transaction = await models.sequelize.transaction();
    try {
      const pastilleroMedicamentos = await models.PastilleroMedicamentos.findAll({ transaction });
      await transaction.commit();
      res.json(pastilleroMedicamentos);
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al obtener los pastillero_medicamentos:'), error);
      res.status(500).json({ mensaje: 'Error al obtener los pastillero_medicamentos' });
    }
  },

  read: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /pastillero_medicamentos/:id:'), req.params.id);
    const transaction = await models.sequelize.transaction();
    try {
      const pastilleroMedicamento = await models.PastilleroMedicamentos.findByPk(req.params.id, { transaction });
      if (!pastilleroMedicamento) {
        await transaction.rollback();
        console.log(pc.red('PastilleroMedicamento no encontrado'));
        return res.status(404).json({ mensaje: 'PastilleroMedicamento no encontrado' });
      }
      await transaction.commit();
      res.json(pastilleroMedicamento);
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al obtener el pastillero_medicamento:'), error);
      res.status(500).json({ mensaje: 'Error al obtener el pastillero_medicamento' });
    }
  },

  create: async (req, res, next) => {
    console.log(pc.green('Datos recibidos en /pastillero_medicamentos:'), req.body);
    const transaction = await models.sequelize.transaction();
    try {
      const nuevoPastilleroMedicamento = await models.PastilleroMedicamentos.create(req.body, { transaction });
      await transaction.commit();
      res.status(201).json({ mensaje: 'PastilleroMedicamento creado exitosamente', data: nuevoPastilleroMedicamento });
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al crear el pastillero_medicamento:'), error);
      res.status(500).json({ mensaje: 'Error al crear el pastillero_medicamento' });
    }
  },

  update: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /pastillero_medicamentos/:id:'), req.params.id, req.body);
    const transaction = await models.sequelize.transaction();
    try {
      const [updated] = await models.PastilleroMedicamentos.update(req.body, {
        where: { id: req.params.id },
        transaction
      });
      if (updated) {
        const updatedPastilleroMedicamento = await models.PastilleroMedicamentos.findByPk(req.params.id, { transaction });
        await transaction.commit();
        res.json({ mensaje: 'PastilleroMedicamento actualizado exitosamente', data: updatedPastilleroMedicamento });
      } else {
        await transaction.rollback();
        console.log(pc.red('PastilleroMedicamento no encontrado'));
        res.status(404).json({ mensaje: 'PastilleroMedicamento no encontrado' });
      }
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al actualizar el pastillero_medicamento:'), error);
      res.status(500).json({ mensaje: 'Error al actualizar el pastillero_medicamento' });
    }
  },

  remove: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /pastillero_medicamentos/:id:'), req.params.id);
    const transaction = await models.sequelize.transaction();
    try {
      const result = await models.PastilleroMedicamentos.destroy({
        where: { id: req.params.id },
        transaction
      });
      if (result) {
        await transaction.commit();
        res.status(204).end();
      } else {
        await transaction.rollback();
        console.log(pc.red('PastilleroMedicamento no encontrado'));
        res.status(404).json({ mensaje: 'PastilleroMedicamento no encontrado' });
      }
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al eliminar el pastillero_medicamento:'), error);
      res.status(500).json({ mensaje: 'Error al eliminar el pastillero_medicamento' });
    }
  }
};