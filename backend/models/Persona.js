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

Persona.createPersona = async (personaData) => {
  try {
    const persona = await Persona.create(personaData);
    return persona;
  } catch (error) {
    throw error;
  }
};

Persona.ByID = async (personaId) => {
  try {
    const persona = await Persona.findByPk(personaId);
    return persona;
  } catch (error) {
    throw error;
  }
};

// Actualizar una persona
Persona.updatePersona = async (personaId, personaData) => {
  try {
    const result = await Persona.update(personaData, {
      where: { ID: personaId }
    });
    return result;
  } catch (error) {
    throw error;
  }
};

// Eliminar una persona
Persona.deletePersona = async (personaId) => {
  try {
    const result = await Persona.destroy({
      where: { ID: personaId }
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export default Persona;