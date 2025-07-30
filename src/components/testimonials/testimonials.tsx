import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "María González",
    location: "Belgrano",
    rating: 5,
    text: "Excelente calidad y muy buena atención. Los productos llegaron perfectos y el sabor es increíble. Ya hice mi segundo pedido.",
    avatar: "/images/testimonial-1.png"
  },
  {
    id: 2,
    name: "Rodrigo Fernández",
    location: "Palermo",
    rating: 5,
    text: "Me encanta poder armar mi propio pack. Los frutos secos son súper frescos y el envío fue súper rápido. Recomiendo 100%.",
    avatar: "/images/testimonial-2.png"
  },
  {
    id: 3,
    name: "Ana Martínez",
    location: "Núñez",
    rating: 5,
    text: "Perfecto para mi dieta saludable. Los combos están muy bien pensados y los descuentos por cantidad son excelentes. Volveré a comprar.",
    avatar: "/images/testimonial-3.png"
  },
]

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#FEF6EB]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#16481D] mb-3 sm:mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Más de 100 clientes satisfechos ya eligieron Raíz Vital para su alimentación saludable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative"
            >
              <Quote className="h-8 w-8 text-[#16481D]/20 mb-4" />
              
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  "{testimonial.text}"
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#16481D]/10 rounded-full flex items-center justify-center">
                  <span className="text-[#16481D] font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-sm border">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-[#16481D] font-semibold">4.9/5</span>
            <span className="text-gray-600">• +100 reseñas</span>
          </div>
        </div>
      </div>
    </section>
  )
}