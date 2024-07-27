import express from 'express';
import Usuario from '../models/usuario.js';
import passport, { isAuthenticated } from '../controllers/passport.js';
import { body, param, validationResult } from 'express-validator';

const router = express.Router();

// Middleware de validación
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

// Validaciones comunes
const userValidations = [
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('nombre').notEmpty().trim().escape().withMessage('El nombre es requerido'),
  body('Persona_ID').isInt().withMessage('Persona_ID debe ser un número entero')
];
router.post('/register', validate(userValidations), (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Error interno del servidor', error: err.message });
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
      }
      return res.json({ message: 'Usuario registrado exitosamente', user: { id: user.id, email: user.email, nombre: user.nombre } });
    });
  })(req, res, next);
});

router.post('/login', validate([
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
]), (req, res, next) => {
  passport.authenticate('local-signin', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Error interno del servidor', error: err.message });
    }
    if (!user) {
      return res.status(400).json({ message: info.message || 'Credenciales inválidas' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
      }
      return res.json({ message: 'Inicio de sesión exitoso', user: { id: user.id, email: user.email, nombre: user.nombre } });
    });
  })(req, res, next);
});

router.post('/logout', isAuthenticated, (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cerrar sesión', error: err.message });
    }
    res.json({ message: 'Sesión cerrada exitosamente' });
  });
});

// GET /usuario/me
router.get('/me', isAuthenticated, async (req, res) => {
  try {
    const usuario = await Usuario.readUsuario(req.user.id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
  }
});

// PUT /usuario/me
router.put('/me', isAuthenticated, validate(userValidations), async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.updateUsuario(req.user.id, req.body);
    if (usuarioActualizado[0] === 1) {
      const usuario = await Usuario.readUsuario(req.user.id);
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
});

// GET /usuario
router.get('/', async (_, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
});

// GET /usuario/:id
router.get('/:id', validate([
  param('id').isInt().withMessage('ID debe ser un número entero')
]), async (req, res) => {
  try {
    const usuario = await Usuario.readUsuario(req.params.id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
  }
});

// POST /usuario
router.post('/', validate(userValidations), async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.createUsuario(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
});

// PUT /usuario/:id
router.put('/:id', validate([
  param('id').isInt().withMessage('ID debe ser un número entero'),
  ...userValidations
]), async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.updateUsuario(req.params.id, req.body);
    if (usuarioActualizado[0] === 1) {
      const usuario = await Usuario.readUsuario(req.params.id);
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
});

// DELETE /usuario/:id
router.delete('/:id', validate([
  param('id').isInt().withMessage('ID debe ser un número entero')
]), async (req, res) => {
  try {
    const result = await Usuario.deleteUsuario(req.params.id);
    if (result === 1) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
});

export default router;
