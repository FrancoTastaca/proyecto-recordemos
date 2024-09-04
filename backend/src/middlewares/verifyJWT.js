import jwt from 'jsonwebtoken';
import models from '../bd/models/index.Models.js';
import { JWT_SECRET, REFRESH_JWT_SECRET } from '../utils/globalConstant.js';
import moment from 'moment';
import pc from 'picocolors';
import errors from '../utils/errors.js';

export const verifyJWT = async (req, res, next) => {
  let token;
  let refreshToken;

  // Intentar obtener el token desde el header
  if (req.header('Authorization') && req.header('Authorization').split(' ').length > 1) {
    token = req.header('Authorization').split(' ')[1];
  } else if (req.cookies && req.cookies.jwt) {
    // Asumir que las cookies siempre contienen un objeto JSON
    const parsedCookies = req.cookies.jwt;
    token = parsedCookies.token;
    refreshToken = parsedCookies.refreshToken;
  }

  if (!token) {
    console.log(pc.red('No se proporcionó un token de autenticación.'));
    return next({
      ...errors.CredencialesInvalidas,
      details: 'No se proporcionó un token de autenticación en la solicitud.'
    });
  }

  try {
    const dataToken = jwt.verify(token, JWT_SECRET);

    if (dataToken.exp <= moment().unix()) {
      console.log(pc.yellow('Sesión expirada.'));

      // Verificar el refresh token si el token normal ha expirado
      if (refreshToken) {
        try {
          const dataRefreshToken = jwt.verify(refreshToken, REFRESH_JWT_SECRET);

          // Generar un nuevo token normal
          const newToken = jwt.sign({ id: dataRefreshToken.id }, JWT_SECRET, { expiresIn: '45m' });
          res.cookie('jwt', JSON.stringify({ token: newToken, refreshToken }), { httpOnly: true });

          // Continuar con el nuevo token
          res.locals.token = jwt.verify(newToken, JWT_SECRET);
          res.locals.usuario = await models.Usuario.findOne({ where: { ID: dataRefreshToken.id } });
          return next();
        } catch (err) {
          console.log(pc.red('Error al verificar el refresh token JWT:'), err);
          return next({
            ...errors.SesionExpirada,
            details: `Error al verificar el refresh token JWT: ${err.message}`
          });
        }
      } else {
        return next({
          ...errors.SesionExpirada,
          details: 'El token de autenticación ha expirado y no se proporcionó un refresh token.'
        });
      }
    }

    res.locals.token = dataToken;

    const usuario = await models.Usuario.findOne({
      where: {
        ID: dataToken.id
      },
      include: [{
        model: models.Persona,
        as: 'persona'
      }]
    });

    if (!usuario) {
      console.log(pc.red('Usuario no autorizado.'));
      return next({
        ...errors.UsuarioNoAutorizado,
        details: 'No se encontró un usuario asociado al token proporcionado.'
      });
    }

    res.locals.usuario = usuario;
    next();
  } catch (err) {
    console.log(pc.red('Error al verificar el token JWT:'), err);
    return next({
      ...errors.CredencialesInvalidas,
      details: `Error al verificar el token JWT: ${err.message}`
    });
  }
};