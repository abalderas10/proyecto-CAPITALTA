export const metadata = {
  title: 'Política de Privacidad — Capitalta',
  description: 'Conoce cómo protegemos y tratamos tus datos personales.',
}

export default function Page() {
  return (
    <main className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>
        
        <div className="prose prose-lg text-gray-700 space-y-6">
          <p className="lead">
            En Capitalta, nos tomamos muy en serio la privacidad y seguridad de tus datos. Este aviso describe cómo recopilamos, usamos y protegemos tu información personal.
          </p>

          <h2 className="text-xl font-bold text-gray-900">1. Responsable de los Datos</h2>
          <p>
            Capitalta S.A.P.I. de C.V., SOFOM, E.N.R., con domicilio en Av. Reforma 222, Piso 10, Col. Juárez, C.P. 06600, Ciudad de México, es el responsable del tratamiento de sus datos personales.
          </p>

          <h2 className="text-xl font-bold text-gray-900">2. Datos que Recopilamos</h2>
          <p>
            Recabamos información personal necesaria para evaluar su solicitud de crédito y cumplir con las regulaciones aplicables, incluyendo:
          </p>
          <ul className="list-disc pl-6">
            <li>Datos de identificación (Nombre, RFC, CURP).</li>
            <li>Datos de contacto (Domicilio, Teléfono, Correo electrónico).</li>
            <li>Datos financieros y patrimoniales.</li>
            <li>Documentación legal de su empresa (si aplica).</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900">3. Finalidad del Tratamiento</h2>
          <p>
            Sus datos serán utilizados para:
          </p>
          <ul className="list-disc pl-6">
            <li>Analizar y evaluar su solicitud de crédito.</li>
            <li>Formalizar el contrato de crédito.</li>
            <li>Cumplir con obligaciones regulatorias (PLD/FT).</li>
            <li>Mantener la relación comercial y realizar cobranza.</li>
          </ul>

          <div className="bg-gray-50 p-6 rounded-lg mt-8">
            <p className="text-sm text-gray-600">
              Para consultar el Aviso de Privacidad Integral, por favor visite nuestra documentación oficial o contáctenos en privacidad@capitalta.mx.
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
