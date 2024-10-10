const errors = {
  ValidationError: {
    code: 400, // Código 400: Solicitud incorrecta. Indica que los datos proporcionados no son válidos.
    message: 'Los datos proporcionados no son válidos. Por favor, revise los campos e intente nuevamente.'
  },
  FaltanCampos: {
    code: 400, // Código 400: Solicitud incorrecta. Indica que faltan campos necesarios en la petición.
    message: 'Faltan campos obligatorios en la solicitud.'
  },
  CredencialesInvalidas: {
    code: 401, // Código 401: No autorizado. Indica que las credenciales proporcionadas son inválidas.
    message: 'Las credenciales proporcionadas son incorrectas. Verifique su correo electrónico y contraseña.'
  },
  SesionExpirada: {
    code: 401, // Código 401: No autorizado. Indica que la sesión del usuario ha expirado.
    message: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.'
  },
  UsuarioNoAutorizado: {
    code: 403, // Código 403: Prohibido. Indica que el usuario no tiene permisos para acceder al recurso.
    message: 'No tiene permisos para acceder a este recurso.'
  },
  FaltanParametros: {
    code: 400, // Código 400: Solicitud incorrecta. Indica que faltan parámetros necesarios en la petición.
    message: 'Faltan parámetros necesarios en la solicitud. Verifique la documentación y asegúrese de incluir todos los parámetros requeridos.'
  },
  UsuarioNoPersona: {
    code: 400, // Código 400: Solicitud incorrecta. Indica que el usuario no tiene una persona asociada.
    message: 'El usuario no tiene una persona asociada. Asegúrese de que el usuario esté correctamente registrado.'
  },
  InternalServerError: {
    code: 500, // Código 500: Error interno del servidor. Indica que ocurrió un error inesperado en el servidor.
    message: 'Ocurrió un error inesperado en el servidor. Por favor, inténtelo más tarde.'
  },
  UsuarioNoEncontrado: {
    code: 404, // Código 404: No encontrado. Indica que el usuario solicitado no existe.
    message: 'El usuario solicitado no existe. Verifique el ID del usuario e intente nuevamente.'
  },
  NotFoundError: {
    code: 404, // Código 404: No encontrado. Indica que el recurso solicitado no existe.
    message: 'El recurso solicitado no se pudo encontrar. Por favor, verifique la URL o el ID del recurso e intente nuevamente.'
  },
  ConflictError: {
    code: 409,
    message: 'La solicitud no se puede completar debido a un conflicto con el estado actual del recurso.'
  }
}

export default errors
