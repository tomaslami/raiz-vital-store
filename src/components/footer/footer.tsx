import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook, MapPin, Mail } from "lucide-react"

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
                <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
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
