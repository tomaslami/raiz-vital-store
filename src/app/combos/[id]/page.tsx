import { notFound } from "next/navigation"
import { getCombos } from "@/lib/products"
import ProductView from "@/components/product-view/product-view"
import type { Metadata } from "next"

interface ComboPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ComboPageProps): Promise<Metadata> {
  const combo = getCombos().find((p) => p.id === params.id)

  if (!combo) {
    return {
      title: "Combo no encontrado | Raíz Vital",
    }
  }

  return {
    title: `${combo.name} | Raíz Vital`,
    description: combo.description,
  }
}

export default function ComboPage({ params }: ComboPageProps) {
  const combo = getCombos().find((p) => p.id === params.id)

  if (!combo) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#FEF6EB] py-8">
      <div className="container mx-auto px-4">
        <ProductView product={combo} />
      </div>
    </main>
  )
}
