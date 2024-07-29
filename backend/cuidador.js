import { DataTypes } from 'sequelize';
import sequelize from '../config/bd.config.js';

const Cuidador = sequelize.define('Cuidador', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true 
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

Cuidador.createCuidador = async (cuidadorData) => {
  try {
    const cuidador = await Cuidador.create(cuidadorData);
    return cuidador;
  } catch (error) {
    throw error;
  }
};

Cuidador.findByPersonaId = async (personaId) => {
  return await Cuidador.findOne({ where: { Persona_ID: personaId } });
};

Cuidador.updateCuidador = async (cuidadorId, cuidadorData) => {
  try {
    const result = await Cuidador.update(cuidadorData, {
      where: { ID: cuidadorId }
    });
    return result;
  } catch (error) {
    throw error;
  }
};

Cuidador.deleteCuidador = async (cuidadorId) => {
  try {
    const result = await Cuidador.destroy({
      where: { ID: cuidadorId }
    });
    return result;
  } catch (error) {
    throw error;
  }
};
export default Cuidador;