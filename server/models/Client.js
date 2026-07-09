import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  caseStatus: { 
    type: String, 
    enum: ["Submitted", "Documents Under Review", "Awaiting Decision", "Approved", "Additional Info Required"], 
    default: "Submitted" 
  },
  latestUpdate: { type: String, default: "" },
  setupToken: { type: String },
  setupTokenExpiry: { type: Date },
  documents: [{
    filename: String,
    uploadDate: Date
  }]
}, { timestamps: true })

// Hash password before saving
clientSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Match entered password to hashed password in database
clientSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model('Client', clientSchema)
