const errors = {
  ValidationError: {
    code: 400,
    message: 'Error de validación'
  },
  FaltanCampos: {
    code: 400,
    message: 'Faltan campos en la petición'
  },
  CredencialesInvalidas: {
    code: 401,
    message: 'Sus credenciales son inválidas'
  },
  SesionExpirada: {
    code: 401,
    message: 'Su sesión ha expirado'
  },
  UsuarioNoAutorizado: {
    code: 403,
    message: 'El usuario no está autorizado'
  },
  FaltanParametros: {
    code: 400,
    message: 'Faltan parámetros'
  },
  UsuarioNoPersona: {
    code: 400,
    message: 'El usuario no tiene persona asociada'
  }
};

export default errors;