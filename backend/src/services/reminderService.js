import cron from 'node-cron'
import { sendPushNotification } from './notificationService.js'
import models from '../bd/models/index.Models.js'
import pc from 'picocolors'

const CONFIRMATION_INTERVAL = 15 * 60 * 1000 // 15 minutos en milisegundos

export const scheduleReminders = () => {
  cron.schedule('* * * * *', async () => {
    const now = new Date()
    const currentTime = now.toTimeString().slice(0, 5) // HH:MM format

    console.log(pc.blue(`Ejecutando recordatorios a las ${currentTime}`))

    try {
      const PastillerosBD = await models.PastilleroAlarma.findAll({
        include: [{
          model: models.MedicamentoCuidador,
          attributes: ['Vademecum_ID'],
          include: [{
            model: models.Paciente,
            include: [{
              model: models.Persona,
              attributes: ['ID'],
              include: [{
                model: models.Usuario,
                attributes: ['ID', 'pushToken']
              }]
            }]
          }, {
            model: models.Vademecum,
            attributes: ['principio_activo', 'presentacion']
          }]
        }]
      })
      for (const pastillero of PastillerosBD) {
        const horarios = pastillero.horario_diario.split(',')
        if (horarios.some(horario => Math.abs(new Date(`1970-01-01T${horario}:00`) - new Date(`1970-01-01T${currentTime}:00`)) <= 60000)) {
          const usuario = pastillero.Paciente.Persona.Usuario
          if (usuario && usuario.pushToken) {
            const nombreMedicamento = `${pastillero.MedicamentoCuidador.Vademecum.principio_activo} - ${pastillero.MedicamentoCuidador.Vademecum.presentacion}`
            console.log(pc.yellow(`Enviando notificación a ${usuario.ID} para el medicamento ${nombreMedicamento}`))

            await sendPushNotification(
              usuario.pushToken,
              `Recordatorio: Es hora de tomar ${pastillero.dosis} de su medicación ${nombreMedicamento}`
            )

            // Registrar en HistorialDosis
            const historial = await models.HistorialDosis.create({
              Pastillero_ID: pastillero.ID,
              fechaRegistrada: now,
              dosisRegistrada: pastillero.dosis,
              horaPrimerNotificacion: currentTime
            })

            console.log(pc.magenta(`HistorialDosis creado con ID ${historial.ID}`))

            // Programar la segunda notificación
            setTimeout(async () => {
              console.log(pc.cyan(`Enviando segunda notificación para HistorialDosis ID ${historial.ID}`))
              await sendSecondNotification(usuario.pushToken, historial.ID)
            }, CONFIRMATION_INTERVAL)
          }
        }
      }
      console.log(pc.green(`Se encontraron ${PastillerosBD.length} pastilleros`))
    } catch (error) {
      console.error('Error en la programacion de pastilleros:', error)
    }
  })
}

const sendSecondNotification = async (pushToken, historialId) => {
  await sendPushNotification(
    pushToken,
    'Confirmación: ¿Ha tomado su medicación?'
  )

  // Actualizar HistorialDosis con la hora de la segunda notificación
  await models.HistorialDosis.update(
    { horaSegundaNotificacion: new Date().toTimeString().slice(0, 5) },
    { where: { ID: historialId } }
  )

  console.log(pc.cyan(`HistorialDosis ID ${historialId} actualizado con la hora de la segunda notificación`))
}
