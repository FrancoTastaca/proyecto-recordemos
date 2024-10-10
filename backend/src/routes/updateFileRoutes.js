import express from 'express'
import { obtenerImagen } from '../controllers/updateFile.controller.js'

const router = express.Router()

router.get('/obtenerImagen/:type/:id', obtenerImagen)

export default router
