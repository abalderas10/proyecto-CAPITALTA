import clsx from 'clsx'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ children, variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
  
  const variants = {
    primary: 'bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primaryDark)] shadow hover:shadow-md',
    outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground border-gray-300 text-gray-700',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  }
  
  const sizes = {
    sm: 'h-8 rounded-md px-3 text-xs',
    md: 'h-9 px-4 py-2',
    lg: 'h-10 rounded-md px-8'
  }

  return (
    <button 
      className={clsx(base, variants[variant], sizes[size], className)} 
      {...props}
    >
      {children}
    </button>
  )
}
