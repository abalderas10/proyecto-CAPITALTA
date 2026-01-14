import '../styles/globals.css'
import { ReactNode } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { QueryProvider } from '@/providers/QueryProvider'
import SessionProvider from '@/providers/SessionProvider'
import { ChatbotWidget } from '@/components/ChatbotWidget'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link
          rel="preload"
          href="/fonts/alta-regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <SessionProvider>
          <QueryProvider>
            {children}
            <ChatbotWidget />
          </QueryProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  )
}
