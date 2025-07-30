"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Evitar navegación al hacer clic en el botón
    setIsAddingToCart(true)
    addToCart(product, 1)

    setTimeout(() => {
      setIsAddingToCart(false)
    }, 1000)
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault() // Evitar navegación al hacer clic en el botón
    console.log(`${product.name} añadido a favoritos`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 border border-gray-100">
      <Link href={`/combos/${product.id}`} className="block relative aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-[#16481D] text-white text-xs font-medium px-3 py-1 rounded-full">
            Destacado
          </span>
        )}
        <button
          onClick={handleAddToWishlist}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-600 hover:text-[#16481D] hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Añadir a favoritos"
        >
          <Heart className="h-4 w-4" />
        </button>
      </Link>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#16481D] bg-[#16481D]/10 px-2 py-1 rounded-full">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-500">4.9</span>
            </div>
          </div>
          <Link href={`/combos/${product.id}`} className="block">
            <h3 className="font-semibold text-lg hover:text-[#16481D] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{product.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="font-bold text-xl text-[#16481D]">{formatPrice(product.price)}</span>
            <div className="text-xs text-gray-500">Envío gratis primera compra</div>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            size="sm"
            className="bg-[#16481D] hover:bg-[#16481D]/90 rounded-full px-4"
          >
            {isAddingToCart ? (
              <>
                <Check className="mr-1 h-4 w-4" /> Añadido
              </>
            ) : (
              <>
                <ShoppingCart className="mr-1 h-4 w-4" /> Añadir
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
