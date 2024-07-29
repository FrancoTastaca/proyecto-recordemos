import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Usuario from '../models/usuario.js';
import picocolors from 'picocolors';

passport.serializeUser((user,done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id,done) => {
    const user = await Usuario.findByPk(id)
    done(null,user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      console.log('Iniciando proceso de registro'); // Log inicial
      // Verifica si el usuario ya existe
      const existingUser = await Usuario.findOne({ where: { email } });
      if (existingUser) {
        console.log('El correo electrónico ya está registrado'); // Log si el usuario ya existe
        return done(null, false, { message: 'El correo electrónico ya está registrado' });
      }
      // Crea el nuevo usuario
      console.log('Creando nuevo usuario'); // Log antes de crear el usuario
      console.log(
        picocolors.red('Datos de registro:'),
        '\n' + picocolors.blue('Email:') + ' ' + picocolors.green(email),
        '\n' + picocolors.blue('Password:') + ' ' + picocolors.green(password),
        '\n' + picocolors.blue('Nombre de usuario:') + ' ' + picocolors.green(req.body.nombre_usuario),
        '\n' + picocolors.blue('Persona_ID:') + ' ' + picocolors.green(req.body.Persona_ID)
      );      
      
      const newUser = await Usuario.register({
        nombre_usuario: req.body.nombre_usuario,
        email,
        password,
        Persona_ID: req.body.Persona_ID
      });
      console.log('Usuario creado exitosamente'); // Log después de crear el usuario
      return done(null, newUser);
    } catch (error) {
      console.error('Error en el proceso de registro:', error); // Log del error
      return done(error);
    }
  }));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    const usuario = await Usuario.findOne({
        where: { email: email },
    });

    if (!usuario) {
        return done(null, false, req.flash('signinMessage', 'Usuario no encontrado'));
    }
    const validPassword = await usuario.validatePassword(password);
    if (!validPassword) {
        return done(null, false, req.flash('signinMessage', 'Contraseña incorrecta'));
    }
    return done(null, usuario);
}));

export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'No autorizado' });
  };
  
export default  passport;