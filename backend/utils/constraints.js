// utils/constraints.js
import { body, param } from 'express-validator'

const constraints = {
  // Validaciones para el usuario
  userConstraints: {
    create: [
      body('nombre_usuario')
        .trim()
        .notEmpty().withMessage('El nombre de usuario es requerido')
        .isLength({ min: 3, max: 30 }).withMessage('El nombre de usuario debe tener entre 3 y 30 caracteres'),
      body('email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('El email no es válido')
        .normalizeEmail(),
      body('password')
        .notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
        .withMessage('La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial'),
      body('Persona_ID')
        .notEmpty().withMessage('El ID de persona es requerido')
        .isInt().withMessage('El ID de persona debe ser un número entero')
    ],
    login: [
      body('email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('El email no es válido')
        .normalizeEmail(),
      body('password')
        .notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    ],
    update: [
      body('nombre_usuario')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 }).withMessage('El nombre de usuario debe tener entre 3 y 30 caracteres'),
      body('email')
        .optional()
        .trim()
        .isEmail().withMessage('El email no es válido')
        .normalizeEmail(),
      body('password')
        .optional()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
        .withMessage('La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial')
    ],
    getById: [
      param('id').isUUID().withMessage('El ID de usuario debe ser un UUID válido')
    ]
  }

}

export default constraints
