import jwt from 'jsonwebtoken';
import errors from '../utils/errors.js';
import models from '../bd/models/index.Models.js';
import { JWT_SECRET } from '../utils/globalConstant.js';
import moment from 'moment';

export const verifyJWT = async (req, res, next) => {
  if (req.header('Authorization') && req.header('Authorization').split(' ').length > 1) {
    try {
      const dataToken = jwt.verify(req.header('Authorization').split(' ')[1], JWT_SECRET);
      if (dataToken.exp <= moment().unix()) { return next(errors.SesionExpirada); }
      res.locals.token = dataToken;
      console.log(dataToken);
      const usuario = await models.Usuario.findOne({
        where: {
          ID: dataToken.id
        }
      });

      if (!usuario) return next(errors.UsuarioNoAutorizado);

      res.locals.usuario = usuario;
      next();
    } catch (err) {
      console.log(err);
      return next(errors.UsuarioNoAutorizado);
    }
  } else if (req.cookies.jwt) {
    try {
      const dataToken = jwt.verify(req.cookies.jwt, JWT_SECRET);
      if (dataToken.exp <= moment().unix()) { return next(errors.SesionExpirada); }
      res.locals.token = dataToken;
      console.log(dataToken);
      const usuario = await models.Usuario.findOne({
        where: {
          ID: dataToken.id
        }
      });

      if (!usuario) return next(errors.UsuarioNoAutorizado);

      res.locals.usuario = usuario;
      next();
    } catch (err) {
      console.log(err);
      return next(errors.UsuarioNoAutorizado);
    }
  } else {
    return next(errors.UsuarioNoAutorizado);
  }
};