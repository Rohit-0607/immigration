import { useState, useEffect } from 'react'
import useCounter from '../hooks/useCounter'

function StatItem({ target, suffix, label }) {
  const [ref, count] = useCounter(target, 2000)

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-number">
        {count}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function Stats() {
  const [stats, setStats] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/stats')
        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error('Error fetching stats:', err)
      }
    }
    fetchStats()
  }, [])

  if (stats.length === 0) return null // Hide if no stats

  return (
    <section className="stats" id="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat) => (
            <StatItem key={stat._id} target={stat.target} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
