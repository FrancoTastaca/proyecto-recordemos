import { DataTypes } from 'sequelize'
import sequelize from '../config/bd.config.js'
import Medicamento from './medicamento.js'

const PastilleroMedicamento = sequelize.define('PastilleroMedicamento', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  Medicamento_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  medicamento_imagen: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  },
  Pastillero_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'PastilleroMedicamento',
  timestamps: false
})

PastilleroMedicamento.createPastilleroMedicamento = async (MedicamentoID, imagenUrl, PastilleroID) => {
  try {
    const dosis = await PastilleroMedicamento.create({
      Medicamento_ID: MedicamentoID,
      medicamento_imagen: imagenUrl,
      Pastillero_ID: PastilleroID
    })
    return dosis
  } catch (error) {
    throw error
  }
}
// Obtener un PastilleroMedicamento por ID
PastilleroMedicamento.getById = async (PastilleroMedicamentoId) => {
  try {
    const pastilleroMedicamento = await PastilleroMedicamento.findByPk(PastilleroMedicamentoId)
    return pastilleroMedicamento
  } catch (error) {
    throw error
  }
}

PastilleroMedicamento.deletePastilleroMedicamento = async (PastilleroMedicamentoId) => {
  try {
    const result = await PastilleroMedicamento.destroy({
      where: { ID: PastilleroMedicamentoId }
    })
    return result
  } catch (error) {
    throw error
  }
}

// Buscar todas las medicaciones de un Pastillero específico
PastilleroMedicamento.getMedicacionesByPastilleroId = async (PastilleroID) => {
  try {
    const medicaciones = await PastilleroMedicamento.findAll({
      where: { Pastillero_ID: PastilleroID },
      include: [Medicamento]
    })
    return medicaciones
  } catch (error) {
    throw error
  }
}

export default PastilleroMedicamento
