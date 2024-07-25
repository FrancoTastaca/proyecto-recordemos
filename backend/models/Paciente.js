import { DataTypes } from 'sequelize';
import sequelize from '../config/bd.config.js';

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

Paciente.createPaciente = async (pacienteData) => {
  try {
    const paciente = await Paciente.create(pacienteData);
    return paciente;
  } catch (error) {
    throw error;
  }
};

Paciente.readPaciente = async (pacienteId) => {
  try {
    const paciente = await Paciente.findByPk(pacienteId);
    return paciente;
  } catch (error) {
    throw error;
  }
};

Paciente.updatePaciente = async (pacienteId, pacienteData) => {
  try {
    const result = await Paciente.update(pacienteData, {
      where: { ID: pacienteId }
    });
    return result;
  } catch (error) {
    throw error;
  }
};

Paciente.deletePaciente = async (pacienteId) => {
  try {
    const result = await Paciente.destroy({
      where: { ID: pacienteId }
    });
    return result;
  } catch (error) {
    throw error;
  }
};
export default Paciente;