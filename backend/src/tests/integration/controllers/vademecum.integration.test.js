import testUsuarios from '../../helpers/authTestHelper.js';
import models from '../../../bd/models/index.Models.js';
import { app } from '../../helpers/testSetup.js';
import request from 'supertest';

describe('Pruebas de Vademecum - Integración', () => {
  beforeAll(async () => {
    testUsuarios.setApp(app);
    await testUsuarios.initializeUsuarios();
  });

  afterAll(async () => {
    await testUsuarios.cleanupUsuarios();
    await models.sequelize.close();
  });

  // Test ID: 14 - Obtener Vademecum para Desplegable
  describe('GET /api/vademecum/desplegable', () => {
    it('Debería obtener el vademecum para desplegable correctamente', async () => {
      const response = await testUsuarios.getAuthenticatedRequest('cuidador')
        .get('/api/vademecum/desplegable?query=paracetamol');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  // Test ID: 15 - Listar Vademecum según Tipo
  describe('GET /api/vademecum/listarSegunTipo', () => {
    it('Debería listar el vademecum según tipo correctamente', async () => {
      const response = await testUsuarios.getAuthenticatedRequest('cuidador')
        .get('/api/vademecum/listarSegunTipo?tipo=droga&valor=paracetamol');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  // Test ID: 16 - Obtener Droga para Desplegable
  describe('GET /api/vademecum/drogaDesplegable', () => {
    it('Debería obtener la droga para desplegable correctamente', async () => {
      const response = await testUsuarios.getAuthenticatedRequest('cuidador')
        .get('/api/vademecum/drogaDesplegable?query=paracetamol');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  // Test ID: 17 - Leer Vademecum por ID
  describe('GET /api/vademecum/:id', () => {
    it('Debería obtener el vademecum por ID correctamente', async () => {
      const vademecumId = 1; // ID de un vademecum existente en la BD
      const response = await testUsuarios.getAuthenticatedRequest('cuidador')
        .get(`/api/vademecum/${vademecumId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('ID', vademecumId);
      expect(response.body).toHaveProperty('principio_activo');
      expect(response.body).toHaveProperty('marca_comercial');
      expect(response.body).toHaveProperty('presentacion');
    });
  });
});