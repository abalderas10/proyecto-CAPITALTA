"use client"

import { useRouter } from 'next/navigation'
import { LoanCalculator } from './LoanCalculator'
import { CalculatorConfig } from '@/data/calculatorConfigs'

interface LoanCalculatorWrapperProps {
  config: CalculatorConfig
  redirectPath?: string
}

export function LoanCalculatorWrapper({ config, redirectPath = '/solicitud' }: LoanCalculatorWrapperProps) {
  const router = useRouter()

  const handleApply = (monto: number, plazo: number) => {
    // Save to localStorage so the application form can pick it up
    if (typeof window !== 'undefined') {
      localStorage.setItem('prefilledMonto', monto.toString())
      localStorage.setItem('prefilledPlazo', plazo.toString())
    }
    router.push(redirectPath)
  }

  return <LoanCalculator config={config} onApply={handleApply} />
}
