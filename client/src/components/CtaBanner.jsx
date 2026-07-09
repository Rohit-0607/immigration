import { Link } from 'react-router-dom'

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="container">
        <div className="cta-content">
          <h2>Committed to Helping You Succeed</h2>
          <p>Our qualified team of advisers are always present for any assistance you may need.</p>
        </div>
        <Link to="/book-consultation" className="btn btn-white">
          <i className="fas fa-calendar-alt"></i> Book Consultation
        </Link>
      </div>
    </section>
  )
}
