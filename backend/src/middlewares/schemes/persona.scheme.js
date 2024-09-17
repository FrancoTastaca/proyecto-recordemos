import configureJoi from '../../utils/joiConfig.js';
const Joi = configureJoi();

const save = Joi.object({
  nombre: Joi.string().max(45).required(),
  apellido: Joi.string().max(45).required(),
  dni: Joi.string().max(45).required(),
  tipo: Joi.string().valid('P', 'C').required()
});

const read = Joi.object({
  id: Joi.number().integer().positive().required()
});

const remove = Joi.object({
  id: Joi.number().integer().positive().required()
});

const update = save.keys({
  id: Joi.number().integer().positive().required()
});

const validations = {
  save,
  update,
  read,
  remove
};

export default validations;