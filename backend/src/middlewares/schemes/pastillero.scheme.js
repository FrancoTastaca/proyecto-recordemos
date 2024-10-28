import configureJoi from '../../utils/joiConfig.js'
const Joi = configureJoi()

const save = Joi.object({
  imagenURL: Joi.string().max(45).allow(null),
  PacienteID: Joi.number().integer().positive().required(),
  MedCuidadorID: Joi.number().integer().positive().required(),
  colorPastillero: Joi.string().max(45).allow(null),
  horarioDiario: Joi.string().max(45).required(),
  dosis: Joi.number().integer().positive().required(),
  image: Joi.any().allow(null)

})

const validateId = Joi.object({
  id: Joi.number().integer().positive().required()
})

const validateType = Joi.object({
  type: Joi.string().valid('cuidador', 'paciente').required().messages({
    'any.only': 'El tipo debe ser cuidador o paciente'
  })
})

const validations = {
  save,
  validateId,
  validateType
}

export default validations
