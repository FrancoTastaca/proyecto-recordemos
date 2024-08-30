import configureJoi from "../../utils/joiConfig.js";
const Joi = configureJoi();

const crearPaciente = Joi.object({
    nombre: Joi.string().max(45).required(),
    apellido: Joi.string().max(45).required(),
    dni: Joi.string().max(45).required(),
    tipo: Joi.string().valid('P').required().messages({
        'any.only': 'El tipo debe ser "P" para paciente o "C" para cuidador.',
        'any.required': 'El tipo es un campo obligatorio.'
    }),
    codVinculacion: Joi.string().pattern(/^[A-F0-9]{8}$/).required().messages({
        'string.pattern.base': 'El código de vinculación debe tener exactamente 8 caracteres en formato hexadecimal (A-F, 0-9).',
        'any.required': 'El código de vinculación es un campo obligatorio.'
    }),    
    historial_medico: Joi.string().max(45).optional(),
    contacto_emergencia: Joi.string().max(45).allow(null, '').optional()
});

const read = Joi.object({
    id: Joi.number().integer().positive().required()
  });
  
const remove = Joi.object({
    id: Joi.number().integer().positive().required()
  });
  
const update = crearPaciente.keys({
    id: Joi.number().integer().positive().required()
  });
  
const validations = {
    crearPaciente,
    update,
    read,
    remove
};

export default validations;
