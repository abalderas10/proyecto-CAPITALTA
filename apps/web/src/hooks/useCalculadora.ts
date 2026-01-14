'use client';

import { useState, useCallback } from 'react';

export interface AmortizacionCuota {
  cuota: number;
  capital: number;
  interes: number;
  saldo: number;
  fecha: string;
}

export interface ResultadoCalculadora {
  monto: number;
  tasaAnual: number;
  plazo: number;
  pagMensual: number;
  totalInteres: number;
  totalPagado: number;
  amortizacion: AmortizacionCuota[];
}

interface UseCalculadoraProps {
  montoMinimo?: number;
  montoMaximo?: number;
  plazoMinimo?: number;
  plazoMaximo?: number;
  tasaAnual?: number;
}

/**
 * Hook para calcular cuotas, intereses y tabla de amortización
 * Utiliza la fórmula de amortización francesa (PMT - Payment)
 */
export function useCalculadora({
  montoMinimo = 30000,
  montoMaximo = 10000000,
  plazoMinimo = 3,
  plazoMaximo = 60,
  tasaAnual = 18
}: UseCalculadoraProps = {}) {
  const [monto, setMonto] = useState<number>(100000);
  const [plazo, setPlazo] = useState<number>(12);
  const [nombreUsuario, setNombreUsuario] = useState<string>('');
  const [resultado, setResultado] = useState<ResultadoCalculadora | null>(null);

  /**
   * Calcula el pago mensual usando la fórmula PMT (Payment)
   * PMT = P * [r(1 + r)^n] / [(1 + r)^n - 1]
   * Donde:
   * P = Principal (monto)
   * r = Tasa mensual (tasaAnual / 12 / 100)
   * n = Número de períodos (plazo en meses)
   */
  const calcularPMT = useCallback(
    (principal: number, tasaMensual: number, numPeriodos: number): number => {
      if (tasaMensual === 0) {
        return principal / numPeriodos;
      }

      const numerador = tasaMensual * Math.pow(1 + tasaMensual, numPeriodos);
      const denominador = Math.pow(1 + tasaMensual, numPeriodos) - 1;
      return principal * (numerador / denominador);
    },
    []
  );

  /**
   * Genera la tabla de amortización completa
   */
  const generarAmortizacion = useCallback(
    (
      principal: number,
      tasaMensual: number,
      numPeriodos: number
    ): AmortizacionCuota[] => {
      const cuotas: AmortizacionCuota[] = [];
      let saldoRestante = principal;
      const pagMensual = calcularPMT(principal, tasaMensual, numPeriodos);
      const hoy = new Date();

      for (let i = 1; i <= numPeriodos; i++) {
        const interesMes = saldoRestante * tasaMensual;
        const capitalMes = pagMensual - interesMes;
        saldoRestante -= capitalMes;

        // Prevenir saldo negativo por redondeos
        if (saldoRestante < 0) {
          saldoRestante = 0;
        }

        const fecha = new Date(hoy);
        fecha.setMonth(fecha.getMonth() + i);

        cuotas.push({
          cuota: i,
          capital: Math.round(capitalMes * 100) / 100,
          interes: Math.round(interesMes * 100) / 100,
          saldo: Math.round(saldoRestante * 100) / 100,
          fecha: fecha.toLocaleDateString('es-MX', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
        });
      }

      return cuotas;
    },
    [calcularPMT]
  );

  /**
   * Ejecuta el cálculo completo
   */
  const calcular = useCallback(() => {
    if (monto < montoMinimo || monto > montoMaximo) {
      console.warn(
        `Monto fuera de rango. Permitido: ${montoMinimo} - ${montoMaximo}`
      );
      return;
    }

    if (plazo < plazoMinimo || plazo > plazoMaximo) {
      console.warn(
        `Plazo fuera de rango. Permitido: ${plazoMinimo} - ${plazoMaximo}`
      );
      return;
    }

    const tasaMensual = tasaAnual / 12 / 100;
    const pagMensual = calcularPMT(monto, tasaMensual, plazo);
    const totalPagado = pagMensual * plazo;
    const totalInteres = totalPagado - monto;
    const amortizacion = generarAmortizacion(monto, tasaMensual, plazo);

    setResultado({
      monto,
      tasaAnual,
      plazo,
      pagMensual: Math.round(pagMensual * 100) / 100,
      totalInteres: Math.round(totalInteres * 100) / 100,
      totalPagado: Math.round(totalPagado * 100) / 100,
      amortizacion
    });
  }, [
    monto,
    plazo,
    tasaAnual,
    montoMinimo,
    montoMaximo,
    plazoMinimo,
    plazoMaximo,
    calcularPMT,
    generarAmortizacion
  ]);

  return {
    // Estado
    monto,
    plazo,
    nombreUsuario,
    resultado,
    
    // Setters
    setMonto,
    setPlazo,
    setNombreUsuario,
    
    // Métodos
    calcular,
    
    // Límites
    montoMinimo,
    montoMaximo,
    plazoMinimo,
    plazoMaximo,
    tasaAnual
  };
}
