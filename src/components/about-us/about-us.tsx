import Image from "next/image"
import { Check, Heart, Leaf, Users } from "lucide-react"

export default function AboutUsSection() {
  return (
    <div className="container mx-auto px-6 md:px-8">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#16481D]">Sobre Raíz Vital</h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              En Raíz Vital creemos que la alimentación saludable debe ser accesible para todos. Nacimos con la misión
              de ofrecer productos naturales de la más alta calidad, directamente a tu hogar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="bg-[#16481D]/10 rounded-full p-2 shrink-0">
                <Leaf className="h-6 w-6 text-[#16481D]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#16481D] mb-2">Productos naturales</h3>
                <p className="text-sm text-gray-600">Sin conservantes ni aditivos artificiales</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="bg-[#16481D]/10 rounded-full p-2 shrink-0">
                <Users className="h-6 w-6 text-[#16481D]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#16481D] mb-2">Envío a domicilio</h3>
                <p className="text-sm text-gray-600">Directo a tu puerta en toda la ciudad</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="bg-[#16481D]/10 rounded-full p-2 shrink-0">
                <Heart className="h-6 w-6 text-[#16481D]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#16481D] mb-2">Atención personalizada</h3>
                <p className="text-sm text-gray-600">Estamos para resolver todas tus dudas</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="bg-[#16481D]/10 rounded-full p-2 shrink-0">
                <Check className="h-6 w-6 text-[#16481D]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#16481D] mb-2">Calidad garantizada</h3>
                <p className="text-sm text-gray-600">Seleccionamos los mejores productos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-8 md:mt-0">
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/about-us-natural.png"
              alt="Productos naturales Raíz Vital - bolsa de tela con frutos secos"
              fill
              className="object-contain bg-white p-4"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-lg hidden sm:block">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#16481D] mb-1">+200</div>
              <div className="text-sm text-gray-600">Familias satisfechas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
