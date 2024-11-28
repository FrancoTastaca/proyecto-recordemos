import testUsuarios from '../../helpers/authTestHelper.js';
import models from '../../../bd/models/index.Models.js';
import { app } from '../../helpers/testSetup.js';

describe('Pruebas de Medicamento Cuidador - Integración', () => {
  let medicamentoId;
  let cuidadorId
  beforeAll(async () => {
    testUsuarios.setApp(app);
    await testUsuarios.initializeUsuarios();
    cuidadorId = testUsuarios.getPersonaId('cuidador');
  });

  afterAll(async () => {
    await testUsuarios.cleanupUsuarios();
    await models.sequelize.close();
  });

  // Test ID: 8 - Agregar Medicamento
  describe('POST /api/medicamento/agregar', () => {
    it('Debería agregar un nuevo medicamento correctamente', async () => {
      const medicamentoData = {
        idVademecum: 1, // ID de un vademécum existente en BD
        notas: 'Para el dolor de cabeza',
        marca: 'Genérico',
        idCuidador: cuidadorId // ID del cuidador autenticado
      };

      const response = await testUsuarios.getAuthenticatedRequest('cuidador')
        .post('/api/medicamento/agregar')
        .send(medicamentoData);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('ID');
      medicamentoId = response.body.ID;
    })
  })

  // Test ID: 9 - Obtener Medicamentos
  describe('GET /api/medicamento', () => {
    it('Debería obtener la lista de medicamentos', async () => {
      const response = await testUsuarios.getAuthenticatedRequest('cuidador')
        .get('/api/medicamento');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    })
  })

  // Test ID: 10 - Actualizar Medicamento
  describe('PUT /api/medicamento/modificar/:id', () => {
    it('Debería actualizar un medicamento existente', async () => {
      const updateData = {
        idVademecum: 1, // ID de un vademécum existente en BD
        notas: 'CAMBIO PUT - Para el dolor muscular',
        marca: 'Genérico PUT',
        idCuidador: cuidadorId // ID del cuidador autenticado
      }

      const response = await testUsuarios.getAuthenticatedRequest('cuidador')
        .put(`/api/medicamento/modificar/${medicamentoId}`)
        .send(updateData);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('ID');
      expect(response.body.notas).toBe('CAMBIO PUT - Para el dolor muscular');
      expect(response.body.marca).toBe('Genérico PUT');
    })
  })

  // Test ID: 11 - Eliminar Medicamento
  describe('DELETE /api/medicamento/borrar/:id', () => {
    it('Debería eliminar un medicamento existente', async () => {
      const response = await testUsuarios.getAuthenticatedRequest('cuidador')
        .delete(`/api/medicamento/borrar/${medicamentoId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Medicamento eliminado exitosamente.');
    })
  })
})