import { DataTypes } from 'sequelize';
import sequelize from '../config/bd.config.js';
import Paciente  from './Paciente.js';
import Cuidador from './Cuidador.js';

const Pastillero = sequelize.define('Pastillero', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  imagen_url: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  },
  Paciente_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Cuidador_ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  color_pastillero: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  },
  horario_diario: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  dosis: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Pastillero',
  timestamps: false
});

Pastillero.belongsTo(Paciente, { foreignKey: 'Paciente_ID' });
Pastillero.belongsTo(Cuidador, { foreignKey: 'Cuidador_ID' });

// Define associations
Pastillero.associate = (models) => {
    // Define associations here
};
// Define CRUD functions
Pastillero.createPastillero = async (PastilleroData) => {
    // Implement the logic to create a new Pastillero here
};

Pastillero.getPastilleroById = async (PastilleroId) => {
    // Implement the logic to get a Pastillero by ID here
};

Pastillero.getAllPastilleros = async () => {
    // Implement the logic to get all Pastilleros here
};

Pastillero.updatePastillero = async (PastilleroId, updatedData) => {
    // Implement the logic to update a Pastillero here
};

Pastillero.deletePastillero = async (PastilleroId) => {
    // Implement the logic to delete a Pastillero here
};

export default Pastillero;