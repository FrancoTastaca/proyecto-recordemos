import { test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import app from '../../app.js' // Ajusta la ruta según sea necesario
import models from '../bd/models/index.Models.js'
import bcrypt from 'bcryptjs'
import authController from '../controllers/auth.controller.js'

const request = supertest(app)

beforeEach(async () => {
  // Configura los datos necesarios antes de las pruebas
})

afterEach(async () => {
  // Limpia los datos de prueba después de cada test
  await models.Usuario.destroy({ where: {}, truncate: true })
  await models.Persona.destroy({ where: {}, truncate: true })
})

test('Debe autenticar y retornar un JWT si las credenciales son correctas', async () => {
  const mockUser = {
    ID: 1,
    email: 'test@example.com',
    password: await bcrypt.hash('password', 10),
    nombre_usuario: 'testuser',
    rol: 'Paciente',
    Persona_ID: 1
  }
  await models.Usuario.create(mockUser)

  const response = await request
    .post('/auth/sign-in')
    .send({ email: 'test@example.com', password: 'password' })

  assert.strictEqual(response.status, 200)
  assert.strictEqual(response.body.success, true)
  assert.ok(response.body.data.token)
  assert.strictEqual(response.body.data.id, mockUser.ID)
})

test('Debe retornar un error si las credenciales son incorrectas', async () => {
  const req = { body: { email: 'test@example.com', password: 'wrongpassword' } }
  const res = {}
  const next = (err) => res.error = err

  await authController.login(req, res, next)

  assert.ok(res.error instanceof Error)
})

test('Debe registrar un nuevo usuario correctamente', async () => {
  const mockPersona = {
    id: 1,
    nombre: 'Nombre',
    apellido: 'Apellido',
    dni: '12345678',
    fecha_nacimiento: '2000-01-01',
    tipo: 'Tipo'
  }
  await models.Persona.create(mockPersona)

  const response = await request
    .post('/auth/sign-up')
    .send({
      idPersona: 1,
      nombreUsuario: 'testuser',
      email: 'test@example.com',
      password: 'password',
      rol: 'Paciente'
    })

  assert.strictEqual(response.status, 200)
  assert.strictEqual(response.body.success, true)
  assert.strictEqual(response.body.message, 'Usuario creado correctamente')
  assert.strictEqual(typeof response.body.data.id, 'number')
})
