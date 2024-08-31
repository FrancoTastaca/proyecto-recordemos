import { DataTypes } from 'sequelize'
import sequelize from '../config/bd.config.js'

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
  dosisRegistrada: {
    type: DataTypes.INTEGER,
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


export default HistorialDosis
