import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <img src="/CAPITALTA.svg" alt="Capitalta" className="h-8 brightness-0 invert" />
              <span>Capitalta</span>
            </div>
            <p className="text-sm text-gray-400">
              Plataforma financiera especializada en el sector construcción y PYME.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-white"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Productos */}
          <div>
            <h4 className="text-white font-semibold mb-4">Productos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/constructoras" className="hover:text-teal-400">Crédito Constructor</a></li>
              <li><a href="/pyme" className="hover:text-teal-400">Crédito PYME</a></li>
              <li><a href="/persona-fisica" className="hover:text-teal-400">Persona Física</a></li>
            </ul>
          </div>

          {/* Compañía */}
          <div>
            <h4 className="text-white font-semibold mb-4">Compañía</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/sobre" className="hover:text-teal-400">Sobre Nosotros</a></li>
              <li><a href="/proceso" className="hover:text-teal-400">Cómo funciona</a></li>
              <li><a href="/requisitos" className="hover:text-teal-400">Requisitos</a></li>
              <li><a href="/faq" className="hover:text-teal-400">Preguntas Frecuentes</a></li>
              <li><a href="/contacto" className="hover:text-teal-400">Contacto</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacidad" className="hover:text-teal-400">Aviso de Privacidad</a></li>
              <li><a href="/terminos" className="hover:text-teal-400">Términos y Condiciones</a></li>
              <li><a href="/sofom-enr" className="hover:text-teal-400">Aviso SOFOM ENR</a></li>
              <li><a href="/status" className="hover:text-teal-400">Estado del Sistema</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Capitalta S.A.P.I. de C.V., SOFOM, E.N.R. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0">
             Av. Reforma 222, CDMX.
          </div>
        </div>
      </div>
    </footer>
  )
}
