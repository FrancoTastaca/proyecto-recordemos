import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Alert, Platform } from 'react-native';
import api from './axiosConfig';

// Función para registrar el dispositivo para recibir notificaciones push
export const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            Alert.alert('Error', 'No se pudo obtener el permiso para las notificaciones push');
            return;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
        await api.post('/usuario/updatePushToken', { pushToken: token });
    } else {
        Alert.alert('Debe usar un dispositivo físico para recibir notificaciones push');
    }

    if (Constants.isDevice && Platform.OS === 'web') {
        const vapidPublicKey = Constants.expoConfig.notification.vapidPublicKey;
        token = await Notifications.getExpoPushTokenAsync({ vapidPublicKey });
        await api.post('/usuario/updatePushToken', { pushToken: token });
    }

    return token;
};

// Función para configurar los listeners de notificaciones
export const setupNotificationListeners = () => {
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
        console.log(notification);
        // Aquí puedes manejar la notificación recibida
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        const { data } = response.notification.request.content;
        if (data.historialId) {
            Alert.alert(
                'Confirmación de Medicación',
                '¿Ha tomado su medicación?',
                [
                    {
                        text: 'Sí',
                        onPress: () => handleMedicationResponse(data.historialId, 'si')
                    },
                    {
                        text: 'No',
                        onPress: () => handleMedicationResponse(data.historialId, 'no')
                    }
                ]
            );
        }
    });

    return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
    };
};

// Función para manejar la respuesta del usuario sobre la toma de la medicación
const handleMedicationResponse = async (historialId, response) => {
    try {
        await api.post('/historialDosis/respuesta', {
            historialId,
            respuesta: response
        });
    } catch (error) {
        console.error('Error al enviar la respuesta:', error);
    }
};
