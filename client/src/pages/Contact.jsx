import { Mail, MapPin, Phone } from 'lucide-react'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-primary-950 text-white py-16 md:py-24">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-primary-200">
            Have questions about your immigration options? Our team of experts is ready to help you navigate your journey.
          </p>
        </div>
      </div>

      <div className="container-custom -mt-10 md:-mt-16 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 text-lg">Visit Our Office</h3>
                <p className="text-slate-600 leading-relaxed">
                  123 Immigration Blvd, Suite 400<br />
                  New Delhi, ND 110001<br />
                  India
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 text-lg">Call Us</h3>
                <p className="text-slate-600 leading-relaxed">
                  Mon-Sat: 9:00 AM - 6:00 PM<br />
                  <a href="tel:+1234567890" className="text-primary-600 hover:underline font-medium mt-1 inline-block">+1 (234) 567-890</a>
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 text-lg">Email Us</h3>
                <p className="text-slate-600 leading-relaxed">
                  We aim to reply within 24 hours.<br />
                  <a href="mailto:info@futurepoint.example.com" className="text-primary-600 hover:underline font-medium mt-1 inline-block">info@futurepoint.example.com</a>
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

        </div>

        {/* Map Placeholder */}
        <div className="mt-16 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="aspect-[21/9] w-full bg-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-500 overflow-hidden relative">
            {/* Real implementation would use an iframe from Google Maps */}
            <MapPin className="w-12 h-12 mb-2 text-slate-400" />
            <p className="font-medium">Google Maps Embed Placeholder</p>
            <p className="text-sm">Replace this div with your actual Google Maps iframe.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
