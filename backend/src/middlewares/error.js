import errors from '../utils/errors.js'
import multer from 'multer' // Importar multer

const errorHandler = (err, req, res, next) => {
  const response = {
    success: false,
    error: {
      code: err.code || 500,
      message: err.message || 'Internal server error',
      details: err.details || null
    }
  }

  if (err.isJoi) {
    response.error.code = errors.ValidationError.code || 400
    response.error.message = errors.ValidationError.message || 'Error de validación'
    response.error.details = err.details.map(detail => {
      return {
        message: detail.message,
        type: detail.type === 'any.required' ? 'FaltanCampos' : 'ValidationError'
      }
    })
  }
  // Manejo de errores de Multer
  if (err instanceof multer.MulterError) {
    response.error.code = 400
    response.error.message = 'Error de Multer'
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      response.error.details = [{
        message: `Campo inesperado: ${err.field}. Se esperaba el campo 'image' como etiqueta para la carga del archivo.`,
        type: 'MulterError'
      }]
    } else {
      response.error.details = [{ message: err, type: 'MulterError' }]
    }
  }

  res.status(response.error.code).json(response)
}

export default errorHandler
