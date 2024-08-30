import jwt from 'jsonwebtoken';
import { JWT_SECRET, REFRESH_JWT_SECRET } from '../utils/globalConstant.js';

const signJWT = (usuario, tipo) => {
  if (!usuario || !tipo) { 
    console.error('Usuario no proporcionado para firmar el token JWT.');
    return null;
  }

  try {
    const payload = { id: usuario.ID, tipo };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '45m' });
    const refreshToken = jwt.sign(payload, REFRESH_JWT_SECRET, { expiresIn: '7d' });
    return { token, refreshToken };
  } catch (error) {
    console.error('Error al firmar el token JWT:', error);
    return null;
  }
};

export default signJWT;