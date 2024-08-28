import Joi from 'joi';

const update = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
    'string.guid': 'El ID debe ser un UUID válido.',
    'any.required': 'El ID es obligatorio.'
  }),
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
  })
})

// Esquema de validación para leer un usuario por ID
const read = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.integer': 'El ID debe ser un número entero',
    'any.required': 'El ID es obligatorio'
  })
});

// Esquema de validación para eliminar un usuario por ID
const remove = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.integer': 'El ID debe ser un número entero',
    'any.required': 'El ID es obligatorio'
  })
});

export default {
  update,
  read,
  remove,
};