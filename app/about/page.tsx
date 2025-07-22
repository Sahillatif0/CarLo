import AboutHero from "@/components/about-hero"
import OurMission from "@/components/our-mission"
import TeamSection from "@/components/team-section"
import ContactForm from "@/components/contact-form"

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <AboutHero />
      <OurMission />
      <TeamSection />
      <ContactForm />
    </div>
  )
}
