import mongoose from 'mongoose'

const checklistLeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  service: { type: String, required: true },
  country: { type: String, required: true },
  status: { type: String, default: 'New' }
}, { timestamps: true })

export default mongoose.model('ChecklistLead', checklistLeadSchema)
