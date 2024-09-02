import { DataTypes } from 'sequelize';
import sequelize from '../config/bd.config.js';

const Medicamento = sequelize.define('Medicamento', {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  medicamento_imagen: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
}, {
  tableName: 'Medicamento',
  timestamps: false
});

export default Medicamento;