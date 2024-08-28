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
    allowNull: false
  },
  Persona_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Paciente',
  timestamps: false
})

export default Paciente
