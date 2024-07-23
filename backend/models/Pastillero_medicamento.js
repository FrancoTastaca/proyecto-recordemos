import { DataTypes } from 'sequelize';
import sequelize from '../config/bd.config.js';
import Medicamento from './Medicamento.js';
import Pastillero from './Pastillero.js';

const Pastillero_medicamento = sequelize.define('Pastillero_Pastillero_medicamento', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  Pastillero_medicamento_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imagen_url: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  },
  Pastillero_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Pastillero_Pastillero_medicamento',
  timestamps: false
});


Pastillero_medicamento.belongsTo(Medicamento, { foreignKey: 'Medicamento_ID' });
Pastillero_medicamento.belongsTo(Pastillero, { foreignKey: 'Pastillero_ID' })

// Define CRUD functions
Pastillero_medicamento.createPastillero_medicamento = async (Pastillero_medicamentoData) => {
    // Implement the logic to create a new Pastillero_medicamento here
};

Pastillero_medicamento.getPastillero_medicamentoById = async (Pastillero_medicamentoId) => {
    // Implement the logic to get a Pastillero_medicamento by ID here
};

Pastillero_medicamento.getAllPastillero_medicamentos = async () => {
    // Implement the logic to get all Pastillero_medicamentos here
};

Pastillero_medicamento.updatePastillero_medicamento = async (Pastillero_medicamentoId, updatedData) => {
    // Implement the logic to update a Pastillero_medicamento here
};

Pastillero_medicamento.deletePastillero_medicamento = async (Pastillero_medicamentoId) => {
    // Implement the logic to delete a Pastillero_medicamento here
};

export default Pastillero_medicamento;