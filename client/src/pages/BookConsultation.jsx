import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Cal, { getCalApi } from '@calcom/embed-react'

export default function BookConsultation() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi()
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#1d4ed8" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      })
    })()
  }, [])

  return (
    <>
      <Helmet>
        <title>Book a Consultation | Future Point Immigration</title>
        <meta name="description" content="Book a free consultation with our immigration experts to discuss your visa and PR options." />
        <meta property="og:title" content="Book a Consultation | Future Point Immigration" />
        <meta property="og:description" content="Book a free consultation with our immigration experts to discuss your visa and PR options." />
      </Helmet>

      <div className="bg-slate-50 min-h-screen py-16">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Book Your Consultation</h1>
            <p className="text-xl text-slate-600">
              Select a time that works for you. Our experts are ready to help you navigate your immigration journey.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 md:p-6 overflow-hidden min-h-[600px]">
            <Cal
              calLink="rohit-rai-g7py8l/15min"
              style={{ width: '100%', height: '100%', overflow: 'scroll' }}
              config={{ layout: 'month_view', theme: 'light' }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
