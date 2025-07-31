"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How do I buy a car on your website?",
    answer:
      "You can browse our selection of cars, view detailed information for each vehicle, and contact us directly to proceed with your purchase. Our team will guide you through the buying process.",
  },
  {
    question: "Can I view car details before contacting you?",
    answer:
      "Yes, you can view comprehensive details and photos for each car listed on our website before reaching out to us.",
  },
  {
    question: "Are all cars on your platform verified?",
    answer:
      "Yes, all vehicles listed on our platform are thoroughly inspected and verified. We ensure that every car meets our quality standards.",
  },
  {
    question: "Do you offer financing options?",
    answer:
      "Currently, we do not offer financing options. All purchases are made directly through our platform.",
  },
  {
    question: "How do I contact you about a car?",
    answer:
      "You can contact us using the details provided on our website. We are available via phone, WhatsApp, or our contact form.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-poppins">Frequently Asked Questions</h2>
          <p className="text-xl text-slate-600">Find answers to common questions about our services</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-slate-900 font-poppins">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
