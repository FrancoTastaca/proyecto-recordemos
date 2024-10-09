import { DataTypes } from 'sequelize'
import sequelize from '../config/bd.config.js'

const PastilleroAlarma = sequelize.define('PastilleroMedicamento', {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  imagen_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  color_pastillero: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  horario_diario: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  dosis: {
    type: DataTypes.STRING(45),
    allowNull: false
  }
}, {
  tableName: 'PastilleroAlarma',
  timestamps: false
})

export default PastilleroAlarma
