import { DataTypes } from 'sequelize';
import sequelize from '../config/bd.config.js';
import bcrypt from 'bcryptjs';

const Usuario = sequelize.define('Usuario', {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  nombre_usuario: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(45),
    allowNull: false,
    field: 'contrasena'
  },
  mail: {
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
  const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync (12));
  return Usuario.create({
    nombre_usuario,
    email,
    contrasena: hashedPassword,
    Persona_ID
  });
};

Usuario.prototype.validatePassword = async function(password) {
  return bcrypt.compareSync(password, this.contrasena);
};

export default Usuario;