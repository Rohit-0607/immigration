import mongoose from 'mongoose'

const callbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  city: { type: String },
  country: { type: String },
  service: { type: String },
  message: { type: String },
  status: { type: String, default: 'New' }
}, { timestamps: true })

export default mongoose.model('Callback', callbackSchema)
