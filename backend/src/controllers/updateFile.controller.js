import models from '../bd/models/index.Models.js'
import { handleTransaction } from '../utils/transactionHelper.js'
import errors from '../utils/errors.js'
import GoogleDriveService from '../services/GoogleDriveService.js'
import fs from 'fs'
import dotenv from 'dotenv'
import pico from 'picocolors'

dotenv.config()
const driveService = new GoogleDriveService()

export const handleFileCreateOrUpdate = async (req, res, next) => {
  const { id, type } = req.params // Puede ser 'medicamento' o 'pastillero'
  const file = req.file

  try {
    if (!['medicamento', 'pastillero'].includes(type)) {
      return next({
        ...errors.ValidationError,
        details: `Se ingreso un tipo no válido: ${type}`
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
        console.log(pico.bgRed(`---- ID del medicamento en controller: ${id}`))
        console.log(pico.bgRed(`---- ID de la persona LOGUEADA en controller: ${res.locals.usuario.Persona.ID}`))
        const medicamento = await models.MedicamentoCuidador.findOne({ where: { ID: id, Cuidador_ID: res.locals.usuario.Persona.ID } })
        if (!medicamento) {
          return next({ ...errors.NotFoundError, details: `El medicamento con ID ${id} no existe.` })
        }

        // Actualizar
        const updatedMedicamento = await handleTransaction(async (transaction) => {
          // Si hay una nueva imagen, sube el archivo en Google Drive
          if (file && file.path) {
            if (medicamento.medicamento_imagen) {
              const oldFileId = driveService.extractFileIdFromLink(medicamento.medicamento_imagen)
              await driveService.deleteFile(oldFileId)
            }
            const codVinculacion = res.locals.usuario.Persona.codVinculacion // Valor de la columna 'codVinculacion' de la tabla 'Persona'
            const mainFolderId = process.env.GOOGLE_DRIVE_MAIN_FOLDER_ID // ID de la carpeta principal en Google Drive
            const subFolderId = await driveService.getOrCreateFolder(mainFolderId, codVinculacion) // Crear o obtener la subcarpeta
            const fileStream = fs.createReadStream(file.path)
            const nombreArchivo = `Medicamento - ${file.originalname}`
            const { file: driveFile, folder: driveFolder } = await driveService.uploadFile(fileStream, nombreArchivo, file.mimetype, subFolderId)
            console.log(`---- archivo recuperado en controller - ${JSON.stringify(driveFile)}`)
            console.log(`---- driveFolder guardado recuperado en controller - ${JSON.stringify(driveFolder)}`)
            medicamento.medicamento_imagen = driveFile.webViewLink
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
          if (file) {
            const codVinculacion = res.locals.usuario.Persona.codVinculacion // Valor de la columna 'codVinculacion' de la tabla 'Persona'
            const mainFolderId = process.env.GOOGLE_DRIVE_MAIN_FOLDER_ID // ID de la carpeta principal en Google Drive
            const subFolderId = await driveService.getOrCreateFolder(mainFolderId, codVinculacion) // Crear o obtener la subcarpeta
            const fileStream = fs.createReadStream(file.path)
            const nombreArchivo = `Medicamento - ${file.originalname}`
            const { file: driveFile, folder: driveFolder } = await driveService.uploadFile(fileStream, nombreArchivo, file.mimetype, subFolderId)
            console.log(`---- archivo recuperado en controller - ${JSON.stringify(driveFile)}`)
            console.log(`---- driveFolder guardado recuperado en controller - ${JSON.stringify(driveFolder)}`)
            imagenUrl = driveFile.webViewLink // Obtén el enlace de la imagen subida
          }
          return await models.MedicamentoCuidador.create({
            Vademecum_ID: idVademecum,
            notas,
            marca,
            medicamento_imagen: imagenUrl,
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
          if (file && file.path) {
            if (pastillero.imagen_url) {
              const oldFileId = driveService.extractFileIdFromLink(pastillero.imagen_url)
              await driveService.deleteFile(oldFileId)
            }
            const codVinculacion = res.locals.usuario.Persona.codVinculacion // Valor de la columna 'codVinculacion' de la tabla 'Persona'
            const mainFolderId = process.env.GOOGLE_DRIVE_MAIN_FOLDER_ID // ID de la carpeta principal en Google Drive
            const subFolderId = await driveService.getOrCreateFolder(mainFolderId, codVinculacion) // Crear o obtener la subcarpeta
            const fileStream = fs.createReadStream(file.path)
            const nombreArchivo = `Pastillero - ${file.originalname}`
            const { file: driveFile, folder: driveFolder } = await driveService.uploadFile(fileStream, nombreArchivo, file.mimetype, subFolderId)
            console.log(`---- archivo recuperado en controller - ${JSON.stringify(driveFile)}`)
            console.log(`---- driveFolder guardado recuperado en controller - ${JSON.stringify(driveFolder)}`)
            pastillero.imagen_url = driveFile.webViewLink // Asigna el enlace de la imagen subida
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
          let imagenUrl = null
          if (req.file) {
            const codVinculacion = res.locals.usuario.Persona.codVinculacion // Valor de la columna 'codVinculacion' de la tabla 'Persona'
            const mainFolderId = process.env.GOOGLE_DRIVE_MAIN_FOLDER_ID // ID de la carpeta principal en Google Drive
            const subFolderId = await driveService.getOrCreateFolder(mainFolderId, codVinculacion, next) // Crear o obtener la subcarpeta
            const fileStream = fs.createReadStream(req.file.path)
            const nombreArchivo = `Pastillero - ${file.originalname}`
            const { file: driveFile, folder: driveFolder } = await driveService.uploadFile(fileStream, nombreArchivo, file.mimetype, subFolderId)
            console.log(`---- archivo recuperado en controller - ${JSON.stringify(driveFile)}`)
            console.log(`---- driveFolder guardado recuperado en controller - ${JSON.stringify(driveFolder)}`)
            imagenUrl = driveFile.webViewLink // Obtén el enlace de la imagen subida
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
      details: 'Error al procesar la solicitud dentro del handleFileCreateOrUpdate - ' + error
    })
  } finally {
    if (file && file.path) { req.tempFiles.push(file.path) }
  }
}

export const obtenerImagen = async (req, res, next) => {
  const { id, type } = req.params
  try {
    if (type !== 'medicamento' && type !== 'pastillero') {
      return next({
        ...errors.ValidationError,
        details: `Tipo de imagen no válido: ${type}, debe ser 'medicamento' o 'pastillero'`
      })
    }
    if ((type === 'medicamento')) {
      const medicamento = await models.MedicamentoCuidador.findOne({
        where: { ID: id },
        attributes: ['ID', 'medicamento_imagen']
      })
      if (!medicamento) {
        return next({
          ...errors.NotFoundError,
          details: `El medicamento con ID ${id} no existe en la base de datos.`
        })
      }
      const fileId = driveService.extractFileIdFromLink(medicamento.medicamento_imagen)
      console.log(pico.bgRed(`ID de la imagen en Google Drive antes de obtenerlo: ${fileId}`))
      const { data: fileStream, mimeType, name } = await driveService.getFile(fileId)
      if (!fileStream) {
        return next({
          ...errors.NotFoundError,
          details: `El archivo con ID ${fileId} no existe en Google Drive.`
        })
      }
      res.status(200)
      res.setHeader('Content-Type', mimeType || 'image/jpeg')
      res.setHeader('Content-Disposition', `inline; filename="${name}"`)
      fileStream.pipe(res)
    } else {
      const pastillero = await models.PastilleroAlarma.findOne({
        where: { ID: id },
        attributes: ['ID', 'imagen_url']
      })
      if (!pastillero) {
        return next({
          ...errors.NotFoundError,
          details: `El pastillero con ID ${id} no existe en la base de datos.`
        })
      }
      const fileId = driveService.extractFileIdFromLink(pastillero.imagen_url)
      console.log(pico.bgRed(`ID de la imagen en Google Drive antes de obtenerlo: ${fileId}`))
      const { data: fileStream, mimeType, name } = await driveService.getFile(fileId)
      if (!fileStream) {
        return next({
          ...errors.NotFoundError,
          details: `El archivo con ID ${fileId} no existe en Google Drive.`
        })
      }
      res.status(200)
      res.setHeader('Content-Type', mimeType || 'image/jpeg')
      res.setHeader('Content-Disposition', `inline; filename="${name}"`)
      fileStream.pipe(res)
    }
  } catch (error) {
    console.log('Error capturado por try general - ' + error.message)
    next({
      ...errors.InternalServerError,
      details: 'Error al obtener la imagen - ' + error.message
    })
  }
}

export const deleteFile = async (req, res, next) => {
  const { id } = req.params
  try {
    await driveService.deleteFile(id, next)
    res.status(204).end()
  } catch (error) {
    next({
      ...errors.InternalServerError,
      details: 'Error al intentar eliminar la imagen - ' + error.message
    })
  }
}
