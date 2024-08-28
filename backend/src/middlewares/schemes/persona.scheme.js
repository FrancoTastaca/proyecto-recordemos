import Joi from 'joi';

const save = Joi.object({
  nombre: Joi.string().max(45).required().messages({
    'string.base': 'El nombre debe ser un texto.',
    'string.max': 'El nombre no puede tener más de 45 caracteres.',
    'any.required': 'El nombre es obligatorio.'
  }),
  apellido: Joi.string().max(45).required().messages({
    'string.base': 'El apellido debe ser un texto.',
    'string.max': 'El apellido no puede tener más de 45 caracteres.',
    'any.required': 'El apellido es obligatorio.'
  }),
  dni: Joi.string().max(45).required().messages({
    'string.base': 'El DNI debe ser un texto.',
    'string.max': 'El DNI no puede tener más de 45 caracteres.',
    'any.required': 'El DNI es obligatorio.'
  }),
  fecha_nacimiento: Joi.date().required().messages({
    'date.base': 'La fecha de nacimiento debe ser una fecha válida.',
    'any.required': 'La fecha de nacimiento es obligatoria.'
  }),
  tipo: Joi.string().valid('P', 'C').required().messages({
    'string.base': 'El tipo debe ser un texto.',
    'any.only': 'El tipo debe ser uno de los siguientes valores: P, C.',
    'any.required': 'El tipo es obligatorio.'
  })
});

const read = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'El ID debe ser un número.',
    'number.integer': 'El ID debe ser un número entero.',
    'number.positive': 'El ID debe ser un número positivo.',
    'any.required': 'El ID es obligatorio.'
  })
});

const remove = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'El ID debe ser un número.',
    'number.integer': 'El ID debe ser un número entero.',
    'number.positive': 'El ID debe ser un número positivo.',
    'any.required': 'El ID es obligatorio.'
  })
});

const update = save.keys({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'El ID debe ser un número.',
    'number.integer': 'El ID debe ser un número entero.',
    'number.positive': 'El ID debe ser un número positivo.',
    'any.required': 'El ID es obligatorio.'
  })
});

const validations = {
  save,
  update,
  read,
  remove
};

export default validations;