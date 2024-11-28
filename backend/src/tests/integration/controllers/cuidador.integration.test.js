import testUsuarios from '../../helpers/authTestHelper.js';
import models from '../../../bd/models/index.Models.js';
import { app } from '../../helpers/testSetup.js';
import request from 'supertest';
import QRCode from 'qrcode';

describe('Pruebas de Cuidador - Integración', () => {
  beforeAll(async () => {
    testUsuarios.setApp(app);
    await testUsuarios.initializeUsuarios();
  });

  afterAll(async () => {
    await testUsuarios.cleanupUsuarios();
    await models.sequelize.close();
  });

  // Test ID: 12 - Generar QR
  describe('POST /api/cuidador/generarQR', () => {
    it('Debería generar un código QR correctamente', async () => {
      const response = await testUsuarios.getAuthenticatedRequest('cuidador')
        .post('/api/cuidador/generarQR');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Código QR generado correctamente');
      expect(response.body.data).toHaveProperty('qrCode');
    });
  });

});