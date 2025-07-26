import type { CartItem, CustomerInfo } from "./types"

export function generateWhatsAppMessage(cart: CartItem[], customerInfo: CustomerInfo, total: number): string {
  let message = `¡Hola! Me gustaría hacer un pedido:\n\n`

  // Customer info
  message += `📋 *Datos del cliente:*\n`
  message += `• Nombre: ${customerInfo.name}\n`
  message += `• Email: ${customerInfo.email}\n`
  message += `• Teléfono: ${customerInfo.phone}\n`
  message += `• Dirección: ${customerInfo.address}\n`
  message += `• Ciudad: ${customerInfo.city}\n`
  if (customerInfo.notes) {
    message += `• Notas: ${customerInfo.notes}\n`
  }
  message += `\n`

  // Cart items
  message += `🛒 *Productos:*\n`
  cart.forEach((item) => {
    message += `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}\n`
  })

  message += `\n💰 *Total: $${total.toLocaleString()}*\n\n`
  message += `¡Gracias por elegir Raíz Vital! 🌱`

  return encodeURIComponent(message)
}

export function generateWhatsAppURL(message: string): string {
  const phoneNumber = "5491123456789" // Replace with actual WhatsApp number
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
