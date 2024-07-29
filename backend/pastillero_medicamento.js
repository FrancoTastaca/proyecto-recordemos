import { DataTypes } from 'sequelize';
import sequelize from '../config/bd.config.js';
import Medicamento from './medicamento.js';
import Pastillero from './pastillero.js';

const Pastillero_medicamento = sequelize.define('Pastillero_medicamento', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true 
  },
  Medicamento_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  medicamento_imagen: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  },
  Pastillero_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Pastillero_medicamento',
  timestamps: false
});

Pastillero_medicamento.createPastilleroMedicamento = async (MedicamentoID, imagen_url, PastilleroID) => {
  try {
    const dosis = await Pastillero_medicamento.create({
        Medicamento_ID: MedicamentoID,
        medicamento_imagen: imagen_url,
        Pastillero_ID: PastilleroID
    });
    return dosis;
} catch (error) {
    throw error;
}
}
// Obtener un Pastillero_medicamento por ID
Pastillero_medicamento.getById = async (Pastillero_medicamentoId) => {
  try {
    const pastilleroMedicamento = await Pastillero_medicamento.findByPk(Pastillero_medicamentoId);
    return pastilleroMedicamento;
  } catch (error) {
    throw error;
  }
};

Pastillero_medicamento.deletePastillero_medicamento = async (Pastillero_medicamentoId) => {
  try {
    const result = await Pastillero_medicamento.destroy({
      where: { ID: Pastillero_medicamentoId }
    });
    return result;
  } catch (error) {
    throw error;
  }
}

// Buscar todas las medicaciones de un Pastillero específico
Pastillero_medicamento.getMedicacionesByPastilleroId = async (PastilleroID) => {
  try {
    const medicaciones = await Pastillero_medicamento.findAll({
      where: { Pastillero_ID: PastilleroID },
      include: [Medicamento]
    });
    return medicaciones;
  } catch (error) {
    throw error;
  }
};

export default Pastillero_medicamento;