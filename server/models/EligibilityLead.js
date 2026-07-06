import mongoose from 'mongoose'

const eligibilityLeadSchema = new mongoose.Schema({
  answers: {
    goal: { type: String },
    country: { type: String },
    education: { type: String },
    experience: { type: String },
    english: { type: String }
  },
  status: { type: String, default: 'New' }
}, { timestamps: true })

export default mongoose.model('EligibilityLead', eligibilityLeadSchema)
