import { useState, useEffect } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'

const FALLBACK_COUNTRIES = [
  'Australia', 'Austria', 'Bahrain', 'Bangladesh', 'Belgium', 'Canada', 'China', 'Cyprus',
  'Czech Republic', 'Denmark', 'Dubai (UAE)', 'Finland', 'France', 'Germany', 'Greece',
  'Hungary', 'India', 'Indonesia', 'Ireland', 'Italy', 'Japan', 'Jordan', 'Kazakhstan',
  'Kenya', 'Kuwait', 'Malaysia', 'Malta', 'Mauritius', 'Mexico', 'Netherlands',
  'New Zealand', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Philippines', 'Poland',
  'Portugal', 'Qatar', 'Romania', 'Saudi Arabia', 'Singapore', 'South Korea',
  'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Thailand', 'Turkey',
  'United Arab Emirates', 'United Kingdom', 'USA', 'Vietnam'
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    service: '',
    message: '',
    _website: ''
  })
  const [status, setStatus] = useState('idle') // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('')
  const [countriesList, setCountriesList] = useState([])

  useEffect(() => {
    fetch('/api/countries')
      .then(res => res.json())
      .then(data => {
        // Use DB data if available and non-empty, otherwise fall back to hardcoded list
        if (Array.isArray(data) && data.length > 0) {
          setCountriesList(data.map(c => c.name).sort())
        } else {
          setCountriesList(FALLBACK_COUNTRIES)
        }
      })
      .catch(() => {
        // If fetch fails completely, still show countries
        setCountriesList(FALLBACK_COUNTRIES)
      })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          service: formData.service || 'General Inquiry',
          subject: 'New Consultation Request',
          message: formData.message,
          _website: formData._website
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to submit form')
      }
      
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', country: '', service: '', message: '', _website: '' })
      
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error("Submission error:", err)
      setErrorMessage(err.message || 'An unknown error occurred.')
      setStatus('error')
    }
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Book a Free Consultation</h3>
      
      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
          <p className="text-sm text-green-800">
            <strong>Success!</strong> Your request has been received. Our team will contact you shortly to schedule your free consultation.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
          <div className="text-sm text-red-800">
            <strong>Something went wrong.</strong>
            <p className="mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot field - visually hidden to catch bots */}
        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
          <input type="text" name="_website" tabIndex="-1" value={formData._website} onChange={handleChange} autoComplete="off" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
              placeholder="74950 41916"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-slate-700 mb-1">Target Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow bg-white text-slate-900"
          >
            <option value="">Select a country...</option>
            {countriesList.map((c, idx) => (
              <option key={idx} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">Service Interested In</label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow bg-white text-slate-900"
          >
            <option value="">Select a service...</option>
            <option value="Study Visa">Study Visa</option>
            <option value="Work Visa">Work Visa</option>
            <option value="Permanent Residency">Permanent Residency</option>
            <option value="Visitor Visa">Visitor Visa</option>
            <option value="Spouse/Dependent Visa">Spouse/Dependent Visa</option>
            <option value="IELTS/PTE Coaching">IELTS/PTE Coaching</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Your Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow resize-none"
            placeholder="Briefly describe your goals or ask a question..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full btn-primary py-3.5 text-lg flex items-center justify-center disabled:opacity-70"
        >
          {status === 'submitting' ? (
            <span className="flex items-center gap-2">
              <i className="lucide-loader animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              Submitting...
            </span>
          ) : (
            'Request Free Consultation'
          )}
        </button>
      </form>
    </div>
  )
}
