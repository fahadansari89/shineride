import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Pricing from './sections/Pricing'
import HowItWorks from './sections/HowItWorks'
import BookingForm from './sections/BookingForm'
import Testimonials from './sections/Testimonials'
import FAQ from './sections/FAQ'
import Footer from './sections/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <HowItWorks />
        <BookingForm />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
