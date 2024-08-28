import jwt from 'jsonwebtoken';
import { JWT_SECRET , REFRESH_SECRET } from '../utils/globalConstant.js';

const signJWT = (usuario) => {
  if (usuario) {
    try {
      const token = jwt.sign({ ID: usuario.ID }, JWT_SECRET, { expiresIn: '45m' }); // Access token válido por 30 minutos
      const refreshToken = jwt.sign({ ID: usuario.ID }, REFRESH_SECRET, { expiresIn: '7d' });
      return { token, refreshToken };
    } catch (error) {
      console.error('Error al firmar el token JWT:', error);
      return null;
    }
  } else {
    return null;
  }
};

export default signJWT;