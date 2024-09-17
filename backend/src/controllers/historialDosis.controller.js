import models from '../bd/models/index.Models.js';
import pc from 'picocolors';

export default {
  obtenerHistorialDosis: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /historialDosis:'));
    try {
      const historialDosis = await models.HistorialDosis.findAll();
      res.json(historialDosis);
    } catch (error) {
      console.log(pc.red('Error al obtener el historial de dosis:'), error);
      res.status(500).json({ mensaje: 'Error al obtener el historial de dosis' });
    }
  },

  obtenerHistorialDosisPorId: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /historialDosis/:id:'), req.params.id);
    try {
      const historialDosis = await models.HistorialDosis.findByPk(req.params.id);
      if (!historialDosis) {
        console.log(pc.red('Historial de dosis no encontrado'));
        return res.status(404).json({ mensaje: 'Historial de dosis no encontrado' });
      }
      res.json(historialDosis);
    } catch (error) {
      console.log(pc.red('Error al obtener el historial de dosis:'), error);
      res.status(500).json({ mensaje: 'Error al obtener el historial de dosis' });
    }
  },

  crearHistorialDosis: async (req, res, next) => {
    console.log(pc.green('Datos recibidos en /historialDosis:'), req.body);
    try {
      const nuevoHistorialDosis = await models.HistorialDosis.create(req.body);
      res.status(201).json({ mensaje: 'Historial de dosis creado exitosamente', data: nuevoHistorialDosis });
    } catch (error) {
      console.log(pc.red('Error al crear el historial de dosis:'), error);
      res.status(500).json({ mensaje: 'Error al crear el historial de dosis' });
    }
  },

  actualizarHistorialDosis: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /historialDosis/:id:'), req.params.id, req.body);
    try {
      const [updated] = await models.HistorialDosis.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedHistorialDosis = await models.HistorialDosis.findByPk(req.params.id);
        res.json({ mensaje: 'Historial de dosis actualizado exitosamente', data: updatedHistorialDosis });
      } else {
        console.log(pc.red('Historial de dosis no encontrado'));
        res.status(404).json({ mensaje: 'Historial de dosis no encontrado' });
      }
    } catch (error) {
      console.log(pc.red('Error al actualizar el historial de dosis:'), error);
      res.status(500).json({ mensaje: 'Error al actualizar el historial de dosis' });
    }
  },

  eliminarHistorialDosis: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /historialDosis/:id:'), req.params.id);
    try {
      const result = await models.HistorialDosis.destroy({
        where: { id: req.params.id }
      });
      if (result) {
        res.status(204).end();
      } else {
        console.log(pc.red('Historial de dosis no encontrado'));
        res.status(404).json({ mensaje: 'Historial de dosis no encontrado' });
      }
    } catch (error) {
      console.log(pc.red('Error al eliminar el historial de dosis:'), error);
      res.status(500).json({ mensaje: 'Error al eliminar el historial de dosis' });
    }
  }
};