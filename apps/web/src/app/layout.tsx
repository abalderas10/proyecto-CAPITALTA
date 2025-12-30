import '../styles/globals.css'
import { ReactNode } from 'react'
import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
