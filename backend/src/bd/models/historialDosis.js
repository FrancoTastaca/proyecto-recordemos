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
  dosisRegisrtada: {
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
