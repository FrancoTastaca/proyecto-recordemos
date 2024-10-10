import express from 'express'
import vademecumController from '../controllers/vademecum.controller.js'
import { checkRoleCuidador } from '../middlewares/checkRole.js'

const router = express.Router()

router.get('/desplegable', checkRoleCuidador, vademecumController.obtenerVademecumParaDesplegable)
router.get('/listarSegunTipo', checkRoleCuidador, vademecumController.listarSegunTipo)
router.get('/drogaDesplegable', checkRoleCuidador, vademecumController.obtenerDrogaParaDesplegable)
router.get('/:id', checkRoleCuidador, vademecumController.read)

export default router
