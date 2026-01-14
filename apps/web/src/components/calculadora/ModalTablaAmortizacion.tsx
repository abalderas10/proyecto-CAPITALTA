'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ResultadoCalculadora } from '@/hooks/useCalculadora';
import { Download } from 'lucide-react';

interface ModalTablaAmortizacionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resultado: ResultadoCalculadora | null;
  nombreUsuario?: string;
  onDescargarPDF?: () => void;
}

export function ModalTablaAmortizacion({
  open,
  onOpenChange,
  resultado,
  nombreUsuario = 'Usuario',
  onDescargarPDF
}: ModalTablaAmortizacionProps) {
  const formatoCurrency = (valor: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(valor);
  };

  if (!resultado) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Tabla de Amortización
            {nombreUsuario && <span className="text-lg font-normal text-slate-600 dark:text-slate-400"> - {nombreUsuario}</span>}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-4 text-sm">
          <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded">
            <p className="text-slate-600 dark:text-slate-400">Monto</p>
            <p className="font-bold text-teal-600 dark:text-teal-400">
              {formatoCurrency(resultado.monto)}
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded">
            <p className="text-slate-600 dark:text-slate-400">Plazo</p>
            <p className="font-bold text-orange-600 dark:text-orange-400">
              {resultado.plazo} meses
            </p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded">
            <p className="text-slate-600 dark:text-slate-400">Cuota Mensual</p>
            <p className="font-bold text-emerald-600 dark:text-emerald-400">
              {formatoCurrency(resultado.pagMensual)}
            </p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
            <p className="text-slate-600 dark:text-slate-400">Total Intereses</p>
            <p className="font-bold text-red-600 dark:text-red-400">
              {formatoCurrency(resultado.totalInteres)}
            </p>
          </div>
        </div>

        <ScrollArea className="flex-1 border rounded-lg">
          <div className="p-4">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800 border-b">
                <tr>
                  <th className="text-left p-2 font-semibold">Cuota</th>
                  <th className="text-right p-2 font-semibold">Fecha</th>
                  <th className="text-right p-2 font-semibold">Pago</th>
                  <th className="text-right p-2 font-semibold">Capital</th>
                  <th className="text-right p-2 font-semibold">Interés</th>
                  <th className="text-right p-2 font-semibold">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {resultado.amortizacion.map((fila, idx) => (
                  <tr
                    key={idx}
                    className={
                      idx % 2 === 0
                        ? 'bg-white dark:bg-slate-900/50'
                        : 'bg-slate-50 dark:bg-slate-800/30'
                    }
                  >
                    <td className="p-2">{fila.cuota}</td>
                    <td className="text-right p-2 text-slate-600 dark:text-slate-400">
                      {fila.fecha}
                    </td>
                    <td className="text-right p-2 font-medium">
                      {formatoCurrency(resultado.pagMensual)}
                    </td>
                    <td className="text-right p-2 text-emerald-600 dark:text-emerald-400">
                      {formatoCurrency(fila.capital)}
                    </td>
                    <td className="text-right p-2 text-orange-600 dark:text-orange-400">
                      {formatoCurrency(fila.interes)}
                    </td>
                    <td className="text-right p-2 font-semibold text-teal-600 dark:text-teal-400">
                      {formatoCurrency(fila.saldo)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>

        <div className="flex gap-2 mt-4">
          <Button
            onClick={onDescargarPDF}
            className="bg-teal-600 hover:bg-teal-700 text-white flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            Descargar PDF
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
