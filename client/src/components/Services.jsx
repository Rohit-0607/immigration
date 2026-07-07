import { useState, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Services() {
  const [ref, isVisible] = useScrollReveal()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services')
        const data = await res.json()
        setServices(data)
      } catch (err) {
        console.error('Error fetching services:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header" ref={ref}>
          <div className={`${isVisible ? 'reveal active' : 'reveal'}`}>
            <div className="section-label">Our Services</div>
            <h2 className="section-title">Comprehensive Immigration Solutions</h2>
            <p className="section-subtitle">
              From student visas to permanent residency, we cover every immigration pathway to make your global aspirations come true.
            </p>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--gold-400)', padding: '40px' }}>
            <i className="fas fa-spinner fa-spin fa-2x"></i>
          </div>
        ) : (
          <div className="services-grid">
            {services.map((service, idx) => (
              <div
                className="service-card"
                key={service._id}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="service-icon">
                  <i className={`fas ${service.icon}`}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#contact" className="service-link" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
                  Learn More <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
