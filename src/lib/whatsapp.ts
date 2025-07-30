import type { CartItem, CustomerInfo } from "./types"

export function generateWhatsAppMessage(cart: CartItem[], customerInfo: CustomerInfo, total: number): string {
  const currentDate = new Date().toLocaleDateString('es-AR')
  const currentTime = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
  
  let message = `🌱 *NUEVO PEDIDO - RAÍZ VITAL*\n`
  message += `📅 ${currentDate} - ${currentTime}\n\n`

  // Customer info
  message += `👤 *DATOS DEL CLIENTE:*\n`
  message += `• Nombre: ${customerInfo.name}\n`
  message += `• Email: ${customerInfo.email}\n`
  message += `• Teléfono: ${customerInfo.phone}\n`
  message += `• Dirección: ${customerInfo.address}\n`
  message += `• Ciudad: ${customerInfo.city}\n`
  if (customerInfo.notes) {
    message += `• Notas adicionales: ${customerInfo.notes}\n`
  }
  message += `\n`

  // Cart items
  message += `🛒 *DETALLE DEL PEDIDO:*\n`
  let subtotal = 0
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity
    subtotal += itemTotal
    message += `${index + 1}. ${item.name}\n`
    message += `   Cantidad: ${item.quantity}\n`
    message += `   Precio unitario: $${item.price.toLocaleString()}\n`
    message += `   Subtotal: $${itemTotal.toLocaleString()}\n\n`
  })

  // Totals and benefits
  message += `💰 *RESUMEN:*\n`
  message += `• Subtotal: $${subtotal.toLocaleString()}\n`
  
  if (total >= 100000) {
    message += `• Envío: GRATIS ✅\n`
    message += `• Descuentos aplicados: ✅\n`
  } else {
    message += `• Envío: A coordinar\n`
    const remaining = 100000 - total
    message += `• Para envío gratis: faltan $${remaining.toLocaleString()}\n`
  }
  
  message += `• *TOTAL FINAL: $${total.toLocaleString()}*\n\n`
  
  message += `📝 *PRÓXIMOS PASOS:*\n`
  message += `1. Confirmar disponibilidad de productos\n`
  message += `2. Coordinar forma de pago\n`
  message += `3. Programar entrega\n\n`
  
  message += `¡Gracias por elegir Raíz Vital! 🌱`

  return encodeURIComponent(message)
}

export function generateWhatsAppURL(message: string): string {
  const phoneNumber = "5491153764400" // Número de WhatsApp de Raíz Vital
  return `https://wa.me/${phoneNumber}?text=${message}`
}

export function sendWhatsAppOrder(cart: CartItem[], customerInfo: CustomerInfo, total: number): void {
  const message = generateWhatsAppMessage(cart, customerInfo, total)
  const url = generateWhatsAppURL(message)
  window.open(url, "_blank")
}

export async function processWhatsAppOrder(cart: CartItem[], customerInfo: CustomerInfo): Promise<{ success: boolean; message: string; whatsappUrl?: string }> {
  try {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const message = generateWhatsAppMessage(cart, customerInfo, total)
    const whatsappUrl = generateWhatsAppURL(message)
    return { success: true, message: "Pedido procesado correctamente", whatsappUrl }
  } catch (error) {
    return { success: false, message: "Error al enviar el pedido" }
  }
}
