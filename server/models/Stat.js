import mongoose from 'mongoose'

const statSchema = new mongoose.Schema({
  target: { type: Number, required: true },
  suffix: { type: String },
  label: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model('Stat', statSchema)
