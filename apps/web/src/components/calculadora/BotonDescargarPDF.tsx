'use client';

import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ResultadoCalculadora } from '@/hooks/useCalculadora';

interface BotonDescargarPDFProps {
  resultado: ResultadoCalculadora | null;
  nombreUsuario?: string;
  nombreProducto?: string;
  onClick?: () => void;
  className?: string;
}

export function BotonDescargarPDF({
  resultado,
  nombreUsuario = 'Usuario',
  nombreProducto = 'Capitalta',
  onClick,
  className
}: BotonDescargarPDFProps) {
  const descargarPDF = () => {
    if (!resultado) return;

    try {
      // Crear documento PDF
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPosition = 15;

      // Encabezado
      doc.setFontSize(20);
      doc.setTextColor(28, 124, 119); // Teal color
      doc.text('TABLA DE AMORTIZACIÓN', pageWidth / 2, yPosition, {
        align: 'center'
      });

      yPosition += 10;

      // Información del cliente
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Cliente: ${nombreUsuario}`, 15, yPosition);
      yPosition += 5;
      doc.text(`Producto: ${nombreProducto}`, 15, yPosition);
      yPosition += 7;

      // Resumen financiero
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('RESUMEN FINANCIERO', 15, yPosition);
      yPosition += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);

      const formatoCurrency = (valor: number) => {
        return new Intl.NumberFormat('es-MX', {
          style: 'currency',
          currency: 'MXN'
        }).format(valor);
      };

      const resumenData = [
        ['Monto del Crédito', formatoCurrency(resultado.monto)],
        ['Plazo', `${resultado.plazo} meses`],
        ['Tasa de Interés Anual', `${resultado.tasaAnual}%`],
        ['Pago Mensual', formatoCurrency(resultado.pagMensual)],
        ['Total de Intereses', formatoCurrency(resultado.totalInteres)],
        ['Total a Pagar', formatoCurrency(resultado.totalPagado)]
      ];

      const col1Width = pageWidth - 50;
      let currentY = yPosition;

      resumenData.forEach(([label, value]) => {
        doc.text(label, 15, currentY);
        doc.text(value, pageWidth - 15, currentY, { align: 'right' });
        currentY += 5;
      });

      yPosition = currentY + 5;

      // Tabla de amortización
      const tableData = resultado.amortizacion.map((row) => [
        row.cuota.toString(),
        row.fecha,
        formatoCurrency(resultado.pagMensual),
        formatoCurrency(row.capital),
        formatoCurrency(row.interes),
        formatoCurrency(row.saldo)
      ]);

      autoTable(doc, {
        startY: yPosition,
        head: [['Cuota', 'Fecha', 'Pago', 'Capital', 'Interés', 'Saldo']],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: [28, 124, 119],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 9
        },
        bodyStyles: {
          fontSize: 8
        },
        alternateRowStyles: {
          fillColor: [240, 255, 254]
        },
        columnStyles: {
          0: { halign: 'center' },
          1: { halign: 'center' },
          2: { halign: 'right' },
          3: { halign: 'right' },
          4: { halign: 'right' },
          5: { halign: 'right' }
        },
        margin: { left: 15, right: 15 },
        didDrawPage: (data) => {
          // Pie de página
          const pageCount = doc.getNumberOfPages();
          doc.setFontSize(8);
          doc.setTextColor(150, 150, 150);
          doc.text(
            `Página ${data.pageNumber} de ${pageCount}`,
            pageWidth / 2,
            pageHeight - 10,
            { align: 'center' }
          );

          // Pie de página con fecha
          const today = new Date().toLocaleDateString('es-MX');
          doc.text(
            `Generado el: ${today}`,
            15,
            pageHeight - 10
          );
        }
      });

      // Descargar
      const filename = `tabla-amortizacion-${nombreProducto.toLowerCase()}-${Date.now()}.pdf`;
      doc.save(filename);

      if (onClick) onClick();
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Hubo un error al generar el PDF. Por favor, intenta de nuevo.');
    }
  };

  return (
    <Button
      onClick={descargarPDF}
      disabled={!resultado}
      className={`bg-teal-600 hover:bg-teal-700 text-white ${className}`}
    >
      <Download className="w-4 h-4 mr-2" />
      Descargar PDF
    </Button>
  );
}
