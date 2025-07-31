import AboutHero from "@/components/about-hero"
import OurMission from "@/components/our-mission"
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 overflow-hidden">
      <AboutHero />
      <OurMission />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  )
}
