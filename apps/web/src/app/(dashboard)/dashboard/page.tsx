import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Bell, FileText, CheckCircle, AlertCircle } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    { title: "Solicitudes Pendientes", value: "12", icon: AlertCircle, color: "text-yellow-500" },
    { title: "En Revisión", value: "5", icon: FileText, color: "text-blue-500" },
    { title: "Aprobadas (Mes)", value: "8", icon: CheckCircle, color: "text-green-500" },
  ]

  const notifications = [
    { id: 1, title: "Nueva solicitud", desc: "Constructora Atlas ha enviado una solicitud.", time: "Hace 5 min" },
    { id: 2, title: "Documentos actualizados", desc: "Cafetería Luna subió estados financieros.", time: "Hace 1 hora" },
    { id: 3, title: "Solicitud aprobada", desc: "Préstamo #4023 ha sido aprobado por Riesgos.", time: "Hace 3 horas" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hola, Admin 👋</h1>
        <p className="text-muted-foreground">Aquí está el resumen de la actividad de hoy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Notificaciones Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((n) => (
                <div key={n.id} className="flex items-start space-x-4 border-b pb-4 last:border-0">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{n.title}</p>
                    <p className="text-sm text-muted-foreground">{n.desc}</p>
                    <p className="text-xs text-muted-foreground pt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
