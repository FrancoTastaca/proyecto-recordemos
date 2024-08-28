import Pastillero from './pastillero.js';
import HistorialDosis from './historialDosis.js';
import Cuidador from './cuidador.js';
import Persona from './persona.js';
import Paciente from './paciente.js';
import Medicamento from './medicamento.js';
import PastilleroMedicamento from './pastillero_medicamento.js';
import Usuario from './usuario.js';
import picocolors from 'picocolors';

// Definir las asociaciones entre los modelos
const initAssociations = () => {
  HistorialDosis.belongsTo(Pastillero, { foreignKey: 'Pastillero_ID' });
  Cuidador.belongsTo(Persona, { foreignKey: 'Persona_ID' });
  Paciente.belongsTo(Persona, { foreignKey: 'Persona_ID' });
  PastilleroMedicamento.belongsTo(Medicamento, { foreignKey: 'Medicamento_ID' });
  PastilleroMedicamento.belongsTo(Pastillero, { foreignKey: 'Pastillero_ID' });
  Pastillero.belongsTo(Paciente, { foreignKey: 'Paciente_ID' });
  Pastillero.belongsTo(Cuidador, { foreignKey: 'Cuidador_ID' });
  Pastillero.hasMany(HistorialDosis, { foreignKey: 'Pastillero_ID' });
  Usuario.belongsTo(Persona, { foreignKey: 'Persona_ID' });

  console.log(picocolors.green('Asociación de los modelos hecha correctamente'));
};

// Exportar los modelos y la función initAssociations
const models = {
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