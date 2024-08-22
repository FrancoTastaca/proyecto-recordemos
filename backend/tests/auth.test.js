import request from 'supertest'
import app from '../app'
import Usuario from '../config/models/usuario'
import Persona from '../config/models/persona'
import { describe, beforeAll, afterAll, test, expect } from '@jest/globals'

let testPersonaId
let testUser

describe('Autenticación y Autorización', () => {
  beforeAll(async () => {
    try {
      console.log('Iniciando creación de persona de prueba')
      const testPersona = await Persona.createPersona({
        nombre: 'Test',
        apellido: 'Person',
        dni: '12345678',
        fecha_nacimiento: new Date(),
        tipo: 'Test Type'
      })
      console.log('Persona de prueba creada:', testPersona)
      testPersonaId = testPersona.ID
      console.log('ID de persona de prueba:', testPersonaId)

      console.log('Iniciando creación de usuario de prueba')
      testUser = await Usuario.register({
        nombre_usuario: 'testuser',
        email: 'test@example.com',
        password: 'TestPassword123!',
        Persona_ID: testPersonaId
      })
      console.log('Usuario de prueba creado:', testUser)
    } catch (error) {
      console.error('Error en beforeAll:', error)
      throw error
    }
  })

  afterAll(async () => {
    try {
      console.log('Limpiando datos de prueba')
      await Usuario.destroy({ where: { email: 'test@example.com' } })
      if (testPersonaId) {
        await Persona.destroy({ where: { ID: testPersonaId } })
      }
      console.log('Limpieza completada')
    } catch (error) {
      console.error('Error en afterAll:', error)
    }
  })

  test('Registro de usuario con Persona_ID válido', async () => {
    // Primero, crear una nueva Persona para el registro
    const nuevaPersona = await Persona.createPersona({
      nombre: 'Nuevo',
      apellido: 'Usuario',
      dni: '87654321',
      fecha_nacimiento: new Date(),
      tipo: 'Test Type'
    })

    const res = await request(app)
      .post('/api/usuario/register')
      .send({
        nombre_usuario: 'newuser',
        email: 'new2user@example.com',
        password: 'NewPassword123!',
        Persona_ID: nuevaPersona.ID
      })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('message', 'Usuario registrado exitosamente')
    expect(res.body).toHaveProperty('user')
    expect(res.body.user).toHaveProperty('id')
    expect(res.body.user).toHaveProperty('email', 'newuser@example.com')
    expect(res.body.user).toHaveProperty('nombre', 'newuser')

    // Limpiar el usuario creado
    await Usuario.destroy({ where: { email: 'newuser@example.com' } })
    await Persona.destroy({ where: { ID: nuevaPersona.ID } })
  })

  test('Registro de usuario con Persona_ID inválido', async () => {
    const res = await request(app)
      .post('/api/usuario/register')
      .send({
        nombre_usuario: 'invaliduser',
        email: 'invaliduser@example.com',
        password: 'InvalidPassword123!',
        Persona_ID: 99999 // Un ID que no existe
      })
    expect(res.statusCode).toBe(400) // Asumiendo que devuelves un 400 para errores de validación
    expect(res.body).toHaveProperty('error')
    expect(res.body.error).toContain('Persona_ID no es válido')
  })

  test('Inicio de sesión exitoso', async () => {
    const res = await request(app)
      .post('/api/usuario/login')
      .send({
        email: 'test@example.com',
        password: 'TestPassword123!'
      })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('message', 'Inicio de sesión exitoso')
    expect(res.body).toHaveProperty('user')
    expect(res.body.user).toHaveProperty('id')
    expect(res.body.user).toHaveProperty('email', 'test@example.com')
    expect(res.body.user).toHaveProperty('nombre')
  })

  test('Inicio de sesión fallido', async () => {
    const res = await request(app)
      .post('/api/usuario/login')
      .send({
        email: 'test@example.com',
        password: 'WrongPassword'
      })
    expect(res.statusCode).toBe(302) // Redirección en caso de fallo
    expect(res.headers.location).toBe('/login')
  })

  test('Acceso a ruta protegida sin autenticación', async () => {
    const res = await request(app).get('/api/usuario/protected')
    expect(res.statusCode).toBe(401)
  })

  test('Acceso a ruta protegida con autenticación', async () => {
    const agent = request.agent(app)
    await agent
      .post('/api/usuario/login')
      .send({
        email: 'test@example.com',
        password: 'TestPassword123!'
      })

    const res = await agent.get('/api/usuario/protected')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('message', 'Acceso permitido a ruta protegida')
  })

  test('Cierre de sesión', async () => {
    const agent = request.agent(app)
    await agent
      .post('/api/usuario/login')
      .send({
        email: 'test@example.com',
        password: 'TestPassword123!'
      })

    const res = await agent.post('/api/usuario/logout')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('message', 'Sesión cerrada exitosamente')
  })

  test('Obtener rol del usuario', async () => {
    const agent = request.agent(app)
    await agent
      .post('/api/usuario/login')
      .send({
        email: 'test@example.com',
        password: 'TestPassword123!'
      })

    const res = await agent.get('/api/usuario/role')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('role')
  })

  test('Obtener información del usuario actual', async () => {
    const agent = request.agent(app)
    await agent
      .post('/api/usuario/login')
      .send({
        email: 'test@example.com',
        password: 'TestPassword123!'
      })

    const res = await agent.get('/api/usuario')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('ID')
    expect(res.body).toHaveProperty('nombre_usuario')
    expect(res.body).toHaveProperty('email')
    expect(res.body).not.toHaveProperty('password')
  })

  test('Actualizar usuario', async () => {
    const agent = request.agent(app)
    await agent
      .post('/api/usuario/login')
      .send({
        email: 'test@example.com',
        password: 'TestPassword123!'
      })

    const res = await agent
      .put('/api/usuario')
      .send({
        nombre_usuario: 'updateduser'
      })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('nombre_usuario', 'updateduser')
  })
})
