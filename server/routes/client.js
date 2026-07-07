import express from 'express'
import jwt from 'jsonwebtoken'
import Client from '../models/Client.js'
import { protectClient } from '../middleware/auth.js'

const router = express.Router()

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// @route   POST /api/client/login
// @desc    Auth client & get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const client = await Client.findOne({ email })

    if (client && (await client.matchPassword(password))) {
      const token = generateToken(client._id)

      res.cookie('clientToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })

      res.json({
        _id: client._id,
        name: client.name,
        email: client.email,
        caseStatus: client.caseStatus,
        latestUpdate: client.latestUpdate,
        documents: client.documents
      })
    } else {
      res.status(401).json({ error: 'Invalid email or password' })
    }
  } catch (error) {
    console.error('Client login error:', error)
    res.status(500).json({ error: 'Server error during login' })
  }
})

// @route   GET /api/client/me
// @desc    Get client profile
router.get('/me', protectClient, async (req, res) => {
  if (req.client) {
    res.json({
      _id: req.client._id,
      name: req.client.name,
      email: req.client.email,
      caseStatus: req.client.caseStatus,
      latestUpdate: req.client.latestUpdate,
      documents: req.client.documents
    })
  } else {
    res.status(404).json({ error: 'Client not found' })
  }
})

// @route   POST /api/client/logout
// @desc    Logout client / clear cookie
router.post('/logout', (req, res) => {
  res.cookie('clientToken', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'Client logged out' })
})

export default router
