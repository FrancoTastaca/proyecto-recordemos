import models from '../bd/models/index.Models.js'
import pc from 'picocolors'
import errors from '../utils/errors.js'

export default {
  // Crear una asociación de medicamento con uno del Vademecum droga
  create: async (req, res, next) => {
    console.log(pc.blue('Iniciando agregarMedicamento'))
    console.log('Contenido de req.body:', req.body)

    try {
      const { idVademecum, notas, marca, medicamento_imagen, idCuidador } = req.body
      // Verificar que el idCuidador existe
      const cuidador = await models.Cuidador.findByPk(idCuidador)
      if (!cuidador) {
        return next({
          ...errors.UsuarioNoEncontrado,
          details: 'El cuidador especificado no existe en la base de datos.'
        })
      }

      // Verificar que el idVademecum existe
      const vademecum = await models.Vademecum.findByPk(idVademecum)
      if (!vademecum) {
        return next({
          ...errors.NotFoundError,
          details: 'El vademécum especificado no existe en la base de datos.'
        })
      }

      const nuevoMedicamento = await models.MedicamentoCuidador.create({
        Vademecum_ID: idVademecum,
        notas,
        marca,
        medicamento_imagen,
        Cuidador_ID: idCuidador
      })
      res.status(201).json(nuevoMedicamento)
    } catch (error) {
      next({
        ...errors.InternalServerError,
        details: 'Ocurrió un error al intentar crear el medicamento. Por favor, inténtelo más tarde.'
      })
    }
  },

  listar: async (req, res, next) => {
    console.log(pc.blue('Iniciando listarMedicamentos'))
    try {
      const medicamentos = await models.MedicamentoCuidador.findAll({
        attributes: ['ID', 'notas', 'marca', 'medicamento_imagen', 'Vademecum_ID', 'Cuidador_ID']
      })

      console.log(pc.green('Medicamentos encontrados:', JSON.stringify(medicamentos, null, 2)))
      res.status(200).json(medicamentos)
    } catch (error) {
      console.error(pc.red('Error al listar medicamentos:', JSON.stringify(error, null, 2)))
      next({
        ...errors.InternalServerError,
        details: 'Ocurrió un error al intentar listar los medicamentos. Por favor, inténtelo más tarde.'
      })
    }
  },

  listarPorIdCuidador: async (req, res, next) => {
    console.log(pc.blue('Iniciando listarMedicamentosPorIdCuidador'))
    console.log(pc.blue('ID del cuidador:', req.params.id))

    try {
      const medicamentos = await models.MedicamentoCuidador.findAll({
        where: { Cuidador_ID: req.params.id },
        attributes: ['ID', 'notas', 'marca', 'medicamento_imagen', 'Vademecum_ID', 'Cuidador_ID']
      })
      res.status(200).json(medicamentos)
    } catch (error) {
      console.error(pc.red('Error al listar medicamentos: '))
      next({
        ...errors.InternalServerError,
        details: 'Ocurrió un error al intentar listar los medicamentos por ID del cuidador. Por favor, inténtelo más tarde.'
      })
    }
  }
}
