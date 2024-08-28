import Joi from 'joi';

const login = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'El correo electrónico debe ser válido.',
    'any.required': 'El correo electrónico es obligatorio.'
  }),
  password: Joi.string().required().messages({
    'any.required': 'La contraseña es obligatoria.'
  })
});

const register = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'El correo electrónico debe ser válido.',
    'any.required': 'El correo electrónico es obligatorio.'
  }),
  password: Joi.string().pattern(new RegExp('^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-zñÑ\\d@$!%*?&]{6,}$')).required().messages({
    'string.base': 'La contraseña debe ser un texto',
    'string.pattern.base': 'La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial',
    'string.empty': 'La contraseña no puede estar vacía'
  }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Las contraseñas deben coincidir.',
    'any.required': 'La confirmación de la contraseña es obligatoria.'
  }),
  rol: Joi.string().valid('P', 'C').required().messages({
    'any.only': 'El rol debe ser "P" de Paciente o "C" de Cuidador.',
    'any.required': 'El rol es obligatorio.'
  }),
  persona_id: Joi.number().integer().required().messages({
    'number.base': 'El ID de la persona debe ser un número.',
    'any.required': 'El ID de la persona es obligatorio.'
  })
});

const refreshToken = Joi.object({
  refreshToken: Joi.string().required().messages({
    'any.required': 'El token de refresco es obligatorio.'
  })
});

const validations = {
  login,
  register,
  refreshToken
};

export default validations;