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

Medicamento.createMedicamento = async (principioActivo, marcaComercial, presentacion) => {
  try {
    const medicamento = await Medicamento.create({
        principio_activo: principioActivo,
        marca_comercial: marcaComercial,
        presentacion: presentacion
    });
    return medicamento;
} catch (error) {
    throw error;
}
}

Medicamento.getAllMedicamentos = async () => {
  try {
      const medicamentos = await Medicamento.findAll();
      return medicamentos;
  } catch (error) {
      throw error;
  }
};

export default Medicamento;