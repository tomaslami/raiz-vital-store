import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FEF6EB] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#16481D]">404</h1>
        <h2 className="text-2xl font-semibold mt-4 mb-6">Página no encontrada</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Button asChild className="bg-[#16481D] hover:bg-[#16481D]/90">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" /> Volver al inicio
          </Link>
        </Button>
      </div>
    </div>
  )
}
