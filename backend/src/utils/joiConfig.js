import Joi from 'joi'

const configureJoi = () => {
  return Joi.defaults((schema) => {
    return schema.options({
      allowUnknown: false,
      abortEarly: false,
      messages: {
        'object.unknown': 'El campo {#label} no está permitido.',
        'any.required': 'El campo {#label} es obligatorio.',
        'string.empty': 'El campo {#label} no puede estar vacío.',
        'string.email': 'El campo {#label} debe ser un correo electrónico válido.',
        'string.pattern.base': 'El campo {#label} no cumple con el formato requerido.',
        'number.base': 'El campo {#label} debe ser un número.',
        'any.only': 'El campo {#label} no coincide con el valor esperado.'
      }
    })
  })
}

export default configureJoi
