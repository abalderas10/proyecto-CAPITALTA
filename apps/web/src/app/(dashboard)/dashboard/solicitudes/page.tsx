"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { useGetSolicitudes } from "@/hooks/useSolicitudes"
import { Spinner } from "@/components/ui/Spinner"
import { useState } from "react"

export default function SolicitudesPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useGetSolicitudes({ page, pageSize: 10 })

  if (isLoading) {
    return <div className="flex justify-center p-10"><Spinner className="h-8 w-8" /></div>
  }

  if (isError) {
    return <div className="text-red-500 p-10">Error al cargar solicitudes.</div>
  }

  return (
    <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Solicitudes</h1>
        </div>
      <DataTable columns={columns} data={data?.items || []} searchKey="cliente" />
    </div>
  )
}
