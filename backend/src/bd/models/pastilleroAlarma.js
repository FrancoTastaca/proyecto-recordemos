import { DataTypes } from 'sequelize'
import sequelize from '../config/bd.config.js'

const PastilleroAlarma = sequelize.define('PastilleroMedicamento', {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  imagen_url: {
    type: DataTypes.STRING(45),
    allowNull: true
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
    allowNull: true
  },
  horario_diaro: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  dosis: {
    type: DataTypes.STRING(45),
    allowNull: false
  }
}, {
  tableName: 'PastilleroAlarma',
  timestamps: false
})

export default PastilleroAlarma
