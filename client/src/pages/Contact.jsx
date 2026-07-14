import { Mail, MapPin, Phone, Sparkles, ArrowRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Future Point Immigration</title>
        <meta name="description" content="Get in touch with Future Point Immigration for a free consultation." />
        <meta property="og:title" content="Contact Us | Future Point Immigration" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero */}
      <section className="page-hero-dark py-24">
        <div className="glow-orb w-96 h-96 -top-20 -left-20" style={{ background: 'rgba(124,58,237,0.2)' }} />
        <div className="glow-orb w-72 h-72 bottom-0 right-10" style={{ background: 'rgba(6,182,212,0.15)' }} />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <div className="pill-label-dark mx-auto w-fit mb-6">
            <Sparkles className="w-4 h-4" /> Get In Touch
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-slate-300 text-xl">
            Have questions about your immigration options? Our team of experts is ready to help you navigate your journey.
          </p>
        </div>
      </section>

      <div className="bg-slate-50 pb-20">
        <div className="container-custom -mt-10 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-5">
              {[
                {
                  icon: MapPin, title: 'Visit Our Office',
                  content: <p className="text-slate-600 text-sm leading-relaxed">Near Bus Stand, Kaithal<br />Kaithal-136027<br />Haryana, India</p>
                },
                {
                  icon: Phone, title: 'Call Us',
                  content: (
                    <div className="space-y-2">
                      <p className="text-slate-500 text-sm">Mon–Sat: 9:00 AM – 6:00 PM</p>
                      <div className="flex flex-col gap-1.5">
                        {['+91 74950 41916', '+91 89509 87002', '+91 82220 00285'].map(n => (
                          <a key={n} href={`tel:${n.replace(/\s/g,'')}`}
                            className="text-sm font-semibold hover:underline transition-colors"
                            style={{ color: 'var(--clr-purple)' }}>{n}</a>
                        ))}
                      </div>
                    </div>
                  )
                },
                {
                  icon: Mail, title: 'Email Us',
                  content: (
                    <div className="space-y-1">
                      <p className="text-slate-500 text-sm">We aim to reply within 24 hours.</p>
                      <a href="mailto:futurepointconsultantcy@gmail.com"
                        className="text-sm font-semibold break-all hover:underline"
                        style={{ color: 'var(--clr-purple)' }}>futurepointconsultantcy@gmail.com</a>
                    </div>
                  )
                },
              ].map(({ icon: Icon, title, content }) => (
                <div key={title} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="icon-box w-12 h-12 rounded-xl flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2 text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>{title}</h3>
                    {content}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a href="https://wa.me/917495041916" target="_blank" rel="noopener noreferrer"
                className="btn-gradient w-full justify-center py-3.5">
                <ArrowRight className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>

          {/* Map */}
          <div className="mt-14 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="rounded-xl overflow-hidden" style={{ height: '380px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3459.852089975267!2d76.4642305!3d29.868539199999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e2128579a1a9b%3A0x205571551ef8ea5!2sFuture%20point!5e0!3m2!1sen!2sin!4v1783406466622!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0 }}
                allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
