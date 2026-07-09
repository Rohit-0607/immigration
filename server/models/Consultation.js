import mongoose from 'mongoose'

const consultationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  service: { type: String }, // Maps to the Cal.com event type name
  timeSlot: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Converted', 'Not Interested'], 
    default: 'New' 
  },
  calBookingUid: { type: String, required: true, unique: true }, // To prevent duplicates
}, { timestamps: true })

export default mongoose.model('Consultation', consultationSchema)
