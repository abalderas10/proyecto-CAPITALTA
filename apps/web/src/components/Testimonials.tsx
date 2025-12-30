export function Testimonials() {
  const testimonials = [
    {
      quote: "Capitalta entendió nuestro modelo de negocio cuando los bancos tradicionales nos cerraron las puertas. Gracias a ellos terminamos el desarrollo a tiempo.",
      author: "Arq. Roberto Méndez",
      role: "Director General, Constructora Méndez",
      image: "RM"
    },
    {
      quote: "La velocidad de respuesta es impresionante. En 3 días ya teníamos los recursos para comprar el material. Altamente recomendados.",
      author: "Lic. Ana Paula Torres",
      role: "CEO, Inmobiliaria Torre",
      image: "AT"
    },
    {
      quote: "La plataforma es muy fácil de usar y el equipo de soporte siempre está atento. Es el aliado financiero que necesitábamos.",
      author: "Ing. Carlos Ruiz",
      role: "Fundador, CR Edificaciones",
      image: "CR"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          Lo que dicen nuestros clientes
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-8 relative">
              <div className="text-4xl text-teal-200 absolute top-4 left-6">"</div>
              <p className="text-gray-700 relative z-10 italic mb-6 pt-4">
                {t.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
                  {t.image}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t.author}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
