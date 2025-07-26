"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/lib/cart-context"
import { processWhatsAppOrder } from "@/lib/whatsapp"
import { useToast } from "@/hooks/use-toast"
import { MessageCircle, User, Phone, MapPin, FileText, CheckCircle, Copy } from "lucide-react"

interface CheckoutFormProps {
  onClose: () => void
}

export default function CheckoutForm({ onClose }: CheckoutFormProps) {
  const { cart, clearCart } = useCart()
  const { toast } = useToast()
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
      toast({
        title: "Carrito vacío",
        description: "Agrega productos antes de realizar el pedido",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Procesar pedido
      const result = await processWhatsAppOrder(cart, formData)

      if (result.success) {
        setWhatsappUrl(result.whatsappUrl || "")
        setOrderProcessed(true)

        // Limpiar carrito después de procesar
        clearCart()

        toast({
          title: "¡Pedido procesado exitosamente!",
          description: result.message,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al procesar tu pedido. Inténtalo nuevamente.",
        variant: "destructive",
      })
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
            <MessageCircle className="mr-2 h-4 w-4" />
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
            <MessageCircle className="h-5 w-5 text-[#16481D] mt-0.5" />
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
