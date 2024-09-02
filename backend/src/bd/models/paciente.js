import { DataTypes } from 'sequelize'
import sequelize from '../config/bd.config.js'

const Paciente = sequelize.define('Paciente', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  historial_medico: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  contacto_emergencia: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  },
  codVinculacion: {
    type: DataTypes.STRING(8),
    allowNull: false,
  }
}, {
  tableName: 'Paciente',
  timestamps: false
})

export default Paciente
