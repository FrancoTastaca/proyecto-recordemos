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

Cuidador.createCuidador = async (cuidadorData) => {
  try {
    const cuidador = await Cuidador.create(cuidadorData);
    return cuidador;
  } catch (error) {
    throw error;
  }
};

Cuidador.readCuidador = async (cuidadorId) => {
  try {
    const cuidador = await Cuidador.findByPk(cuidadorId);
    return cuidador;
  } catch (error) {
    throw error;
  }
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