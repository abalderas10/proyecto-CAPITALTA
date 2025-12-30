export function Progress({ value }: { value: number }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded">
      <div className="h-2 bg-black rounded" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  )
}
