import { useState, useEffect, useCallback } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [ref, isVisible] = useScrollReveal()
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials')
        const data = await res.json()
        setTestimonials(data)
      } catch (err) {
        console.error('Error fetching testimonials:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  const next = useCallback(() => {
    if (testimonials.length === 0) return
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = () => {
    if (testimonials.length === 0) return
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-rotation
  useEffect(() => {
    if (testimonials.length === 0) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next, testimonials.length])

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-header" ref={ref}>
          <div className={`${isVisible ? 'reveal active' : 'reveal'}`}>
            <div className="section-label">Testimonials</div>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Hear from the people whose lives we've transformed through expert immigration guidance.
            </p>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--gold-400)', padding: '40px' }}>
            <i className="fas fa-spinner fa-spin fa-2x"></i>
          </div>
        ) : testimonials.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--gray-500)' }}>No testimonials found.</div>
        ) : (
          <div className="testimonial-slider">
            <div className="testimonial-track">
              <div
                className="testimonial-slides"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {testimonials.map((t) => (
                  <div className="testimonial-card" key={t._id}>
                    <div className="testimonial-inner">
                      <div className="testimonial-stars">
                        {[...Array(5)].map((_, i) => (
                          <i className="fas fa-star" key={i}></i>
                        ))}
                      </div>
                      <p className="testimonial-text">{t.text}</p>
                      <div className="testimonial-author">
                        <div className="testimonial-avatar">{t.initials}</div>
                        <div className="testimonial-author-info">
                          <h4>{t.name}</h4>
                          <span>{t.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="testimonial-dots">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`testimonial-dot ${idx === current ? 'active' : ''}`}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="testimonial-arrows">
              <button className="testimonial-arrow" onClick={prev} aria-label="Previous">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="testimonial-arrow" onClick={next} aria-label="Next">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
