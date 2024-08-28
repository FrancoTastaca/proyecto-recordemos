import models from '../models/index.Models.js';
import errors from '../utils/errors.js';
import bcrypt from 'bcryptjs';
import jwt from '../middlewares/signJWT.js';

export default {
  login: async (req, res, next) => {
    console.log(req.body);
    try {
      const user = await models.Usuario.findOne({
        where: {
          email: req.body.email
        }
      });

      if (user) {
        const coincide = bcrypt.compareSync(req.body.password, user.password);
        if (!coincide) {
          return next(errors.CredencialesInvalidas);
        }
      }

      if (!user) {
        return next(errors.CredencialesInvalidas);
      }

      res.cookie('jwt', jwt(user));
      res.json({
        success: true,
        data: {
          id: user.ID,
          token: jwt(user)
        }
      });
    } catch (err) {
      return next(err);
    }
  },

  registrarse: async (req, res, next) => {
    try {
      const persona = await models.Persona.findOne({
        where: {
          persona_id: req.body.idPersona
        }
      });

      hashedPassword= bcrypt.hashSync(req.body.password, 10);
      const user = await models.Usuario.create({
        nombre_usuario: req.body.nombreUsuario,
        email: req.body.email,
        password: hashedPassword,
        persona_id: persona.id
      });

      res.json({
        success: true,
        message: "Usuario creado correctamente",
        data: {
          id: user.ID
        }
      });
    } catch (err) {
      return next(err);
    }
  }
};