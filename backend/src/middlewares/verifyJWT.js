import jwt from 'jsonwebtoken'
import models from '../bd/models/index.Models.js'
import { JWT_SECRET, REFRESH_JWT_SECRET } from '../utils/globalConstant.js'
import moment from 'moment'
import pc from 'picocolors'
import errors from '../utils/errors.js'

export const verifyJWT = async (req, res, next) => {
  let token
  let refreshToken

  /// Método para obtener el token
  const getTokenFromRequest = () => {
    // Primero, verificar el encabezado de autorización
    if (
      req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer ')
    ) {
      return req.headers.authorization.split(' ')[1]
    }

    // Luego, verificar las cookies
    if (req.cookies && req.cookies.jwt) {
      // Si el JWT en cookies es un string directo, devolverlo
      if (typeof req.cookies.jwt === 'string') {
        return req.cookies.jwt
      }

      // Si es un objeto, intentar obtener el token
      try {
        return req.cookies.jwt.token || req.cookies.jwt
      } catch (parseError) {
        console.log(pc.red('Error al parsear la cookie JWT:'), parseError)
        return null
      }
    }

    return null
  }

  // Obtener el token
  token = getTokenFromRequest()

  // Manejar caso de token no encontrado
  if (!token) {
    console.log(pc.red('No se proporcionó un token de autenticación.'))
    return next({
      ...errors.CredencialesInvalidas,
      details: 'No se proporcionó un token de autenticación en la solicitud.'
    })
  }

  try {
    const dataToken = jwt.verify(token, JWT_SECRET)

    // Verificar expiración del token
    if (dataToken.exp <= moment().unix()) {
      console.log(pc.yellow('Sesión expirada.'))

      // Si hay refresh token, intentar refrescar
      if (req.cookies.jwt?.refreshToken) {
        try {
          const refreshToken = req.cookies.jwt.refreshToken
          const dataRefreshToken = jwt.verify(refreshToken, REFRESH_JWT_SECRET)

          // Generar nuevo token
          const newToken = jwt.sign(
            { id: dataRefreshToken.id, tipo: dataRefreshToken.tipo }, 
            JWT_SECRET, 
            { expiresIn: '45m' }
          )

          // Actualizar cookie con nuevo token
          res.cookie('jwt', {
            token: newToken, 
            refreshToken: refreshToken
          }, { 
            httpOnly: true, 
            secure: true 
          })

          // Continuar con el nuevo token
          res.locals.token = jwt.verify(newToken, JWT_SECRET)
          res.locals.usuario = await models.Usuario.findOne({ 
            where: { ID: dataRefreshToken.id },
            include: [{ model: models.Persona }]
          })

          return next()
        } catch (err) {
          console.log(pc.red('Error al verificar el refresh token JWT:'), err)
          return next({
            ...errors.SesionExpirada,
            details: 'La sesión ha expirado. Por favor, inicie sesión nuevamente.'
          })
        }
      } else {
        return next({
          ...errors.SesionExpirada,
          details: 'El token de autenticación ha expirado y no se proporcionó un refresh token.'
        })
      }
    }

    // Almacenar información del token
    res.locals.token = dataToken

    // Buscar usuario asociado al token
    const usuario = await models.Usuario.findOne({
      where: { ID: dataToken.id },
      include: [{ model: models.Persona }]
    })

    if (!usuario) {
      console.log(pc.red('Usuario no autorizado.'))
      return next({
        ...errors.UsuarioNoAutorizado,
        details: 'No se encontró un usuario asociado al token proporcionado.'
      })
    }

    res.locals.usuario = usuario
    next()
  } catch (err) {
    console.log(pc.red('Error al verificar el token JWT:'), err)
    return next({
      ...errors.CredencialesInvalidas,
      details: `Error al verificar el token JWT: ${err.message}`
    })
  }
}