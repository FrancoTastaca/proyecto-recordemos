import { Expo } from 'expo-server-sdk'
import models from '../bd/models/index.Models.js'
import { Op } from 'sequelize'

const expo = new Expo()

export const sendPushNotification = async (pushToken, message) => {
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`)
    return
  }

  const messages = [{
    to: pushToken,
    sound: 'default',
    body: message,
    data: { withSome: 'data' }
  }]

  try {
    await expo.sendPushNotificationsAsync(messages)
  } catch (error) {
    console.error('Error sending push notification:', error)
  }
}

export const checkUnconfirmedAlarms = async () => {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const currentTime = now.toTimeString().slice(0, 5) // HH:MM format

  const unconfirmedAlarms = await models.HistorialDosis.findAll({
    where: {
      [Op.or]: [
        { primerTomoDosis: false },
        { segundoTomoDosis: false }
      ],
      fechaRegistrada: {
        [Op.gte]: startOfDay
      },
      [Op.or]: [
        { horaPrimerNotificacion: { [Op.lte]: currentTime } },
        { horaSegundaNotificacion: { [Op.lte]: currentTime } }
      ]
    },
    include: [{
      model: models.PastilleroAlarma,
      include: [{
        model: models.MedicamentoCuidador,
        include: [{
          model: models.Vademecum,
          attributes: ['principio_activo', 'presentacion']
        }, {
          model: models.Cuidador,
          include: [{
            model: models.Persona,
            include: [{
              model: models.Usuario
            }]
          }]
        }]
      }]
    }]
  })

  for (const alarm of unconfirmedAlarms) {
    const usuario = alarm.PastilleroAlarma.MedicamentoCuidador.Cuidador.Persona.Usuario // El usuario al que se le avisa es el cuidador asignado
    const pastilleroColor = alarm.PastilleroAlarma.color_pastillero
    const horario = alarm.horaPrimerNotificacion || alarm.horaSegundaNotificacion
    const nombrePastillero = `${alarm.PastilleroAlarma.MedicamentoCuidador.Vademecum.principio_activo} - ${alarm.PastilleroAlarma.MedicamentoCuidador.Vademecum.presentacion}`
    if (usuario && usuario.pushToken) {
      const message = `Alarma de medicación no confirmada para el pastillero color ${pastilleroColor} con el nombre de: ${nombrePastillero} a las ${horario}hs`
      await sendPushNotification(usuario.pushToken, message)
    }
  }
}
