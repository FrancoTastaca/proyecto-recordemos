import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/globalConstant.js';

const signJWT = (usuario) => {
  if (usuario) {
    const token = jwt.sign({
      id: usuario.ID
    },
    JWT_SECRET,
    {
      expiresIn: '3000m'
    });
    return token;
  } else {
    return null;
  }
};

export default signJWT;