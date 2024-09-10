import { DataTypes } from 'sequelize'
import sequelize from '../config/bd.config.js'

const Persona = sequelize.define('Persona', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('P', 'C'),
    allowNull: false
  },
  codVinculacion: {
    type: DataTypes.STRING(8),
    allowNull: false
  }
}, {
  tableName: 'Persona',
  timestamps: false
})

export default Persona
