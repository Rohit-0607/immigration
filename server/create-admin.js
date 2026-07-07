/**
 * WARNING: This script should only be run once during initial setup 
 * to create the initial admin user. It relies on environment variables 
 * (ADMIN_EMAIL, ADMIN_PASSWORD) to securely inject credentials. 
 * Do NOT hardcode or commit real credentials in this file.
 */
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Admin from './models/Admin.js'

dotenv.config()

const createAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminEmail || !adminPassword) {
      console.error('Error: ADMIN_EMAIL and ADMIN_PASSWORD environment variables must be set.')
      process.exit(1)
    }

    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/future-point')
    console.log('MongoDB Connected')

    const existingAdmin = await Admin.findOne({ email: adminEmail })
    if (existingAdmin) {
      console.log(`Admin account for ${adminEmail} already exists!`)
      process.exit()
    }

    const admin = new Admin({
      email: adminEmail,
      password: adminPassword
    })

    await admin.save()
    console.log(`Default admin created successfully!`)
    console.log(`Email: ${adminEmail}`)
    // Intentionally not logging the password for security reasons
    
    process.exit()
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

createAdmin()
