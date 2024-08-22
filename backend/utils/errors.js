const errors = {
  ValidationError: {
    code: 400, // Código 400: Solicitud incorrecta. Indica que los datos proporcionados no son válidos.
    message: 'Error de validación'
  },
  FaltanCampos: {
    code: 400, // Código 400: Solicitud incorrecta. Indica que faltan campos necesarios en la petición.
    message: 'Faltan campos en la petición'
  },
  CredencialesInvalidas: {
    code: 401, // Código 401: No autorizado. Indica que las credenciales proporcionadas son incorrectas.
    message: 'Sus credenciales son inválidas'
  },
  SesionExpirada: {
    code: 401, // Código 401: No autorizado. Indica que la sesión del usuario ha expirado.
    message: 'Su sesión ha expirado'
  },
  UsuarioNoAutorizado: {
    code: 403, // Código 403: Prohibido. Indica que el usuario no tiene permisos para acceder al recurso.
    message: 'El usuario no está autorizado'
  },
  FaltanParametros: {
    code: 400, // Código 400: Solicitud incorrecta. Indica que faltan parámetros necesarios en la petición.
    message: 'Faltan parámetros'
  },
  UsuarioNoPersona: {
    code: 400, // Código 400: Solicitud incorrecta. Indica que el usuario no tiene una persona asociada.
    message: 'El usuario no tiene persona asociada'
  },
  InternalServerError: {
    code: 500, // Código 500: Error interno del servidor. Indica que ocurrió un error inesperado en el servidor.
    message: 'Error interno del servidor'
  },
  UsuarioNoEncontrado: {
    code: 404, // Código 404: No encontrado. Indica que el usuario solicitado no existe.
    message: 'Usuario no encontrado'
  }
};

export default errors;