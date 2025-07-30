"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function Contact() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      alert("¡Suscripción exitosa! Gracias por suscribirte a nuestro newsletter.")
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <section className="bg-[#16481D] text-white py-16">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mantente informado</h2>
          <p className="mb-8">
            Suscríbete a nuestro newsletter para recibir información sobre nuevos productos, promociones y consejos
            sobre alimentación saludable.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button type="submit" disabled={isSubmitting} className="bg-white text-[#16481D] hover:bg-white/90">
              {isSubmitting ? "Enviando..." : "Suscribirme"}
            </Button>
          </form>

          <p className="text-sm mt-4 text-white/80">
            Al suscribirte, aceptas recibir correos electrónicos de marketing de Raíz Vital. Puedes darte de baja en
            cualquier momento.
          </p>
        </div>
      </div>
    </section>
  )
}
