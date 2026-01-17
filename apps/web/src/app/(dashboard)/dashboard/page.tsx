"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/skeleton"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { Bell, FileText, CheckCircle, AlertCircle } from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timeout)
  }, [])

  const stats = [
    { title: "Solicitudes Pendientes", value: 12, icon: AlertCircle, color: "text-yellow-500" },
    { title: "En Revisión", value: 5, icon: FileText, color: "text-blue-500" },
    { title: "Aprobadas (Mes)", value: 8, icon: CheckCircle, color: "text-green-500" },
  ]

  const notifications = [
    { id: 1, title: "Nueva solicitud", desc: "Constructora Atlas ha enviado una solicitud.", time: "Hace 5 min" },
    { id: 2, title: "Documentos actualizados", desc: "Cafetería Luna subió estados financieros.", time: "Hace 1 hora" },
    { id: 3, title: "Solicitud aprobada", desc: "Préstamo #4023 ha sido aprobado por Riesgos.", time: "Hace 3 horas" },
  ]

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-80" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="p-6">
              <Skeleton className="mb-2 h-4 w-32" />
              <Skeleton className="h-8 w-20" />
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-56" />
                  <Skeleton className="h-3 w-72" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <motion.div
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold tracking-tight">Hola, Admin 👋</h1>
        <p className="text-muted-foreground">Aquí está el resumen de la actividad de hoy.</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
        variants={item}
      >
        {stats.map(stat => (
          <motion.div key={stat.title} variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedCounter value={stat.value} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        variants={item}
      >
        <motion.div variants={item} className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map(n => (
                  <motion.div
                    key={n.id}
                    variants={item}
                    className="flex items-start space-x-4 border-b pb-4 last:border-0"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="rounded-full bg-primary/10 p-2">
                      <Bell className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{n.title}</p>
                      <p className="text-sm text-muted-foreground">{n.desc}</p>
                      <p className="pt-1 text-xs text-muted-foreground">{n.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
