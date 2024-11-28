import testUsuarios from '../../helpers/authTestHelper.js';
import models from '../../../bd/models/index.Models.js';
import { app } from '../../helpers/testSetup.js';
import request from 'supertest';
import QRCode from 'qrcode'

describe('Pruebas de Autenticación - Integración', () => {
  beforeAll(async () => {
    testUsuarios.setApp(app);
    await testUsuarios.initializeUsuarios();
  });

  afterAll(async () => {
    await testUsuarios.cleanupUsuarios();
    const usuario = await models.Usuario.findOne({
      where: { email: 'testSIGN-UP@example.com'}
    });
    if (usuario) {
      console.log('Eliminando usuario creado en test SIGN-UP...');
      await usuario.destroy();
    }
    await models.sequelize.close();
  });

  // Test ID: 1 - Sign-Up
  describe('POST /auth/sign-up', () => {
    it('Debería registrar un nuevo usuario correctamente', async () => {
      const userData = {
        email: 'testSIGN-UP@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        persona_id: 1
      };

      const response = await testUsuarios.getAuthenticatedRequest('cuidador')
        .post('/api/auth/sign-up')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Usuario Cuidador creado correctamente');
    });

    it('Debería fallar al registrar un usuario con datos inválidos', async () => {
      const invalidUserData = {
        email: 'invalid-email',
        password: '123',
        confirmPassword: '456'
      };

      const response = await testUsuarios.getAuthenticatedRequest('cuidador')
        .post('/api/auth/sign-up')
        .send(invalidUserData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
    });
  });

  // Test ID: 2 - Sign-In
  describe('POST /auth/sign-in', () => {
    it('Debería permitir iniciar sesión con credenciales válidas', async () => {
      const response = await testUsuarios.getAuthenticatedRequest('cuidador')
        .post('/api/auth/sign-in')
        .send({
          email: 'cuidador.test@example.com',
          password: 'TestPass123'
        })

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.headers).toHaveProperty('set-cookie');
    });

    it('Debería rechazar inicio de sesión con credenciales inválidas', async () => {
      const invalidCredentials = {
        email: 'cuidador.test@example.com',
        password: 'WrongPass123'
      };

      const response = await testUsuarios.getAuthenticatedRequest('cuidador')
        .post('/api/auth/sign-in')
        .send(invalidCredentials);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('success', false);
    });
  });

  // Test ID: 3 - Sign-Out
  describe('POST /auth/sign-out', () => {
    it('Debería cerrar sesión correctamente', async () => {
      const response = await testUsuarios.getAuthenticatedRequest('cuidador')
        .post('/api/auth/log-out');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      // Verificar que la cookie JWT fue eliminada
      expect(response.headers['set-cookie'][0]).toMatch(/jwt=;/);
    });
  });
  // Test ID: 13- Sign-In con QR
  describe('POST /auth/loginPacienteConQR', () => {
    it('Debería permitir iniciar sesión con credenciales válidas', async () => {
      const codVinculacion= '3D47EB3C' // Codigo de Vinculacion de un cuidador de bd
      const qrCodedeCodigoVinculacion = await QRCode.toDataURL(codVinculacion)
      console.log('--------- Valor del qrCode de Codigo de Vinculacion:', qrCodedeCodigoVinculacion)
      const response = await testUsuarios.getAuthenticatedRequest('paciente')
        .post('/api/auth/loginPacienteConQR')
        .send({ qrCode: qrCodedeCodigoVinculacion });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.headers).toHaveProperty('set-cookie');
      expect(response.body).toHaveProperty('message', 'Login exitoso');
      expect(response.body).toHaveProperty('data');
    })
  })
})