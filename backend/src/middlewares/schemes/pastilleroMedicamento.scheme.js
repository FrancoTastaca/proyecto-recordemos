import configureJoi from '../../utils/joiConfig.js';
const Joi = configureJoi();

const save = Joi.object({
  Medicamento_ID: Joi.number().integer().positive().required(),
  medicamento_imagen: Joi.string().max(45).allow(null),
  Pastillero_ID: Joi.number().integer().positive().required()
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