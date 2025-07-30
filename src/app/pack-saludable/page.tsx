"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,

  Check,
  Star,
  Percent,
  Truck,
  Package,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
  const { addToCart } = useCart()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Scroll to top when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
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
      alert("Agrega productos antes de continuar")
      return
    }

    // Agregar cada producto del pack al carrito
    packItems.forEach((item) => {
      addToCart(item.product, item.quantity)
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
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <Link href="/combos" className="text-[#16481D] hover:underline flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            Volver a combos
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Información del Pack */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Header explicativo */}
            <div className="bg-gradient-to-r from-[#16481D] to-[#1a5221] text-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-white/20 p-2 sm:p-3 rounded-full flex-shrink-0">
                  <Package className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">🧺 Armá tu Pack Saludable</h1>
                  <p className="text-white/90 text-sm sm:text-base mt-1">Elegí productos individuales • Descuentos automáticos • Envío gratis</p>
                </div>
              </div>

                            <div className="bg-white/10 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Info className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-semibold mb-1">¿Cómo funciona?</p>
                    <p className="text-white/90 leading-relaxed">
                      Selecciona los productos individuales que necesitas, alcanza el mínimo de $100.000 y obtén
                      descuentos automáticos según el monto de tu compra. ¡Cuanto más compres, más ahorras!
                    </p>
                  </div>
                </div>
              </div>



              {/* Grid de descuentos para desktop */}
              <div className="hidden lg:grid lg:grid-cols-3 gap-4">
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

           

            {/* Productos disponibles */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-[#16481D] text-base sm:text-lg">Productos individuales disponibles</CardTitle>
                <p className="text-xs sm:text-sm text-gray-600">
                  Selecciona los productos que necesitas para crear tu pack personalizado
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                  {availableProducts.map((product) => {
                    // Buscar si el producto ya está en el pack
                    const itemInPack = packItems.find(item => item.product.id === product.id)
                    const quantity = itemInPack ? itemInPack.quantity : 0
                    
                    return (
                      <div key={product.id} className="border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col gap-3 mb-3">
                          {/* Imagen más grande centrada */}
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#FEF6EB] rounded-lg p-2 mx-auto flex-shrink-0">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          {/* Información del producto */}
                          <div className="text-center">
                            <h3 className="font-medium text-sm sm:text-base leading-tight mb-1">{product.name}</h3>
                            <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                            <p className="text-[#16481D] font-semibold text-sm sm:text-base">{formatPrice(product.price)}</p>
                          </div>
                        </div>
                        
                        {quantity === 0 ? (
                          // Botón para agregar por primera vez
                          <Button
                            onClick={() => addToPack(product)}
                            size="sm"
                            className="w-full bg-[#16481D] hover:bg-[#16481D]/90 text-xs sm:text-sm h-8 sm:h-9"
                          >
                            <Plus className="mr-1 h-3 w-3" />
                            Agregar al pack
                          </Button>
                        ) : (
                          // Controles de cantidad cuando ya está en el pack
                          <div className="flex items-center justify-between gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="h-8 w-8 p-0 border-[#16481D] text-[#16481D] hover:bg-[#16481D] hover:text-white"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <div className="flex-1 text-center">
                              <div className="bg-[#16481D]/10 rounded-lg py-1 px-2">
                                <span className="text-xs sm:text-sm font-semibold text-[#16481D]">
                                  {quantity} en pack
                                </span>
                              </div>
                            </div>
                            
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="h-8 w-8 p-0 border-[#16481D] text-[#16481D] hover:bg-[#16481D] hover:text-white"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumen del Pack */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="sticky top-4 sm:top-24">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-[#16481D] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 text-base sm:text-lg">
                  <span>Tu Pack Personalizado</span>
                  <span className="text-xs sm:text-sm font-normal text-gray-600">
                    {packItems.length} {packItems.length === 1 ? "producto" : "productos"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 pt-0">
                {packItems.length > 0 ? (
                  <>
                    <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto">
                      {packItems.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-[#FEF6EB] rounded-lg">
                          <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white rounded p-1 flex-shrink-0">
                            <Image
                              src={item.product.image || "/placeholder.svg"}
                              alt={item.product.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-xs sm:text-sm truncate leading-tight">{item.product.name}</h4>
                            <p className="text-xs text-gray-600">{formatPrice(item.product.price)} c/u</p>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="h-5 w-5 sm:h-6 sm:w-6 p-0"
                            >
                              <Minus className="h-2 w-2 sm:h-3 sm:w-3" />
                            </Button>
                            <span className="text-xs sm:text-sm font-medium w-6 sm:w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="h-5 w-5 sm:h-6 sm:w-6 p-0"
                            >
                              <Plus className="h-2 w-2 sm:h-3 sm:w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-3 sm:pt-4 space-y-1 sm:space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Subtotal:</span>
                        <span className="font-medium">{formatPrice(subtotal)}</span>
                      </div>
                      {applicableDiscount && (
                        <div className="flex justify-between text-xs sm:text-sm text-green-600">
                          <span>Descuento ({applicableDiscount.discount}%):</span>
                          <span className="font-medium">-{formatPrice(discountAmount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Envío:</span>
                        <span className="text-green-600 font-medium">GRATIS</span>
                      </div>
                      {!isMinimumMet && (
                        <div className="flex justify-between text-xs sm:text-sm text-red-600">
                          <span>Falta para mínimo:</span>
                          <span className="font-medium">{formatPrice(minimumAmount - subtotal)}</span>
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-3 sm:pt-4">
                      <div className="flex justify-between font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                        <span>Total final:</span>
                        <span className={isMinimumMet ? "text-[#16481D]" : "text-red-600"}>
                          {formatPrice(finalTotal)}
                        </span>
                      </div>

                      {/* Progress bar por segmentos */}
                      <div className="mb-3 sm:mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-medium text-gray-700">Descuentos por volumen</span>
                          {applicableDiscount && (
                            <div className="bg-green-100 px-2 py-1 rounded-full">
                              <span className="text-xs font-bold text-green-700">
                                ¡{applicableDiscount.discount}% ACTIVADO!
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Barra dividida en 3 segmentos */}
                        <div className="flex gap-1 mb-2">
                          {/* Segmento 1: $0 - $100k (10%) */}
                          <div className="flex-1 relative">
                            <div className="bg-gray-200 rounded-l-full h-3 overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-700 ${
                                  subtotal >= 100000 
                                    ? 'bg-green-400' 
                                    : 'bg-green-200'
                                }`}
                                style={{ 
                                  width: `${Math.min((subtotal / 100000) * 100, 100)}%` 
                                }}
                              ></div>
                            </div>
                            <div className="text-center mt-1">
                              <div className={`text-xs font-medium ${subtotal >= 100000 ? 'text-green-600' : 'text-gray-500'}`}>
                                10% OFF
                              </div>
                              <div className="text-xs text-gray-400">$100k</div>
                            </div>
                          </div>

                          {/* Segmento 2: $100k - $130k (13%) */}
                          <div className="flex-1 relative">
                            <div className="bg-gray-200 h-3 overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-700 ${
                                  subtotal >= 130000 
                                    ? 'bg-green-500' 
                                    : subtotal >= 100000 
                                    ? 'bg-green-300'
                                    : 'bg-gray-200'
                                }`}
                                style={{ 
                                  width: subtotal >= 100000 
                                    ? `${Math.min(((subtotal - 100000) / 30000) * 100, 100)}%`
                                    : '0%'
                                }}
                              ></div>
                            </div>
                            <div className="text-center mt-1">
                              <div className={`text-xs font-medium ${subtotal >= 130000 ? 'text-green-600' : subtotal >= 100000 ? 'text-green-500' : 'text-gray-500'}`}>
                                13% OFF
                              </div>
                              <div className="text-xs text-gray-400">$130k</div>
                            </div>
                          </div>

                          {/* Segmento 3: $130k - $150k (15%) */}
                          <div className="flex-1 relative">
                            <div className="bg-gray-200 rounded-r-full h-3 overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-700 ${
                                  subtotal >= 150000 
                                    ? 'bg-green-700' 
                                    : subtotal >= 130000 
                                    ? 'bg-green-400'
                                    : 'bg-gray-200'
                                }`}
                                style={{ 
                                  width: subtotal >= 130000 
                                    ? `${Math.min(((subtotal - 130000) / 20000) * 100, 100)}%`
                                    : '0%'
                                }}
                              ></div>
                            </div>
                            <div className="text-center mt-1">
                              <div className={`text-xs font-medium ${subtotal >= 150000 ? 'text-green-700' : subtotal >= 130000 ? 'text-green-600' : 'text-gray-500'}`}>
                                15% OFF
                              </div>
                              <div className="text-xs text-gray-400">$150k</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Indicador de progreso actual */}
                        <div className="text-center mb-2">
                          <div className="text-xs text-gray-600">
                            Progreso actual: <span className="font-semibold">{formatPrice(subtotal)}</span>
                          </div>
                        </div>
                        
                        {/* Mensaje de estado inteligente */}
                        <div className="p-2 rounded-lg bg-gray-50">
                          {subtotal >= 150000 ? (
                            <div className="text-center">
                              <p className="text-xs font-semibold text-green-700">
                                🏆 ¡Máximo descuento alcanzado! 15% OFF
                              </p>
                              <p className="text-xs text-gray-600">
                                Ahorras {formatPrice(discountAmount)} en tu compra
                              </p>
                            </div>
                                                      ) : subtotal >= 130000 ? (
                            <div className="text-center">
                              <p className="text-xs font-semibold text-green-700">
                                🎉 ¡13% de descuento activado!
                              </p>
                              <p className="text-xs text-green-800">
                                Faltan {formatPrice(150000 - subtotal)} para 15% OFF
                              </p>
                            </div>
                          ) : subtotal >= 100000 ? (
                            <div className="text-center">
                              <p className="text-xs font-semibold text-green-600">
                                🎯 ¡10% de descuento activado!
                              </p>
                              <p className="text-xs text-green-700">
                                Faltan {formatPrice(130000 - subtotal)} para 13% OFF
                              </p>
                            </div>
                          ) : subtotal > 0 ? (
                            <div className="text-center">
                              <p className="text-xs font-medium text-green-600">
                                📈 Faltan {formatPrice(100000 - subtotal)} para el primer descuento
                              </p>
                              <p className="text-xs text-gray-600">
                                Completa el primer segmento para 10% OFF
                              </p>
                            </div>
                          ) : (
                            <p className="text-xs text-gray-500 text-center">
                              Agrega productos para comenzar a desbloquear descuentos
                            </p>
                          )}
                        </div>
                      </div>

                      {isMinimumMet && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
                          <div className="flex items-center gap-2 text-green-700 mt-1">
                            <Truck className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="text-xs sm:text-sm">Envío gratis incluido</span>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2 sm:space-y-3">
                        {isMinimumMet ? (
                          // Si supera $100.000 - Solo WhatsApp
                          <>
                            <Button
                              onClick={handleSendWhatsApp}
                              className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white text-xs sm:text-sm h-9 sm:h-10"
                            >
                              <svg className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                              </svg>
                              Enviar pedido por WhatsApp
                            </Button>
                            <div className="bg-[#25D366]/10 border border-[#25D366]/20 rounded-lg p-2 sm:p-3">
                              <div className="flex items-start gap-2 sm:gap-3">
                                <svg className="h-3 w-3 sm:h-4 sm:w-4 text-[#25D366] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                </svg>
                                <div className="text-xs sm:text-sm">
                                  <p className="font-medium text-[#25D366] mb-1">¡Descuento aplicado!</p>
                                  <p className="text-gray-600 leading-relaxed">
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
                            <Button onClick={handleAddToCart} className="w-full bg-[#16481D] hover:bg-[#16481D]/90 text-xs sm:text-sm h-9 sm:h-10">
                              <ShoppingCart className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                              Agregar al carrito
                            </Button>
                            <div className="bg-[#16481D]/10 border border-[#16481D]/20 rounded-lg p-2 sm:p-3">
                              <div className="flex items-start gap-2 sm:gap-3">
                                <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 text-[#16481D] mt-0.5 flex-shrink-0" />
                                <div className="text-xs sm:text-sm">
                                  <p className="font-medium text-[#16481D] mb-1">Compra regular</p>
                                  <p className="text-gray-600 leading-relaxed">
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
                  <div className="text-center py-6 sm:py-8 text-gray-500">
                    <Package className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-3 opacity-50" />
                    <p className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Tu pack está vacío</p>
                    <p className="text-xs sm:text-sm mb-3 sm:mb-4 px-2">Selecciona productos individuales para crear tu pack personalizado</p>
                    <div className="bg-[#16481D]/5 p-2 sm:p-3 rounded-lg">
                      <p className="text-xs sm:text-sm text-[#16481D] leading-relaxed">
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
