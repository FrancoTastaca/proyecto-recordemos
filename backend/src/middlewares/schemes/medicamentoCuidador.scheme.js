import configureJoi from '../../utils/joiConfig.js'
const Joi = configureJoi()

const base = Joi.object({
  idVademecum: Joi.number().integer().positive().required(),
  notas: Joi.string().allow(null, ''),
  marca: Joi.string().max(45).required(),
  medicamentoImagen: Joi.string().max(45).allow(null, ''),
  idCuidador: Joi.number().integer().positive().required(),
  image: Joi.any().allow(null)
})

const validateId = Joi.object({
  id: Joi.number().integer().positive().required()
})

const validations = {
  base,
  validateId
}

export default validations

