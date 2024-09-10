import errors from '../utils/errors.js'

const errorHandler = (err, req, res, next) => {
  const response = {
    success: false,
    error: {
      code: err.code || 500,
      message: err.message || 'Internal server error',
      details: []
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

  res.status(response.error.code).json(response)
}

export default errorHandler
