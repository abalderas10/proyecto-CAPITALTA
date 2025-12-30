'use client';

import { useRouter } from 'next/navigation';
import { LoanCalculator } from './LoanCalculator';
import { CalculatorConfig } from '@/lib/types';

interface LoanCalculatorWrapperProps {
  config: CalculatorConfig;
  redirectPath: string;
}

export function LoanCalculatorWrapper({ config, redirectPath }: LoanCalculatorWrapperProps) {
  const router = useRouter();

  const handleApply = (monto: number, plazo: number) => {
    localStorage.setItem('prefilledMonto', monto.toString());
    localStorage.setItem('prefilledPlazo', plazo.toString());
    router.push(redirectPath);
  };

  return <LoanCalculator config={config} onApply={handleApply} />;
}
