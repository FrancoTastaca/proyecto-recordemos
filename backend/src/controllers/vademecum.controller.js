import models from '../bd/models/index.Models.js'
import pc from 'picocolors'
import { Op } from 'sequelize'
import errors from '../utils/errors.js'

export default {
  obtenerVademecumParaDesplegable: async (req, res, next) => {
    console.log(pc.blue('Iniciando obtenerVademecumParaDesplegable'))
    try {
      const { query = '', limit = 100, offset = 0 } = req.query

      const whereClause = {}

      // Filtrar por el texto que se escribe
      if (query) {
        whereClause[Op.or] = [
          { principio_activo: { [Op.like]: `%${query}%` } },
          { marca_comercial: { [Op.like]: `%${query}%` } },
          { presentacion: { [Op.like]: `%${query}%` } }
        ]
      }

      const vademecum = await models.Vademecum.findAll({
        attributes: ['ID', 'principio_activo', 'marca_comercial', 'presentacion'],
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset)
      })

      const opcionesDesplegable = vademecum.map(item => ({
        id: item.ID,
        nombre: `${item.principio_activo} - ${item.presentacion}`
      }))

      res.status(200).json(opcionesDesplegable)
    } catch (error) {
      console.error(pc.red('Error al obtener Vademecum para el desplegable:', error))
      next({
        ...errors.InternalServerError,
        details: 'Error al obtener Vademecum para el desplegable'
      })
    }
  },
  listarSegunTipo: async (req, res, next) => {
    console.log(pc.blue('Iniciando listarSegunTipo'))

    const { tipo, valor, limit = 100, offset = 0 } = req.query

    if (!tipo || !valor) {
      console.log(pc.yellow('Faltan parámetros tipo y valor'))
      return next({
        ...errors.FaltanParametros,
        details: 'Faltan parámetros tipo y valor'
      })
    }

    let condicion = {}
    switch (tipo) {
      case 'droga':
        condicion = { principio_activo: { [Op.like]: `%${valor}%` } }
        break
      case 'presentacion':
        condicion = { presentacion: { [Op.like]: `%${valor}%` } }
        break
      case 'marca':
        condicion = { marca_comercial: { [Op.like]: `%${valor}%` } }
        break
      default:
        console.log(pc.yellow('Tipo de filtro no válido'))
        return next({
          ...errors.ValidationError,
          details: 'Tipo de filtro no válido'
        })
    }

    try {
      const Vademecum = await models.Vademecum.findAll({
        where: condicion,
        limit: parseInt(limit),
        offset: parseInt(offset)
      })
      console.log(pc.green('Vademecum listados según tipo:', Vademecum))
      res.json(Vademecum)
    } catch (error) {
      console.error(pc.red('Error al listar los Vademecum según tipo:', error))
      next({
        ...errors.InternalServerError,
        details: 'Error al listar los Vademecum'
      })
    }
  },
  obtenerDrogaParaDesplegable: async (req, res, next) => {
    console.log(pc.blue('Iniciando obtenerMedicamentoParaDesplegable'))
    try {
      const { query = '', limit = 100, offset = 0 } = req.query

      const whereClause = {}

      // Filtrar por el texto que se escribe
      if (query) {
        whereClause[Op.or] = [
          { principio_activo: { [Op.like]: `%${query}%` } }
        ]
      }

      const vademecum = await models.Vademecum.findAll({
        attributes: ['ID', 'principio_activo'],
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset)
      })
      const opcionesDesplegable = vademecum.map(item => ({
        id: item.ID,
        droga: `${item.principio_activo}`
      }))

      res.status(200).json(opcionesDesplegable)
    } catch (error) {
      console.error(pc.red('Error al obtener Medicamento para el desplegable:', error))
      next({
        ...errors.InternalServerError,
        details: 'Error al obtener Medicamento para el desplegable'
      })
    }
  },
  read: async (req, res, next) => {
    console.log(pc.blue('Iniciando read'))
    const { id } = req.params
    try {
      const Vademecum = await models.Vademecum.findByPk(id, {
        attributes: ['ID', 'principio_activo', 'marca_comercial', 'presentacion']
      })
      if (Vademecum) {
        console.log(pc.green('Vademecum encontrado:', Vademecum))
        res.status(200).json(Vademecum)
      } else {
        console.log(pc.yellow('Vademecum no encontrado'))
        next({
          ...errors.NotFoundError,
          details: 'Vademecum no encontrado'
        })
      }
    } catch (error) {
      console.error(pc.red('Error al obtener el Vademecum:', error))
      next({
        ...errors.InternalServerError,
        details: 'Error al obtener el Vademecum'
      })
    }
  }
}
