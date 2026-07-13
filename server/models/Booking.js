// models/Booking.js
import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  eventType: String,
  startTime: Date,
  endTime: Date,
  status: String,
  calBookingUid: { type: String, unique: true },
}, { timestamps: true })

export default mongoose.model('Booking', bookingSchema)