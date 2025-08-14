import multer from 'multer'
import path from 'path'
import errors from '../utils/errors.js'
import { fileURLToPath } from 'url'

// Obtener el nombre del archivo y el directorio actual
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ruta de la carpeta donde se guardarán todos los archivos
const uploadsDir = path.join(__dirname, '../uploads')

// Configuración de multer para guardar archivos en el servidor
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadsDir) // Carpeta donde se guardarán todos los archivos
    },
    filename: (_req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`) // Cambiar nombre real
    }
})

// Función para configurar multer con manejo de errores usando next
const uploadImagenes = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Límite de tamaño de archivo de 5MB
    fileFilter: (req, file, cb) => {
        if (!file) {
            return cb(new Error('No se ha proporcionado ningún archivo. Asegúrese de seleccionar un archivo antes de enviar.'), false)
        }
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Solo se permiten archivos de imagen. Asegúrese de que el archivo seleccionado sea una imagen.'), false)
        }
        cb(null, true)
    }
}).single('image') // Cambia 'image' por el nombre del campo de archivo en tu formulario

export {
    uploadImagenes
}

