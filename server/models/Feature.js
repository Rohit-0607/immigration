import mongoose from 'mongoose'

const featureSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model('Feature', featureSchema)
