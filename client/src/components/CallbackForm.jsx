import { useState, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

export default function CallbackForm() {
  const [ref, isVisible] = useScrollReveal()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    country: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [countriesList, setCountriesList] = useState([])

  useEffect(() => {
    fetch('/api/countries')
      .then(res => res.json())
      .then(data => {
        setCountriesList(data.map(c => c.name).sort())
      })
      .catch(console.error)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to submit form')
      }

      setSubmitted(true)
      setFormData({ name: '', phone: '', email: '', city: '', country: '', service: '', message: '' })
    } catch (err) {
      console.error("Submission error:", err)
      alert("Something went wrong: " + err.message)
    } finally {
      setLoading(false)
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  return (
    <section className="callback" id="contact">
      <div className="container" ref={ref}>
        <div className={`callback-wrapper ${isVisible ? 'reveal active' : 'reveal'}`}>
          {/* Left — Info */}
          <div className="callback-info">
            <h2>Request a Free Consultation</h2>
            <p>
              Fill out the form and our expert immigration consultants will get back to you within 24 hours
              with a personalized assessment of your case.
            </p>

            <div className="callback-contact-list">
              <div className="callback-contact-item">
                <div className="callback-contact-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="callback-contact-text">
                  <strong>Call Us</strong>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
              </div>

              <div className="callback-contact-item">
                <div className="callback-contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="callback-contact-text">
                  <strong>Email Us</strong>
                  <a href="mailto:info@futurepoint.com">info@futurepoint.com</a>
                </div>
              </div>

              <div className="callback-contact-item">
                <div className="callback-contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="callback-contact-text">
                  <strong>Visit Us</strong>
                  SCO 123, Sector 17, Chandigarh, India
                </div>
              </div>

              <div className="callback-contact-item">
                <div className="callback-contact-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="callback-contact-text">
                  <strong>Working Hours</strong>
                  Mon – Sat: 9:00 AM – 6:00 PM
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {submitted ? (
              <div className="form-success">
                <i className="fas fa-check-circle"></i>
                <h3>Thank You!</h3>
                <p>Your request has been submitted. Our team will contact you shortly.</p>
              </div>
            ) : (
              <form className="callback-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="city"
                      placeholder="Your City"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <select name="country" value={formData.country} onChange={handleChange} required>
                      <option value="">Select Target Country *</option>
                      {countriesList.map((c, idx) => (
                        <option key={idx} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <select name="service" value={formData.service} onChange={handleChange} required>
                      <option value="">Select Service *</option>
                      <option value="study-visa">Study Visa</option>
                      <option value="pr">Permanent Residency</option>
                      <option value="work-permit">Work Permit</option>
                      <option value="tourist-visa">Tourist Visa</option>
                      <option value="business-visa">Business Visa</option>
                      <option value="spouse-visa">Spouse / Family Visa</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message (Optional)"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    style={{ resize: 'vertical' }}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary form-submit" disabled={loading}>
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Submitting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i> Submit Request
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
