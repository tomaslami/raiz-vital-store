"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Percent } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"

const recommendedCombos = [
  {
    id: "combo-desayuno-saludable",
    name: "Desayuno Saludable",
    description: "Perfecto para empezar el día con energía. Incluye almendras, granola casera y miel orgánica.",
    image: "/images/combo-desayuno.png",
    originalPrice: 45000,
    discountedPrice: 38000,
    savings: 7000,
    savingsPercentage: 16,
    popular: true,
    items: ["Almendras Premium 250g", "Granola Casera 300g", "Miel Orgánica 250ml"]
  },
  {
    id: "pack-snack-power",
    name: "Pack Snack Power",
    description: "Para cuando necesitás energía rápida. Mix de frutos secos seleccionados para deportistas.",
    image: "/images/pack-snack.png",
    originalPrice: 52000,
    discountedPrice: 42000,
    savings: 10000,
    savingsPercentage: 19,
    popular: false,
    items: ["Mix Seco Premium 400g", "Maní Tostado 300g", "Pasas de Uva 200g"]
  },
  {
    id: "caja-gourmet",
    name: "Caja Gourmet",
    description: "La selección más exquisita para quienes buscan lo mejor. Productos premium cuidadosamente elegidos.",
    image: "/images/caja-gourmet.png",
    originalPrice: 75000,
    discountedPrice: 59000,
    savings: 16000,
    savingsPercentage: 21,
    popular: true,
    items: ["Nueces Premium 250g", "Almendras Tostadas 250g", "Miel de Acacia 300ml", "Chocolate 70% 100g"]
  }
]

export default function RecommendedCombos() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#16481D] mb-3 sm:mb-4">
            Combos recomendados
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Nuestros expertos armaron estas combinaciones perfectas para diferentes momentos del día
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {recommendedCombos.map((combo) => (
            <div
              key={combo.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={combo.image}
                  alt={combo.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {combo.popular && (
                  <Badge className="absolute top-4 left-4 bg-[#16481D] text-white">
                    <Heart className="h-3 w-3 mr-1" />
                    Más elegido
                  </Badge>
                )}
                <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  -{combo.savingsPercentage}%
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-[#16481D] mb-2">
                    {combo.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {combo.description}
                  </p>
                </div>

                {/* Items */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Incluye:</h4>
                  <ul className="space-y-1">
                    {combo.items.map((item, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-[#16481D] rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-bold text-[#16481D]">
                      {formatPrice(combo.discountedPrice)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(combo.originalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <Percent className="h-3 w-3" />
                    <span>Ahorrás {formatPrice(combo.savings)}</span>
                  </div>
                </div>

                {/* CTA */}
                <Button asChild className="w-full bg-[#16481D] hover:bg-[#16481D]/90">
                  <Link href={`/combos/${combo.id}`} className="flex items-center justify-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Agregar al carrito
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-[#16481D] text-[#16481D] bg-transparent"
          >
            <Link href="/combos">
              Ver todos los combos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}