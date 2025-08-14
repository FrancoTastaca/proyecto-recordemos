import { DataTypes } from 'sequelize'
import sequelize from '../config/bd.config.js'

const HistorialDosis = sequelize.define('HistorialDosis', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  fechaRegistrada: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dosisRegistrada: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  horaPrimerNotificacion: {
    type: DataTypes.TIME,
    allowNull: true
  },
  horaSegundaNotificacion: {
    type: DataTypes.TIME,
    allowNull: true
  },
  primerTomoDosis: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  segundoTomoDosis: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  tableName: 'HistorialDosis',
  timestamps: false
})

export default HistorialDosis
