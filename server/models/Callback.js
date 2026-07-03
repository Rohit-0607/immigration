import mongoose from 'mongoose'

const callbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  city: { type: String },
  service: { type: String },
  message: { type: String },
}, { timestamps: true })

export default mongoose.model('Callback', callbackSchema)
