import { DataTypes } from 'sequelize'
import sequelize from '../config/bd.config.js'

const Vademecum = sequelize.define('Vademecum', {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  principio_activo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  marca_comercial: {
    type: DataTypes.STRING,
    allowNull: true
  },
  presentacion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Vademecum',
  timestamps: false
})

export default Vademecum
