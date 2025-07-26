import Image from "next/image"
import Link from "next/link"
import { MessageCircle, Instagram, Facebook, MapPin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#16481D] text-white">
      <div className="container mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Raíz Vital"
                width={40}
                height={40}
                className="h-10 w-auto rounded-full"
              />
              <span className="text-xl font-semibold">Raíz Vital</span>
            </div>
            <p className="mb-4">
              Alimentos naturales directo a tu casa. Combos listos o packs personalizados con descuentos especiales.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/raizvital.ok"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#nosotros" className="hover:underline">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/#como-funciona" className="hover:underline">
                  Cómo funciona
                </Link>
              </li>
              <li>
                <Link href="/combos" className="hover:underline">
                  Combos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Nuestros servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/combos" className="hover:underline">
                  Combos prediseñados
                </Link>
              </li>
              <li>
                <Link href="/pack-saludable" className="hover:underline">
                  Pack personalizado
                </Link>
              </li>
              <li>
                <span className="text-white/80">Descuentos por volumen</span>
              </li>
              <li>
                <span className="text-white/80">Envío gratis</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <a href="mailto:info@raizvital.com" className="hover:underline">
                  info@raizvital.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 shrink-0" />
                <a
                  href="https://wa.me/+5491153764400"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/20 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Raíz Vital. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
