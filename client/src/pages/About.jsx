import { Users, Target, Shield, Award } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function About() {
  return (
    <>
    <Helmet>
      <title>About Us | Future Point Immigration</title>
      <meta name="description" content="Learn about Future Point Immigration, a premier consultancy with 15+ years of experience in helping clients achieve their global aspirations." />
      <meta property="og:title" content="About Us | Future Point Immigration" />
      <meta property="og:description" content="Learn about Future Point Immigration, a premier consultancy with 15+ years of experience in helping clients achieve their global aspirations." />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://futurepoint.com/og-image.jpg" />
    </Helmet>
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">About Future Point</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              We are a premier immigration consultancy dedicated to turning your global aspirations into reality. With over 15 years of excellence, we navigate the complexities of international visa systems so you don't have to.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-primary-50 p-10 rounded-3xl border border-primary-100">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                To provide honest, transparent, and expert immigration guidance that empowers individuals and families to build successful futures across borders. We strive to simplify the immigration process and maximize our clients' chances of success.
              </p>
            </div>
            <div className="bg-gold/10 p-10 rounded-3xl border border-gold/20">
              <div className="w-16 h-16 bg-gold text-primary-950 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                To be the world's most trusted immigration consultancy, recognized globally for our ethical practices, client-first approach, and unparalleled success rate in connecting talent with global opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-primary-950 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Values We Live By</h2>
            <p className="text-primary-200 text-lg">
              Our success is built on a foundation of uncompromised principles.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto bg-primary-900 rounded-full flex items-center justify-center mb-6 border border-primary-800">
                <Shield className="w-10 h-10 text-gold" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Integrity</h3>
              <p className="text-primary-200">We maintain absolute transparency. We only take cases we believe we can win, providing honest assessments from day one.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto bg-primary-900 rounded-full flex items-center justify-center mb-6 border border-primary-800">
                <Users className="w-10 h-10 text-gold" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Client-Centric</h3>
              <p className="text-primary-200">Your success is our success. Every strategy we develop is tailored uniquely to your profile and life goals.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto bg-primary-900 rounded-full flex items-center justify-center mb-6 border border-primary-800">
                <Award className="w-10 h-10 text-gold" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Excellence</h3>
              <p className="text-primary-200">We constantly study changing immigration laws to ensure our advice is accurate, compliant, and optimized for success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-50 text-center">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Let's Build Your Future Together</h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Our expert consultants are ready to evaluate your profile and guide you on the best immigration pathway.
          </p>
          <Link to="/contact" className="btn-primary py-4 px-10 text-lg">
            Speak to an Expert
          </Link>
        </div>
      </section>
    </div>
    </>
  )
}
