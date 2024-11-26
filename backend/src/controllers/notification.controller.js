import { sendPushNotification } from '../services/notificationService.js'
import { scheduleReminders } from '../services/reminderService.js'

export const sendTestNotification = async (req, res) => {
  const { pushToken, message } = req.body

  try {
    await sendPushNotification(pushToken, message)
    res.status(200).json({ success: true, message: 'Notificación enviada correctamente' })
  } catch (error) {
    console.error('Error al enviar la notificación de prueba:', error)
    res.status(500).json({ success: false, message: 'Error al enviar la notificación de prueba' })
  }
}
export const scheduleTestReminders = async (req, res) => {
  try {
    scheduleReminders()
    res.status(200).json({ success: true, message: 'Recordatorios programados correctamente' })
  } catch (error) {
    console.error('Error al programar los recordatorios de prueba:', error)
    res.status(500).json({ success: false, message: 'Error al programar los recordatorios de prueba' })
  }
}
