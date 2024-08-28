import models from '../bd/models/index.Models.js';
import pc from 'picocolors';

export default {
  obtenerPastilleros: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /pastillero:'));
    try {
      const pastilleros = await models.Pastillero.findAll();
      res.json(pastilleros);
    } catch (error) {
      console.log(pc.red('Error al obtener los pastilleros:'), error);
      res.status(500).json({ mensaje: 'Error al obtener los pastilleros' });
    }
  },

  obtenerPastilleroPorId: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /pastillero/:id:'), req.params.id);
    try {
      const pastillero = await models.Pastillero.findByPk(req.params.id);
      if (!pastillero) {
        console.log(pc.red('Pastillero no encontrado'));
        return res.status(404).json({ mensaje: 'Pastillero no encontrado' });
      }
      res.json(pastillero);
    } catch (error) {
      console.log(pc.red('Error al obtener el pastillero:'), error);
      res.status(500).json({ mensaje: 'Error al obtener el pastillero' });
    }
  },

  crearPastillero: async (req, res, next) => {
    console.log(pc.green('Datos recibidos en /pastillero:'), req.body);
    try {
      const nuevoPastillero = await models.Pastillero.create(req.body);
      res.status(201).json({ mensaje: 'Pastillero creado exitosamente', data: nuevoPastillero });
    } catch (error) {
      console.log(pc.red('Error al crear el pastillero:'), error);
      res.status(500).json({ mensaje: 'Error al crear el pastillero' });
    }
  },

  actualizarPastillero: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /pastillero/:id:'), req.params.id, req.body);
    try {
      const [updated] = await models.Pastillero.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedPastillero = await models.Pastillero.findByPk(req.params.id);
        res.json({ mensaje: 'Pastillero actualizado exitosamente', data: updatedPastillero });
      } else {
        console.log(pc.red('Pastillero no encontrado'));
        res.status(404).json({ mensaje: 'Pastillero no encontrado' });
      }
    } catch (error) {
      console.log(pc.red('Error al actualizar el pastillero:'), error);
      res.status(500).json({ mensaje: 'Error al actualizar el pastillero' });
    }
  },

  eliminarPastillero: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /pastillero/:id:'), req.params.id);
    try {
      const result = await models.Pastillero.destroy({
        where: { id: req.params.id }
      });
      if (result) {
        res.status(204).end();
      } else {
        console.log(pc.red('Pastillero no encontrado'));
        res.status(404).json({ mensaje: 'Pastillero no encontrado' });
      }
    } catch (error) {
      console.log(pc.red('Error al eliminar el pastillero:'), error);
      res.status(500).json({ mensaje: 'Error al eliminar el pastillero' });
    }
  }
};