import rateLimit from 'express-rate-limit'

// Rate limiter for public POST routes (10 requests per 15 minutes)
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Honeypot middleware to catch basic bots
export const honeypot = (req, res, next) => {
  // If the honeypot field '_website' is filled, it's a bot.
  if (req.body._website && req.body._website !== '') {
    console.warn('Bot detected by honeypot!')
    // Silently reject: return 200 OK so the bot thinks it succeeded, but don't process it
    return res.status(200).json({ 
      success: true, 
      message: 'Request submitted successfully' // Fake success message
    })
  }
  next()
}
