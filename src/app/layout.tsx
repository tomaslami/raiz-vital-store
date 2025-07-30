import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { PackProvider } from "@/lib/pack-context"
import Navbar from "@/components/navbar/navbar"
import Footer from "@/components/footer/footer"
import FloatingCart from "@/components/floating-cart/floating-cart"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Raíz Vital - Alimentos naturales",
  description: "Alimentos naturales directo a tu casa. Frutos secos, mix y más productos naturales.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/images/favicon.png" />
      </head>
      <body className={`${montserrat.variable} font-sans`}>
          <CartProvider>
            <PackProvider>
              <Navbar />
              {children}
              <Footer />
              <FloatingCart />
              <Toaster />
            </PackProvider>
          </CartProvider>
      </body>
    </html>
  )
}
