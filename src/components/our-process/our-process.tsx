import Link from "next/link"
import { ArrowRight, Check, Percent, Package, ShoppingCart, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OurProcess() {
  return (
     <section id="como-funciona" className="py-12 sm:py-16 lg:py-20">
     <div className="container mx-auto px-4 sm:px-6 lg:px-8">
       <div className="text-center mb-12 lg:mb-16">
         <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#16481D] mb-3 sm:mb-4">
           ¿Cómo funciona Raíz Vital?
         </h2>
         <p className="text-base sm:text-lg lg:text-xl text-black max-w-4xl mx-auto leading-relaxed">
           Te ofrecemos dos formas de comprar: combos prediseñados listos para llevar o packs personalizados con
           descuentos especiales por volumen.
         </p>
       </div>

       <div className="space-y-12 lg:space-y-16">
         {/* Comparación de opciones */}
         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
           {/* Opción 1: Combos Listos */}
           <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-sm border-2 border-[#16481D]/10 relative overflow-hidden">
             <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-blue-100 text-blue-800 text-xs font-semibold px-2 sm:px-3 py-1 rounded-full">
               Compra Rápida
             </div>

             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
               <div className="bg-[#16481D]/10 p-2 sm:p-3 rounded-full shrink-0">
                 <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-[#16481D]" />
               </div>
               <div>
                 <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#16481D]">Combos Listos</h3>
                 <p className="text-black text-sm sm:text-base">Perfectos para empezar rápido</p>
               </div>
             </div>

             <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
               <div className="flex items-start gap-3">
                 <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 shrink-0" />
                 <div>
                   <span className="font-medium text-black text-sm sm:text-base">Combinaciones expertas</span>
                   <p className="text-xs sm:text-sm text-black/80">Diseñadas por nutricionistas</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 shrink-0" />
                 <div>
                   <span className="font-medium text-black text-sm sm:text-base">Sin mínimo de compra</span>
                   <p className="text-xs sm:text-sm text-black/80">Compra desde $1</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 shrink-0" />
                 <div>
                   <span className="font-medium text-black text-sm sm:text-base">Proceso tradicional</span>
                   <p className="text-xs sm:text-sm text-black/80">Carrito → Checkout → Listo</p>
                 </div>
               </div>
             </div>

             <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
               <h4 className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3 text-[#16481D]">
                 📋 Proceso en 3 pasos:
               </h4>
               <div className="space-y-2 text-xs sm:text-sm">
                 <div className="flex items-center gap-2">
                   <span className="bg-[#16481D] text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs shrink-0">
                     1
                   </span>
                   <span className="text-black">Elegí tu combo favorito</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="bg-[#16481D] text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs shrink-0">
                     2
                   </span>
                   <span className="text-black">Agregá al carrito y comprá</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="bg-[#16481D] text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs shrink-0">
                     3
                   </span>
                   <span>Enviá por WhatsApp (precio final)</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="bg-[#16481D] text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs shrink-0">
                     3
                   </span>
                   <span className="text-black">Recibí en 24-48hs</span>
                 </div>
               </div>
             </div>

             <div className="text-center mb-3 sm:mb-4">
               <span className="text-xs sm:text-sm text-black">
                 💡 Ideal para: Probar productos, compras rápidas, regalos
               </span>
             </div>

             <Button
               asChild
               className="w-full bg-[#16481D] hover:bg-[#16481D]/90 transition-all duration-300 hover:shadow-lg group text-sm sm:text-base"
             >
               <Link href="/combos" className="flex items-center justify-center gap-2 font-semibold">
                 Ver Combos Disponibles
                 <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
               </Link>
             </Button>
           </div>

           {/* Opción 2: Pack Personalizado */}
           <div className="bg-gradient-to-br from-[#16481D] to-[#1a5221] text-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg relative overflow-hidden">
             <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 sm:px-3 py-1 rounded-full">
               Máximo Ahorro
             </div>

             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
               <div className="bg-white/20 p-2 sm:p-3 rounded-full shrink-0">
                 <Package className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
               </div>
               <div>
                 <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Pack Personalizado</h3>
                 <p className="text-white/95 text-sm sm:text-base">Descuentos de hasta 15%</p>
               </div>
             </div>

             <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
               <div className="flex items-start gap-3">
                 <Percent className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 shrink-0" />
                 <div>
                   <span className="font-medium text-sm sm:text-base">Descuentos automáticos</span>
                   <p className="text-xs sm:text-sm text-white/90">10%, 13% y 15% según monto</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <Package className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 shrink-0" />
                 <div>
                   <span className="font-medium text-sm sm:text-base">100% personalizable</span>
                   <p className="text-xs sm:text-sm text-white/90">Elegís cada producto</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <Truck className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 shrink-0" />
                 <div>
                   <span className="font-medium text-sm sm:text-base">Envío gratis incluido</span>
                   <p className="text-xs sm:text-sm text-white/90">Sin costo adicional</p>
                 </div>
               </div>
             </div>

             <div className="bg-white/10 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
               <h4 className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3">📋 Proceso especializado:</h4>
               <div className="space-y-2 text-xs sm:text-sm">
                 <div className="flex items-center gap-2">
                   <span className="bg-white/20 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs shrink-0">
                     1
                   </span>
                   <span>Elegí productos individuales</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="bg-white/20 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs shrink-0">
                     2
                   </span>
                   <span>Alcanzá $100k+ (descuento automático)</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="bg-white/20 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs shrink-0">
                     3
                   </span>
                   <span>Enviá por WhatsApp (precio final)</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="bg-white/20 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs shrink-0">
                     4
                   </span>
                   <span>Recibí en 24-48hs, con descuento aplicado</span>
                 </div>
               </div>
             </div>

             
             <div className="text-center mb-3 sm:mb-4">
               <span className="text-xs sm:text-sm text-white/95">
                 💡 Ideal para: Familias, empresas, compras mensuales
               </span>
             </div>

             <Button
               asChild
               className="w-full bg-white text-[#16481D] hover:bg-white/90 font-semibold transition-all duration-300 hover:shadow-lg  group text-sm sm:text-base"
             >
               <Link href="/pack-saludable" className="flex items-center justify-center gap-2 font-semibold">
                 Crear Pack Personalizado
                 <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
               </Link>
             </Button>
           </div>
         </div>

        
       </div>
     </div>
   </section>
  )
}
