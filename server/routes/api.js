import { Router } from 'express'
import Callback from '../models/Callback.js'
import Contact from '../models/Contact.js'
import Newsletter from '../models/Newsletter.js'
import Service from '../models/Service.js'
import Country from '../models/Country.js'
import Testimonial from '../models/Testimonial.js'
import Stat from '../models/Stat.js'
import Feature from '../models/Feature.js'

const router = Router()

// ==========================================
// PUBLIC GET ROUTES (For React Frontend)
// ==========================================

router.get('/services', async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 })
    res.json(services)
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching services' })
  }
})

router.get('/countries', async (req, res) => {
  try {
    const countries = await Country.find().sort({ order: 1 })
    res.json(countries)
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching countries' })
  }
})

router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 })
    res.json(testimonials)
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching testimonials' })
  }
})

router.get('/stats', async (req, res) => {
  try {
    const stats = await Stat.find().sort({ order: 1 })
    res.json(stats)
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching stats' })
  }
})

router.get('/features', async (req, res) => {
  try {
    const features = await Feature.find().sort({ order: 1 })
    res.json(features)
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching features' })
  }
})

// ==========================================
// FORM SUBMISSION POST ROUTES
// ==========================================

router.post('/callback', async (req, res) => {
  try {
    const { name, phone, email, city, service, message } = req.body

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' })
    }

    const callback = new Callback({ name, phone, email, city, service, message })
    await callback.save()

    res.status(201).json({
      success: true,
      message: 'Callback request submitted successfully',
      data: callback,
    })
  } catch (err) {
    console.error('Callback error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' })
    }

    const contact = new Contact({ name, email, subject, message })
    await contact.save()

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact,
    })
  } catch (err) {
    console.error('Contact error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    // Upsert or simple save
    const existing = await Newsletter.findOne({ email })
    if (!existing) {
      await Newsletter.create({ email })
    }

    res.status(201).json({
      success: true,
      message: 'Subscribed to newsletter successfully',
    })
  } catch (err) {
    console.error('Newsletter error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
