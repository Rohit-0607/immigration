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
                  123 Baragaon <br />
                  Karnal, 132023<br />
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
                  <div className="flex flex-col mt-1 gap-1">
                    <a href="tel:+917495041916" className="text-primary-600 hover:underline font-medium inline-block">+91 74950 41916</a>
                    <a href="tel:+918950987002" className="text-primary-600 hover:underline font-medium inline-block">+91 89509 87002</a>
                    <a href="tel:+918222000285" className="text-primary-600 hover:underline font-medium inline-block">+91 82220 00285</a>
                  </div>
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
                  <a href="mailto:futurepointconsultantcy@gmail.com" className="text-primary-600 hover:underline font-medium mt-1 inline-block">futurepointconsultantcy@gmail.com</a>
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
          <div className="aspect-[21/9] w-full bg-slate-200 rounded-xl overflow-hidden relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3459.852089975267!2d76.4642305!3d29.868539199999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e2128579a1a9b%3A0x205571551ef8ea5!2sFuture%20point!5e0!3m2!1sen!2sin!4v1783406466622!5m2!1sen!2sin"
              
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
