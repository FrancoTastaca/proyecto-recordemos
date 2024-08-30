import jwt from 'jsonwebtoken';
import models from '../bd/models/index.Models.js';
import { JWT_SECRET, REFRESH_JWT_SECRET } from '../utils/globalConstant.js';
import moment from 'moment';
import pc from 'picocolors';

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
    return res.status(401).json({
      success: false,
      message: 'No se proporcionó un token de autenticación.'
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
          return res.status(401).json({
            success: false,
            message: 'Sesión expirada y refresh token inválido.'
          });
        }
      } else {
        return res.status(401).json({
          success: false,
          message: 'Sesión expirada.'
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
      return res.status(401).json({
        success: false,
        message: 'Usuario no autorizado.'
      });
    }

    res.locals.usuario = usuario;
    next();
  } catch (err) {
    console.log(pc.red('Error al verificar el token JWT:'), err);
    return res.status(401).json({
      success: false,
      message: 'Usuario no autorizado.'
    });
  }
};