import { DataTypes } from 'sequelize'
import sequelize from '../config/bd.config.js'
import Cuidador from './cuidador.js'
import Paciente from './paciente.js'
import Persona from './persona.js'

const Usuario = sequelize.define('Usuario', {
  ID: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false
  },
  nombre_usuario: {
    type: DataTypes.STRING(45),
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
  Persona_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Personas',
      key: 'ID'
    }
  }
}, {
  tableName: 'Usuario',
  timestamps: false
})

export default Usuario
