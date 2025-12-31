import { ReactNode } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { LayoutDashboard, FileText, Settings, User, LogOut } from 'lucide-react'
import { auth, signOut } from '@/auth'
import { redirect } from 'next/navigation'
import { RequireAuth } from '@/components/RequireAuth'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  // Define sidebar items based on role if needed
  const sidebarItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Solicitudes", href: "/dashboard/solicitudes", icon: FileText },
    { title: "Perfil", href: "/dashboard/perfil", icon: User },
    { title: "Configuración", href: "/dashboard/settings", icon: Settings },
  ]

  // Filter items based on role example:
  // const userRole = (session.user as any).rol;
  // if (userRole === 'CLIENTE') { ... }

  return (
    <RequireAuth allowedRoles={["ANALISTA", "ADMIN"]}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar items={sidebarItems} className="hidden md:block bg-white border-r" />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm p-4 flex justify-between items-center z-10">
            <h1 className="text-xl font-bold text-gray-800">Capitalta Admin</h1>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                <p className="text-xs text-gray-500">{(session.user as any).rol || 'Usuario'}</p>
              </div>
              <form action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}>
                <button type="submit" className="text-red-600 hover:text-red-700 p-2 rounded hover:bg-red-50" title="Cerrar Sesión">
                  <LogOut className="w-5 h-5" />
                </button>
              </form>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </RequireAuth>
  )
}
