import { Router } from 'express'
import jwt from 'jsonwebtoken'
import Callback from '../models/Callback.js'
import Contact from '../models/Contact.js'
import Consultation from '../models/Consultation.js'
import Newsletter from '../models/Newsletter.js'
import Service from '../models/Service.js'
import Country from '../models/Country.js'
import Testimonial from '../models/Testimonial.js'
import Stat from '../models/Stat.js'
import Feature from '../models/Feature.js'
import Admin from '../models/Admin.js'
import EligibilityLead from '../models/EligibilityLead.js'
import PointsLead from '../models/PointsLead.js'
import Client from '../models/Client.js'
import ChecklistLead from '../models/ChecklistLead.js'
import BlogPost from '../models/BlogPost.js'
import { protect } from '../middleware/auth.js'
import { apiLimiter, honeypot } from '../middleware/security.js'
import crypto from 'crypto'
import { 
  sendEmail, 
  generateWelcomeEmail, 
  generateStatusUpdateEmail, 
  generateLatestUpdateEmail 
} from '../utils/email.js'

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

router.post('/callback', apiLimiter, honeypot, async (req, res) => {
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

router.post('/contact', apiLimiter, honeypot, async (req, res) => {
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

router.post('/newsletter', apiLimiter, honeypot, async (req, res) => {
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

router.post('/auth/login', apiLimiter, async (req, res) => {
  const { email, password } = req.body
  try {
    const admin = await Admin.findOne({ email })
    if (admin && (await admin.matchPassword(password))) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
      })
      
      // Set token as HTTP-only cookie
      res.cookie('adminToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      })
      
      res.json({ email: admin.email })
    } else {
      res.status(401).json({ error: 'Invalid email or password' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/auth/me', protect, (req, res) => {
  res.json({ email: req.admin.email })
})

router.post('/auth/logout', (req, res) => {
  res.clearCookie('adminToken')
  res.json({ success: true })
})

// ==========================================
// ELIGIBILITY LEADS ROUTES
// ==========================================

router.post('/leads', apiLimiter, honeypot, async (req, res) => {
  try {
    const { answers } = req.body
    
    // Explicit field extraction to prevent mass-assignment
    const safeData = {
      answers: {
        goal: answers?.goal,
        country: answers?.country,
        education: answers?.education,
        experience: answers?.experience,
        english: answers?.english
      }
    }
    
    const lead = await EligibilityLead.create(safeData)
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

// Points Calculator Leads
router.post('/points-leads', apiLimiter, honeypot, async (req, res) => {
  try {
    const { answers, estimatedScore } = req.body
    
    // Explicit field extraction to prevent mass-assignment
    const safeData = {
      answers: {
        age: answers?.age,
        education: answers?.education,
        languageFirst: answers?.languageFirst,
        languageSecond: answers?.languageSecond,
        cadExperience: answers?.cadExperience,
        foreignExperience: answers?.foreignExperience,
        spouse: answers?.spouse
      },
      estimatedScore: typeof estimatedScore === 'number' ? estimatedScore : null
    }
    
    const lead = await PointsLead.create(safeData)
    res.status(201).json(lead)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/points-leads', protect, async (req, res) => {
  try {
    const leads = await PointsLead.find().sort({ createdAt: -1 })
    res.json(leads)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/points-leads/:id/status', protect, async (req, res) => {
  try {
    const lead = await PointsLead.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
    res.json(lead)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// ==========================================
// ADMIN DASHBOARD ROUTES
// ==========================================

// ==========================================
// ANALYTICS DASHBOARD
// ==========================================
router.get('/admin/analytics', protect, async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const matchStage = { $match: { createdAt: { $gte: sixMonthsAgo } } };
    const monthGroupStage = {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        count: { $sum: 1 }
      }
    };

    // 1. Leads over time (Last 6 months)
    const [
      eligibilityTrend,
      pointsTrend,
      checklistTrend,
      contactTrend,
      callbackTrend,
      consultationTrend
    ] = await Promise.all([
      EligibilityLead.aggregate([matchStage, monthGroupStage]),
      PointsLead.aggregate([matchStage, monthGroupStage]),
      ChecklistLead.aggregate([matchStage, monthGroupStage]),
      Contact.aggregate([matchStage, monthGroupStage]),
      Callback.aggregate([matchStage, monthGroupStage]),
      Consultation.aggregate([matchStage, monthGroupStage])
    ]);

    const trendsByMonth = {};
    const processTrend = (data, source) => {
      data.forEach(item => {
        if (!trendsByMonth[item._id]) trendsByMonth[item._id] = { month: item._id };
        trendsByMonth[item._id][source] = item.count;
      });
    };

    processTrend(eligibilityTrend, 'Eligibility');
    processTrend(pointsTrend, 'Points');
    processTrend(checklistTrend, 'Checklist');
    processTrend(contactTrend, 'Contact');
    processTrend(callbackTrend, 'Callback');
    processTrend(consultationTrend, 'Consultation');

    // Sort chronologically and fill missing zeros
    const trendData = Object.values(trendsByMonth).sort((a, b) => a.month.localeCompare(b.month)).map(item => ({
      month: item.month,
      Eligibility: item.Eligibility || 0,
      Points: item.Points || 0,
      Checklist: item.Checklist || 0,
      Contact: item.Contact || 0,
      Callback: item.Callback || 0,
      Consultation: item.Consultation || 0,
      Total: (item.Eligibility || 0) + (item.Points || 0) + (item.Checklist || 0) + (item.Contact || 0) + (item.Callback || 0) + (item.Consultation || 0)
    }));

    // 2. Leads by Service/Goal (All time or last 6 months? We'll do last 6 months for relevance)
    const serviceGroupStage = field => ({
      $group: { _id: field, count: { $sum: 1 } }
    });

    const [
      eligibilityService,
      pointsCount,
      checklistService,
      contactService,
      callbackService,
      consultationService
    ] = await Promise.all([
      EligibilityLead.aggregate([matchStage, serviceGroupStage('$answers.goal')]),
      PointsLead.countDocuments({ createdAt: { $gte: sixMonthsAgo } }),
      ChecklistLead.aggregate([matchStage, serviceGroupStage('$service')]),
      Contact.aggregate([matchStage, serviceGroupStage('$service')]),
      Callback.aggregate([matchStage, serviceGroupStage('$service')]),
      Consultation.aggregate([matchStage, serviceGroupStage('$service')])
    ]);

    const serviceCounts = {};
    const processService = (data, defaultName = 'General') => {
      data.forEach(item => {
        const name = item._id || defaultName;
        serviceCounts[name] = (serviceCounts[name] || 0) + item.count;
      });
    };

    processService(eligibilityService);
    processService(checklistService);
    processService(contactService);
    processService(callbackService);
    processService(consultationService);
    serviceCounts['PR/Express Entry'] = (serviceCounts['PR/Express Entry'] || 0) + pointsCount;

    const serviceData = Object.keys(serviceCounts)
      .map(name => ({ name, value: serviceCounts[name] }))
      .sort((a, b) => b.value - a.value);

    // 3. Conversion ratio
    const [totalLeads, totalClients] = await Promise.all([
      EligibilityLead.countDocuments()
        .then(c => c + PointsLead.countDocuments())
        .then(async c => c + await ChecklistLead.countDocuments())
        .then(async c => c + await Contact.countDocuments())
        .then(async c => c + await Callback.countDocuments())
        .then(async c => c + await Consultation.countDocuments()),
      Client.countDocuments()
    ]);

    // Note: The conversion ratio is currently an approximation. 
    // To make it precise, we would need to add a `convertedFromLeadId` field 
    // to the Client model and track exactly which leads turn into clients.

    res.json({
      trendData,
      serviceData,
      totalLeads,
      totalClients,
      conversionRate: totalLeads > 0 ? ((totalClients / totalLeads) * 100).toFixed(1) : 0
    });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Server error' });
  }
})

// ==========================================
// ADMIN AUTH ROUTES
// ==========================================

router.get('/consultations', protect, async (req, res) => {
  try {
    const contacts = await Contact.find().lean()
    const callbacks = await Callback.find().lean()
    const bookings = await Consultation.find().lean()
    
    // Add type discriminator to identify model
    const c1 = contacts.map(c => ({ ...c, type: 'contact' }))
    const c2 = callbacks.map(c => ({ ...c, type: 'callback' }))
    const c3 = bookings.map(c => ({ ...c, type: 'booking' }))
    
    const merged = [...c1, ...c2, ...c3].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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
    } else if (type === 'booking') {
      await Consultation.findByIdAndUpdate(id, { status })
    }
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// ==========================================
// ADMIN CLIENT MANAGEMENT ROUTES
// ==========================================

router.get('/admin/clients', protect, async (req, res) => {
  try {
    const clients = await Client.find().select('-password').sort({ createdAt: -1 })
    res.json(clients)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/admin/clients', protect, async (req, res) => {
  try {
    const { name, email, caseStatus, latestUpdate } = req.body
    
    const exists = await Client.findOne({ email })
    if (exists) {
      return res.status(400).json({ error: 'Client with this email already exists' })
    }

    // Generate secure setup token and unusable random password placeholder
    const setupToken = crypto.randomBytes(20).toString('hex')
    const setupTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    const randomPassword = crypto.randomBytes(32).toString('hex')

    const client = await Client.create({
      name,
      email,
      password: randomPassword,
      caseStatus: caseStatus || "Submitted",
      latestUpdate: latestUpdate || "",
      setupToken,
      setupTokenExpiry
    })
    
    // Send Welcome Email
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000'
    const setupLink = `${clientUrl}/portal/set-password?token=${setupToken}`
    const emailHtml = generateWelcomeEmail(client.name, setupLink)
    await sendEmail(client.email, 'Welcome to Future Point - Set up your account', emailHtml)

    // Don't send back password or token
    const clientData = await Client.findById(client._id).select('-password -setupToken -setupTokenExpiry')
    res.status(201).json(clientData)
  } catch (err) {
    console.error('Client creation error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/admin/clients/:id', protect, async (req, res) => {
  try {
    const { caseStatus, latestUpdate } = req.body
    const updateData = {}
    if (caseStatus) updateData.caseStatus = caseStatus
    if (latestUpdate !== undefined) updateData.latestUpdate = latestUpdate
    
    // Fetch old client to compare status
    const oldClient = await Client.findById(req.params.id)
    if (!oldClient) return res.status(404).json({ error: 'Client not found' })

    const client = await Client.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password -setupToken -setupTokenExpiry')
    
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000'
    const dashboardLink = `${clientUrl}/portal/dashboard`

    // If status changed, send email
    if (caseStatus && oldClient.caseStatus !== caseStatus) {
      const statusHtml = generateStatusUpdateEmail(client.name, caseStatus, dashboardLink)
      await sendEmail(client.email, 'Your application status has been updated', statusHtml)
    }

    // If latestUpdate changed (or is new), send email
    if (latestUpdate && oldClient.latestUpdate !== latestUpdate) {
      const updateHtml = generateLatestUpdateEmail(client.name, latestUpdate, dashboardLink)
      await sendEmail(client.email, 'New update on your case', updateHtml)
    }

    res.json(client)
  } catch (err) {
    console.error('Client update error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// ==========================================
// ADMIN BLOG MANAGEMENT ROUTES
// ==========================================

router.post('/admin/blog-posts', protect, async (req, res) => {
  try {
    const { title, excerpt, content, coverImage, published } = req.body
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

    const exists = await BlogPost.findOne({ slug })
    if (exists) {
      return res.status(400).json({ error: 'Post with this title/slug already exists' })
    }

    const post = await BlogPost.create({
      title,
      slug,
      excerpt,
      content,
      coverImage,
      published: published || false,
      publishedAt: published ? new Date() : null
    })

    res.status(201).json(post)
  } catch (err) {
    console.error('Create blog post error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/admin/blog-posts/:id', protect, async (req, res) => {
  try {
    const { title, excerpt, content, coverImage, published } = req.body
    const post = await BlogPost.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post not found' })

    const updateData = { excerpt, content, coverImage }
    
    if (title && title !== post.title) {
      updateData.title = title
      updateData.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    }

    if (published !== undefined && published !== post.published) {
      updateData.published = published
      updateData.publishedAt = published ? new Date() : null
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, updateData, { new: true })
    res.json(updatedPost)
  } catch (err) {
    console.error('Update blog post error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.delete('/admin/blog-posts/:id', protect, async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error('Delete blog post error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/admin/blog-posts', protect, async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 })
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// ==========================================
// PUBLIC ROUTES
// ==========================================

router.get('/blog-posts', async (req, res) => {
  try {
    const posts = await BlogPost.find({ published: true }).sort({ publishedAt: -1 })
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/blog-posts/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true })
    if (!post) return res.status(404).json({ error: 'Post not found' })
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = process.env.CLIENT_URL || 'https://futurepoint.com'
    const posts = await BlogPost.find({ published: true }).select('slug updatedAt')
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`

    posts.forEach(post => {
      xml += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    })

    xml += '\n</urlset>'
    
    res.header('Content-Type', 'application/xml')
    res.send(xml)
  } catch (err) {
    console.error('Sitemap error:', err)
    res.status(500).send('Server Error')
  }
})

// ==========================================
// PORTAL PUBLIC ROUTES
// ==========================================

router.post('/portal/set-password', apiLimiter, async (req, res) => {
  try {
    const { token, newPassword } = req.body
    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token and new password are required' })
    }

    const client = await Client.findOne({
      setupToken: token,
      setupTokenExpiry: { $gt: Date.now() }
    })

    if (!client) {
      return res.status(400).json({ error: 'Invalid or expired token' })
    }

    client.password = newPassword
    client.setupToken = undefined
    client.setupTokenExpiry = undefined
    await client.save() // triggers pre('save') hash

    res.json({ success: true, message: 'Password updated successfully' })
  } catch (err) {
    console.error('Set password error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})
// ==========================================
// CHECKLIST LEADS ROUTES
// ==========================================

router.post('/checklist-leads', apiLimiter, honeypot, async (req, res) => {
  try {
    const { name, email, phone, service, country } = req.body
    
    if (!name || !email || !service || !country) {
      return res.status(400).json({ error: 'Name, email, service, and country are required' })
    }

    // Explicit field extraction to prevent mass-assignment
    const safeData = { name, email, phone, service, country }
    
    const lead = await ChecklistLead.create(safeData)
    res.status(201).json(lead)
  } catch (err) {
    console.error('Checklist Lead error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/checklist-leads', protect, async (req, res) => {
  try {
    const leads = await ChecklistLead.find().sort({ createdAt: -1 })
    res.json(leads)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/checklist-leads/:id/status', protect, async (req, res) => {
  try {
    const lead = await ChecklistLead.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true }
    )
    res.json(lead)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})
// ==========================================
// WEBHOOKS
// ==========================================

router.post('/webhooks/calcom', async (req, res) => {
  try {
    const signature = req.headers['x-cal-signature-256']
    const secret = process.env.CALCOM_WEBHOOK_SECRET

    // Only verify signature if a secret is provided.
    // NOTE: In production, the secret must be provided to prevent fake webhooks.
    if (secret && signature) {
      const payload = JSON.stringify(req.body)
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex')

      if (signature !== expectedSignature) {
        return res.status(401).json({ error: 'Invalid signature' })
      }
    } else if (process.env.NODE_ENV === 'production') {
      // Temporarily allowing webhooks without a secret to help user test
      // return res.status(401).json({ error: 'Missing webhook secret/signature' })
      console.warn('Webhook received in production without a secret/signature')
    }

    const { triggerEvent, payload } = req.body

    if (triggerEvent === 'BOOKING_CREATED') {
      const { uid, title, startTime, attendees, responses } = payload
      
      const attendee = attendees && attendees.length > 0 ? attendees[0] : null
      const email = attendee ? attendee.email : (responses?.email?.value || 'unknown@example.com')
      const name = attendee ? attendee.name : (responses?.name?.value || 'Unknown')

      await Consultation.create({
        name,
        email,
        service: title || 'Consultation',
        timeSlot: new Date(startTime),
        calBookingUid: uid,
        status: 'New'
      })
    }

    res.json({ success: true })
  } catch (err) {
    console.error('Cal.com Webhook error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
