import { cn } from "@/lib/utils"

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full",
        className
      )}
      {...props}
    />
  )
}
