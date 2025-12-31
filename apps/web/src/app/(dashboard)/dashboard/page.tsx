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
import { useGetSolicitudes } from '@/hooks/useSolicitudes'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export default function DashboardPage() {
  const { data, isLoading } = useGetSolicitudes({ pageSize: 100 });
  const solicitudes = data?.items || [];

  // Calculate Stats
  const totalSolicitudes = data?.total || 0;
  const totalMonto = solicitudes.reduce((acc, curr) => acc + Number(curr.monto), 0);
  
  const aprobadas = solicitudes.filter(s => s.status === 'APROBADO').length;
  const tasaAprobacion = totalSolicitudes > 0 ? Math.round((aprobadas / totalSolicitudes) * 100) : 0;
  
  const urgentes = solicitudes.filter(s => s.status === 'REVISION').length; // Assuming REVISION needs attention

  const stats = [
    { title: "Solicitudes Totales", value: totalSolicitudes.toString(), icon: FileText, color: "text-blue-500", desc: "Totales registradas" },
    { title: "Monto Total", value: new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', notation: "compact" }).format(totalMonto), icon: DollarSign, color: "text-green-500", desc: "En pipeline" },
    { title: "Tasa Aprobación", value: `${tasaAprobacion}%`, icon: TrendingUp, color: "text-purple-500", desc: "Histórico" },
    { title: "En Revisión", value: urgentes.toString(), icon: AlertCircle, color: "text-red-500", desc: "Requieren atención" },
  ]

  // Calculate Product Data
  const productMap = solicitudes.reduce((acc, curr) => {
    const prod = curr.producto || 'Otro';
    acc[prod] = (acc[prod] || 0) + Number(curr.monto);
    return acc;
  }, {} as Record<string, number>);

  const productData = Object.entries(productMap).map(([name, amount]) => ({ name, amount }));

  // Calculate Status Data
  const statusMap = solicitudes.reduce((acc, curr) => {
    const status = curr.status || 'PENDIENTE';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusColors: Record<string, string> = {
    'PENDIENTE': '#eab308', // yellow-500
    'REVISION': '#3b82f6', // blue-500
    'APROBADO': '#22c55e', // green-500
    'RECHAZADO': '#ef4444', // red-500
  };

  const statusData = Object.entries(statusMap).map(([name, value]) => ({
    name,
    value,
    color: statusColors[name] || '#94a3b8' // slate-400 fallback
  }));

  // Recent Activity (using latest 5 solicitudes)
  const recentActivity = solicitudes.slice(0, 5).map(s => ({
    id: s.id,
    title: `Nueva solicitud: ${s.producto}`,
    desc: `${s.cliente || 'Cliente'} - ${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number(s.monto))}`,
    time: s.createdAt ? formatDistanceToNow(new Date(s.createdAt), { addSuffix: true, locale: es }) : 'Reciente',
    urgent: s.status === 'REVISION'
  }));

  if (isLoading) {
    return <div className="p-8">Cargando dashboard...</div>;
  }

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
                  formatter={(value) => value ? new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number(value)) : ''}
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
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas solicitudes recibidas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? recentActivity.map((n) => (
                <div key={n.id} className="flex items-start space-x-4 border-b pb-4 last:border-0">
                  <div className={`p-2 rounded-full ${n.urgent ? 'bg-blue-100' : 'bg-primary/10'}`}>
                    <Bell className={`h-4 w-4 ${n.urgent ? 'text-blue-600' : 'text-primary'}`} />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between">
                        <p className="text-sm font-medium leading-none">{n.title}</p>
                        <span className="text-xs text-muted-foreground">{n.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{n.desc}</p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground">No hay actividad reciente.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
