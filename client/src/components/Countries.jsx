import { useState, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Countries() {
  const [ref, isVisible] = useScrollReveal()
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/countries')
        const data = await res.json()
        setCountries(data)
      } catch (err) {
        console.error('Error fetching countries:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCountries()
  }, [])

  return (
    <section className="countries" id="countries">
      <div className="container">
        <div className="section-header" ref={ref}>
          <div className={`${isVisible ? 'reveal active' : 'reveal'}`}>
            <div className="section-label">Destinations</div>
            <h2 className="section-title">Countries We Serve</h2>
            <p className="section-subtitle">
              Explore immigration opportunities across the world's most sought-after destinations.
            </p>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--gold-400)', padding: '40px' }}>
            <i className="fas fa-spinner fa-spin fa-2x"></i>
          </div>
        ) : (
          <div className="countries-grid">
            {countries.map((country) => (
              <div className="country-card" key={country._id}>
                <img src={country.image} alt={country.name} loading="lazy" />
                <div className="country-overlay">
                  <div className="country-flag">{country.flag}</div>
                  <h3 className="country-name">{country.name}</h3>
                  <p className="country-desc">{country.desc}</p>
                  <a href="#contact" className="country-cta" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
                    Explore <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
