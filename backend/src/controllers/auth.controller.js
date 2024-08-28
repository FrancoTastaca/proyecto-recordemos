import models from '../bd/models/index.Models.js';
import errors from '../utils/errors.js';
import bcrypt from 'bcryptjs';
import jwt from '../middlewares/signJWT.js';
import { v4 as uuidv4 } from 'uuid';
import pc from 'picocolors';
import refreshJWT from '../middlewares/refreshToken.js';

export default {
  login: async (req, res, next) => {
    console.log(pc.blue('Datos recibidos en /login:'), req.body);
    try {
      console.log(pc.blue('Buscando usuario con email:'), req.body.email);
      const user = await models.Usuario.findOne({
        where: {
          email: req.body.email
        }
      });

      console.log(pc.blue('Usuario encontrado:'), user);

      if (user) {
        console.log(pc.blue('Comparando contraseñas'));
        const coincide = bcrypt.compareSync(req.body.password, user.password);
        console.log(pc.blue('Contraseña coincide:'), coincide);
        if (!coincide) {
          console.log(pc.red('Contraseña no coincide'));
          return res.status(errors.CredencialesInvalidas.code).json({
            success: false,
            message: 'La contraseña es incorrecta. Por favor, inténtelo de nuevo.'
          });
        }
      } else {
        console.log(pc.red('Usuario no encontrado'));
        return res.status(errors.CredencialesInvalidas.code).json({
          success: false,
          message: 'No se encontró una cuenta con ese correo electrónico.'
        });
      }

      console.log(pc.blue('Generando token JWT'));
      const tokens = jwt(user);
      res.cookie('jwt', tokens);
      console.log(pc.blue('Enviando respuesta con éxito'));
      res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: {
          id: user.ID,
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
    console.log(pc.green('Datos recibidos en /registrarse:'), req.body);
    const transaction = await models.sequelize.transaction();
    try {
      const persona = await models.Persona.findOne({
        where: {
          ID: req.body.persona_id
        }
      }, { transaction });
  
      if (!persona) {
        await transaction.rollback();
        return res.status(errors.UsuarioNoEncontrado.code).json({
          success: false,
          message: 'No se encontró una persona con el ID proporcionado.'
        });
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      const userId = uuidv4();
      const user = await models.Usuario.create({
        ID: userId,
        nombre_usuario: req.body.nombreUsuario,
        email: req.body.email,
        password: hashedPassword,
        Persona_ID: req.body.persona_id,
        rol: req.body.rol
      }, { transaction });

      await transaction.commit();
      res.status(201).json({
        success: true,
        message: "Usuario creado correctamente",
        data: {
          id: user.ID,
          nombre_usuario: user.nombre_usuario,
          email: user.email,
          rol: user.rol
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
  },

  refresh: async (req, res, next) => {
    const { refreshToken } = req.body;
  
    try {
      const newToken = refreshJWT(refreshToken);
      if (newToken) {
        res.status(200).json({
          success: true,
          message: 'Token refrescado exitosamente',
          data: {
            token: newToken
          }
        });
      } else {
        res.status(errors.CredencialesInvalidas.code).json({
          success: false,
          message: 'El token de refresco no es válido o ha expirado.'
        });
      }
    } catch (err) {
      console.log(pc.red('Error al refrescar el token JWT:'), err);
      return res.status(errors.InternalServerError.code).json({
        success: false,
        message: 'Ocurrió un error al intentar refrescar el token. Por favor, inténtelo más tarde.'
      });
    }
  }
};