import { Link } from 'react-router-dom'
import { Globe, PlaneTakeoff, GraduationCap, Users, ShieldCheck, ChevronRight } from 'lucide-react'
import ContactForm from '../components/ContactForm'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary-950 text-white overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" 
            alt="Airplane in sky" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-900/90 to-transparent"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-800 border border-primary-700 text-primary-200 text-sm font-medium mb-6">
                <Globe className="w-4 h-4" />
                Trusted Immigration Consultants
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white">
                Your Global Journey <br/>
                <span className="text-gold">Starts Here.</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">
                Expert guidance for Study Visas, Permanent Residency, and Work Permits to Canada, Australia, UK, USA, and beyond. 
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-accent py-4 text-lg">
                  Book Free Consultation
                </Link>
                <Link to="/eligibility-checker" className="btn-outline border-white text-white hover:bg-white hover:text-primary-950 py-4 text-lg">
                  Check Eligibility
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-12 pt-8 border-t border-primary-800 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">15+</div>
                  <div className="text-xs text-primary-300 uppercase tracking-wider">Years Exp.</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">10k+</div>
                  <div className="text-xs text-primary-300 uppercase tracking-wider">Visas Approved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">25+</div>
                  <div className="text-xs text-primary-300 uppercase tracking-wider">Countries</div>
                </div>
              </div>
            </div>

            {/* Hero Form */}
            <div className="hidden lg:block relative z-20">
              <div className="absolute inset-0 bg-gold blur-[100px] opacity-20 rounded-full"></div>
              <div className="relative">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Core Services</h2>
            <p className="text-slate-600 text-lg">
              Comprehensive immigration solutions tailored to your specific goals and profile.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Study Visa', icon: GraduationCap, desc: 'Get admitted to top universities globally with end-to-end admission and visa support.', link: '/services/study-visa' },
              { title: 'Permanent Residency', icon: ShieldCheck, desc: 'Navigate Express Entry, PNP, and skilled migration pathways seamlessly.', link: '/services/permanent-residency' },
              { title: 'Work Visa', icon: Users, desc: 'Unlock global career opportunities with employer-sponsored and independent work visas.', link: '/services/work-visa' },
            ].map((service, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 hover:border-primary-100">
                <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 line-clamp-3">{service.desc}</p>
                <Link to={service.link} className="inline-flex items-center text-primary-700 font-semibold hover:text-primary-800">
                  Read More <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services" className="btn-outline border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Success Stories</h2>
              <p className="text-slate-600 text-lg">
                Don't just take our word for it. Hear from clients who have successfully started their new lives abroad.
              </p>
            </div>
            <Link to="/success-stories" className="btn-primary shrink-0">
              Read All Reviews
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Kavita Narang', country: 'Canada PR', rating: 5, text: "Future Point's team is exceptional. They guided me through the complex Express Entry process with transparency and dedication. Highly recommended!" },
              { name: 'Himank Garg', country: 'UK Study Visa', rating: 5, text: "From university selection to visa interview prep, they handled everything perfectly. I am now pursuing my Masters in London thanks to them." },
              { name: 'Madhu Sachdeva', country: 'Australia Subclass 189', rating: 5, text: "Their knowledge of the points system is unmatched. They suggested ways to boost my CRS score that I wouldn't have known otherwise." },
            ].map((review, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <div className="flex gap-1 mb-4 text-gold">
                  {[...Array(review.rating)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                </div>
                <p className="text-slate-600 mb-6 italic leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{review.name}</h4>
                    <span className="text-sm text-primary-600 font-medium">{review.country}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900 text-white text-center">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Ready to Start Your Immigration Journey?</h2>
          <p className="text-lg text-primary-200 mb-10 leading-relaxed">
            Stop dreaming and start acting. Book a free consultation with our experts to evaluate your profile and discover the best pathway for your future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="btn-accent py-4 px-8 text-lg">
              Book Your Free Consultation
            </Link>
            <a href="tel:+91 89509 87002" className="btn-outline border-white text-white hover:bg-white hover:text-primary-950 py-4 px-8 text-lg">
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
