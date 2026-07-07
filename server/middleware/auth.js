import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import Client from '../models/Client.js'

export const protect = async (req, res, next) => {
  let token = req.cookies.adminToken

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.admin = await Admin.findById(decoded.id).select('-password')
      if (!req.admin) {
        return res.status(401).json({ error: 'Not authorized, admin not found' })
      }
      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({ error: 'Not authorized, token failed' })
    }
  } else {
    res.status(401).json({ error: 'Not authorized, no token' })
  }
}

export const protectClient = async (req, res, next) => {
  let token = req.cookies.clientToken

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.client = await Client.findById(decoded.id).select('-password')
      if (!req.client) {
        return res.status(401).json({ error: 'Not authorized, client not found' })
      }
      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({ error: 'Not authorized, token failed' })
    }
  } else {
    res.status(401).json({ error: 'Not authorized, no token' })
  }
}
