"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet"

export default function Navbar() {
  const pathname = usePathname()
  const { cart } = useCart()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const cartItemCount = mounted ? cart.reduce((total, item) => total + item.quantity, 0) : 0

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/productos", label: "Productos" },
    { href: "/combos", label: "Combos" },
    { href: "/#faq", label: "Preguntas" },
    { href: "/pack-saludable", label: "🧺 Armá tu Pack", highlight: true },
  ]

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FEF6EB] shadow-sm border-b border-[#16481D]/10">
      <div className="container mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Raíz Vital" width={40} height={40} className="h-10 w-auto" />
          <span className="text-xl font-bold text-[#16481D]">Raíz Vital</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[#16481D] relative ${
                isActive(link.href) ? "text-[#16481D]" : "text-[#16481D]/70"
              } ${link.highlight ? "bg-[#16481D]/10 px-3 py-1 rounded-full" : ""}`}
            >
              {link.label}
              {isActive(link.href) && !link.highlight && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#16481D] rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/carrito" className="relative p-2 hover:bg-[#16481D]/5 rounded-lg transition-colors">
            <ShoppingCart className="h-6 w-6 text-[#16481D]" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#16481D] text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium">
                {cartItemCount}
              </span>
            )}
          </Link>

          <Sheet>
              <SheetTitle>
                
              </SheetTitle>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-[#16481D]/5">
                <Menu className="h-6 w-6 text-[#16481D]" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#FEF6EB] border-l border-[#16481D]/10 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center p-6 border-b border-[#16481D]/10">
                  <div className="flex items-center gap-2">
                    <Image src="/images/logo.png" alt="Raíz Vital" width={32} height={32} />
                    <span className="font-semibold text-[#16481D]">Raíz Vital</span>
                  </div>
                </div>

                <nav className="flex flex-col p-6">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={`py-4 text-lg font-medium transition-colors hover:text-[#16481D] ${
                          link.label !== "Combos" ? "border-b border-[#16481D]/10" : ""
                        } ${
                          isActive(link.href) ? "text-[#16481D]" : "text-[#16481D]/70"
                        } ${link.highlight ? "bg-[#16481D]/10 px-3 rounded-lg mb-2" : ""}`}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto p-6 border-t border-[#16481D]/10">
                  <SheetClose asChild>
                    <Button asChild className="w-full bg-[#16481D] hover:bg-[#16481D]/90">
                      <Link href="/carrito" className="flex items-center justify-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Ver carrito
                        {cartItemCount > 0 && (
                          <span className="bg-white text-[#16481D] rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium">
                            {cartItemCount}
                          </span>
                        )}
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
