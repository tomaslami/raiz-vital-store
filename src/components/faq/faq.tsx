"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const faqs = [
  {
    question: "¿Cuál es el monto mínimo de compra?",
    answer: "No tenemos monto mínimo de compra. Sin embargo, el envío gratis y descuentos automáticos se aplican a partir de $100.000."
  },
  {
    question: "¿Cómo funcionan los descuentos por cantidad?",
    answer: "Los descuentos se aplican automáticamente según la cantidad de productos en tu pack personalizado. Hasta 15% de descuento en compras grandes."
  },
  {
    question: "¿Qué zonas cubren para envíos?",
    answer: "Realizamos envíos en toda CABA y Gran Buenos Aires. Para otras zonas, consultanos por WhatsApp para coordinar el envío."
  },
  {
    question: "¿Cuáles son los tiempos de entrega?",
    answer: "En CABA y GBA: 24-48 horas. En otras zonas de Buenos Aires: 48-72 horas. Coordinamos horarios por WhatsApp."
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos transferencia bancaria, Mercado Pago, efectivo en la entrega y todos los medios de pago digitales principales."
  },
  {
    question: "¿Cómo se aplican los descuentos automáticos?",
    answer: "En compras de $100.000 o más, se aplican descuentos automáticamente según el monto total. Además, obtenés envío gratis en toda CABA y GBA."
  }
]

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#16481D] mb-3 sm:mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Resolvemos las dudas más comunes sobre nuestros productos y proceso de compra
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Collapsible
              key={index}
              open={openFaq === index}
              onOpenChange={() => toggleFaq(index)}
            >
              <CollapsibleTrigger asChild>
                <button className="w-full bg-[#FEF6EB] rounded-lg p-6 shadow-sm border border-[#16481D]/10 hover:shadow-md transition-shadow text-left flex items-center justify-between group">
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#16481D] pr-4">
                    {faq.question}
                  </h3>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-[#16481D] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#16481D] flex-shrink-0" />
                  )}
                </button>

              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="bg-[#FEF6EB] rounded-b-lg p-6 -mt-2 border-l border-r border-b border-[#16481D]/10">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            ¿Tenés otras dudas?
          </p>
          <a
            href="https://wa.me/+5491153764400"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#16481D] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#16481D]/90 transition-colors"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Contactanos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}