"use client"

import { useState } from "react"
import Link from "next/link"
import { getCombos } from "@/lib/products"
import ProductCard from "@/components/product-card/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowRight, Package, Percent, ShoppingCart } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CombosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("featured")

  const allCombos = getCombos()
  
  // Convertir combos a formato Product para ProductCard (misma lógica que featured-products)
  const combosAsProducts = allCombos.map(combo => ({
    id: combo.id,
    name: combo.name,
    price: combo.discountedPrice || combo.originalPrice || 0,
    image: combo.image,
    description: combo.description,
    category: "Combo",
    featured: combo.featured || false
  }))

  // Filter combos based on search term
  const filteredCombos = combosAsProducts.filter((combo) => {
    const matchesSearch =
      combo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      combo.description.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  // Sort combos
  const sortedCombos = [...filteredCombos].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.price - b.price
    } else if (sortBy === "price-desc") {
      return b.price - a.price
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    } else {
      // Default: featured
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    }
  })

  return (
    <main className="min-h-screen bg-[#FEF6EB] py-8">
      <div className="container mx-auto px-6 md:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#16481D] mb-4">Nuestros Combos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Descubre nuestros combos prediseñados con las mejores combinaciones de productos naturales. ¿Quieres algo
            más personalizado? ¡Armá tu propio pack saludable!
          </p>

          <div className="bg-gradient-to-r from-[#16481D] to-[#1a5221] text-white rounded-2xl p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">¿Buscas algo específico?</h2>
                <p className="text-white/90">Armá tu pack personalizado con descuentos de hasta 15%</p>
              </div>
              <Button asChild size="lg" className="bg-white text-[#16481D] hover:bg-white/90 font-semibold">
                <Link href="/pack-saludable" className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Armá tu Pack Saludable
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar combos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Destacados</SelectItem>
              <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
              <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
              <SelectItem value="name">Nombre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Info */}
        <div className="mb-6 text-sm text-gray-600">
          Mostrando {sortedCombos.length} de {allCombos.length} combos disponibles
        </div>

        {/* Combos Grid */}
        {sortedCombos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {sortedCombos.map((combo) => (
              <ProductCard key={combo.id} product={combo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex justify-center mb-4">
                <Search className="h-16 w-16 text-gray-300" />
              </div>
              <p className="text-lg text-gray-600 mb-4">No se encontraron combos que coincidan con tu búsqueda.</p>
              <Button onClick={() => setSearchTerm("")} className="bg-[#16481D] hover:bg-[#16481D]/90">
                Ver todos los combos
              </Button>
            </div>
          </div>
        )}

        {/* Call to Action Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-[#16481D]/10 p-4 rounded-full">
                <Percent className="h-12 w-12 text-[#16481D]" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-[#16481D] mb-4">¿Quieres crear tu propio combo?</h2>
            <p className="text-xl text-gray-600 mb-6">
              Con nuestro sistema de Pack Saludable puedes elegir exactamente los productos que necesitas y obtener
              descuentos de hasta 15% por volumen de compra.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#FEF6EB] p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#16481D] mb-1">10%</div>
                <div className="text-sm text-gray-600">Desde $100.000</div>
              </div>
              <div className="bg-[#FEF6EB] p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#16481D] mb-1">13%</div>
                <div className="text-sm text-gray-600">Desde $130.000</div>
              </div>
              <div className="bg-[#FEF6EB] p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#16481D] mb-1">15%</div>
                <div className="text-sm text-gray-600">Desde $150.000</div>
              </div>
            </div>

            <Button asChild size="lg" className="bg-[#16481D] hover:bg-[#16481D]/90">
              <Link href="/pack-saludable" className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Crear mi Pack Personalizado
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
