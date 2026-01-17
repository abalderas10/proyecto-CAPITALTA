export function Progress({ value }: { value: number }) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className="h-2 w-full rounded bg-muted">
      <div
        className="h-2 rounded bg-gradient-primary transition-[width] duration-300"
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
