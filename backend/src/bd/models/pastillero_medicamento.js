import { DataTypes } from 'sequelize'
import sequelize from '../config/bd.config.js'

const PastilleroMedicamento = sequelize.define('PastilleroMedicamento', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  Medicamento_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  medicamento_imagen: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  },
  Pastillero_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'PastilleroMedicamento',
  timestamps: false
})


export default PastilleroMedicamento
