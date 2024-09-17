import express from 'express';
import authController from '../controllers/auth.controller.js';
import validate from '../middlewares/validate.js';
import authScheme from '../middlewares/schemes/auth.scheme.js';

const router = express.Router();
router.post('/sign-in', validate(authScheme.login), authController.login);
router.post('/sign-up', validate(authScheme.register), authController.registrarse);
router.post('/loginPacienteConQR', authController.loginPacienteConQR);
router.post('/log-out', authController.logout);
export default router;