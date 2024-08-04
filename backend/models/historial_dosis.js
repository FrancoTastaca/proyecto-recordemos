import { DataTypes } from 'sequelize'
import sequelize from '../config/bd.config.js'
import Pastillero from './pastillero.js'
import Paciente from './paciente.js'
import Cuidador from './cuidador.js'

const HistorialDosis = sequelize.define('HistorialDosis', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('Tomado', 'No Tomado'),
    allowNull: false
  },
  Pastillero_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'HistorialDosis',
  timestamps: false
})

// Crear una entrada en el historial de dosis
HistorialDosis.createHistorialDosis = async (historialDosisData) => {
  try {
    const historialDosis = await HistorialDosis.create(historialDosisData)
    return historialDosis
  } catch (error) {
    throw error
  }
}
HistorialDosis.getDosisByPaciente_Cuidador = async (PacienteID, CuidadorID) => {
  try {
    const historialDosis = await HistorialDosis.findAll({
      include: [
        {
          model: Pastillero,
          where: { PacienteID, CuidadorID },
          include: [
            { model: Paciente, attributes: ['nombre'] },
            { model: Cuidador, attributes: ['nombre'] }
          ]
        }
      ]
    })
    return historialDosis
  } catch (error) {
    throw error
  }
}

// Leer una entrada del historial de dosis por ID
HistorialDosis.readHistorialDosis = async (historialDosisId) => {
  try {
    const historialDosis = await HistorialDosis.findByPk(historialDosisId)
    return historialDosis
  } catch (error) {
    throw error
  }
}

// Actualizar una entrada en el historial de dosis
HistorialDosis.updateHistorialDosis = async (historialDosisId, historialDosisData) => {
  try {
    const result = await HistorialDosis.update(historialDosisData, {
      where: { ID: historialDosisId }
    })
    return result
  } catch (error) {
    throw error
  }
}

export default HistorialDosis
