import mongoose from 'mongoose'

const countrySchema = new mongoose.Schema({
  flag: { type: String, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model('Country', countrySchema)
