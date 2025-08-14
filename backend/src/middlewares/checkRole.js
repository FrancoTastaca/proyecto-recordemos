import errors from '../utils/errors.js'

const checkRole = function (...allowedRoles) {
  return async function (req, res, next) {
    if (res.locals.usuario && allowedRoles.includes(res.locals.usuario.Persona.tipo)) {
      next()
    } else {
      return next({ ...errors.UsuarioNoAutorizado, details: 'Tiene que ser un cuidador para acceder a esta ruta, su rol es: ' + res.locals.usuario.Persona.tipo })
    }
  }
}

export const checkRoleCuidador = checkRole('C')
export const checkRolePaciente = checkRole('P')
export default checkRole

