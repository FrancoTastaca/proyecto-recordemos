import { DataTypes } from 'sequelize'
import sequelize from '../config/bd.config.js'

const Cuidador = sequelize.define('Cuidador', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  relacion_paciente: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  },
  especialidad: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  },
  contacto: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  },
  codVinculacion: {
    type: DataTypes.STRING(8),
    allowNull: false,
  }
  
}, {
  tableName: 'Cuidador',
  timestamps: false
})

export default Cuidador
