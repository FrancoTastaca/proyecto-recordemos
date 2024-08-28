import Joi from 'joi';

const save = Joi.object({
  imagen_url: Joi.string().max(45).allow(null).messages({
    'string.base': 'La URL de la imagen debe ser un texto.',
    'string.max': 'La URL de la imagen no puede tener más de 45 caracteres.'
  }),
  Paciente_ID: Joi.number().integer().positive().required().messages({
    'number.base': 'El ID del paciente debe ser un número.',
    'number.integer': 'El ID del paciente debe ser un número entero.',
    'number.positive': 'El ID del paciente debe ser un número positivo.',
    'any.required': 'El ID del paciente es obligatorio.'
  }),
  Cuidador_ID: Joi.number().integer().positive().required().messages({
    'number.base': 'El ID del cuidador debe ser un número.',
    'number.integer': 'El ID del cuidador debe ser un número entero.',
    'number.positive': 'El ID del cuidador debe ser un número positivo.',
    'any.required': 'El ID del cuidador es obligatorio.'
  }),
  color_pastillero: Joi.string().max(45).allow(null).messages({
    'string.base': 'El color del pastillero debe ser un texto.',
    'string.max': 'El color del pastillero no puede tener más de 45 caracteres.'
  }),
  horario_diario: Joi.string().max(45).required().messages({
    'string.base': 'El horario diario debe ser un texto.',
    'string.max': 'El horario diario no puede tener más de 45 caracteres.',
    'any.required': 'El horario diario es obligatorio.'
  }),
  dosis: Joi.number().integer().positive().required().messages({
    'number.base': 'La dosis debe ser un número.',
    'number.integer': 'La dosis debe ser un número entero.',
    'number.positive': 'La dosis debe ser un número positivo.',
    'any.required': 'La dosis es obligatoria.'
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

const validations = {
  save,
  read,
  remove
};

export default validations;