import Image from "next/image"
import Link from "next/link"
import { Star, Truck, Shield, Percent, Package, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#16481D] to-[#1a5221] text-white overflow-hidden minh-screen">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Comé natural.{" "}
                <span className="text-[#FEF6EB] bg-white/10 px-2 py-1 rounded-lg inline-block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                  Comprá inteligente.
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-xl text-white/95 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Productos saludables seleccionados. Armá tu combo con <strong>envío gratis desde $100.000</strong> y <strong>descuentos automáticos</strong>.
                Hasta 15% OFF en compras grandes.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full">
                <Truck className="h-4 w-4 shrink-0" />
                <span>Envío gratis +$100k</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full">
                <Percent className="h-4 w-4 shrink-0" />
                <span>Hasta 15% OFF</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full">
                <Package className="h-4 w-4 shrink-0" />
                <span>Descuentos automáticos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full">
                <Shield className="h-4 w-4 shrink-0" />
                <span>100% natural</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto lg:mx-0">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#16481D] hover:bg-white/90 font-semibold text-sm sm:text-base"
              >
                <Link href="/pack-saludable" className="flex items-center justify-center gap-2">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                  <span className="whitespace-nowrap">Armá tu Pack Personalizado</span>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent text-sm sm:text-base hover:text-white"
              >
                <Link href="/combos" className="flex items-center justify-center gap-2">
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                  <span className="whitespace-nowrap">Ver Combos Listos</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative order-first lg:order-last">
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px]">
              <Image
                src="/images/hero-raiz-vital.png"
                alt="Productos naturales Raíz Vital - empaque kraft con frutos secos"
                fill
                className="object-contain rounded-2xl"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-0  sm:-bottom-6 sm:-right-6 bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg">
              <div className="flex items-center gap-2 text-[#16481D]">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-current shrink-0" />
                <span className="font-semibold text-sm sm:text-base">4.3/5</span>
                <span className="text-xs sm:text-sm">+30 clientes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-12 sm:h-16 lg:h-20 bg-white rounded-t-[3rem] sm:rounded-t-[4rem] lg:rounded-t-[6rem] hidden lg:block"></div>
    </section>
  )
}