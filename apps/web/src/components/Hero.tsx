import { Button } from './ui/Button'

export function Hero({ title, subtitle, primary, secondary }: { title: string; subtitle: string; primary?: { label: string; href: string }; secondary?: { label: string; href: string } }) {
  return (
    <section className="rounded-xl p-8 md:p-12 bg-gradient-to-r from-[var(--brand-navy)] to-[var(--neutral-900)] text-white">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        <p className="text-lg opacity-90">{subtitle}</p>
        <div className="flex gap-3">
          {primary && <a href={primary.href}><Button>{primary.label}</Button></a>}
          {secondary && <a href={secondary.href}><Button variant="outline">{secondary.label}</Button></a>}
        </div>
      </div>
    </section>
  )
}
