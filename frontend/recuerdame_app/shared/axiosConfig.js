import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const api = axios.create({
    baseURL: 'http://192.168.1.109:3000/api', // Cambia esto a la URL de tu API
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
})

// Interceptor para agregar el token JWT a las solicitudes
api.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    } catch (error) {
        console.error('Error al obtener el token de AsyncStorage:', error)
    }
    return config
}, (error) => {
    console.error('Error en el interceptor de solicitud:', error)
    return Promise.reject(error)
})

export default api