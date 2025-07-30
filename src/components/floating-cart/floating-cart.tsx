"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, X, Truck, ChevronRight, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { cn } from "@/lib/utils"

const FREE_SHIPPING_THRESHOLD = 100000

export default function FloatingCart() {
  const { cart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal)
  const progressPercentage = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100)
  
  const hasReachedFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD

  if (cartItemCount === 0) return null

  return (
    <>
      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="lg"
            className="bg-[#16481D] hover:bg-[#16481D]/90 text-white rounded-full shadow-lg h-14 w-14 p-0"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
                {cartItemCount}
              </span>
            )}
          </Button>
          
          {/* Quick Preview */}
          {!isOpen && cartItemCount > 0 && (
            <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-3 min-w-[200px] border">
              <div className="text-sm font-medium text-[#16481D] mb-1">
                {cartItemCount} {cartItemCount === 1 ? 'producto' : 'productos'}
              </div>
              <div className="text-lg font-bold text-[#16481D]">
                {formatPrice(cartTotal)}
              </div>
              
              {/* Progress indicator */}
              {!hasReachedFreeShipping && (
                <div className="mt-2">
                  <div className="text-xs text-gray-600 mb-1">
                    Faltan {formatPrice(remainingForFreeShipping)} para envío gratis y descuentos
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#16481D] h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              )}
              
              {hasReachedFreeShipping && (
                <div className="mt-2 flex items-center gap-1 text-green-600 text-xs">
                  <Truck className="h-3 w-3" />
                  <span>¡Envío gratis y descuentos activados!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Expanded Cart Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-xl border w-80 max-h-96 overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between bg-[#16481D] text-white">
            <h3 className="font-semibold">Tu Carrito</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-4 space-y-3 max-h-48 overflow-y-auto">
            {cart.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">
                  {item.quantity}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 truncate">{item.name}</div>
                  <div className="text-gray-600">{formatPrice(item.price)}</div>
                </div>
              </div>
            ))}
            
            {cart.length > 3 && (
              <div className="text-xs text-gray-500 text-center">
                y {cart.length - 3} productos más...
              </div>
            )}
          </div>
          
          <div className="p-4 border-t space-y-3">
            {/* Progress towards benefits */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Total: {formatPrice(cartTotal)}</span>
              </div>
              
              {!hasReachedFreeShipping && (
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Progreso hacia beneficios</span>
                    <span>{formatPrice(remainingForFreeShipping)} restantes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#16481D] h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              )}
              
              {hasReachedFreeShipping && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <Truck className="h-4 w-4" />
                    <span>¡Envío gratis activado!</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <Percent className="h-4 w-4" />
                    <span>¡Descuentos aplicados!</span>
                  </div>
                </div>
              )}
            </div>
            
            <Button asChild className="w-full bg-[#16481D] hover:bg-[#16481D]/90">
              <Link href="/carrito" className="flex items-center justify-center gap-2">
                Ver carrito completo
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}