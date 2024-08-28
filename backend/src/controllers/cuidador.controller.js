import models from '../bd/models/index.Models.js';
import pc from 'picocolors';

export default {
  listar: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /cuidador:'));
    const transaction = await models.sequelize.transaction();
    try {
      const cuidadores = await models.Cuidador.findAll({ transaction });
      await transaction.commit();
      res.json(cuidadores);
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al obtener los cuidadores:'), error);
      res.status(500).json({ mensaje: 'Error al obtener los cuidadores' });
    }
  },

  read: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /cuidador/:id:'), req.params.id);
    const transaction = await models.sequelize.transaction();
    try {
      const cuidador = await models.Cuidador.findByPk(req.params.id, { transaction });
      if (!cuidador) {
        await transaction.rollback();
        console.log(pc.red('Cuidador no encontrado'));
        return res.status(404).json({ mensaje: 'Cuidador no encontrado' });
      }
      await transaction.commit();
      res.json(cuidador);
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al obtener el cuidador:'), error);
      res.status(500).json({ mensaje: 'Error al obtener el cuidador' });
    }
  },

  create: async (req, res, next) => {
    console.log(pc.green('Datos recibidos en /cuidador:'), req.body);
    const transaction = await models.sequelize.transaction();
    try {
      const nuevoCuidador = await models.Cuidador.create(req.body, { transaction });
      await transaction.commit();
      res.status(201).json({ mensaje: 'Cuidador creado exitosamente', data: nuevoCuidador });
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al crear el cuidador:'), error);
      res.status(500).json({ mensaje: 'Error al crear el cuidador' });
    }
  },

  update: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /cuidador/:id:'), req.params.id, req.body);
    const transaction = await models.sequelize.transaction();
    try {
      const [updated] = await models.Cuidador.update(req.body, {
        where: { id: req.params.id },
        transaction
      });
      if (updated) {
        const updatedCuidador = await models.Cuidador.findByPk(req.params.id, { transaction });
        await transaction.commit();
        res.json({ mensaje: 'Cuidador actualizado exitosamente', data: updatedCuidador });
      } else {
        await transaction.rollback();
        console.log(pc.red('Cuidador no encontrado'));
        res.status(404).json({ mensaje: 'Cuidador no encontrado' });
      }
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al actualizar el cuidador:'), error);
      res.status(500).json({ mensaje: 'Error al actualizar el cuidador' });
    }
  },

  remove: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /cuidador/:id:'), req.params.id);
    const transaction = await models.sequelize.transaction();
    try {
      const result = await models.Cuidador.destroy({
        where: { id: req.params.id },
        transaction
      });
      if (result) {
        await transaction.commit();
        res.status(204).end();
      } else {
        await transaction.rollback();
        console.log(pc.red('Cuidador no encontrado'));
        res.status(404).json({ mensaje: 'Cuidador no encontrado' });
      }
    } catch (error) {
      await transaction.rollback();
      console.log(pc.red('Error al eliminar el cuidador:'), error);
      res.status(500).json({ mensaje: 'Error al eliminar el cuidador' });
    }
  }
};