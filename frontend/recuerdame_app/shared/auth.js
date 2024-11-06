import api from './axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signIn = async (email, password) => {
    try {
        const response = await api.post('/auth/sign-in', { email, password });
        const { id, token } = response.data.data;
        console.log('Valor de id en signIn:', id);
        console.log('Valor de token en signIn:', token);
        await AsyncStorage.setItem('token', token);
        return { id, token };
    } catch (error) {
        console.error('Error en signIn:', error);
        throw error;
    }
};

export const signUp = async (body) => {
    console.log('---- Entre al signUp de axiosConfig');
    const { email, password, confirmPassword, persona_id } = body;
    try {
        console.log('Valor de email en signUp:', email);
        console.log('Valor de password en signUp:', password)
        console.log('Valor de persona_id en signUp:', persona_id);
        console.log('Valor de confirmPassword:', confirmPassword);
        const response = await api.post('/auth/sign-up', { email, password, confirmPassword, persona_id });
        const { token, id, tipo } = response.data.data;
        if (tipo === 'C') {
            console.log('Valor de token en signUp:', token);
            await AsyncStorage.setItem('token', token);
            console.log('Valor de token cargado en AsyncStorage en signUp:', token);
        }
        return response.data;
    } catch (error) {
        console.error('Error en signUp:', error);
        throw error;
    }
};

export const signOut = async () => {
    try {
        await AsyncStorage.removeItem('token');
    } catch (error) {
        console.error('Error en signOut:', error);
    }
};

export const getRole = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await api.get(`/usuario/getRole/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.role;
};