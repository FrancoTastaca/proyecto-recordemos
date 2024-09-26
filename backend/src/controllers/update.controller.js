import models from '../bd/models/index.Models.js'
import { handleTransaction } from '../utils/transactionHelper.js'
import errors from '../utils/errors.js'
import GoogleDriveService from '../services/GoogleDriveService.js'
import fs from 'fs'

const driveService = new GoogleDriveService('path/to/credentials.json', 'Your Application Name')

export const handleFileCreateOrUpdate = async (req, res, next) => {
  const { id, type } = req.params // Puede ser 'medicamento' o 'pastillero'

  try {
    if (!['medicamento', 'pastillero'].includes(type)) {
      return next({
        ...errors.BadRequestError,
        details: `Tipo no válido: ${type}`
      })
    }

    if (type === 'medicamento') {
      const { idVademecum, notas, marca, idCuidador } = req.body

      // Verificar el cuidador
      const cuidador = await models.Cuidador.findByPk(idCuidador)
      if (!cuidador) {
        return next({
          ...errors.UsuarioNoEncontrado,
          details: `El cuidador especificado con ID ${idCuidador} no existe en la base de datos.`
        })
      }

      // Verificar el vademécum
      const vademecum = await models.Vademecum.findByPk(idVademecum)
      if (!vademecum) {
        return next({
          ...errors.NotFoundError,
          details: `El vademécum especificado con ID ${idVademecum} no existe en la base de datos.`
        })
      }

      // Si es una actualización
      if (id) {
        const medicamento = await models.MedicamentoCuidador.findOne({ where: { ID: id, Cuidador_ID: res.locals.usuario?.persona?.ID } })
        if (!medicamento) {
          return next({ ...errors.NotFoundError, details: `El medicamento con ID ${id} no existe.` })
        }

        // Actualizar
        const updatedMedicamento = await handleTransaction(async (transaction) => {
          // Si hay una nueva imagen, sube el archivo
          if (req.file && req.file.path) {
            const fileStream = fs.createReadStream(req.file.path)
            const uploadResponse = await driveService.uploadFile(fileStream, req.file.originalname, req.file.mimetype, 'your-folder-id')
            medicamento.medicamento_imagen = uploadResponse.webViewLink // Asigna el enlace de la imagen subida
            fs.unlinkSync(req.file.path) // Eliminar el archivo temporal
          }
          medicamento.Vademecum_ID = idVademecum
          medicamento.notas = notas
          medicamento.marca = marca
          await medicamento.save({ transaction })
          return medicamento
        }, next)

        return res.status(200).json(updatedMedicamento)
      } else {
        // Crear
        const nuevoMedicamento = await handleTransaction(async (transaction) => {
          let imagenUrl
          if (req.file) {
            const fileStream = fs.createReadStream(req.file.path)
            const uploadResponse = await driveService.uploadFile(fileStream, req.file.originalname, req.file.mimetype, 'your-folder-id')
            imagenUrl = uploadResponse.webViewLink // Obtén el enlace de la imagen subida
            fs.unlinkSync(req.file.path) // Eliminar el archivo temporal
          }
          return await models.MedicamentoCuidador.create({
            Vademecum_ID: idVademecum,
            notas,
            marca,
            medicamento_imagen: imagenUrl, // Asigna el enlace de la imagen
            Cuidador_ID: idCuidador
          }, { transaction })
        }, next)

        return res.status(201).json(nuevoMedicamento)
      }
    } else if (type === 'pastillero') {
      const { imagenURL, PacienteID, MedCuidadorID, colorPastillero, horarioDiario, dosis } = req.body

      // Verificar el paciente
      const paciente = await models.Paciente.findByPk(PacienteID)
      if (!paciente) {
        return next({
          ...errors.NotFoundError,
          details: `El paciente especificado con ID ${PacienteID} no existe en la base de datos.`
        })
      }

      // Verificar el medicamento cuidador
      const medicamentoCuidador = await models.MedicamentoCuidador.findByPk(MedCuidadorID)
      if (!medicamentoCuidador) {
        return next({
          ...errors.NotFoundError,
          details: `El medicamento cuidador con ID ${MedCuidadorID} no existe.`
        })
      }

      // Si es una actualización
      if (id) {
        const pastillero = await models.PastilleroAlarma.findOne({ where: { ID: id, Paciente_ID: PacienteID } })
        if (!pastillero) {
          return next({ ...errors.NotFoundError, details: `El pastillero con ID ${id} no existe.` })
        }

        // Actualizar
        const updatedPastillero = await handleTransaction(async (transaction) => {
          // Si hay una nueva imagen, sube el archivo
          if (req.file && req.file.path) {
            const fileStream = fs.createReadStream(req.file.path)
            const uploadResponse = await driveService.uploadFile(fileStream, req.file.originalname, req.file.mimetype, 'your-folder-id')
            pastillero.imagen_url = uploadResponse.webViewLink // Asigna el enlace de la imagen subida
            fs.unlinkSync(req.file.path) // Eliminar el archivo temporal
          } else {
            pastillero.imagen_url = imagenURL
          }
          pastillero.Paciente_ID = PacienteID
          pastillero.MedicamentoCuidador_ID = MedCuidadorID
          pastillero.color_pastillero = colorPastillero
          pastillero.horario_diario = horarioDiario
          pastillero.dosis = dosis
          await pastillero.save({ transaction })
          return pastillero
        }, next)

        return res.status(200).json(updatedPastillero)
      } else {
        // Crear
        const nuevoPastillero = await handleTransaction(async (transaction) => {
          let imagenUrl
          if (req.file) {
            const fileStream = fs.createReadStream(req.file.path)
            const uploadResponse = await driveService.uploadFile(fileStream, req.file.originalname, req.file.mimetype, 'your-folder-id')
            imagenUrl = uploadResponse.webViewLink // Obtén el enlace de la imagen subida
            fs.unlinkSync(req.file.path) // Eliminar el archivo temporal
          } else {
            imagenUrl = imagenURL
          }
          return await models.PastilleroAlarma.create({
            imagen_url: imagenUrl,
            Paciente_ID: PacienteID,
            MedicamentoCuidador_ID: MedCuidadorID,
            color_pastillero: colorPastillero,
            horario_diario: horarioDiario,
            dosis
          }, { transaction })
        }, next)

        return res.status(201).json(nuevoPastillero)
      }
    }
  } catch (error) {
    next({
      ...errors.InternalServerError,
      details: 'Error al procesar la solicitud - ' + error.message
    })
  }
}
export const getImage = async (req, res, next) => {
  const { fileId } = req.params

  try {
    const fileStream = await driveService.getFile(fileId)
    fileStream.pipe(res)
  } catch (error) {
    next({
      ...errors.InternalServerError,
      details: 'Error al intentar recuperar la imagen - ' + error.message
    })
  }
}
