import sequelize from '../config/bd.config.js'; 
import Cuidador from './cuidador.js';
import Persona from './persona.js';
import Paciente from './paciente.js';
import Medicamento from './medicamento.js';
import PastilleroAlarma from './pastilleroAlarma.js';
import HistorialDosis from './historialDosis.js';
import Usuario from './usuario.js';
import Vademecum from './vademecum.js';
import PastilleroMedicamento from './pastilleroMedicamento.js';
import picocolors from 'picocolors';

// Definir las asociaciones entre los modelos
const initAssociations = () => {
  // Asociación de HistorialDosis con PastilleroAlarma
  HistorialDosis.belongsTo(PastilleroAlarma, { foreignKey: 'Pastillero_ID' });
  PastilleroAlarma.hasMany(HistorialDosis, { foreignKey: 'Pastillero_ID' });

  // Asociación de Persona con Paciente y Cuidador
  Persona.hasOne(Paciente, { foreignKey: 'ID', as: 'paciente' });
  Paciente.belongsTo(Persona, { foreignKey: 'ID' });

  Persona.hasOne(Cuidador, { foreignKey: 'ID', as: 'cuidador' });
  Cuidador.belongsTo(Persona, { foreignKey: 'ID' });

  // Asociación de PastilleroAlarma con Paciente y Cuidador
  PastilleroAlarma.belongsTo(Paciente, { foreignKey: 'Paciente_ID' });
  PastilleroAlarma.belongsTo(Cuidador, { foreignKey: 'Cuidador_ID' });

  // Asociación de Usuario con Persona
  Usuario.belongsTo(Persona, { foreignKey: 'Persona_ID', as: 'persona' });

  // Asociación de Vademecum con Medicamento
  Vademecum.hasMany(Medicamento, { foreignKey: 'Vademecum_ID' });
  Medicamento.belongsTo(Vademecum, { foreignKey: 'Vademecum_ID' });

  // Asociación de PastilleroAlarma con Medicamento a través de PastilleroMedicamento
  PastilleroAlarma.belongsToMany(Medicamento, { through: PastilleroMedicamento, foreignKey: 'Pastillero_ID' });
  Medicamento.belongsToMany(PastilleroAlarma, { through: PastilleroMedicamento, foreignKey: 'Medicamento_ID' });

  console.log(picocolors.green('Asociación de los modelos hecha correctamente'));
};

const models = {
  sequelize,
  PastilleroAlarma,
  HistorialDosis,
  Cuidador,
  Persona,
  Paciente,
  Medicamento,
  Usuario,
  Vademecum,
  PastilleroMedicamento,
  initAssociations
};

export default models;