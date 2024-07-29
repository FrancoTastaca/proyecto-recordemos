import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session'; // Asegúrate de haber instalado express-session
import passport from './controllers/auth-local.js'; // Importa la configuración de Passport
import flash from 'connect-flash'; //
import morgan from 'morgan'; 
import cors from 'cors';
import router from './routes/index-routes.js';
import { initAssociations } from './models/asociacion_modelos.js';

const app = express();
initAssociations();
const inTest = false; // Define esta variable según sea necesario

app.use(cors({
  /*origin: 'http://localhost:19006', // Reemplaza esto con la URL de tu app Expo si es diferente
  credentials: true*/
}));

// Configuración de la sesión
app.use(session({
  secret: 'C4amp3onde4m3ricA',
  resave: false,
  saveUninitialized: false
}));

//Inicializar passport  
app.use(passport.authenticate('session'));
app.use(flash());

app.use((req,res,next)=>{
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.estaAuth = req.isAuthenticated();
  console.log(app.locals.signinMessage);
  next();
})
if (!inTest) {
  app.use(morgan('dev'));
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Bienvenido al backend de la aplicación');
});

export default app;
