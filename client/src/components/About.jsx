import useScrollReveal from '../hooks/useScrollReveal'

export default function About() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section className="about" id="about">
      <div className="container" ref={ref}>
        <div className={`about-image-wrap ${isVisible ? 'reveal-left active' : 'reveal-left'}`}>
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=450&fit=crop"
              alt="Future Point Immigration Consultants team"
            />
          </div>
          <div className="about-experience-badge">
            <span className="number">15+</span>
            <span className="text">Years of<br />Excellence</span>
          </div>
        </div>

        <div className={`about-content ${isVisible ? 'reveal-right active' : 'reveal-right'}`}>
          <div className="section-label">About Us</div>
          <h2 className="section-title">Trusted Immigration Experts Building Your Future</h2>
          <p className="about-text">
            Future Point Immigration is a premier consultancy firm dedicated to making your international dreams
            a reality. With over 15 years of experience, our team of certified immigration professionals has
            successfully helped thousands of clients navigate the complex immigration process.
          </p>
          <p className="about-text">
            We specialize in providing personalized solutions for Study Visas, Permanent Residency, Work Permits,
            and Business Immigration across multiple countries including Canada, Australia, UK, USA, and more.
          </p>

          <div className="about-features">
            <div className="about-feature">
              <i className="fas fa-check-circle"></i> Certified Consultants
            </div>
            <div className="about-feature">
              <i className="fas fa-check-circle"></i> 98% Success Rate
            </div>
            <div className="about-feature">
              <i className="fas fa-check-circle"></i> Personalized Service
            </div>
            <div className="about-feature">
              <i className="fas fa-check-circle"></i> End-to-End Support
            </div>
            <div className="about-feature">
              <i className="fas fa-check-circle"></i> Transparent Process
            </div>
            <div className="about-feature">
              <i className="fas fa-check-circle"></i> Post-Landing Help
            </div>
          </div>

          <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
            <i className="fas fa-arrow-right"></i> Learn More
          </a>
        </div>
      </div>
    </section>
  )
}
