import { DataTypes } from 'sequelize';
import sequelize from '../config/bd.config.js';

const Historial_Dosis = sequelize.define('Historial_Dosis', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
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
    type: DataTypes.ENUM('Pendiente', 'Tomado', 'No Tomado'),
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

// Define associations
Historial_Dosis.associate = (models) => {
    // Define associations here
};
// Define CRUD functions
Historial_Dosis.createHistorial_Dosis = async (Historial_DosisData) => {
    // Implement the logic to create a new Historial_Dosis here
};

Historial_Dosis.getHistorial_DosisById = async (Historial_DosisId) => {
    // Implement the logic to get a Historial_Dosis by ID here
};

Historial_Dosis.getAllHistorial_Dosiss = async () => {
    // Implement the logic to get all Historial_Dosiss here
};

Historial_Dosis.updateHistorial_Dosis = async (Historial_DosisId, updatedData) => {
    // Implement the logic to update a Historial_Dosis here
};

Historial_Dosis.deleteHistorial_Dosis = async (Historial_DosisId) => {
    // Implement the logic to delete a Historial_Dosis here
};

export default Historial_Dosis;