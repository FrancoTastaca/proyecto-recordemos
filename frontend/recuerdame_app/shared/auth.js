import api from './axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from './notificationService'

export const signIn = async (email, password) => {
    try {
        const response = await api.post('/auth/sign-in', { email, password });
        const { token } = response.data.data;
        await AsyncStorage.setItem('token', token);
        await registerForPushNotificationsAsync(); // Registrar el push token
        return response.data;
    } catch (error) {
        console.error('Error en signIn:', error);
        throw error;
    }
};

export const signUp = async (email, password, role) => {
    try {
        const response = await api.post('/auth/sign-up', { email, password, role });
        const { token } = response.data;
        await AsyncStorage.setItem('token', token);
        await registerForPushNotificationsAsync(); // Registrar el push token
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