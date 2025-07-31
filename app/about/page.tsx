import AboutHero from "@/components/about-hero"
import OurMission from "@/components/our-mission"
import ContactForm from "@/components/contact-form"

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <AboutHero />
      <OurMission />
      <ContactForm />
    </div>
  )
}
