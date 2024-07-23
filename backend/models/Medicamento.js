import { DataTypes } from 'sequelize';
import sequelize from '../config/bd.config.js';

const Medicamento = sequelize.define('Medicamento', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    principio_activo: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    marca_comercial: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    presentacion: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'Medicamento',
    timestamps: false
  });

// Define associations
Medicamento.associate = (models) => {
    // Define associations here
};
// Define CRUD functions
Medicamento.createMedicamento = async (medicamentoData) => {
    // Implement the logic to create a new medicamento here
};

Medicamento.getMedicamentoById = async (medicamentoId) => {
    // Implement the logic to get a medicamento by ID here
};

Medicamento.getAllMedicamentos = async () => {
    // Implement the logic to get all medicamentos here
};

Medicamento.updateMedicamento = async (medicamentoId, updatedData) => {
    // Implement the logic to update a medicamento here
};

Medicamento.deleteMedicamento = async (medicamentoId) => {
    // Implement the logic to delete a medicamento here
};

export default Medicamento;