/* import express from 'express'
import Usuario from '../models/usuario.js'
import constraints from '../utils/constraints.js'
import picocolors from 'picocolors'

// Funcion auxiliar para excluir la contraseña del usuario
const excludePassword = (usuario) => {
  if (usuario) {
    // eslint-disable-next-line no-unused-vars
    const { password, ...usuarioSinPassword } = usuario.toJSON()
    return usuarioSinPassword
  }
  return null
}
const router = express.Router()

console.log(picocolors.red('Cargando rutas de usuario'))

router.get('/register', (req, res) => {
  // Llamar a la vista de registro
  console.log(picocolors.green('Renderizando vista de registro'))
})

router.post('/register',
  constraints.userConstraints.create,
  passport.authenticate('local-signup', {
    session: false,
    // Se redirige al usuario a la vista deseada si el registro es exitoso, por ahora es la raíz
    successRedirect: '/',
    // Se redirige al usuario a la vista register si el registro falla
    failureRedirect: '/register',
    passReqToCallback: true
  }), (req, res) => {
    res.json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: req.user.id,
        email: req.user.email,
        nombre: req.user.nombre
      }
    })
  })

// Inicio de sesión
router.get('/login', (req, res) => {
  // Llamar a la vista de inicio de sesión
  console.log(picocolors.green('Renderizando vista de inicio de sesión'))
})

router.post('/login',
  constraints.userConstraints.login,
    passport.authenticate('local-signin', {
      session: false,
       // Se redirige al usuario a la vista deseada si el registro es exitoso, por ahora es la raíz
      successRedirect: '/',
       // Se redirige al usuario a la vista de inicio de sesion si el registro falla
      failureRedirect: '/login',
      passReqToCallback: true
    }), (req, res) => {
      res.json({
        message: 'Inicio de sesión exitoso',
        user: {
          id: req.user.id,
          email: req.user.email,
          nombre: req.user.nombre
        }
      })
    }
  )

// Cierre de sesión
router.post('/logout', isAuthenticated, (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Error al cerrar sesión', error: err.message })
    res.json({ message: 'Sesión cerrada exitosamente' })
  })
})

// Obtener rol del usuario
router.get('/role', isAuthenticated, async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.user.id)
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    const role = await usuario.getRole()
    res.json({ role })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el rol del usuario', error: error.message })
  }
})

// Ruta protegida por autenticación y rol
router.get('/protected', isAuthenticated, hasRole(['Cuidador']), (req, res) => {
  res.json({ message: 'Acceso permitido a ruta protegida' })
})

router.get('/:id?', isAuthenticated, async (req, res) => {
  try {
    const userId = req.params.id || req.user.id
    const usuario = await Usuario.findByPk(userId)
    if (usuario) {
      res.json(excludePassword(usuario))
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: error.message })
  }
})

// Actualizar usuario por ID (incluye actualizar usuario actual)
router.put('/:id?', isAuthenticated, constraints.userConstraints.update, async (req, res) => {
  try {
    const userId = req.params.id || req.user.id
    const usuarioActualizado = await Usuario.updateUsuario(userId, req.body)
    if (usuarioActualizado) {
      const usuario = await Usuario.findByPk(userId)
      res.json(excludePassword(usuario))
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message })
  }
})

// Eliminar usuario por ID
router.delete('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const result = await Usuario.deleteUsuario(req.params.id)
    if (result === 1) {
      res.status(204).end()
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message })
    next(error)
  }
})

// Obtener todos los usuarios
router.get('/', async (_, res) => {
  try {
    const usuarios = await Usuario.findAll()
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message })
  }
})

export default router */
import { Router } from 'express';
import usuarioController from '../controllers/usuario.controller.js';
import validate from '../middlewares/validate.js';
import usuarioScheme from '../middlewares/schemes/usuario.scheme.js';

const router = Router();

router.get('/', usuarioController.prueba);
router.post('/', validate(usuarioScheme.crearUsuario), usuarioController.crear);

export default router;