
export interface LoanCalculationParams {
  monto: number;
  plazo: number; // en meses
  tasaAnual: number; // ej: 0.24 para 24%
}

export interface LoanCalculationResult {
  pagoMensual: number;
  totalAPagar: number;
  totalIntereses: number;
}

export function calcularPrestamo(
  { monto, plazo, tasaAnual }: LoanCalculationParams
): LoanCalculationResult {
  if (monto <= 0 || plazo <= 0 || tasaAnual <= 0) {
    return { pagoMensual: 0, totalAPagar: 0, totalIntereses: 0 };
  }

  const tasaMensual = tasaAnual / 12;
  const factor = Math.pow(1 + tasaMensual, plazo);

  // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
  const pagoMensual = (monto * tasaMensual * factor) / (factor - 1);
  const totalAPagar = pagoMensual * plazo;
  const totalIntereses = totalAPagar - monto;

  return { pagoMensual, totalAPagar, totalIntereses };
}
