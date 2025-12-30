export const metadata = {
  title: 'Aviso SOFOM ENR — Capitalta',
}

export default function Page() {
  return (
    <main className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Aviso Legal SOFOM ENR</h1>
        
        <div className="prose prose-lg text-gray-700 space-y-6">
          <p>
            <strong>CAPITALTA S.A.P.I. DE C.V., SOFOM, E.N.R.</strong>, para su constitución y operación con tal carácter, no requiere de autorización de la Secretaría de Hacienda y Crédito Público, no obstante, se encuentra sujeta a la supervisión de la Comisión Nacional Bancaria y de Valores, únicamente para efectos de lo dispuesto por el artículo 56 de la Ley General de Organizaciones y Actividades Auxiliares del Crédito.
          </p>
          
          <div className="bg-gray-50 p-6 border-l-4 border-teal-600 my-8">
            <p className="italic">
              "La entidad financiera no requiere autorización de la SHCP para su constitución y operación, y está sujeta a la supervisión de la CNBV únicamente en materia de prevención y detección de operaciones con recursos de procedencia ilícita, terrorismo y terrorismo internacional."
            </p>
          </div>

          <h2 className="text-xl font-bold text-gray-900">Unidad Especializada de Atención a Usuarios (UNE)</h2>
          <p>
            En caso de alguna consulta, reclamación o aclaración, podrá presentarla en la UNE de Atención a Usuarios, a través de los siguientes medios:
          </p>
          <ul className="list-disc pl-6">
            <li><strong>Teléfono:</strong> 55 1234 5678</li>
            <li><strong>Correo electrónico:</strong> une@capitalta.mx</li>
            <li><strong>Domicilio:</strong> Av. Reforma 222, Piso 10, Col. Juárez, C.P. 06600, Ciudad de México.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8">CONDUSEF</h2>
          <p>
            Comisión Nacional para la Protección y Defensa de los Usuarios de Servicios Financieros.
          </p>
          <ul className="list-disc pl-6">
            <li><strong>Teléfono:</strong> 55 53 400 999</li>
            <li><strong>Página web:</strong> <a href="https://www.condusef.gob.mx" className="text-teal-600 underline">www.condusef.gob.mx</a></li>
          </ul>
        </div>
      </div>
    </main>
  )
}
