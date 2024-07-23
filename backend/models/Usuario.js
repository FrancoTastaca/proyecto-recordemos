import { DataTypes } from 'sequelize';
import sequelize from '../config/bd.config.js';
import Persona from './Persona.js';

const Usuario = sequelize.define('Usuario', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  nombre_usuario: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  codigo_acceso: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  mail: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  Persona_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Usuario',
  timestamps: false
});
// Define associations
Usuario.belongsTo(Persona, { foreignKey: 'Persona_ID' });

// Define CRUD functions
Usuario.createUsuario = async (UsuarioData) => {
    // Implement the logic to create a new Usuario here
};

Usuario.getUsuarioById = async (UsuarioId) => {
    // Implement the logic to get a Usuario by ID here
};

Usuario.getAllUsuarios = async () => {
    // Implement the logic to get all Usuarios here
};

Usuario.updateUsuario = async (UsuarioId, updatedData) => {
    // Implement the logic to update a Usuario here
};

Usuario.deleteUsuario = async (UsuarioId) => {
    // Implement the logic to delete a Usuario here
};

export default Usuario;