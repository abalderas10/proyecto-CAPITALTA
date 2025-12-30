import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: {
    title: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

export function Sidebar({ className, items, ...props }: SidebarProps) {
  return (
    <div className={cn("pb-12 w-64 border-r bg-background", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Menu
          </h2>
          <div className="space-y-1">
            {items?.map((item, index) => (
              <Button key={index} variant="ghost" className="w-full justify-start" asChild>
                <Link href={item.href}>
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
