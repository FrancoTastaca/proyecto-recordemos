import express from 'express';
import authController from '../controllers/auth.controller.js';
import validate from '../middlewares/validate.js';
import authScheme from '../middlewares/schemes/auth.scheme.js';

const router = express.Router();
router.post('/sign-in', validate(authScheme.login), authController.login);
router.post('/sign-up', validate(authScheme.register), authController.registrarse);
router.post('/refresh-token',validate(authScheme.refreshToken), authController.refresh);

export default router;

/**
 * Configura un interceptor para las solicitudes HTTP que verifique si el access token ha expirado y, si es así, utilice el refresh token para obtener un nuevo access token.
 * import axios from 'axios';

const api = axios.create({
  baseURL: 'http://tu-backend.com',
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post('http://tu-backend.com/refresh-token', { refreshToken });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api; */