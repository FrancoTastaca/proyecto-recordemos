import { sequelize } from '../config/bd.config.js';
import Cuidador from './cuidador.js'
import Persona from './persona.js'
import Paciente from './paciente.js'
import MedicamentoCuidador from './medicamentoCuidador.js'
import PastilleroAlarma from './pastilleroAlarma.js'
import HistorialDosis from './historialDosis.js'
import Usuario from './usuario.js'
import Vademecum from './vademecum.js'
import picocolors from 'picocolors'

// Definir las asociaciones entre los modelos
const initAssociations = () => {
  // Asociación de Persona con Paciente y Cuidador
  Persona.hasOne(Paciente, { foreignKey: 'ID' })
  Paciente.belongsTo(Persona, { foreignKey: 'ID' })

  Persona.hasOne(Cuidador, { foreignKey: 'ID' })
  Cuidador.belongsTo(Persona, { foreignKey: 'ID' })

  // Asociación de PastilleroAlarma con Paciente y MedicamentoCuidador
  PastilleroAlarma.belongsTo(Paciente, { foreignKey: 'Paciente_ID' })
  Paciente.hasMany(PastilleroAlarma, { foreignKey: 'Paciente_ID' })
  PastilleroAlarma.belongsTo(MedicamentoCuidador, { foreignKey: 'MedicamentoCuidador_ID' })

  // Asociación de HistorialDosis con PastilleroAlarma
  HistorialDosis.belongsTo(PastilleroAlarma, { foreignKey: 'Pastillero_ID' })
  PastilleroAlarma.hasMany(HistorialDosis, { foreignKey: 'Pastillero_ID' })

  // Asociación de Vademecum con MedicamentoCuidador
  Vademecum.hasMany(MedicamentoCuidador, { foreignKey: 'Vademecum_ID' })
  MedicamentoCuidador.belongsTo(Vademecum, { foreignKey: 'Vademecum_ID' })

  // Asociación de MedicamentoCuidador con Cuidador
  Cuidador.hasMany(MedicamentoCuidador, { foreignKey: 'Cuidador_ID' })
  MedicamentoCuidador.belongsTo(Cuidador, { foreignKey: 'Cuidador_ID' })

  // Asociación de Usuario con Persona
  Usuario.belongsTo(Persona, { foreignKey: 'Persona_ID' })
  Persona.hasOne(Usuario, { foreignKey: 'Persona_ID' })

  console.log(picocolors.green('Asociación de los modelos hecha correctamente'))
}

const models = {
  sequelize,
  PastilleroAlarma,
  HistorialDosis,
  Cuidador,
  Persona,
  Paciente,
  MedicamentoCuidador,
  Usuario,
  Vademecum,
  initAssociations
}

export default models
