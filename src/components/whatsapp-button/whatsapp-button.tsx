"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WhatsAppButtonProps {
  message?: string
  className?: string
}

export default function WhatsAppButton({
  message = "Hola, quiero más información sobre Raíz Vital",
  className,
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/5491153764400?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button onClick={handleClick} className={`bg-[#25D366] hover:bg-[#25D366]/90 text-white ${className}`}>
      <MessageCircle className="mr-2 h-4 w-4" />
      Contactar por WhatsApp
    </Button>
  )
}
