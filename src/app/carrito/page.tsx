"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, ArrowLeft, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/utils"
import CheckoutForm from "@/components/checkout-form/checkout-form"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  return (
    <main className="min-h-screen bg-[#FEF6EB]">
      <div className="container mx-auto px-6 md:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#16481D] flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" /> Tu Carrito
          </h1>
          <Link href="/combos" className="text-[#16481D] hover:underline flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Seguir comprando
          </Link>
        </div>

        {cart.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <h2 className="font-semibold">Producto</h2>
                  <div className="grid grid-cols-3 gap-2 md:gap-4 w-[40%]">
                    <span className="text-center text-sm md:text-base">Precio</span>
                    <span className="text-center text-sm md:text-base">Cantidad</span>
                    <span className="text-center text-sm md:text-base">Total</span>
                  </div>
                </div>

                {cart.map((item) => (
                  <div key={item.id} className="py-4 border-b">
                    <div className="flex items-center justify-between flex-wrap md:flex-nowrap">
                      <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
                        <div className="relative w-16 h-16 bg-[#FEF6EB] rounded p-1">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <Link href={`/combos/${item.id}`} className="font-medium hover:underline">
                            {item.name}
                          </Link>
                          <button
                            className="text-sm text-red-500 flex items-center gap-1 mt-1 hover:underline"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-3 w-3" /> Eliminar
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 md:gap-4 w-full md:w-[40%]">
                        <span className="text-center">{formatPrice(item.price)}</span>
                        <div className="flex justify-center">
                          <select
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value))}
                            className="w-12 text-center border rounded"
                            aria-label={`Cantidad de ${item.name}`}
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                        <span className="text-center font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {cart.length} {cart.length === 1 ? "producto" : "productos"}
                  </span>
                  <Button variant="outline" onClick={clearCart} className="text-sm bg-transparent">
                    Vaciar carrito
                  </Button>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="font-semibold text-lg mb-4">Resumen del pedido</h2>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span className="text-green-600">Gratis</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <span className="text-xs text-gray-500">Impuestos incluidos</span>
                </div>

                <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-[#16481D] hover:bg-[#16481D]/90 h-12">Finalizar compra</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-[#FEF6EB]">
                    <CheckoutForm onClose={() => setIsCheckoutOpen(false)} />
                  </DialogContent>
                </Dialog>

                <div className="mt-4 text-sm text-center text-gray-600">
                  <p>¿Tienes dudas sobre tu compra?</p>
                  <a
                    href="https://wa.me/+5491153764400"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#16481D] font-medium hover:underline"
                  >
                    Contáctanos por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingCart className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6">Parece que aún no has añadido productos a tu carrito.</p>
            <Button asChild className="bg-[#16481D] hover:bg-[#16481D]/90">
              <Link href="/combos">Ver productos</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
