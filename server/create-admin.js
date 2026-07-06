import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Admin from './models/Admin.js'

dotenv.config()

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/future-point')
    console.log('MongoDB Connected')

    const existingAdmin = await Admin.findOne({ email: 'admin@futurepoint.com' })
    if (existingAdmin) {
      console.log('Admin already exists!')
      process.exit()
    }

    const admin = new Admin({
      email: 'admin@futurepoint.com',
      password: 'password123'
    })

    await admin.save()
    console.log('Default admin created successfully!')
    console.log('Email: admin@futurepoint.com')
    console.log('Password: password123')
    
    process.exit()
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

createAdmin()
