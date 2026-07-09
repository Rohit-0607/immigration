import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, ChevronDown, Mail, Check, AlertCircle } from 'lucide-react'
import { baseChecklists, countryNotes } from '../data/documentChecklists'

export default function DocumentChecklist() {
  const [services, setServices] = useState([])
  const [countries, setCountries] = useState([])
  
  const [selectedService, setSelectedService] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  
  const [checkedItems, setCheckedItems] = useState({})
  
  // Lead form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [_website, setWebsite] = useState('') // Honeypot
  
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Fetch Services
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(console.error)

    // Fetch Countries
    fetch('/api/countries')
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(console.error)
  }, [])

  // Derive slug from service title (mirroring Services.jsx)
  const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  const currentServiceSlug = selectedService ? generateSlug(services.find(s => s._id === selectedService)?.title || '') : ''
  const currentCountryName = selectedCountry ? countries.find(c => c._id === selectedCountry)?.name || '' : ''
  
  const checklistItems = currentServiceSlug && baseChecklists[currentServiceSlug] 
    ? baseChecklists[currentServiceSlug] 
    : []
    
  const countryNote = currentCountryName && countryNotes[currentCountryName] 
    ? countryNotes[currentCountryName] 
    : null

  const handleCheck = (index) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const serviceName = services.find(s => s._id === selectedService)?.title
    const countryName = countries.find(c => c._id === selectedCountry)?.name

    try {
      const res = await fetch('/api/checklist-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          service: serviceName,
          country: countryName,
          _website // Honeypot
        })
      })

      if (!res.ok) throw new Error('Failed to submit form')

      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Document Checklist | Future Point Immigration</title>
        <meta name="description" content="Generate a customized document checklist for your immigration application." />
        <meta property="og:title" content="Document Checklist | Future Point Immigration" />
        <meta property="og:description" content="Generate a customized document checklist for your immigration application." />
      </Helmet>

      <div className="bg-slate-50 min-h-screen py-16">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Document Checklist Generator</h1>
            <p className="text-xl text-slate-600">Find out exactly what documents you need for your application.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">What are you applying for?</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={selectedService}
                    onChange={(e) => {
                      setSelectedService(e.target.value)
                      setCheckedItems({})
                    }}
                  >
                    <option value="">Select a Service</option>
                    {services.map(s => (
                      <option key={s._id} value={s._id}>{s.title}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Which country?</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <option value="">Select a Country</option>
                    {countries.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {(selectedService && selectedCountry) && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 animate-fade-in-up">
              
              <div className="mb-8 p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-amber-800 text-sm leading-relaxed">
                  <strong>Disclaimer:</strong> This is a generalized checklist for guidance purposes only. Official requirements may vary based on your specific case, nationality, and frequent government policy changes. Always consult with a licensed immigration professional before submitting your final application.
                </p>
              </div>

              {countryNote && (
                <div className="mb-8 p-4 bg-primary-50 rounded-xl border border-primary-100">
                  <h4 className="font-semibold text-primary-900 mb-1">Country Note: {currentCountryName}</h4>
                  <p className="text-primary-800 text-sm">{countryNote}</p>
                </div>
              )}

              <h3 className="text-2xl font-bold text-slate-900 mb-6">Required Documents</h3>
              
              {checklistItems.length > 0 ? (
                <div className="space-y-4 mb-10">
                  {checklistItems.map((item, index) => (
                    <label 
                      key={index} 
                      className={`flex items-start p-4 rounded-xl border cursor-pointer transition-colors ${checkedItems[index] ? 'bg-slate-50 border-primary-200' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center mr-4 flex-shrink-0 transition-colors ${checkedItems[index] ? 'bg-primary-600 border-primary-600 text-white' : 'border-slate-300'}`}>
                        {checkedItems[index] && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className={`text-slate-700 ${checkedItems[index] ? 'line-through opacity-70' : ''}`}>
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic mb-10">No specific checklist found for this service.</p>
              )}

              <div className="border-t border-slate-100 pt-8 mt-4">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Email me this checklist</h3>
                <p className="text-slate-500 mb-6">Enter your details to receive a copy of this checklist and a free consultation.</p>

                {submitted ? (
                  <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200 text-center">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h4 className="font-bold text-lg mb-1">Checklist Sent!</h4>
                    <p className="text-green-700">We've saved your details and will be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                    {/* Honeypot field - hidden from real users */}
                    <input 
                      type="text" 
                      name="_website" 
                      style={{ display: 'none' }} 
                      tabIndex="-1" 
                      autoComplete="off"
                      value={_website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                    
                    <div>
                      <input 
                        type="text" 
                        required 
                        placeholder="Full Name" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        required 
                        placeholder="Email Address" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        placeholder="Phone Number (Optional)" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center disabled:opacity-70"
                    >
                      {submitting ? 'Submitting...' : (
                        <>
                          <Mail className="w-5 h-5 mr-2" /> Send Checklist
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  )
}
