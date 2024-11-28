import testUsuarios from '../../helpers/authTestHelper.js';
import models from '../../../bd/models/index.Models.js';
import { app } from '../../helpers/testSetup.js';

describe('Pruebas de Pastillero - Integración', () => {
  let pastilleroId;

  beforeAll(async () => {
    testUsuarios.setApp(app);
    await testUsuarios.initializeUsuarios();
  });

  afterAll(async () => {
    await testUsuarios.cleanupUsuarios();
    await models.sequelize.close();
  });

  // Test ID: 4 - Crear Pastillero
  describe('POST /api/pastilleroAlarma', () => {
    it('Debería crear un nuevo pastillero correctamente', async () => {
      const pastilleroData = {
        PacienteID: 2, // ID de un paciente existente en BD
        MedCuidadorID: 13, // ID de un cuidador existente en BD
        colorPastillero: 'Rojo',
        horarioDiario: '17:00',
        dosis: '3'
      };

      const response = await testUsuarios.getAuthenticatedRequest('cuidador')
        .post('/api/pastilleroAlarma')
        .send(pastilleroData);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('ID');
      pastilleroId = response.body.ID;
    });
  });

  // Test ID: 5 - Obtener Pastilleros
  describe('GET /api/pastilleroAlarma', () => {
    it('Debería obtener la lista de pastilleros', async () => {
      const response = await testUsuarios.getAuthenticatedRequest('cuidador')
        .get('/api/pastilleroAlarma/cuidador');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Test ID: 6 - Actualizar Pastillero
  describe('PUT /api/pastilleroAlarma/:id', () => {
    it('Debería actualizar un pastillero existente', async () => {
      const updateData = {
        PacienteID: 2, // ID de un paciente existente en BD
        MedCuidadorID: 13, // ID de un cuidador existente en BD
        colorPastillero: 'Azul distinto',
        horarioDiario: '10:00',
        dosis: '10'
      };

      const response = await testUsuarios.getAuthenticatedRequest('cuidador')
        .put(`/api/pastilleroAlarma/${pastilleroId}`)
        .send(updateData);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('ID');
      expect(response.body.color_pastillero).toBe('Azul distinto');
      expect(response.body.horario_diario).toEqual('10:00');
      expect(response.body.dosis).toBe('10');
    });
  });

  // Test ID: 7 - Eliminar Pastillero
  describe('DELETE /api/pastilleroAlarma/:id', () => {
    it('Debería eliminar un pastillero existente', async () => {
      const response = await testUsuarios.getAuthenticatedRequest('cuidador')
        .delete(`/api/pastilleroAlarma/${pastilleroId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Pastillero eliminado exitosamente.');
    });
  });
})