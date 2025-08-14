import pico from 'picocolors'
import errors from './errors.js'
import models from '../bd/models/index.Models.js'

// Función auxiliar para manejar transacciones y errores
export async function handleTransaction (callback, next) {
  const transaction = await models.sequelize.transaction()
  try {
    const result = await callback(transaction)
    await transaction.commit()
    return result
  } catch (error) {
    await transaction.rollback()
    console.error(pico.red('Error en la transacción:', error))
    next({
      ...errors.InternalServerError,
      details: 'Error en la transacción: ' + error
    })
  }
}

