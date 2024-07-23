import { DataTypes } from 'sequelize';
import sequelize from '../config/bd.config.js';
import Persona from './Persona.js';

const Cuidador = sequelize.define('Cuidador', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  relacion_paciente: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  especialidad: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  },
  Persona_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  contacto: {
    type: DataTypes.STRING(45),
    allowNull: false
  }
}, {
  tableName: 'Cuidador',
  timestamps: false
});

Cuidador.belongsTo(Persona, { foreignKey: 'Persona_ID' });

// Define associations
Cuidador.associate = (models) => {
    // Define associations here
};
// Define CRUD functions
Cuidador.createCuidador = async (CuidadorData) => {
    // Implement the logic to create a new Cuidador here
};

Cuidador.getCuidadorById = async (CuidadorId) => {
    // Implement the logic to get a Cuidador by ID here
};

Cuidador.getAllCuidadors = async () => {
    // Implement the logic to get all Cuidadors here
};

Cuidador.updateCuidador = async (CuidadorId, updatedData) => {
    // Implement the logic to update a Cuidador here
};

Cuidador.deleteCuidador = async (CuidadorId) => {
    // Implement the logic to delete a Cuidador here
};

export default Cuidador;