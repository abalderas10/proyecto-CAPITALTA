"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { useGetSolicitudes } from "@/hooks/useSolicitudes"
import { Spinner } from "@/components/ui/Spinner"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { useState } from "react"
import Link from "next/link"
import { FileText, Plus } from "lucide-react"

export default function SolicitudesPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, error } = useGetSolicitudes({ page, pageSize: 10 })
  const solicitudes = data?.items || []

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Solicitudes</h1>
          <p className="text-muted-foreground">Gestiona tus solicitudes de crédito</p>
        </div>
        <div className="flex justify-center p-10">
          <Spinner className="h-8 w-8" />
        </div>
      </div>
    )
  }

  if (isError) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al cargar solicitudes'
    console.error('Error loading solicitudes:', error)

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Solicitudes</h1>
          <p className="text-muted-foreground">Gestiona tus solicitudes de crédito</p>
        </div>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-red-700">
              <p className="font-semibold">Error al cargar solicitudes</p>
              <p className="text-sm mt-2">{errorMessage}</p>
              <p className="text-xs mt-3 text-red-600">
                Verifica tu conexión a internet o intenta recargar la página.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </Button>
        </div>
      </div>
    )
  }

  // Estado vacío - sin solicitudes
  if (solicitudes.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Solicitudes</h1>
          <p className="text-muted-foreground">Gestiona tus solicitudes de crédito</p>
        </div>

        <Card className="border-2 border-dashed">
          <CardHeader className="text-center pt-12">
            <div className="mx-auto mb-4">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Aún no has iniciado ninguna solicitud</CardTitle>
            <CardDescription className="mt-2 text-base">
              Crea una nueva solicitud de crédito para empezar. Puedes guardar y continuar más tarde.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-12">
            <div className="flex justify-center">
              <Link href="/solicitud">
                <Button size="lg" className="gap-2">
                  <Plus className="h-5 w-5" />
                  Iniciar Nueva Solicitud
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>¿Cómo funciona?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                    1
                  </div>
                </div>
                <div>
                  <p className="font-medium">Inicia tu solicitud</p>
                  <p className="text-sm text-muted-foreground">Completa el formulario con tus datos básicos</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                    2
                  </div>
                </div>
                <div>
                  <p className="font-medium">Adjunta documentos</p>
                  <p className="text-sm text-muted-foreground">Sube los documentos requeridos para tu solicitud</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                    3
                  </div>
                </div>
                <div>
                  <p className="font-medium">Envía tu solicitud</p>
                  <p className="text-sm text-muted-foreground">Envía tu solicitud para que sea revisada por nuestro equipo</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                    4
                  </div>
                </div>
                <div>
                  <p className="font-medium">Recibe respuesta</p>
                  <p className="text-sm text-muted-foreground">Te notificaremos el estado de tu solicitud por email</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Vista con solicitudes
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Solicitudes</h1>
          <p className="text-muted-foreground">Tienes {solicitudes.length} solicitud(es)</p>
        </div>
        <Link href="/solicitud">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nueva Solicitud
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={solicitudes} searchKey="cliente" />
    </div>
  )
}
