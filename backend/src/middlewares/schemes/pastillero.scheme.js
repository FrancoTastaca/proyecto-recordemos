import configureJoi from '../../utils/joiConfig.js';
const Joi = configureJoi();

const save = Joi.object({
  imagen_url: Joi.string().max(45).allow(null),
  Paciente_ID: Joi.number().integer().positive().required(),
  Cuidador_ID: Joi.number().integer().positive().required(),
  color_pastillero: Joi.string().max(45).allow(null),
  horario_diario: Joi.string().max(45).required(),
  dosis: Joi.number().integer().positive().required()
});

const validateId = Joi.object({
  id: Joi.number().integer().positive().required()
})
const update= save.keys({
  id: Joi.number().integer().positive().required()
})
const validations = {
  save,
  update,
  validateId
};

export default validations;