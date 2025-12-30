export function KPI({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl p-4 bg-white border border-[var(--brand-slate)] text-center">
      <div className="text-xl font-bold text-[var(--brand-primary)]">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  )
}
