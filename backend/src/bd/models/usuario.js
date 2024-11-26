import { DataTypes } from 'sequelize'
import { sequelize } from '../config/bd.config.js';

const Usuario = sequelize.define('Usuario', {
  ID: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
    field: 'contrasena'
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    field: 'correo_electronico'
  },
  pushToken: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'push_token'
  }
}, {
  tableName: 'Usuario',
  timestamps: false
})

export default Usuario
