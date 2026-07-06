import { Router } from 'express'
import jwt from 'jsonwebtoken'
import Callback from '../models/Callback.js'
import Contact from '../models/Contact.js'
import Newsletter from '../models/Newsletter.js'
import Service from '../models/Service.js'
import Country from '../models/Country.js'
import Testimonial from '../models/Testimonial.js'
import Stat from '../models/Stat.js'
import Feature from '../models/Feature.js'
import Admin from '../models/Admin.js'
import EligibilityLead from '../models/EligibilityLead.js'
import { protect } from '../middleware/auth.js'

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
    const { name, email, phone, service, subject, message } = req.body

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' })
    }

    const contact = new Contact({ name, email, phone, service, subject, message })
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

// ==========================================
// AUTH & ADMIN ROUTES
// ==========================================

router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const admin = await Admin.findOne({ email })
    if (admin && (await admin.matchPassword(password))) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d'
      })
      res.json({ token, email: admin.email })
    } else {
      res.status(401).json({ error: 'Invalid email or password' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// ==========================================
// ELIGIBILITY LEADS ROUTES
// ==========================================

router.post('/leads', async (req, res) => {
  try {
    const lead = await EligibilityLead.create(req.body)
    res.status(201).json(lead)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/leads', protect, async (req, res) => {
  try {
    const leads = await EligibilityLead.find().sort({ createdAt: -1 })
    res.json(leads)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/leads/:id/status', protect, async (req, res) => {
  try {
    const lead = await EligibilityLead.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
    res.json(lead)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// ==========================================
// ADMIN DASHBOARD ROUTES
// ==========================================

router.get('/consultations', protect, async (req, res) => {
  try {
    const contacts = await Contact.find().lean()
    const callbacks = await Callback.find().lean()
    
    // Add type discriminator to identify model
    const c1 = contacts.map(c => ({ ...c, type: 'contact' }))
    const c2 = callbacks.map(c => ({ ...c, type: 'callback' }))
    
    const merged = [...c1, ...c2].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    res.json(merged)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/consultations/:type/:id/status', protect, async (req, res) => {
  try {
    const { type, id } = req.params
    const { status } = req.body
    
    if (type === 'contact') {
      await Contact.findByIdAndUpdate(id, { status })
    } else if (type === 'callback') {
      await Callback.findByIdAndUpdate(id, { status })
    }
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
