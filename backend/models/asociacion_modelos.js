import Pastillero from './Pastillero.js';
import Historial_Dosis from './Historial_dosis.js';
import Cuidador from './Cuidador.js';
import Persona from './Persona.js';
import Paciente from './Paciente.js';
import Medicamento from './Medicamento.js';
import Pastillero_medicamento from './Pastillero_medicamento.js';
import Usuario from './Usuario.js';
import picocolors from 'picocolors';

Historial_Dosis.belongsTo(Pastillero, { foreignKey: 'Pastillero_ID' });
Cuidador.belongsTo(Persona, { foreignKey: 'Persona_ID' });
Paciente.belongsTo(Persona, { foreignKey: 'Persona_ID' });
Pastillero_medicamento.belongsTo(Medicamento, { foreignKey: 'Medicamento_ID' });
Pastillero_medicamento.belongsTo(Pastillero, { foreignKey: 'Pastillero_ID' })
Pastillero.belongsTo(Paciente, { foreignKey: 'Paciente_ID' });
Pastillero.belongsTo(Cuidador, { foreignKey: 'Cuidador_ID' });
Pastillero.hasMany(Historial_Dosis, { foreignKey: 'Pastillero_ID' });
Usuario.belongsTo(Persona, { foreignKey: 'Persona_ID' });

export const initAssociations = () => {
    console.log(picocolors.green('Asocializacion de los modelos hecha correctamente'));
};
