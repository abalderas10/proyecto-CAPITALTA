"use client"

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, FileText, Download, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { useGetSolicitudById } from "@/hooks/useSolicitudes"
import { useGetDocumentos } from "@/hooks/useDocumentos"
import { useGetEventos } from "@/hooks/useEventos"
import { Spinner } from "@/components/ui/Spinner"

export default function SolicitudDetailPage({ params }: { params: { id: string } }) {
  const { data: solicitud, isLoading: isLoadingSol } = useGetSolicitudById(params.id)
  const { data: documents, isLoading: isLoadingDocs } = useGetDocumentos(params.id)
  const { data: events, isLoading: isLoadingEvents } = useGetEventos(params.id)

  if (isLoadingSol || isLoadingDocs || isLoadingEvents) {
     return <div className="flex justify-center p-10"><Spinner className="h-8 w-8" /></div>
  }

  if (!solicitud) {
      return <div className="p-10">Solicitud no encontrada</div>
  }

  // Calculate progress based on status (simplified logic)
  const progress = solicitud.status === 'Aprobada' ? 100 : solicitud.status === 'Rechazada' ? 100 : 45

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/solicitudes">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
            </Button>
        </Link>
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Solicitud {solicitud.id}</h1>
            <p className="text-muted-foreground">{solicitud.cliente}</p>
        </div>
        <div className="ml-auto flex gap-2">
            <Badge variant="outline" className="text-lg px-4 py-1">{solicitud.status}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Progreso de la Solicitud</CardTitle>
                    <CardDescription>Estado actual del proceso de evaluación</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Completado</span>
                        <span className="font-bold">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </CardContent>
            </Card>

            <Tabs defaultValue="info">
                <TabsList>
                    <TabsTrigger value="info">Información</TabsTrigger>
                    <TabsTrigger value="docs">Documentos</TabsTrigger>
                    <TabsTrigger value="notes">Notas</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Detalles del Crédito</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Producto</p>
                                <p className="text-lg">{solicitud.producto}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Monto Solicitado</p>
                                <p className="text-lg font-bold">
                                    {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(solicitud.monto)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Fecha de Solicitud</p>
                                <p>{solicitud.fecha}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Plazo Estimado</p>
                                <p>{solicitud.plazo} meses</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="docs" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Documentación</CardTitle>
                            <CardDescription>Documentos subidos por el cliente</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {documents?.map((doc, i) => (
                                    <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 p-2 rounded">
                                                <FileText className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{doc.name}</p>
                                                <p className="text-xs text-muted-foreground">{doc.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {doc.status === "Validado" ? (
                                                <Badge variant="default" className="bg-green-500 hover:bg-green-600"><CheckCircle className="w-3 h-3 mr-1" /> Validado</Badge>
                                            ) : (
                                                <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" /> Pendiente</Badge>
                                            )}
                                            <Button variant="ghost" size="icon">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                {(!documents || documents.length === 0) && (
                                    <div className="text-center text-muted-foreground py-4">No hay documentos disponibles.</div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="notes" className="space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Bitácora</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="space-y-6">
                                {events?.map((note, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs">
                                            {note.user.charAt(0)}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-sm">{note.user}</span>
                                                <span className="text-xs text-muted-foreground">{note.date}</span>
                                            </div>
                                            <p className="text-sm text-gray-700">{note.text}</p>
                                        </div>
                                    </div>
                                ))}
                                {(!events || events.length === 0) && (
                                    <div className="text-center text-muted-foreground py-4">No hay notas en la bitácora.</div>
                                )}
                             </div>
                        </CardContent>
                     </Card>
                </TabsContent>
            </Tabs>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Button className="w-full">Aprobar Solicitud</Button>
                    <Button variant="destructive" className="w-full">Rechazar Solicitud</Button>
                    <Button variant="outline" className="w-full">Solicitar Más Información</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
