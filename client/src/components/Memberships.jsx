const memberships = [
  { icon: 'fa-award', name: 'ICCRC Certified' },
  { icon: 'fa-certificate', name: 'AAERI Member' },
  { icon: 'fa-shield-alt', name: 'MARA Registered' },
  { icon: 'fa-globe', name: 'ICEF Agency' },
  { icon: 'fa-university', name: 'British Council' },
]

export default function Memberships() {
  return (
    <section className="memberships">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Accreditations</div>
          <h2 className="section-title">Our Memberships</h2>
        </div>

        <div className="membership-logos">
          {memberships.map((m, idx) => (
            <div className="membership-logo" key={idx}>
              <div className="membership-logo-icon">
                <i className={`fas ${m.icon}`}></i>
              </div>
              <span>{m.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
