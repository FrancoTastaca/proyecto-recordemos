import configureJoi from '../../utils/joiConfig.js';
const Joi = configureJoi();

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const register = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-zñÑ\\d@$!%*?&]{6,}$')).required()
    .messages({
      'string.pattern.base': 'La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial'
    }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
  persona_id: Joi.number().integer().required()
});

const validations = {
  login,
  register,
};

export default validations;
