import mongoose from 'mongoose'

const pointsLeadSchema = new mongoose.Schema({
  answers: {
    age: { type: String },
    education: { type: String },
    languageFirst: { type: String },
    languageSecond: { type: String },
    cadExperience: { type: String },
    foreignExperience: { type: String },
    spouse: { type: String }
  },
  estimatedScore: { type: Number },
  status: { type: String, default: 'New' }
}, { timestamps: true })

export default mongoose.model('PointsLead', pointsLeadSchema)
