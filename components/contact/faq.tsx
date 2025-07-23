"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How do I schedule a test drive?",
    answer:
      "You can schedule a test drive by calling us directly, using our WhatsApp service, or filling out the contact form. Our team will coordinate with the dealer to arrange a convenient time for you.",
  },
  {
    question: "Are all cars on your platform verified?",
    answer:
      "Yes, all vehicles listed on EliteAuto are thoroughly inspected and verified. We work only with trusted dealers who meet our strict quality standards.",
  },
  {
    question: "Do you offer financing options?",
    answer:
      "We partner with leading banks and financial institutions to offer competitive financing options. Our team can help you find the best financing solution that fits your budget.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy for vehicles purchased through our platform, subject to terms and conditions. The vehicle must be returned in the same condition as purchased.",
  },
  {
    question: "How do I know if a car is still available?",
    answer:
      "All listings are updated in real-time. If you see a car listed, it's available. However, we recommend contacting the dealer quickly as premium cars sell fast.",
  },
  {
    question: "Do you provide vehicle history reports?",
    answer:
      "Yes, we provide comprehensive vehicle history reports for all cars listed on our platform. This includes accident history, service records, and ownership details.",
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
