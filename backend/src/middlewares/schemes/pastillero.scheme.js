import configureJoi from '../../utils/joiConfig.js'
const Joi = configureJoi()

const save = Joi.object({
  imagenURL: Joi.string().max(45).allow(null),
  PacienteID: Joi.number().integer().positive().required(),
  MedCuidadorID: Joi.number().integer().positive().required(),
  colorPastillero: Joi.string().max(45).allow(null),
  horarioDiario: Joi.string().max(45).required(),
  dosis: Joi.number().integer().positive().required()
})

const validateId = Joi.object({
  id: Joi.number().integer().positive().required()
})

const validations = {
  save,
  validateId
}

export default validations
