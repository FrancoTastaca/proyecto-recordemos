import { DataTypes } from 'sequelize'
import sequelize from '../config/bd.config.js'

const Pastillero = sequelize.define('Pastillero', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  imagen_url: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  },
  Paciente_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Cuidador_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  color_pastillero: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  },
  horario_diario: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  dosis: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Pastillero',
  timestamps: false
})

Pastillero.createPastillero = async (pastilleroData) => {
  try {
    const pastillero = await Pastillero.create(pastilleroData)
    return pastillero
  } catch (error) {
    throw error
  }
}

Pastillero.updatePastillero = async (pastilleroId, updatedData) => {
  try {
    const result = await Pastillero.update(updatedData, {
      where: { ID: pastilleroId }
    })
    return result[0] === 1 ? await Pastillero.findByPk(pastilleroId) : null
  } catch (error) {
    throw error
  }
}

export default Pastillero
