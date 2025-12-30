export const metadata = {
  title: 'Términos y Condiciones — Capitalta',
  description: 'Lee los términos de uso del sitio y de nuestros servicios.',
}

export default function Page() {
  return (
    <main className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Términos y Condiciones</h1>
        
        <div className="prose prose-lg text-gray-700 space-y-6">
          <p className="lead">
            Bienvenido a Capitalta. Al acceder y utilizar nuestro sitio web y servicios, usted acepta estar sujeto a los siguientes términos y condiciones.
          </p>

          <h2 className="text-xl font-bold text-gray-900">1. Uso del Sitio</h2>
          <p>
            El contenido de este sitio web es para fines informativos y operativos relacionados con nuestros productos financieros. Usted se compromete a utilizar el sitio de manera lícita y a no realizar actos que puedan dañar la plataforma o a terceros.
          </p>

          <h2 className="text-xl font-bold text-gray-900">2. Propiedad Intelectual</h2>
          <p>
            Todas las marcas, logotipos, textos, imágenes y software contenidos en este sitio son propiedad de Capitalta o de sus licenciantes y están protegidos por las leyes de propiedad intelectual.
          </p>

          <h2 className="text-xl font-bold text-gray-900">3. Solicitudes de Crédito</h2>
          <p>
            El envío de una solicitud de crédito a través de nuestra plataforma no garantiza su aprobación. Todas las solicitudes están sujetas a análisis de crédito, verificación de identidad y cumplimiento de políticas internas y regulatorias.
          </p>

          <h2 className="text-xl font-bold text-gray-900">4. Modificaciones</h2>
          <p>
            Capitalta se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor al momento de su publicación en el sitio.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mt-8">
             <p className="text-sm text-gray-600">
              Para consultar los Términos y Condiciones completos de nuestros productos y servicios, refiérase a su contrato individual o visite nuestra documentación.
            </p>
             <a href="https://docs.capitalta.abdev.click/docs/index" target="_blank" className="text-teal-600 font-medium hover:underline mt-2 inline-block">
              Ver documentación oficial &rarr;
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
