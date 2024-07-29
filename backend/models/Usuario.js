import { DataTypes } from 'sequelize';
import sequelize from '../config/bd.config.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import Cuidador from './cuidador.js';
import Paciente from './paciente.js';

const Usuario = sequelize.define('Usuario', {
  ID: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false
  },
  nombre_usuario: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
    field: 'contrasena'
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    field: 'correo_electronico'
  },
  Persona_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Personas',
      key: 'ID'
    }
  }
}, {
  tableName: 'Usuario',
  timestamps: false
});


Usuario.register = async ({ nombre_usuario, email, password, Persona_ID }) => {
  const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(12));
  return Usuario.create({
    ID: uuidv4(),
    nombre_usuario,
    email,
    password: hashedPassword,
    Persona_ID
  });
};

Usuario.prototype.validatePassword = async function(password) {
  return bcrypt.compareSync(password, this.contrasena);
};

Usuario.readUsuario = async function (id) {
  try {
    const usuario = await this.findByPk(id, {
      include: [{ model: Persona }]
    });
    return usuario;
  } catch (error) {
    throw error;
  }
};
Usuario.updateUsuario = async function (id, data) {
  try {
    const result = await this.update(data, {
      where: { id: id }
    });
    return result;
  } catch (error) {
    throw error;
  }
};
Usuario.deleteUsuario = async function (id) {
  try {
    const result = await this.destroy({
      where: { id: id }
    });
    return result;
  } catch (error) {
    throw error;
  }
};

Usuario.prototype.getRole = async function () {
  const personaId = this.Persona_ID;
  const cuidador = await Cuidador.findByPersonaId(personaId);
  if (cuidador) {
    return 'Cuidador';
  }

  const paciente = await Paciente.findByPersonaId(personaId);
  if (paciente) {
    return 'Paciente';
  }

  return 'Desconocido'; 
};

export default Usuario;