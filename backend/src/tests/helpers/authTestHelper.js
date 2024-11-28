import request from 'supertest';
import bcrypt from 'bcryptjs';
import models from '../../bd/models/index.Models.js';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';

const TEST_CONFIG = {
  roles: {
    cuidador: {
      email: 'cuidador.test@example.com',
      dni: '12345678',
      tipo: 'C'
    },
    paciente: {
      email: 'paciente.test@example.com',
      dni: '87654321',
      tipo: 'P'
    }
  },
  password: 'TestPass123'
};

class TestUsuarios {
  constructor() {
    this.usuarios = { cuidador: null, paciente: null };
    this.personas = { cuidador: null, paciente: null };
    this.tokens = { cuidador: null, paciente: null };
    this.app = null; // Nueva propiedad para almacenar la instancia de la app
  }

  setApp(app) {
    this.app = app;
  }

  async initializeUsuarios() {
    try {
      console.log('Inicializando usuarios de prueba...');
      const hashedPassword = await bcrypt.hash(TEST_CONFIG.password, 10);
      for (const rol of Object.keys(TEST_CONFIG.roles)) {
        const { email, dni, tipo } = TEST_CONFIG.roles[rol];
        await this.createPersonaYUsuario(rol, email, hashedPassword, tipo, dni);
      }
      await this.loginUsuarios();
    } catch (error) {
      console.error('Error al inicializar usuarios de prueba:', error);
    }
  }

  async createPersonaYUsuario(rol, mail, password, rolUsuario, dni) {
    console.log(`Creando persona y usuario de prueba para el rol: ${rol}`);
    dni = rol === 'cuidador' ? '12345678' : '87654321';

    // Crear una nueva persona
    const persona = await models.Persona.create({
      nombre: rol.charAt(0).toUpperCase() + rol.slice(1),
      apellido: 'Test',
      dni,
      tipo: rolUsuario,
      codVinculacion: 'VINC1234'
    });

    this.personas[rol] = persona;
    console.log('------ Persona creada:', persona);

    let usuario = await models.Usuario.findOne({ where: { email: mail } });
    if (!usuario) {
      const userId = uuidv4();
      usuario = await models.Usuario.create({
        ID: userId,
        email: mail,
        password,
        Persona_ID: persona.ID
      });
    }
    this.usuarios[rol] = usuario;

    // Crear el tipo particular (Cuidador o Paciente)
    if (rol === 'cuidador') {
      await models.Cuidador.create({
        ID: persona.ID,
        relacion_paciente: 'Padre',
        especialidad: 'Geriatría',
        contacto: '123456789'
      });
      console.log('------ Cuidador creado:', persona.ID);
    } else if (rol === 'paciente') {
      await models.Paciente.create({
        ID: persona.ID,
        historial_medico: 'Historial médico de prueba',
        contacto_emergencia: '987654321'
      });
      console.log('------ Paciente creado:', persona.ID);
    }
  }

  async loginUsuarios() {
    if (!this.app) {
      throw new Error('App not initialized. Call setApp() first.');
    }

    for (const rol of Object.keys(this.usuarios)) {
      const response = await request(this.app)
        .post('/api/auth/sign-in')
        .send({ email: this.usuarios[rol].email, password: 'TestPass123' });

      if (response.headers['set-cookie']) {
        const cookie = response.headers['set-cookie'][0];
        this.tokens[rol] = cookie.split(';')[0].split('=')[1];
      }
    }
  }

  async cleanupUsuarios() {
    try {
      console.log('Limpiando usuarios de prueba...');

      // Eliminar usuarios
      await models.Usuario.destroy({
        where: {
          email: {
            [Op.in]: [
              'cuidador.test@example.com',
              'paciente.test@example.com'
            ]
          }
        }
      });
      console.log('---------Usuarios eliminados.');
      //eliminar cuidadores
      await models.Cuidador.destroy({
        where: {
          ID: {
            [Op.in]: [
              this.personas.cuidador.ID
            ]
          }
        }
      });
      console.log('---------Cuidadores eliminados.');
      //eliminar pacientes
      await models.Paciente.destroy({
        where: {
          ID: {
            [Op.in]: [
              this.personas.paciente.ID
            ]
          }
        }
      });
      console.log('---------Pacientes eliminados.');

      // Eliminar personas
      await models.Persona.destroy({
        where: {
          dni: {
            [Op.in]: [
              '12345678',
              '87654321'
            ]
          }
        }
      });
      console.log('---------Personas eliminadas.');
    } catch (error) {
      console.error('Error al limpiar usuarios de prueba:', error);
    }
  }

  getAuthenticatedRequest(rol = 'cuidador') {
    if (!this.app) {
      throw new Error('App not initialized. Call setApp() first.');
    }
    console.log('estoy en getAuthenticatedRequest');
    const agent = request.agent(this.app);
    agent.set('Cookie', [`jwt=${this.tokens[rol]}`]);
    console.log(`agent seteado con cookie valor de:  ${this.tokens[rol]}`);
    return agent;
  }

  getPersonaId(rol = 'cuidador') {
    return this.personas[rol].ID;
  }

}
export default new TestUsuarios();