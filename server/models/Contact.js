import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  country: { type: String },
  service: { type: String },
  subject: { type: String },
  message: { type: String },
  status: { type: String, default: 'New' }
}, { timestamps: true })

export default mongoose.model('Contact', contactSchema)
