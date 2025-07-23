import ContactHero from "@/components/contact/contact-hero"
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"
import FAQ from "@/components/contact/faq"

export default function ContactPage() {
  return (
    <div className="overflow-hidden">
      <ContactHero />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
      <FAQ />
    </div>
  )
}
