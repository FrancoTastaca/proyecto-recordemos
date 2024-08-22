import models from '../models/index.Models.js';

const usuarioController = {
  listar: async (req, res) => {
    const users = await models.Usuario.findAll();

    res.json({
      success: true,
      data: {
        usuarios: users
      }
    });
  },

  crear: async (req, res, next) => {
    // Implementación pendiente
  },

  prueba: async (req, res) => {
    console.log(res.locals.usuario);
    try {
      // await usuario.findOrCreate({
      //     where: {
      //         id: '1'
      //     }, defaults: {
      //         mail: 'broitmanroman@alu.frlp.utn.edu.ar',
      //         persona_id: 1,
      //         password: bcrypt.hashSync('password')
      //     }
      // })
      res.json({
        message: 'Hello World'
      });
    } catch (error) {
      console.error(error);
    }
  }
};

export default usuarioController;