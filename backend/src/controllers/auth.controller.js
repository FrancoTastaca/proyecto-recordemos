import models from '../bd/models/index.Models.js';
import errors from '../utils/errors.js';
import bcrypt from 'bcryptjs';
import jwt from '../middlewares/signJWT.js';
import { v4 as uuidv4 } from 'uuid';
import pc from 'picocolors';
import QrCode from 'qrcode-reader';
import jimp from 'jimp';

export default {
  login: async (req, res, next) => {
    try {
      const user = await models.Usuario.findOne({
        where: {
          email: req.body.email
        },
        include: [{
          model: models.Persona,
          as: 'persona',
          atributtes: ['tipo']
        }]
      });

      if (user) {
        const coincide = bcrypt.compareSync(req.body.password, user.password);
        if (!coincide) {
          return res.status(errors.CredencialesInvalidas.code).json({
            success: false,
            message: 'La contraseña es incorrecta. Por favor, inténtelo de nuevo.'
          });
        }
      } else {
        return res.status(errors.CredencialesInvalidas.code).json({
          success: false,
          message: 'No se encontró una cuenta con ese correo electrónico.'
        });
      }

      const tokens = jwt(user, user.persona.tipo);
      res.cookie('jwt', tokens);
      res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: {
          id: user.ID,
          tipo: user.persona.tipo,
          tokens
        }
      });
    } catch (err) {
      console.log(pc.red('Error en el proceso de login:'), err);
      return res.status(errors.InternalServerError.code).json({
        success: false,
        message: 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtelo más tarde.'
      });
    }
  },

  registrarse: async (req, res, next) => {
    try {
      const persona = await models.Persona.findOne({
        where: {
          ID: req.body.persona_id
        }
      });

      if (!persona) {
        return res.status(errors.UsuarioNoEncontrado.code).json({
          success: false,
          message: 'No se encontró una persona con el ID proporcionado.'
        });
      }

      const transaction = await models.sequelize.transaction();
      try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const userId = uuidv4();
        const user = await models.Usuario.create({
          ID: userId,
          email: req.body.email,
          password: hashedPassword,
          Persona_ID: req.body.persona_id,
        }, { transaction });

        if (persona.tipo === 'C') {
          const tokens = jwt(user, persona.tipo);
          res.cookie('jwt', tokens);
        }

        await transaction.commit();

        res.status(201).json({
          success: true,
          message: "Usuario creado correctamente",
          data: {
            id: user.ID,
            email: user.correo_electronico,
            tipo: persona.tipo
          }
        });
      } catch (err) {
        await transaction.rollback();
        console.log(pc.red('Error en el proceso de registro:'), err);
        return res.status(errors.InternalServerError.code).json({
          success: false,
          message: 'Ocurrió un error al intentar registrar el usuario. Por favor, inténtelo más tarde.'
        });
      }
    } catch (err) {
      console.log(pc.red('Error en el proceso de verificación de persona:'), err);
      return res.status(errors.InternalServerError.code).json({
        success: false,
        message: 'Ocurrió un error al intentar verificar la persona. Por favor, inténtelo más tarde.'
      });
    }
  },

  loginPacienteConQR: async (req, res, next) => {
    try {
      const { qrCode } = req.body;

      if (!qrCode) {
        throw new Error('No se recibieron datos del QR');
      }

      const image = await jimp.read(Buffer.from(qrCode.split(',')[1], 'base64'));
      const qr = new QrCode();
      const decodedQR = await new Promise((resolve, reject) => {
        qr.callback = (err, value) => err != null ? reject(err) : resolve(value);
        qr.decode(image.bitmap);
      });

      const codVinculacion = decodedQR.result;
      const personaPaciente = await models.Persona.findOne({
        where: { codVinculacion, tipo: 'P' }
      });

      if (!personaPaciente) {
        return res.status(errors.UsuarioNoEncontrado.code).json({
          success: false,
          message: 'Código de vinculación no válido o paciente no encontrado.'
        });
      }

      const usuarioPaciente = await models.Usuario.findOne({
        where: { Persona_ID: personaPaciente.ID }
      });

      if (!usuarioPaciente) {
        return res.status(errors.UsuarioNoEncontrado.code).json({
          success: false,
          message: 'Usuario no encontrado para el paciente.'
        });
      }

      const tokens = jwt(usuarioPaciente, 'P');
      res.cookie('jwt', tokens);
      res.status(200).json({
        success: true,
        message: 'Login exitoso',
        data: {
          id: usuarioPaciente.ID,
          tipo: 'P',
          tokens
        }
      });
    } catch (err) {
      console.log(pc.red('Error en el proceso de login del paciente con QR:'), err);
      return res.status(errors.InternalServerError.code).json({
        success: false,
        message: 'Ocurrió un error al intentar hacer login. Por favor, inténtelo más tarde.'
      });
    }
  },

  logout: async (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({
      success: true,
      message: 'Sesión cerrada correctamente'
    });
  }
}