import { DataTypes } from 'sequelize';
import sequelize from '../config/bd.config.js';

const PastilleroMedicamento = sequelize.define('PastilleroMedicamento', {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Pastillero_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Medicamento_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'PastilleroMedicamento',
  timestamps: false
});

export default PastilleroMedicamento;