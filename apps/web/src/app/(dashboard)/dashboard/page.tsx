"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Bell, FileText, CheckCircle, AlertCircle, TrendingUp, DollarSign } from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts'

export default function DashboardPage() {
  const stats = [
    { title: "Solicitudes Totales", value: "25", icon: FileText, color: "text-blue-500", desc: "+2 desde ayer" },
    { title: "Monto Total", value: "$18.5M", icon: DollarSign, color: "text-green-500", desc: "En proceso" },
    { title: "Tasa Aprobación", value: "68%", icon: TrendingUp, color: "text-purple-500", desc: "Últimos 30 días" },
    { title: "Urgentes", value: "3", icon: AlertCircle, color: "text-red-500", desc: "Requieren atención" },
  ]

  const productData = [
    { name: 'Crédito Puente', amount: 12500000 },
    { name: 'Pyme', amount: 4200000 },
    { name: 'Liquidez', amount: 1800000 },
  ]

  const statusData = [
    { name: 'Pendiente', value: 12, color: '#eab308' }, // yellow-500
    { name: 'En Revisión', value: 5, color: '#3b82f6' }, // blue-500
    { name: 'Aprobada', value: 8, color: '#22c55e' }, // green-500
    { name: 'Rechazada', value: 2, color: '#ef4444' }, // red-500
  ]

  const notifications = [
    { id: 1, title: "Nueva solicitud urgente", desc: "Constructora Atlas requiere revisión inmediata.", time: "Hace 15 min", urgent: true },
    { id: 2, title: "Documentos actualizados", desc: "Cafetería Luna subió estados financieros.", time: "Hace 1 hora", urgent: false },
    { id: 3, title: "Solicitud aprobada", desc: "Préstamo #4023 ha sido aprobado por Riesgos.", time: "Hace 3 horas", urgent: false },
    { id: 4, title: "Falta documentación", desc: "Solicitud #4025 incompleta.", time: "Hace 5 horas", urgent: false },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard de Analista</h1>
        <p className="text-muted-foreground">Resumen general y métricas clave del día.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monto por Producto</CardTitle>
            <CardDescription>Distribución del capital solicitado (MXN)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value/1000000}M`} 
                />
                <Tooltip 
                  formatter={(value: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value)}
                  cursor={{ fill: 'transparent' }}
                />
                <Bar dataKey="amount" fill="#0f172a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Estado de Solicitudes</CardTitle>
            <CardDescription>Desglose actual del pipeline</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Notificaciones y Tareas</CardTitle>
            <CardDescription>Actividad reciente que requiere tu atención</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((n) => (
                <div key={n.id} className="flex items-start space-x-4 border-b pb-4 last:border-0">
                  <div className={`p-2 rounded-full ${n.urgent ? 'bg-red-100' : 'bg-primary/10'}`}>
                    <Bell className={`h-4 w-4 ${n.urgent ? 'text-red-600' : 'text-primary'}`} />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between">
                        <p className="text-sm font-medium leading-none">{n.title}</p>
                        <span className="text-xs text-muted-foreground">{n.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{n.desc}</p>
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
