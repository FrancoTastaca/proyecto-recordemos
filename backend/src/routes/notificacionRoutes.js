import express from 'express'
import { sendTestNotification, scheduleTestReminders } from '../controllers/notification.controller.js'

const router = express.Router()

router.post('/sendTestNotification', sendTestNotification)
router.post('/scheduleTestReminders', scheduleTestReminders)

export default router
