import Joi from 'joi';

const save = Joi.object({
  Medicamento_ID: Joi.number().integer().positive().required().messages({
    'number.base': 'El ID del medicamento debe ser un número.',
    'number.integer': 'El ID del medicamento debe ser un número entero.',
    'number.positive': 'El ID del medicamento debe ser un número positivo.',
    'any.required': 'El ID del medicamento es obligatorio.'
  }),
  medicamento_imagen: Joi.string().max(45).allow(null).messages({
    'string.base': 'La imagen del medicamento debe ser un texto.',
    'string.max': 'La imagen del medicamento no puede tener más de 45 caracteres.'
  }),
  Pastillero_ID: Joi.number().integer().positive().required().messages({
    'number.base': 'El ID del pastillero debe ser un número.',
    'number.integer': 'El ID del pastillero debe ser un número entero.',
    'number.positive': 'El ID del pastillero debe ser un número positivo.',
    'any.required': 'El ID del pastillero es obligatorio.'
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