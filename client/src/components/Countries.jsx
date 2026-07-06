import { useState, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import { Search } from 'lucide-react'

export default function Countries() {
  const [ref, isVisible] = useScrollReveal()
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [visibleCount, setVisibleCount] = useState(8)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('/api/countries')
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

  const filteredCountries = countries.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const displayedCountries = filteredCountries.slice(0, visibleCount)

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 12)
  }

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
          
          <div className="max-w-md mx-auto mt-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for a country..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setVisibleCount(8)
              }}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--gold-400)', padding: '40px' }}>
            <i className="fas fa-spinner fa-spin fa-2x"></i>
          </div>
        ) : (
          <div className="countries-grid">
            {displayedCountries.map((country) => (
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

        {!loading && visibleCount < filteredCountries.length && (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button onClick={handleShowMore} className="btn-outline py-3 px-8" style={{ border: '2px solid var(--primary-600)', color: 'var(--primary-600)', borderRadius: '9999px', fontWeight: 'bold' }}>
              Load More Countries
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
