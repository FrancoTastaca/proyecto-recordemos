import { DataTypes } from 'sequelize';
import sequelize from '../config/bd.config.js';
import Pastillero from './pastillero.js';

const Historial_Dosis = sequelize.define('Historial_Dosis', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true 
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('Tomado', 'No Tomado'),
    allowNull: false
  },
  Pastillero_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Historial_Dosis',
  timestamps: false
});

// Crear una entrada en el historial de dosis
Historial_Dosis.createHistorialDosis = async (historialDosisData) => {
  try {
    const historialDosis = await Historial_Dosis.create(historialDosisData);
    return historialDosis;
  } catch (error) {
    throw error;
  }
};
Historial_Dosis.getDosisByPaciente_Cuidador= async (Paciente_ID, Cuidador_ID) =>{
  try {
    const Historial_dosis = await Historial_Dosis.findAll({
      include: [
        {
          model: Pastillero,
          where: { Paciente_ID, Cuidador_ID },
          include: [
            { model: Paciente, attributes: ['nombre'] },
            { model: Cuidador, attributes: ['nombre'] }
          ]
        }
      ]
    });
    return Historial_dosis;
  } catch (error) {
    throw error;
  }
};

// Leer una entrada del historial de dosis por ID
Historial_Dosis.readHistorialDosis = async (historialDosisId) => {
  try {
    const historialDosis = await Historial_Dosis.findByPk(historialDosisId);
    return historialDosis;
  } catch (error) {
    throw error;
  }
};

// Actualizar una entrada en el historial de dosis
Historial_Dosis.updateHistorialDosis = async (historialDosisId, historialDosisData) => {
  try {
    const result = await Historial_Dosis.update(historialDosisData, {
      where: { ID: historialDosisId }
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export default Historial_Dosis;