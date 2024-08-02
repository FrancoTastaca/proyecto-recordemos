import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import Usuario from '../models/usuario.js'
import picocolors from 'picocolors'

passport.serializeUser((user, done) => {
  done(null, user.ID)
})
passport.deserializeUser(async (id, done) => {
  const user = await Usuario.findByPk(id)
  done(null, user)
})

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  try {
    console.log('Iniciando proceso de registro') // Log inicial
        // Verifica si el usuario ya existe
    const existingUser = await Usuario.findOne({ where: { email } })
    if (existingUser) {
      console.log('El correo electrónico ya está registrado') // Log si el usuario ya existe
      return done(null, false, { message: 'El correo electrónico ya está registrado' })
    }
        // Crea el nuevo usuario
    console.log('Creando nuevo usuario') // Log antes de crear el usuario
    console.log(
            picocolors.red('Datos de registro:'),
            '\n' + picocolors.blue('Email:') + ' ' + picocolors.green(email),
            '\n' + picocolors.blue('Password:') + ' ' + picocolors.green(password),
            '\n' + picocolors.blue('Nombre de usuario:') + ' ' + picocolors.green(req.body.nombre_usuario),
            '\n' + picocolors.blue('Persona_ID:') + ' ' + picocolors.green(req.body.Persona_ID)
        )

    const newUser = await Usuario.register({
      nombre_usuario: req.body.nombre_usuario,
      email,
      password,
      Persona_ID: req.body.Persona_ID
    })
    console.log('Usuario creado exitosamente') // Log después de crear el usuario
    return done(null, newUser)
  } catch (error) {
    console.error('Error en el proceso de registro:', error) // Log del error
    return done(error)
  }
}))

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  try {
    console.log('Iniciando proceso de inicio de sesión') // Log inicial
    console.log(
            picocolors.red('Datos de inicio de sesión:'),
            '\n' + picocolors.blue('Email:') + ' ' + picocolors.green(email),
            '\n' + picocolors.blue('Password:') + ' ' + picocolors.green(password)
        )

    const usuario = await Usuario.findOne({
      where: { email: email }
    })

    if (!usuario) {
      console.log('Usuario no encontrado')
      return done(null, false, req.flash('signinMessage', 'Usuario no encontrado'))
    }
    const validPassword = await usuario.validatePassword(password)
    if (!validPassword) {
      console.log('Contraseña incorrecta')
      return done(null, false, req.flash('signinMessage', 'Contraseña incorrecta'))
    }
    console.log('Inicio de sesión exitoso') // Log si el inicio de sesión es exitoso
    return done(null, usuario)
  } catch (error) {
    console.error('Error en el proceso de inicio de sesión:', error) // Log del error
    return done(error)
  }
}))

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).json({ message: 'No autorizado' })
}

export const hasRole = (roles) => {
  return async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'No autorizado' })
    }
    const usuario = await Usuario.findByPk(req.user.id)
    const userRole = await usuario.getRole()
    if (roles.includes(userRole)) {
      return next()
    }

    res.status(403).json({ message: 'No tienes permiso para acceder a este recurso' })
  }
}

export default passport
