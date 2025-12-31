"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Solicitud = {
  id: string
  cliente: string
  producto: string
  monto: number
  fecha: string
  status: string
}

export const columns: ColumnDef<Solicitud>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "cliente",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "producto",
    header: "Producto",
  },
  {
    accessorKey: "monto",
    header: () => <div className="text-right">Monto</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("monto"))
      const formatted = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
        const status = row.getValue("status") as string
        let variant: "default" | "secondary" | "destructive" | "outline" = "default"
        
        if (status === "Pendiente") variant = "secondary"
        if (status === "En Revisión") variant = "outline"
        if (status === "Aprobada") variant = "default" // or success if available
        if (status === "Rechazada") variant = "destructive"

        return <Badge variant={variant}>{status}</Badge>
    }
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const solicitud = row.original
 
      return (
        <Button variant="ghost" className="h-8 w-8 p-0" asChild>
            <Link href={`/dashboard/solicitudes/${solicitud.id}`}>
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
            </Link>
        </Button>
      )
    },
  },
]
