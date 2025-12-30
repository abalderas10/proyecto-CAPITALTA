import { PymeApplicationForm } from './PymeApplicationForm';

export const metadata = {
  title: 'Solicitud Crédito PYME | Capitalta',
  description: 'Inicia tu solicitud de crédito PYME en minutos.',
};

export default function PymeApplicationPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Solicitud de Crédito PYME
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Completa el formulario para evaluar tu solicitud. Puedes guardar tu progreso y continuar después.
        </p>
      </div>

      <PymeApplicationForm />
    </div>
  );
}
