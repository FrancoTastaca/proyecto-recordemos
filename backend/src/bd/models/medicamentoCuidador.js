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
    type: DataTypes.STRING(255),
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  tableName: 'MedicamentoCuidador',
  timestamps: true
})

export default MedicamentoCuidador

