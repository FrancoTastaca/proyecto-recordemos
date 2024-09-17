import configureJoi from '../../utils/joiConfig.js';
const Joi = configureJoi();

const update = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-zñÑ\\d@$!%*?&]{6,}$')).required()
    .messages({
      'string.pattern.base': 'La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial'
    }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required()
});

const read = Joi.object({
  id: Joi.number().integer().required()
});

const remove = Joi.object({
  id: Joi.number().integer().required()
});

export default {
  update,
  read,
  remove,
};