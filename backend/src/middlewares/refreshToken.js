import jwt from 'jsonwebtoken';
import { JWT_SECRET, REFRESH_SECRET } from '../utils/globalConstant.js';

const refreshJWT = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const newToken = jwt.sign({ ID: decoded.ID }, JWT_SECRET, { expiresIn: '30m' });
    return newToken;
  } catch (error) {
    console.error('Error al refrescar el token JWT:', error);
    return null;
  }
};

export default refreshJWT;