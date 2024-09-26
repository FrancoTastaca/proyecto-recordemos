import express from 'express'
import { handleFileCreateOrUpdate } from '../controllers/update.controller.js'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })
const router = express.Router()

router.post('/medicamento', upload.single('file'), handleFileCreateOrUpdate)
router.put('/medicamento/:id', upload.single('file'), handleFileCreateOrUpdate)

router.post('/pastillero', upload.single('file'), handleFileCreateOrUpdate)
router.put('/pastillero/:id', upload.single('file'), handleFileCreateOrUpdate)

export default router
