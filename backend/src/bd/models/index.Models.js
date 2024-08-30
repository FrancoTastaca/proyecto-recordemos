import sequelize from '../config/bd.config.js'; 
import Cuidador from './cuidador.js';
import Persona from './persona.js';
import Paciente from './paciente.js';
import Medicamento from './medicamento.js';
import Pastillero from './pastillero.js';
import HistorialDosis from './historialDosis.js';
import PastilleroMedicamento from './pastillero_medicamento.js';
import Usuario from './usuario.js';
import picocolors from 'picocolors';

// Definir las asociaciones entre los modelos
const initAssociations = () => {
  HistorialDosis.belongsTo(Pastillero, { foreignKey: 'Pastillero_ID' });
  
  
  Persona.hasOne(Paciente, { foreignKey: 'ID', as: 'paciente' });
  Paciente.belongsTo(Persona, { foreignKey: 'ID' });
  
  Persona.hasOne(Cuidador, { foreignKey: 'ID', as: 'cuidador' });
  Cuidador.belongsTo(Persona, { foreignKey: 'ID' });
  
  PastilleroMedicamento.belongsTo(Medicamento, { foreignKey: 'Medicamento_ID' });
  PastilleroMedicamento.belongsTo(Pastillero, { foreignKey: 'Pastillero_ID' });
  
  Pastillero.belongsTo(Paciente, { foreignKey: 'Paciente_ID' });
  Pastillero.belongsTo(Cuidador, { foreignKey: 'Cuidador_ID' });
  Pastillero.hasMany(HistorialDosis, { foreignKey: 'Pastillero_ID' });
  
  Usuario.belongsTo(Persona, { foreignKey: 'Persona_ID', as: 'persona' });

  console.log(picocolors.green('Asociación de los modelos hecha correctamente'));
};

// Exportar los modelos y la función initAssociations
const models = {
  sequelize,
  Pastillero,
  HistorialDosis,
  Cuidador,
  Persona,
  Paciente,
  Medicamento,
  PastilleroMedicamento,
  Usuario,
  initAssociations
};

export default models;