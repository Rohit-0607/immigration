import { useState, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

export default function WhyChooseUs() {
  const [ref, isVisible] = useScrollReveal()
  const [features, setFeatures] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await fetch('/api/features')
        const data = await res.json()
        setFeatures(data)
      } catch (err) {
        console.error('Error fetching features:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatures()
  }, [])

  return (
    <section className="why-us" id="why-us">
      <div className="container">
        <div className="section-header" ref={ref}>
          <div className={`${isVisible ? 'reveal active' : 'reveal'}`}>
            <div className="section-label">Why Us</div>
            <h2 className="section-title">Why People Choose Future Point?</h2>
            <p className="section-subtitle">
              We bring each client the best service with a commitment to excellence and results.
            </p>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--gold-400)', padding: '40px' }}>
            <i className="fas fa-spinner fa-spin fa-2x"></i>
          </div>
        ) : (
          <div className="why-grid">
            {features.map((feat) => (
              <div className="why-card" key={feat._id}>
                <div className="why-icon">
                  <i className={`fas ${feat.icon}`}></i>
                </div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
