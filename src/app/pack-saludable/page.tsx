"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,
  MessageCircle,
  Check,
  Star,
  Percent,
  Truck,
  Package,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { getIndividualProducts } from "@/lib/products"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { usePack } from "@/lib/pack-context"

// Configuración de descuentos
const DISCOUNT_TIERS = [
  { minAmount: 150000, discount: 15, label: "15% OFF" },
  { minAmount: 130000, discount: 13, label: "13% OFF" },
  { minAmount: 100000, discount: 10, label: "10% OFF" },
]

export default function PackSaludablePage() {
  const { packItems, addToPack, updateQuantity, clearPack } = usePack()
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Obtener productos individuales para el pack
  const availableProducts = getIndividualProducts()

  const subtotal = packItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const minimumAmount = 100000

  // Calcular descuento aplicable
  const getApplicableDiscount = (amount: number) => {
    for (const tier of DISCOUNT_TIERS) {
      if (amount >= tier.minAmount) {
        return tier
      }
    }
    return null
  }

  const applicableDiscount = getApplicableDiscount(subtotal)
  const discountAmount = applicableDiscount ? (subtotal * applicableDiscount.discount) / 100 : 0
  const finalTotal = subtotal - discountAmount
  const isMinimumMet = subtotal >= minimumAmount

  const handleSendWhatsApp = () => {
    const message = `🧺 *PACK SALUDABLE CON DESCUENTO - RAÍZ VITAL*

🛒 *PRODUCTOS SELECCIONADOS:*
${packItems
  .map(
    (item, index) =>
      `${index + 1}. ${item.product.name} - Cantidad: ${item.quantity} - $${(item.product.price * item.quantity).toLocaleString("es-AR")}`,
  )
  .join("\n")}

💰 *RESUMEN DEL PEDIDO:*
• Subtotal: $${subtotal.toLocaleString("es-AR")}
• Descuento aplicable (${applicableDiscount?.discount}%): -$${discountAmount.toLocaleString("es-AR")}
• Envío: GRATIS 🚚
• *TOTAL CON DESCUENTO: $${finalTotal.toLocaleString("es-AR")}*

🎉 *BENEFICIOS DE TU PACK:*
• ${applicableDiscount?.discount}% de descuento por volumen de compra
• Envío gratis incluido en toda la Argentina
• Productos 100% naturales seleccionados
• Pack personalizado según tus necesidades

¡Hola! Quiero confirmar mi Pack Saludable personalizado con descuento especial. El pack supera los $100.000 y califica para ${applicableDiscount?.discount}% de descuento. ¿Podrían confirmarme el pedido con el precio final?`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/5491153764400?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  const handleAddToCart = () => {
    if (packItems.length === 0) {
      toast({
        title: "Pack vacío",
        description: "Agrega productos antes de continuar",
        variant: "destructive",
      })
      return
    }

    // Agregar cada producto del pack al carrito
    packItems.forEach((item) => {
      addToCart(item.product, item.quantity)
    })

    toast({
      title: "Pack agregado al carrito",
      description: `${packItems.length} productos agregados correctamente`,
    })

    // Limpiar el pack después de agregarlo
    clearPack()
  }

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-[#FEF6EB]">
      <div className="container mx-auto px-6 md:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/combos" className="text-[#16481D] hover:underline flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a combos
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Información del Pack */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header explicativo */}
            <div className="bg-gradient-to-r from-[#16481D] to-[#1a5221] text-white p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Package className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">🧺 Armá tu Pack Saludable</h1>
                  <p className="text-white/90">Elegí productos individuales • Descuentos automáticos • Envío gratis</p>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">¿Cómo funciona?</p>
                    <p className="text-white/90">
                      Selecciona los productos individuales que necesitas, alcanza el mínimo de $100.000 y obtén
                      descuentos automáticos según el monto de tu compra. ¡Cuanto más compres, más ahorras!
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/10 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Percent className="h-5 w-5" />
                    <span className="font-semibold text-lg">10%</span>
                  </div>
                  <p className="text-sm text-white/80">Desde $100.000</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Percent className="h-5 w-5" />
                    <span className="font-semibold text-lg">13%</span>
                  </div>
                  <p className="text-sm text-white/80">Desde $130.000</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Percent className="h-5 w-5" />
                    <span className="font-semibold text-lg">15%</span>
                  </div>
                  <p className="text-sm text-white/80">Desde $150.000</p>
                </div>
              </div>
            </div>

            {/* Niveles de descuento */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#16481D] flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Tu progreso hacia los descuentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {DISCOUNT_TIERS.map((tier) => (
                    <div
                      key={tier.minAmount}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        subtotal >= tier.minAmount
                          ? "border-green-500 bg-green-50"
                          : subtotal >= tier.minAmount * 0.8
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">{tier.discount}% OFF</span>
                            {subtotal >= tier.minAmount && <Check className="h-5 w-5 text-green-600" />}
                          </div>
                          <p className="text-sm text-gray-600">Desde {formatPrice(tier.minAmount)}</p>
                        </div>
                        <div className="text-right">
                          {subtotal >= tier.minAmount ? (
                            <span className="text-green-600 font-semibold">¡Desbloqueado!</span>
                          ) : (
                            <span className="text-gray-500">Faltan {formatPrice(tier.minAmount - subtotal)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Productos disponibles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#16481D]">Productos individuales disponibles</CardTitle>
                <p className="text-sm text-gray-600">
                  Selecciona los productos que necesitas para crear tu pack personalizado
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {availableProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative w-12 h-12 bg-[#FEF6EB] rounded p-1">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{product.name}</h3>
                          <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                          <p className="text-[#16481D] font-semibold">{formatPrice(product.price)}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => addToPack(product)}
                        size="sm"
                        className="w-full bg-[#16481D] hover:bg-[#16481D]/90"
                      >
                        <Plus className="mr-1 h-3 w-3" />
                        Agregar al pack
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumen del Pack */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-[#16481D] flex items-center justify-between">
                  Tu Pack Personalizado
                  <span className="text-sm font-normal">
                    {packItems.length} {packItems.length === 1 ? "producto" : "productos"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {packItems.length > 0 ? (
                  <>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {packItems.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-3 p-3 bg-[#FEF6EB] rounded-lg">
                          <div className="relative w-10 h-10 bg-white rounded p-1">
                            <Image
                              src={item.product.image || "/placeholder.svg"}
                              alt={item.product.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                            <p className="text-xs text-gray-600">{formatPrice(item.product.price)} c/u</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      {applicableDiscount && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Descuento ({applicableDiscount.discount}%):</span>
                          <span>-{formatPrice(discountAmount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span>Envío:</span>
                        <span className="text-green-600">GRATIS</span>
                      </div>
                      {!isMinimumMet && (
                        <div className="flex justify-between text-sm text-red-600">
                          <span>Falta para mínimo:</span>
                          <span>{formatPrice(minimumAmount - subtotal)}</span>
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between font-semibold mb-4">
                        <span>Total final:</span>
                        <span className={isMinimumMet ? "text-[#16481D]" : "text-red-600"}>
                          {formatPrice(finalTotal)}
                        </span>
                      </div>

                      {isMinimumMet && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                          <div className="flex items-center gap-2 text-green-700">
                            <Check className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              ¡Mínimo alcanzado!{" "}
                              {applicableDiscount && `${applicableDiscount.discount}% descuento aplicado`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-green-700 mt-1">
                            <Truck className="h-4 w-4" />
                            <span className="text-sm">Envío gratis incluido</span>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        {isMinimumMet ? (
                          // Si supera $100.000 - Solo WhatsApp
                          <>
                            <Button
                              onClick={handleSendWhatsApp}
                              className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                            >
                              <MessageCircle className="mr-2 h-4 w-4" />
                              Enviar pedido por WhatsApp
                            </Button>
                            <div className="bg-[#25D366]/10 border border-[#25D366]/20 rounded-lg p-3">
                              <div className="flex items-start gap-3">
                                <MessageCircle className="h-4 w-4 text-[#25D366] mt-0.5" />
                                <div className="text-sm">
                                  <p className="font-medium text-[#25D366] mb-1">¡Descuento aplicado!</p>
                                  <p className="text-gray-600">
                                    Tu pack supera el mínimo de $100.000. Para obtener el descuento especial, envía tu
                                    pedido por WhatsApp y te confirmaremos el precio final.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          // Si NO supera $100.000 - Solo Carrito
                          <>
                            <Button onClick={handleAddToCart} className="w-full bg-[#16481D] hover:bg-[#16481D]/90">
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Agregar al carrito
                            </Button>
                            <div className="bg-[#16481D]/10 border border-[#16481D]/20 rounded-lg p-3">
                              <div className="flex items-start gap-3">
                                <ShoppingCart className="h-4 w-4 text-[#16481D] mt-0.5" />
                                <div className="text-sm">
                                  <p className="font-medium text-[#16481D] mb-1">Compra regular</p>
                                  <p className="text-gray-600">
                                    Tu pack actual es menor a $100.000. Puedes agregarlo al carrito para una compra
                                    regular o seguir agregando productos para obtener descuentos especiales.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="font-medium mb-2">Tu pack está vacío</p>
                    <p className="text-sm mb-4">Selecciona productos individuales para crear tu pack personalizado</p>
                    <div className="bg-[#16481D]/5 p-3 rounded-lg">
                      <p className="text-xs text-[#16481D]">
                        Mínimo {formatPrice(minimumAmount)} para obtener descuentos automáticos
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
