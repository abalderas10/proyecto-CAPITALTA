import Image from 'next/image'
import { Button } from './ui/Button'

export function Hero({ 
  title, 
  subtitle, 
  primary, 
  secondary, 
  image 
}: { 
  title: string; 
  subtitle: string; 
  primary?: { label: string; href: string }; 
  secondary?: { label: string; href: string };
  image?: string;
}) {
  return (
    <section className="relative rounded-xl overflow-hidden bg-[var(--brand-navy)] text-white">
      {image && (
        <div className="absolute inset-0 z-0">
          <Image 
            src={image} 
            alt={title} 
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-navy)] to-transparent" />
        </div>
      )}
      <div className={`relative z-10 p-8 md:p-12 space-y-4 ${!image ? 'bg-gradient-to-r from-[var(--brand-navy)] to-[var(--neutral-900)]' : ''}`}>
        <h1 className="text-3xl md:text-4xl font-bold max-w-2xl">{title}</h1>
        <p className="text-lg opacity-90 max-w-xl">{subtitle}</p>
        <div className="flex gap-3 pt-4">
          {primary && <a href={primary.href}><Button className="bg-white text-[var(--brand-navy)] hover:bg-gray-100">{primary.label}</Button></a>}
          {secondary && <a href={secondary.href}><Button variant="outline" className="border-white text-white hover:bg-white/10">{secondary.label}</Button></a>}
        </div>
      </div>
    </section>
  )
}
