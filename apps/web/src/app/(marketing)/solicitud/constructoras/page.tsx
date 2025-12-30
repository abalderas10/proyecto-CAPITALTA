import { ConstructoraApplicationForm } from './ConstructoraApplicationForm';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const metadata = {
  title: 'Solicitud Crédito Constructor — Capitalta',
  description: 'Inicia tu solicitud de financiamiento para proyectos de construcción.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Fijo Especial para el Formulario */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={20} />
            <span className="hidden sm:inline font-medium">Volver al inicio</span>
          </Link>

          <div className="flex items-center gap-2">
             <img src="/CAPITALTA.svg" alt="Capitalta" className="h-6" />
             <span className="font-bold text-lg text-gray-900 hidden sm:block">Capitalta</span>
          </div>

          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <Save size={16} />
              <span className="hidden sm:inline">Guardar y Salir</span>
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Solicitud de Crédito Constructor</h1>
          <p className="text-gray-600 mt-2">Completa el formulario para recibir una propuesta en menos de 48 horas.</p>
        </div>

        <ConstructoraApplicationForm />
      </main>
    </div>
  );
}
