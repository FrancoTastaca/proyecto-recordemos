import { DataTypes } from 'sequelize'
import sequelize from '../config/bd.config.js'

const Medicamento = sequelize.define('Medicamento', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  principio_activo: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  marca_comercial: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  presentacion: {
    type: DataTypes.STRING(45),
    allowNull: false
  }
}, {
  tableName: 'Medicamento',
  timestamps: false
})

export default Medicamento
