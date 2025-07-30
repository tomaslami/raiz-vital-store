"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/lib/cart-context"
import { processWhatsAppOrder } from "@/lib/whatsapp"

import { User, Phone, MapPin, FileText, CheckCircle, Copy } from "lucide-react"

interface CheckoutFormProps {
  onClose: () => void
}

export default function CheckoutForm({ onClose }: CheckoutFormProps) {
  const { cart, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderProcessed, setOrderProcessed] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  })

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Formato de email inválido"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio"
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Formato de teléfono inválido"
    }

    if (!formData.address.trim()) {
      newErrors.address = "La dirección es obligatoria"
    }

    if (!formData.city.trim()) {
      newErrors.city = "La ciudad es obligatoria"
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error !== "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (cart.length === 0) {
      alert("Agrega productos antes de realizar el pedido")
      return
    }

    setIsSubmitting(true)

    try {
      // Procesar pedido
      const result = await processWhatsAppOrder(cart, formData)

      if (result.success && result.whatsappUrl) {
        // Limpiar carrito después de procesar
        clearCart()
        
        // Abrir WhatsApp automáticamente
        window.open(result.whatsappUrl, "_blank")
        
        // Cerrar el modal después de un breve delay
        setTimeout(() => {
          onClose()
        }, 1000)
      }
    } catch (error) {
      alert("Hubo un problema al procesar tu pedido. Inténtalo nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, "_blank")
    // Cerrar el modal después de un breve delay
    setTimeout(() => {
      onClose()
    }, 1000)
  }

  const handleFinish = () => {
    onClose()
  }

  // Vista de éxito después de procesar el pedido
  if (orderProcessed) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#16481D] mb-2">¡Pedido Procesado!</h2>
          <p className="text-gray-600 mb-4">
            Tu pedido ha sido procesado correctamente y el mensaje ha sido copiado al portapapeles.
          </p>
        </div>

        <div className="bg-[#16481D]/5 p-4 rounded-lg text-left">
          <div className="flex items-start gap-3">
            <Copy className="h-5 w-5 text-[#16481D] mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-[#16481D] mb-1">Mensaje copiado automáticamente</p>
              <p className="text-gray-600">
                El mensaje con tu pedido ya está en tu portapapeles. Solo tienes que pegarlo en WhatsApp.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button onClick={handleOpenWhatsApp} className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white">
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Abrir WhatsApp y Enviar
          </Button>

          <Button onClick={handleFinish} variant="outline" className="w-full bg-transparent">
            Finalizar
          </Button>
        </div>

        <div className="text-xs text-gray-500">
          <p>El mensaje se abrirá automáticamente en WhatsApp listo para enviar</p>
        </div>
      </div>
    )
  }

  // Formulario original
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#16481D] mb-2">Finalizar Pedido</h2>
        <p className="text-gray-600">Completa tus datos para procesar el pedido</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Nombre completo *
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Tu nombre completo"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="tu@email.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Teléfono *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+54 9 11 1234-5678"
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Dirección de entrega *
          </Label>
          <Input
            id="address"
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="Calle, número, barrio"
            className={errors.address ? "border-red-500" : ""}
          />
          {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Ciudad *
          </Label>
          <Input
            id="city"
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            placeholder="Tu ciudad"
            className={errors.city ? "border-red-500" : ""}
          />
          {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Notas adicionales (opcional)
          </Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            placeholder="Instrucciones especiales, referencias, horarios preferidos..."
            rows={3}
          />
        </div>

        <div className="bg-[#16481D]/5 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-[#16481D] mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            <div className="text-sm">
              <p className="font-medium text-[#16481D] mb-1">Proceso automático</p>
              <p className="text-gray-600">
                Al procesar tu pedido, el mensaje se copiará automáticamente y se abrirá WhatsApp listo para enviar.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 bg-transparent"
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" className="flex-1 bg-[#16481D] hover:bg-[#16481D]/90" disabled={isSubmitting}>
            {isSubmitting ? (
              "Procesando..."
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Procesar Pedido
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
