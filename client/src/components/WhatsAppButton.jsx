import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  // Replace with actual business WhatsApp number including country code
  const whatsappNumber = '91 8950987002' 
  const message = 'Hello Future Point! I would like to inquire about your immigration services.'

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 hover:bg-[#20bd5a] transition-all duration-300"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  )
}
