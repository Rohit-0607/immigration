import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Service from './models/Service.js'

dotenv.config()

const addPrVisa = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to MongoDB...')

    // Check if it already exists to avoid duplicates if run multiple times
    const existing = await Service.findOne({ title: 'PR Visa' })
    if (existing) {
      console.log('⚠️ PR Visa service already exists. Skipping.')
      process.exit(0)
    }

    await Service.create({
      icon: 'fa-stamp',
      title: 'PR Visa',
      description: 'Already have your invitation or nomination? We handle the complete filing process — medicals, police clearances, biometrics, and documentation — through to your final PR visa approval and landing.',
      order: 7
    })
    
    console.log('✅ PR Visa service added successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

addPrVisa()
