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

export default Pastillero
