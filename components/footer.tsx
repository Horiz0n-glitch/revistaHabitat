import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white mt-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">HABITAT</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Revista digital de arquitectura, especializada en conservación de edificios, restauro, patrimonio e
              historia.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-white">Contenido</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/articulos" className="text-sm text-white/70 hover:text-white transition-colors">
                  Artículos
                </Link>
              </li>
              <li>
                <Link href="/entrevistas" className="text-sm text-white/70 hover:text-white transition-colors">
                  Entrevistas
                </Link>
              </li>
              <li>
                <Link href="/revistas" className="text-sm text-white/70 hover:text-white transition-colors">
                  Revistas Digitales
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm text-white">Información</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/staff" className="text-sm text-white/70 hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-white/70 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-sm text-white/70 hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-white">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-sm text-white/70 text-center">
            © {new Date().getFullYear()} Revista Habitat. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
