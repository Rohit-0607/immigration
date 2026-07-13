// routes/calWebhook.js
import express from 'express'
import Booking from '../models/Booking.js' // your Mongoose model

const router = express.Router()

router.post('/api/webhooks/cal', express.json(), async (req, res) => {
  try {
    const { triggerEvent, payload } = req.body

    if (triggerEvent === 'BOOKING_CREATED') {
      await Booking.create({
        name: payload.attendees?.[0]?.name,
        email: payload.attendees?.[0]?.email,
        phone: payload.attendees?.[0]?.phoneNumber || null,
        eventType: payload.eventType?.slug,
        startTime: payload.startTime,
        endTime: payload.endTime,
        status: payload.status,
        calBookingUid: payload.uid,
      })
    }

    res.status(200).json({ received: true })
  } catch (err) {
    console.error('Cal webhook error:', err)
    res.status(500).json({ error: 'Webhook processing failed' })
  }
})

export default router