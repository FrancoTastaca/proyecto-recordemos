/*
El campo to: alarma.expoPushToken en el código de notificaciones push se refiere al token de notificación push de  Expo para el dispositivo al que se desea enviar la notificación. Este token es único para cada dispositivo y se obtiene cuando la aplicación móvil se registra para recibir notificaciones push.

//Obtener el Token de Expo en el Frontend

En tu aplicación móvil usando Expo y React Native, puedes obtener el token de Expo para notificaciones push de la siguiente manera:

import React, { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function App() {
  const [expoPushToken, setExpoPushToken] = React.useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    // Tu código de UI aquí
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;

  console.log(token);
  return token;
}

//Configuración del Cron Job y Envío de Notificaciones Push

import cron from 'node-cron';
import { Expo } from 'expo-server-sdk';
import HistorialDosis from './models/historialDosis.js';
import Usuario from './models/usuario.js'; // Suponiendo que tienes un modelo de Usuario

const expo = new Expo();

cron.schedule(' * /5 * * * * *', async () => { // Ejecutar cada 5 segundos
  try {
    const ahora = new Date();
    const alarmasNoConfirmadas = await HistorialDosis.findAll({
      where: {
        estado: 'No Tomado',
        fecha: ahora.toISOString().split('T')[0], // Fecha actual
        hora: {
          [Op.lte]: ahora.toTimeString().split(' ')[0] // Hora actual o anterior
        }
      }
    });

    const mensajes = [];

    for (const alarma of alarmasNoConfirmadas) {
      const usuario = await Usuario.findByPk(alarma.Paciente_ID); // Suponiendo que tienes una relación con el usuario
      if (usuario && usuario.expoPushToken) {
        mensajes.push({
          to: usuario.expoPushToken,
          sound: 'default',
          title: 'Alarma de Medicina',
          body: 'No has confirmado tu alarma de medicina.',
          data: { alarmaId: alarma.ID }
        });
      }
    }

    const chunks = expo.chunkPushNotifications(mensajes);
    const tickets = [];

    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.error('Error al verificar alarmas no confirmadas:', error);
  }
});

*/

