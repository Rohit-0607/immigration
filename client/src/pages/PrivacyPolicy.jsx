import { Helmet } from 'react-helmet-async'

export default function PrivacyPolicy() {
  return (
    <>
    <Helmet>
      <title>Privacy Policy | Future Point Immigration</title>
      <meta name="description" content="Read our privacy policy to understand how we collect, use, and protect your information." />
      <meta property="og:title" content="Privacy Policy | Future Point Immigration" />
      <meta property="og:description" content="Read our privacy policy to understand how we collect, use, and protect your information." />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://futurepoint.com/og-image.jpg" />
    </Helmet>
    <div className="bg-slate-50 min-h-screen py-16 md:py-24">
      <div className="container-custom max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-500 mb-8">Last Updated: July 3, 2026</p>

          <div className="prose prose-slate max-w-none">
            <p>
              Future Point Immigration Consultancy ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h3>1. Information We Collect</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul>
              <li>Fill out forms on our website (e.g., Contact Form, Eligibility Checker).</li>
              <li>Request an immigration consultation.</li>
              <li>Subscribe to our newsletter.</li>
            </ul>
            <p>
              The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. The personal information we collect may include:
            </p>
            <ul>
              <li><strong>Personal details:</strong> Name, phone number, email address.</li>
              <li><strong>Immigration profile:</strong> Educational background, work experience, marital status, passport details (only when initiating a formal visa application process).</li>
            </ul>

            <h3>2. How We Use Your Information</h3>
            <p>
              We use the information we collect or receive:
            </p>
            <ul>
              <li>To evaluate your eligibility for various immigration programs.</li>
              <li>To communicate with you regarding your consultation or application.</li>
              <li>To send you administrative information, such as updates to our terms, conditions, and policies.</li>
              <li>To send you marketing and promotional communications (you can opt-out at any time).</li>
            </ul>

            <h3>3. How We Share Your Information</h3>
            <p>
              We only share your personal information with third parties in the following situations:
            </p>
            <ul>
              <li><strong>Government Authorities:</strong> We share your necessary personal and background information with immigration authorities (e.g., IRCC, Home Office, Department of Home Affairs) strictly for the purpose of filing your visa application, and only with your explicit consent.</li>
              <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
            </ul>
            <p>
              <strong>We never sell, rent, or trade your personal information to third parties for marketing purposes.</strong>
            </p>

            <h3>4. Security of Your Information</h3>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>

            <h3>5. Contact Us</h3>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <p>
              <strong>Future Point Immigration Consultancy</strong><br />
              Near Bus Stand,Kaithal
              Kaithal-136027<br />
              Haryana<br />
              India<br />
              Email: futurepointconsultantcy@gmail.com<br />
              Phone: +91 74950 41916, +91 89509 87002, +91 82220 00285
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
