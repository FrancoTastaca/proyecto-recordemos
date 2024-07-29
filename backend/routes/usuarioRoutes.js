import express from 'express';
import Usuario from '../models/usuario.js';
import passport, { isAuthenticated } from '../controllers/auth-local.js';
import { param } from 'express-validator';
import picocolors from 'picocolors';

const router = express.Router();

console.log(picocolors.red('Cargando rutas de usuario'));

/* Registro de usuario
router.post('/register', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) return res.status(500).json({ message: 'Error interno del servidor', error: err.message });
    if (!user) return res.status(400).json({ message: info.message });
    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
      res.json({ message: 'Usuario registrado exitosamente', user: { id: user.id, email: user.email, nombre: user.nombre } });
    });
  })(req, res, next);
});*/
router.post('/register', passport.authenticate('local-signup', { session: false }), (req, res) => {
  res.json({
    message: 'Usuario registrado exitosamente',
    user: {
      id: req.user.id,
      email: req.user.email,
      nombre: req.user.nombre
    }
  });
});

// Inicio de sesión
router.post('/login', (req, res, next) => {
  passport.authenticate('local-signin', (err, user, info) => {
    if (err) return res.status(500).json({ message: 'Error interno del servidor', error: err.message });
    if (!user) return res.status(400).json({ message: info.message || 'Credenciales inválidas' });
    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
      res.json({ message: 'Inicio de sesión exitoso', user: { id: user.id, email: user.email, nombre: user.nombre } });
    });
  })(req, res, next);
});

// Cierre de sesión
router.post('/logout', isAuthenticated, (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Error al cerrar sesión', error: err.message });
    res.json({ message: 'Sesión cerrada exitosamente' });
  });
});

// Obtener rol del usuario
router.get('/role', isAuthenticated, async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.user.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const role = await usuario.getRole();
    res.json({ role });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el rol del usuario', error: error.message });
  }
});

// Obtener usuario actual
router.get('/me', isAuthenticated, async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.user.id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
  }
});

// Actualizar usuario actual
router.put('/me', isAuthenticated, async (req, res) => {
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

// Obtener todos los usuarios
router.get('/', async (_, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
});

// Obtener usuario por ID
router.get('/:id'), async (req, res) => {
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
};

// Crear nuevo usuario
router.post('/', async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.createUsuario(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
});

// Actualizar usuario por ID
router.put('/:id'), async (req, res) => {
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
};

// Eliminar usuario por ID
router.delete('/:id'), async (req, res) => {
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
}

export default router;