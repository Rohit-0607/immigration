import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import apiRoutes from './routes/api.js'

// Load env vars
dotenv.config()

// Connect to MongoDB
connectDB()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}))
app.use(express.json())

// API Routes
app.use('/api', apiRoutes)

// Serve static files in production
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist')
app.use(express.static(clientBuildPath))

// SPA fallback
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(clientBuildPath, 'index.html'))
  }
})

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Future Point API server running on http://localhost:${PORT}`)
  })
}

export default app;
