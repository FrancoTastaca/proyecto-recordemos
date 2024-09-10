import { DataTypes } from 'sequelize'
import sequelize from '../config/bd.config.js'

const MedicamentoCuidador = sequelize.define('MedicamentoCuidador', {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  marca: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  medicamento_imagen: {
    type: DataTypes.STRING(45),
    allowNull: true
  }
}, {
  tableName: 'MedicamentoCuidador',
  timestamps: false
})

export default MedicamentoCuidador
