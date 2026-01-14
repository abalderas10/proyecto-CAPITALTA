'use client';

import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ResultadoCalculadora } from '@/hooks/useCalculadora';
import { NumberTicker, BorderBeam, BlurFade } from '@/components/magicui';

interface CardResultadoProps {
  resultado: ResultadoCalculadora | null;
  loading?: boolean;
}

export function CardResultado({ resultado, loading = false }: CardResultadoProps) {
  const formatoCurrency = (valor: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(valor);
  };

  if (!resultado && !loading) {
    return (
      <Card className="border-2 border-dashed border-teal-300 dark:border-teal-700 bg-teal-50/30 dark:bg-teal-900/10">
        <CardContent className="pt-8">
          <p className="text-center text-slate-600 dark:text-slate-400">
            Ajusta los valores y haz clic en "Calcular" para ver los resultados
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-8">
          <div className="space-y-4">
            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const tasaEfectiva = resultado ? ((resultado.totalInteres / resultado.monto) * 100).toFixed(2) : '0';

  if (!resultado) {
    return null;
  }

  const resultadoSafe: ResultadoCalculadora = resultado;

  return (
    <div className="space-y-4">
      <Card className="border-teal-200 dark:border-teal-800 shadow-lg relative overflow-hidden">
        <BorderBeam colorFrom="#2a9f96" colorTo="#1c7c77" size={300} duration={15} />
        <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100/50 dark:from-teal-900/30 dark:to-teal-800/20 relative z-10">
          <CardTitle className="text-teal-900 dark:text-teal-100">
            Pago Mensual
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 relative z-10">
          <div className="text-center">
            <p className="text-5xl font-bold text-teal-600 dark:text-teal-400 mb-2">
              $<NumberTicker value={Math.floor(resultadoSafe.pagMensual)} duration={1000} />
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Cuota fija cada mes durante {resultadoSafe.plazo} meses
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <BlurFade delay={0.2} variant="up">
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Card className="h-full cursor-pointer hover:shadow-lg">
              <CardContent className="pt-6">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Monto
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {formatoCurrency(resultadoSafe.monto)}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </BlurFade>

        <BlurFade delay={0.3} variant="up">
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Card className="h-full cursor-pointer hover:shadow-lg">
              <CardContent className="pt-6">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Plazo
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {resultadoSafe.plazo} meses
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </BlurFade>

        <BlurFade delay={0.4} variant="up">
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Card className="h-full cursor-pointer hover:shadow-lg">
              <CardContent className="pt-6">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Intereses
                </p>
                <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {formatoCurrency(resultadoSafe.totalInteres)}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </BlurFade>

        <BlurFade delay={0.5} variant="up">
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Card className="h-full cursor-pointer hover:shadow-lg">
              <CardContent className="pt-6">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Total a Pagar
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {formatoCurrency(resultadoSafe.totalPagado)}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </BlurFade>
      </div>

      <Card className="border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-900/10">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                Tasa Anual
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {resultadoSafe.tasaAnual}%
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                Tasa Efectiva
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {tasaEfectiva}%
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                Costo Total
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                +{tasaEfectiva}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
