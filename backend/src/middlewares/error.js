import Joi from 'joi';
import errors from '../utils/errors.js';

Joi.defaults(schema => schema.options({ 
  allowUnknown: false, 
  messages: {
    'object.unknown': 'El campo {#label} no está permitido.'
  }
}))

const errorHandler = (err, req, res, next) => {
  const response = {
    success: false,
    error: {
      code: err.code || 500,
      message: err.message || 'Internal server error'
    }
  };

  if (err.isJoi) {
    const errorType = err.details[0].type;
    let errorKey = 'ValidationError';

    if (errorType === 'any.required') {
      errorKey = 'FaltanCampos';
    }

    response.error.code = errors[errorKey].code;
    response.error.message = errors[errorKey].message;
    response.error.details = err.details.map(detail => detail.message).join(', ');
  }

  res.status(response.error.code).json(response);
};

export default errorHandler;