import { cn } from "@/lib/utils"

interface KPIProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  label: string
}

export function KPI({ value, label, className, ...props }: KPIProps) {
  return (
    <div 
      className={cn(
        "rounded-xl p-4 bg-background border border-border text-center shadow-sm",
        className
      )}
      {...props}
    >
      <div className="text-xl font-bold text-primary">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
