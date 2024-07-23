import { DataTypes } from 'sequelize';
import sequelize from '../config/bd.config.js';
import Persona from './Persona.js';
const Paciente = sequelize.define('Paciente', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  historial_medico: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  contacto_emergencia: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  Persona_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Paciente',
  timestamps: false
});

Paciente.belongsTo(Persona, { foreignKey: 'Persona_ID' });
// Define associations
Paciente.associate = (models) => {
    // Define associations here
};
// Define CRUD functions
Paciente.createPaciente = async (PacienteData) => {
    // Implement the logic to create a new Paciente here
};

Paciente.getPacienteById = async (PacienteId) => {
    // Implement the logic to get a Paciente by ID here
};

Paciente.getAllPacientes = async () => {
    // Implement the logic to get all Pacientes here
};

Paciente.updatePaciente = async (PacienteId, updatedData) => {
    // Implement the logic to update a Paciente here
};

Paciente.deletePaciente = async (PacienteId) => {
    // Implement the logic to delete a Paciente here
};

export default Paciente;