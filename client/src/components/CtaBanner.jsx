export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="container">
        <div className="cta-content">
          <h2>Committed to Helping You Succeed</h2>
          <p>Our qualified team of advisers are always present for any assistance you may need.</p>
        </div>
        <a href="#contact" className="btn btn-white" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
          <i className="fas fa-phone-alt"></i> Contact Us Today
        </a>
      </div>
    </section>
  )
}
