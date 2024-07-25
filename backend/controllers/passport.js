import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Usuario from '../models/Usuario.js';


passport.serializeUser((user,done) => {
    done(null,user.ID);
})
passport.deserializeUser(async (id,done) => {
    const user = await Usuario.findByPk(id)
    done(null,user.ID);
})

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    const user = await Usuario.findOne({
        where: { correo_electronico: email },
    });
    if (user) {
        return done(null, false, req.flash('signupMessage', 'El mail ya fue usado'));
    } else {
        try {
            const newUser = await Usuario.register({
                nombre_usuario: req.body['nombre'], // Asumiendo que el nombre de usuario es el campo 'nombre'
                email,
                password,
                Persona_ID: parseInt(req.body['Persona_ID']), // Asumiendo que Persona_ID viene en el cuerpo de la solicitud
            });
            done(null, newUser);
        } catch (error) {
            done(error);
        }
    }
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    const usuario = await Usuario.findOne({
        where: { correo_electronico: email },
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

export default passport;