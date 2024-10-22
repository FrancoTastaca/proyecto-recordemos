// frontend/recuerdame_app/shared/notificationService.js
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import Constants from 'expo-constants';
import { Alert, Platform } from 'react-native';
import api from './axiosConfig';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

function handleRegistrationError(errorMessage) {
    alert(errorMessage);
    throw new Error(errorMessage);
}

export async function registerForPushNotificationsAsync(id) {
    let deviceId;
    try {
        if (Platform.OS === 'android') {
            deviceId = Application.getAndroidId();
        } else {
            if (Platform.OS === 'ios') {
                deviceId = await Application.getIosIdForVendorAsync();
            }
            console.log(`Entre al registerForPushNotificactions con valor de deviceId: ${deviceId}`);
        }
    } catch (error) {
        console.error('Error al obtener el deviceId:', error);
        handleRegistrationError('Error al obtener el deviceId');
        return;
    }
    console.log('Entre a registerForPushNotificationsAsync con el id', id);
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            handleRegistrationError('Permission not granted to get push token for push notification!');
            return;
        }
        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
            handleRegistrationError('Project ID not found');
        }
        try {
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            console.log('Valor del pushTokenString en notificationService', pushTokenString);
            await api.post('/usuario/updatePushToken', { userId: id, deviceId, pushToken: pushTokenString });
            return pushTokenString;
        } catch (e) {
            handleRegistrationError(`${e}`);
        }
    } else {
        handleRegistrationError('Must use physical device for push notifications');
    }
}

export function setupNotificationListeners(setNotification) {
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
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
}

async function handleMedicationResponse(historialId, response) {
    try {
        await api.post('/historialDosis/respuesta', {
            historialId,
            respuesta: response
        });
    } catch (error) {
        console.error('Error al enviar la respuesta:', error);
    }
}