import configureJoi from '../../utils/joiConfig.js';
const Joi = configureJoi();

const create = Joi.object({
  idVademecum: Joi.number().integer().positive().required(),
  notas: Joi.string().allow(null, ''),
  marca: Joi.string().max(45).required(),
  medicamento_imagen: Joi.string().max(45).allow(null, ''),
  idCuidador: Joi.number().integer().positive().required()
});

const validateId = Joi.object({
  id: Joi.number().integer().positive().required()
});

const validations = {
  create,
  validateId
};

export default validations;