import { Star, Users } from "lucide-react"

export default function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#FEF6EB]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#16481D] mb-3 sm:mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-black">
            Testimonios reales de personas que confían en Raíz Vital
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-sm">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="bg-[#16481D] text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mr-3 sm:mr-4 shrink-0">
                <Users className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg text-black">María López</h3>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-black text-sm sm:text-base leading-relaxed">
              "Los combos de Raíz Vital son perfectos para mi rutina diaria. El pack personalizado me permitió elegir
              exactamente lo que necesitaba con un gran descuento."
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-sm">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="bg-[#16481D] text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mr-3 sm:mr-4 shrink-0">
                <Users className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg text-black">Carlos Rodríguez</h3>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-black text-sm sm:text-base leading-relaxed">
              "Me encanta poder armar mi propio pack. El sistema de descuentos es genial y la calidad de los productos
              es excelente. Muy recomendable."
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-sm md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="bg-[#16481D] text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mr-3 sm:mr-4 shrink-0">
                <Users className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg text-black">Laura Martínez</h3>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-black text-sm sm:text-base leading-relaxed">
              "Empecé con los combos listos y ahora siempre armo mi pack personalizado. El ahorro es considerable y
              puedo elegir exactamente lo que quiero."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
