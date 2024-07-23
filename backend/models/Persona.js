import { DataTypes } from 'sequelize';
import sequelize from '../config/bd.config.js';

const Persona = sequelize.define('Persona', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING(45),
    allowNull: false
  }
}, {
  tableName: 'Persona',
  timestamps: false
});

// Define associations
Persona.associate = (models) => {
    // Define associations here
};
// Define CRUD functions
Persona.createPersona = async (PersonaData) => {
    // Implement the logic to create a new Persona here
};

Persona.getPersonaById = async (PersonaId) => {
    // Implement the logic to get a Persona by ID here
};

Persona.getAllPersonas = async () => {
    // Implement the logic to get all Personas here
};

Persona.updatePersona = async (PersonaId, updatedData) => {
    // Implement the logic to update a Persona here
};

Persona.deletePersona = async (PersonaId) => {
    // Implement the logic to delete a Persona here
};

export default Persona;