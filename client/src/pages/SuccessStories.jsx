import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import ContactForm from '../components/ContactForm'

export default function SuccessStories() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials')
        if (res.ok) {
          const data = await res.json()
          setTestimonials(data)
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-primary-950 text-white py-16 md:py-24 text-center">
        <div className="container-custom max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Success Stories</h1>
          <p className="text-xl text-primary-200">
            Read real stories from individuals and families who achieved their global dreams with Future Point.
          </p>
        </div>
      </div>

      <div className="container-custom py-16">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <i className="lucide-loader animate-spin w-12 h-12 text-primary-600 border-4 border-primary-100 border-t-primary-600 rounded-full" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {testimonials.map((t) => (
              <div key={t._id} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col h-full">
                <div className="flex gap-1 mb-6 text-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-slate-600 italic leading-relaxed flex-grow mb-8">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-50">
                  <div className="w-12 h-12 bg-primary-50 text-primary-700 rounded-full flex items-center justify-center font-bold text-lg">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <span className="text-sm text-primary-600 font-medium">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
            <div className="bg-primary-900 text-white p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Want to be our next success story?</h2>
              <p className="text-primary-200 mb-8 leading-relaxed">
                Take the first step towards your international journey. Book a free consultation and let our experts map out your success.
              </p>
              <div className="flex -space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-300 border-2 border-primary-900"></div>
                <div className="w-12 h-12 rounded-full bg-slate-400 border-2 border-primary-900"></div>
                <div className="w-12 h-12 rounded-full bg-slate-500 border-2 border-primary-900"></div>
                <div className="w-12 h-12 rounded-full bg-primary-100 border-2 border-primary-900 flex items-center justify-center text-primary-900 text-xs font-bold">+10k</div>
              </div>
              <span className="text-sm text-primary-300 font-medium">Join thousands of successful applicants</span>
            </div>
            <div className="p-8 md:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
