export default function Hero() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${8 + Math.random() * 12}s`,
    animationDelay: `${Math.random() * 10}s`,
    size: `${2 + Math.random() * 4}px`,
  }))

  return (
    <section className="hero" id="hero">
      {/* Background shapes */}
      <div className="hero-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Particles */}
      <div className="particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
            }}
          />
        ))}
      </div>

      <div className="container">
        {/* Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fas fa-circle"></i>
            Trusted Immigration Consultants Since 2010
          </div>

          <h1 className="hero-title">
            Your Gateway to <span className="highlight">Global Opportunities</span>
          </h1>

          <p className="hero-description">
            Future Point Immigration provides expert guidance for Study Visas, Permanent Residency, Work Permits & more.
            Let us turn your dreams of settling abroad into reality.
          </p>

          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              <i className="fas fa-paper-plane"></i> Get Started
            </a>
            <a href="#services" className="btn btn-outline" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }}>
              <i className="fas fa-play-circle"></i> Our Services
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">15+</div>
              <div className="hero-stat-label">Years Experience</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">10K+</div>
              <div className="hero-stat-label">Happy Clients</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">25+</div>
              <div className="hero-stat-label">Countries</div>
            </div>
          </div>
        </div>

        {/* Visual — Animated Globe */}
        <div className="hero-visual">
          <div className="hero-globe">
            <div className="globe-circle"></div>
            <div className="globe-circle"></div>
            <div className="globe-circle"></div>
            <div className="globe-dot"></div>
            <div className="globe-dot"></div>
            <div className="globe-dot"></div>
            <div className="globe-dot"></div>
            <div className="globe-dot"></div>
            <div className="globe-center-icon">
              <i className="fas fa-globe-americas"></i>
            </div>

            {/* Floating country cards */}
            <div className="hero-country-card">
              <span className="flag">🇨🇦</span> Canada
            </div>
            <div className="hero-country-card">
              <span className="flag">🇦🇺</span> Australia
            </div>
            <div className="hero-country-card">
              <span className="flag">🇬🇧</span> UK
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
