import jwt from 'jsonwebtoken';
import { JWT_SECRET, REFRESH_JWT_SECRET } from '../utils/globalConstant.js';
import errors from '../utils/errors.js';

const signJWT = (usuario, tipo) => {
  if (!usuario || !tipo) {
    throw {
      ...errors.FaltanParametros,
      details: 'Usuario o tipo no proporcionado para firmar el token JWT.'
    };
  }

  try {
    const payload = { id: usuario.ID, tipo };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '45m' });
    const refreshToken = jwt.sign(payload, REFRESH_JWT_SECRET, { expiresIn: '7d' });
    return { token, refreshToken };
  } catch (error) {
    throw {
      ...errors.InternalServerError,
      details: 'Error al firmar el token JWT.',
    };
  }
};

export default signJWT;