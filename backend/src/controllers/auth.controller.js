import models from '../bd/models/index.Models.js'
import errors from '../utils/errors.js'
import bcrypt from 'bcryptjs'
import signJWT from '../middlewares/signJWT.js'
import { v4 as uuidv4 } from 'uuid'
import pc from 'picocolors'
import QrCode from 'qrcode-reader'
import jimp from 'jimp'
import { handleTransaction } from '../utils/transactionHelper.js'

export default {
  login: async (req, res, next) => {
    try {
      console.log(pc.blue('Datos recibidos en /login:'), req.body)

      const user = await models.Usuario.findOne({
        where: {
          email: req.body.email
        },
        include: [{
          model: models.Persona,
          attributes: ['tipo']
        }]
      })
      console.log('Pase el primer await')
      if (user) {
        const coincide = bcrypt.compareSync(req.body.password, user.password)
        if (!coincide) {
          return next({
            ...errors.CredencialesInvalidas,
            details: 'La contraseña proporcionada no coincide con la almacenada en la base de datos.'
          })
        }
      } else {
        return next({
          ...errors.CredencialesInvalidas,
          details: 'El correo electrónico proporcionado no está registrado en el sistema.'
        })
      }

      try {
        const tokens = signJWT(user, user.Persona.tipo)
        console.log(`Tokens generados en login: ${JSON.stringify(tokens)}`) // Agregar log para depuración
        res.status(200).json({
          success: true,
          message: 'Inicio de sesión exitoso',
          data: {
            id: user.ID,
            tipo: user.Persona.tipo,
            token: tokens.token, // Devolver solo el token
            refreshToken: tokens.refreshToken
          }
        })
      } catch (err) {
        return next(err)
      }
    } catch (err) {
      console.log(pc.red('Error en el proceso de login:'), err)
      return next({
        ...errors.InternalServerError,
        details: `Error en el proceso de login: ${err.message}`
      })
    }
  },

  registrarse: async (req, res, next) => {
    console.log(pc.blue('---- Datos recibidos en /registrarse:'), req.body)
    try {
      const persona = await models.Persona.findOne({
        where: {
          ID: req.body.persona_id
        }
      })

      if (!persona) {
        return next({
          ...errors.UsuarioNoEncontrado,
          details: 'El ID de persona proporcionado no está registrado en el sistema.'
        })
      }

      await handleTransaction(async (transaction) => {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        const userId = uuidv4()
        const user = await models.Usuario.create({
          ID: userId,
          email: req.body.email,
          password: hashedPassword,
          Persona_ID: req.body.persona_id
        }, { transaction })
        console.log(pc.blue('---- Persona.tipo:'), persona.tipo)
        console.log(pc.blue('---- No voy a generar el token porque soy Paciente:'), persona.tipo === 'P')
        if (persona.tipo === 'C') {
          const tokens = signJWT(user, persona.tipo)
          console.log(`Tokens generados en registrarse: ${JSON.stringify(tokens)}`) // Agregar log para depuración
          res.cookie('jwt', tokens)
          res.status(201).json({
            success: true,
            message: 'Usuario Cuidador creado correctamente',
            data: {
              id: user.ID,
              email: user.email,
              tipo: persona.tipo,
              token: tokens.token, // Devolver solo el token
              refreshToken: tokens.refreshToken
            }
          })
        } else {
          res.status(201).json({
            success: true,
            message: 'Usuario Paciente creado correctamente',
            data: {
              id: user.ID,
              email: user.email,
              tipo: persona.tipo
            }
          })
        }
      }, next)
    } catch (err) {
      console.log(pc.red('Error en el proceso de verificación de persona:'), err)
      return next({
        ...errors.InternalServerError,
        details: `Error en el proceso de verificación de persona: ${err.message}`
      })
    }
  },

  loginPacienteConQR: async (req, res, next) => {
    try {
      const { qrCode } = req.body

      if (!qrCode) {
        return next({
          ...errors.CredencialesInvalidas,
          details: 'El código QR no fue proporcionado en la solicitud.'
        })
      }

      const image = await jimp.read(Buffer.from(qrCode.split(',')[1], 'base64'))
      const qr = new QrCode()
      const decodedQR = await new Promise((resolve, reject) => {
        qr.callback = (err, value) => err != null ? reject(err) : resolve(value)
        qr.decode(image.bitmap)
      })

      const codVinculacion = decodedQR.result
      const personaPaciente = await models.Persona.findOne({
        where: { codVinculacion, tipo: 'P' }
      })

      if (!personaPaciente) {
        return next({
          ...errors.UsuarioNoEncontrado,
          details: 'El código de vinculación proporcionado no corresponde a ningún paciente registrado.'
        })
      }

      const usuarioPaciente = await models.Usuario.findOne({
        where: { Persona_ID: personaPaciente.ID }, include: [models.Persona]
      })

      if (!usuarioPaciente) {
        return next({
          ...errors.UsuarioNoEncontrado,
          details: 'No se encontró un usuario asociado al paciente con el código de vinculación proporcionado.'
        })
      }

      try {
        const tokens = signJWT(usuarioPaciente, 'P')
        console.log(`Tokens generados en loginPacienteConQR: ${JSON.stringify(tokens)}`) // Agregar log para depuración
        res.cookie('jwt', tokens)
        res.status(200).json({
          success: true,
          message: 'Login exitoso',
          data: {
            usuarioPaciente,
            tipo: 'P',
            token: tokens.token, // Devolver solo el token
            refreshToken: tokens.refreshToken
          }
        })
      } catch (err) {
        return next(err)
      }
    } catch (err) {
      console.log(pc.red('Error en el proceso de login del paciente con QR:'), err)
      return next({
        ...errors.InternalServerError,
        details: `Error en el proceso de login del paciente con QR: ${err.message}`
      })
    }
  },

  logout: async (req, res) => {
    res.clearCookie('jwt')
    res.status(200).json({
      success: true,
      message: 'Sesión cerrada correctamente'
    })
  }
}

