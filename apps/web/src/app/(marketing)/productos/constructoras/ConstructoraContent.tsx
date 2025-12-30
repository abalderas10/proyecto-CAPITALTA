"use client"

import { copyConstructoras } from '@/content/copy'
import { LoanCalculator } from '@/components/features/calculator/LoanCalculator'
import { constructoraConfig } from '@/data/calculatorConfigs'
import { useRouter } from 'next/navigation'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/ui/Section'
import { KPI } from '@/components/ui/KPI'

export function ConstructoraContent() {
  const c = copyConstructoras
  const router = useRouter()

  const handleApply = (monto: number, plazo: number) => {
    localStorage.setItem('prefilledMonto', monto.toString());
    localStorage.setItem('prefilledPlazo', plazo.toString());
    router.push('/solicitud');
  };

  return (
    <main className="max-w-5xl mx-auto py-12 space-y-12">
      <Hero title={c.heroHeadline || c.title} subtitle={c.heroSubheadline || c.subtitle} primary={c.ctaPrimary} secondary={c.ctaSecondary} />
      <Section title="Nos respaldan">
        <div className="grid grid-cols-3 gap-4">
          {['Logo 1','Logo 2','Logo 3','Logo 4','Logo 5','Logo 6'].map(l => (
            <div key={l} className="border rounded p-6 bg-white text-center">{l}</div>
          ))}
        </div>
      </Section>
      {c.differentiators && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.differentiators.map((d) => (
            <div key={d} className="rounded p-4 bg-gray-100">{d}</div>
          ))}
        </section>
      )}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {c.benefits.map((b) => (
          <div key={b} className="border rounded p-4">{b}</div>
        ))}
      </section>
      {c.useCases && (
        <Section title="¿Para qué usarlo?">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.useCases.map((u: string) => (
              <div key={u} className="rounded p-4 bg-gray-100">{u}</div>
            ))}
          </div>
        </Section>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {c.kpis.map((k) => (
          <KPI key={k} value={k.split(' ')[0]} label={k.substring(k.indexOf(' ')+1)} />
        ))}
      </div>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Preguntas frecuentes</h2>
        <div className="space-y-2">
          {c.faqs.map((f) => (
            <div key={f.q} className="border rounded p-4">
              <div className="font-medium">{f.q}</div>
              <div>{f.a}</div>
            </div>
          ))}
        </div>
      </section>
      {c.process && (
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Proceso</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.process.map((p) => (
              <div key={p.step} className="border rounded p-4">
                <div className="font-medium">{p.step}</div>
                <div className="text-sm text-gray-600">{p.detail}</div>
              </div>
            ))}
          </div>
        </section>
      )}
      {c.testimonials && (
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Testimonios</h2>
          <div className="space-y-2">
            {c.testimonials.map((t) => (
              <div key={t.author} className="rounded p-4 bg-gray-50 border">“{t.quote}” — {t.author}</div>
            ))}
          </div>
        </section>
      )}
      <LoanCalculator config={constructoraConfig} onApply={handleApply} />
      {c.compliance && (
        <section className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {c.compliance.map((x) => (
              <span key={x} className="px-3 py-1 text-xs border rounded bg-white">{x}</span>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
