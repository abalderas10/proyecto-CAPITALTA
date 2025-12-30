"use client"
import { useState } from 'react'
import { Button } from './ui/Button'

export function Calculator({ min = 500000, max = 5000000, minMonths = 6, maxMonths = 36, title = 'Calcula tu crédito', annualRate = 0.18 }: { min?: number; max?: number; minMonths?: number; maxMonths?: number; title?: string; annualRate?: number }) {
  const [amount, setAmount] = useState(min)
  const [months, setMonths] = useState(minMonths)
  const monthlyRate = annualRate / 12
  const pmt = monthlyRate * amount / (1 - Math.pow(1 + monthlyRate, -months))
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm">Monto: ${amount.toLocaleString()}</label>
          <input type="range" min={min} max={max} value={amount} onChange={e => setAmount(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Plazo: {months} meses</label>
          <input type="range" min={minMonths} max={maxMonths} value={months} onChange={e => setMonths(Number(e.target.value))} />
        </div>
      </div>
      <div className="border rounded p-4 bg-white">
        <div>Pago mensual estimado: ${pmt.toFixed(2)}</div>
        <div>Tasa anual referencial: {(annualRate * 100).toFixed(1)}%</div>
      </div>
      <Button onClick={() => { location.href = '/solicitud' }}>Obtener oferta formal</Button>
      <div className="text-xs text-gray-600">Esta es una cotización preliminar. Sujeta a evaluación.</div>
    </section>
  )
}
