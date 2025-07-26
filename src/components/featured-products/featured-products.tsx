"use client"

import { Button } from "@/components/ui/button"
import { getCombos } from "@/lib/products"
import Link from "next/link"
import ProductCard from "../product-card/product-card"
import { ArrowRight } from "lucide-react"
import { Product } from "@/lib/types"

export default function FeaturedProducts() {
  const allCombos = getCombos()
  
  // Convertir combos a formato Product para ProductCard
  const combosAsProducts = allCombos.map(combo => ({
    id: combo.id,
    name: combo.name,
    price: combo.discountedPrice || combo.originalPrice || 0, // Usar precio con descuento, o precio original, o 0
    image: combo.image,
    description: combo.description,
    category: "Combo",
    featured: combo.featured || false
  }))
  
  // Mostrar solo los combos destacados
  const combosToShow = combosAsProducts.filter(combo => combo.featured)

  return (
   <section className="py-12 sm:py-16 lg:py-20 bg-white">
   <div className="container mx-auto px-4 sm:px-6 lg:px-8">
     <div className="text-center mb-12 lg:mb-16">
       <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#16481D] mb-3 sm:mb-4">
         Nuestros combos destacados
       </h2>
       <p className="text-base sm:text-lg lg:text-xl text-black max-w-3xl mx-auto leading-relaxed">
         Combinaciones perfectas diseñadas por nuestros expertos para diferentes necesidades nutricionales
       </p>
     </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
       {combosToShow.map((combo) => (
         <ProductCard key={combo.id} product={combo as Product} />
       ))}
     </div>

     <div className="text-center">
       <Button
         asChild
         size="lg"
         variant="outline"
         className="border-[#16481D] text-[#16481D] bg-transparent text-sm sm:text-base"
       >
         <Link href="/combos" className="flex items-center gap-2">
           Ver todos los combos
           <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
         </Link>
       </Button>
     </div>
   </div>
 </section>
  )
}
