import "../styles/globals.css"
import { ReactNode } from "react"
import { Toaster } from "@/components/ui/toaster"
import { PageTransition } from "@/components/ui/page-transition"
import { QueryProvider } from "@/providers/QueryProvider"
import { SessionProvider } from "@/providers/SessionProvider"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>
          <QueryProvider>
            <PageTransition>{children}</PageTransition>
          </QueryProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  )
}
