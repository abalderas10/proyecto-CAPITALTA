import { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-gray-900 text-white p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-8">Capitalta Admin</h2>
        <nav className="space-y-2">
           <a href="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-800">Dashboard</a>
           <a href="/solicitudes" className="block py-2 px-4 rounded hover:bg-gray-800">Solicitudes</a>
        </nav>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow p-4 flex justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <a href="/logout" className="text-red-600">Salir</a>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
