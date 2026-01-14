'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useCalculadora } from '@/hooks/useCalculadora';
import { SliderMonto } from './SliderMonto';
import { SliderPlazo } from './SliderPlazo';
import { CardResultado } from './CardResultado';
import { ModalTablaAmortizacion } from './ModalTablaAmortizacion';
import { BotonDescargarPDF } from './BotonDescargarPDF';
import { ShimmerButton, BlurFade } from '@/components/magicui';

export interface CalculadoraCreditoProps {
  montoMinimo?: number;
  montoMaximo?: number;
  plazoMinimo?: number;
  plazoMaximo?: number;
  tasaAnual?: number;
  nombreProducto?: string;
  descripcion?: string;
  mostrarNombre?: boolean;
}

export function CalculadoraCredito({
  montoMinimo = 30000,
  montoMaximo = 10000000,
  plazoMinimo = 3,
  plazoMaximo = 60,
  tasaAnual = 18,
  nombreProducto = 'Crédito CAPITALTA',
  descripcion = 'Calcula tu pago mensual y visualiza la tabla de amortización',
  mostrarNombre = false
}: CalculadoraCreditoProps) {
  const calculadora = useCalculadora({
    montoMinimo,
    montoMaximo,
    plazoMinimo,
    plazoMaximo,
    tasaAnual
  });

  const [modalAbierto, setModalAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleCalcular = async () => {
    setCargando(true);
    // Simular un pequeño delay para mejor UX
    await new Promise((resolve) => setTimeout(resolve, 300));
    calculadora.calcular();
    setCargando(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* Encabezado */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          {nombreProducto}
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          {descripcion}
        </p>
      </div>

      {/* Tarjeta principal */}
      <Card className="border-2 border-teal-200 dark:border-teal-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100/50 dark:from-teal-900/30 dark:to-teal-800/20 border-b border-teal-200 dark:border-teal-800">
          <CardTitle>Calculadora de {nombreProducto}</CardTitle>
          <CardDescription>
            Ajusta los parámetros y calcula tu cuota mensual
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-8 space-y-6">
          {/* Nombre del usuario (opcional) */}
          {mostrarNombre && (
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-base font-semibold">
                Nombre (Opcional)
              </Label>
              <Input
                id="nombre"
                placeholder="Tu nombre completo"
                value={calculadora.nombreUsuario}
                onChange={(e) => calculadora.setNombreUsuario(e.target.value)}
                className="border-teal-200 dark:border-teal-800 focus:ring-teal-500"
              />
            </div>
          )}

          {/* Slider Monto */}
          <SliderMonto
            value={calculadora.monto}
            minimo={montoMinimo}
            maximo={montoMaximo}
            onChange={calculadora.setMonto}
            label="Monto del Crédito"
            descripcion={`Desde ${new Intl.NumberFormat('es-MX', {
              style: 'currency',
              currency: 'MXN',
              minimumFractionDigits: 0
            }).format(montoMinimo)} hasta ${new Intl.NumberFormat('es-MX', {
              style: 'currency',
              currency: 'MXN',
              minimumFractionDigits: 0
            }).format(montoMaximo)}`}
          />

          {/* Slider Plazo */}
          <SliderPlazo
            value={calculadora.plazo}
            minimo={plazoMinimo}
            maximo={plazoMaximo}
            onChange={calculadora.setPlazo}
            label="Plazo del Crédito"
            descripcion={`De ${plazoMinimo} a ${plazoMaximo} meses`}
          />

          {/* Información de tasa */}
          <Card className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                    Tasa Anual
                  </p>
                  <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                    {tasaAnual}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                    Tasa Mensual
                  </p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {(tasaAnual / 12).toFixed(2)}%
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                    Tipo
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    Fija
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botones de acción */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <ShimmerButton
                onClick={handleCalcular}
                disabled={cargando}
                className="w-full text-base h-12 font-semibold"
                background="linear-gradient(135deg, #1c7c77 0%, #2a9f96 100%)"
              >
                {cargando ? 'Calculando...' : 'Calcular'}
              </ShimmerButton>
            </motion.div>

            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button
                onClick={() => setModalAbierto(true)}
                disabled={!calculadora.resultado}
                variant="outline"
                className="w-full border-teal-200 dark:border-teal-800 text-base h-12 font-semibold"
              >
                Ver Tabla
              </Button>
            </motion.div>

            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <BotonDescargarPDF
                resultado={calculadora.resultado}
                nombreUsuario={calculadora.nombreUsuario || 'Usuario'}
                nombreProducto={nombreProducto}
                className="w-full h-12 text-base font-semibold"
              />
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <CardResultado resultado={calculadora.resultado} loading={cargando} />

      {/* Modal de tabla de amortización */}
      <ModalTablaAmortizacion
        open={modalAbierto}
        onOpenChange={setModalAbierto}
        resultado={calculadora.resultado}
        nombreUsuario={calculadora.nombreUsuario || 'Usuario'}
        onDescargarPDF={() => {
          setModalAbierto(false);
        }}
      />
    </div>
  );
}
