"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Check, AlertCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@/lib/types"

interface ProductViewProps {
  product: Product
}

export default function ProductView({ product }: ProductViewProps) {
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { toast } = useToast()
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
      },
      quantity,
    ) // Pasar quantity como segundo parámetro

    setAddedToCart(true)
    toast({
      title: "Producto añadido al carrito",
      description: `${quantity} x ${product.name} agregado correctamente`,
      action: (
        <Button variant="outline" size="sm" asChild>
          <Link href="/carrito">Ver carrito</Link>
        </Button>
      ),
    })

    // Reset the added state after 2 seconds
    setTimeout(() => {
      setAddedToCart(false)
    }, 2000)
  }

  const handleAddToWishlist = () => {
    toast({
      title: "Añadido a favoritos",
      description: `${product.name} añadido a tu lista de favoritos`,
    })
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <>
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="text-sm text-[#16481D] hover:underline">
              Inicio
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-500" />
              <Link href="/combos" className="ml-1 text-sm text-[#16481D] hover:underline">
                Combos
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-500" />
              <Link
                href={`/combos?categoria=${product.category}`}
                className="ml-1 text-sm text-[#16481D] hover:underline"
              >
                {product.category}
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-500" />
              <span className="ml-1 text-sm font-medium text-gray-500">{product.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-md">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-[#16481D] mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#16481D]/10 text-[#16481D] px-2 py-1 rounded-full text-sm">{product.category}</span>
            {product.featured && (
              <span className="bg-[#16481D]/10 text-[#16481D] px-2 py-1 rounded-full text-sm">Destacado</span>
            )}
          </div>

          <div className="mb-6">
            <p className="text-3xl font-bold mb-1">{formatPrice(product.price)}</p>
            <p className="text-sm text-gray-600">Precio incluye IVA</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="flex items-center gap-2 text-sm text-[#16481D]">
              <Check className="h-4 w-4" />
              <span>Envío gratis en tu primera compra</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#16481D] mt-1">
              <Check className="h-4 w-4" />
              <span>Producto 100% natural</span>
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="quantity" className="block mb-2 font-medium">
              Cantidad
            </Label>
            <div className="flex items-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                aria-label="Disminuir cantidad"
                className="h-10 w-10 rounded-r-none bg-transparent"
              >
                -
              </Button>
              <Input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                min="1"
                className="h-10 w-16 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                aria-label="Cantidad"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={increaseQuantity}
                aria-label="Aumentar cantidad"
                className="h-10 w-10 rounded-l-none bg-transparent"
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              onClick={handleAddToCart}
              className="bg-[#16481D] hover:bg-[#16481D]/90 text-white flex-1 h-12"
              disabled={addedToCart}
            >
              {addedToCart ? (
                <>
                  <Check className="mr-2 h-5 w-5" /> Añadido
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" /> Añadir al carrito
                </>
              )}
            </Button>
            <Button
              onClick={handleAddToWishlist}
              variant="outline"
              className="border-[#16481D] text-[#16481D] h-12 bg-transparent"
            >
              <Heart className="mr-2 h-5 w-5" /> Favoritos
            </Button>
          </div>

          <div className="bg-[#16481D]/5 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-[#16481D] mt-0.5" />
              <div>
                <p className="font-medium text-[#16481D]">¿Tienes dudas sobre este producto?</p>
                <p className="text-sm mt-1">
                  Contáctanos por{" "}
                  <a
                    href="https://wa.me/+5491100000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#16481D] font-medium underline"
                  >
                    WhatsApp
                  </a>{" "}
                  y te responderemos a la brevedad.
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="descripcion" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="descripcion">Descripción</TabsTrigger>
              <TabsTrigger value="beneficios">Beneficios</TabsTrigger>
              <TabsTrigger value="conservacion">Conservación</TabsTrigger>
            </TabsList>
            <TabsContent value="descripcion" className="pt-4">
              <p>{product.longDescription || product.description}</p>
            </TabsContent>
            <TabsContent value="beneficios" className="pt-4">
              <ul className="list-disc pl-5 space-y-1">
                {product.benefits?.map((benefit, index) => <li key={index}>{benefit}</li>) || (
                  <>
                    <li>Rico en proteínas y grasas saludables</li>
                    <li>Fuente de vitaminas y minerales esenciales</li>
                    <li>Ideal para mantener niveles de energía estables</li>
                    <li>Perfecto para una alimentación balanceada</li>
                  </>
                )}
              </ul>
            </TabsContent>
            <TabsContent value="conservacion" className="pt-4">
              <p>
                Para mantener la frescura y calidad de tu {product.name}, guárdalo en un lugar fresco y seco,
                preferiblemente en un recipiente hermético. Evita la exposición directa al sol y al calor.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
