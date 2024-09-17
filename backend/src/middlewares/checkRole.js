import errors from '../utils/errors.js';

const checkRole = function (...allowedRoles) {
  return async function (req, res, next) {
    
    if (res.locals.usuario && allowedRoles.includes(res.locals.usuario.persona.tipo)) {
      next();
    } else {
      return next(errors.UsuarioNoAutorizado);
    }
  };
};

export const checkRoleCuidador = checkRole('C');
export const checkRolePaciente = checkRole('P');
export default checkRole;