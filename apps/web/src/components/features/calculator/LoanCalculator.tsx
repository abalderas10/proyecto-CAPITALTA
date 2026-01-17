"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card"
import { Slider } from "@/components/ui/Slider"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Button } from "@/components/ui/Button"
import { CalculatorConfig } from "@/data/calculatorConfigs"
import { calcularPrestamo } from "@/lib/utils/loanCalculator"
import { useRouter } from "next/navigation"

interface LoanCalculatorProps {
  config: CalculatorConfig
  onApply?: (monto: number, plazo: number) => void
}

export function LoanCalculator({ config, onApply }: LoanCalculatorProps) {
  const router = useRouter()
  const [monto, setMonto] = useState(config.defaultMonto)
  const [plazo, setPlazo] = useState(config.defaultPlazo)
  const [results, setResults] = useState(
    calcularPrestamo({ monto: config.defaultMonto, plazo: config.defaultPlazo, tasaAnual: config.tasaAnual })
  )

  useEffect(() => {
    setResults(calcularPrestamo({ monto, plazo, tasaAnual: config.tasaAnual }))
  }, [monto, plazo, config.tasaAnual])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
    }).format(value)
  }

  const handleMontoChange = (value: number[]) => {
    setMonto(value[0])
  }

  const handlePlazoChange = (value: number[]) => {
    setPlazo(value[0])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""))
    if (value >= config.minMonto && value <= config.maxMonto) {
      setMonto(value)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle className="text-xl text-center">{config.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Monto Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="monto">Monto del Préstamo</Label>
            <div className="relative w-32">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="monto"
                value={monto.toLocaleString()}
                onChange={(e) => {
                   const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                   // Allow typing, but maybe clamp on blur? For now just set state if valid number
                   setMonto(val);
                }}
                onBlur={() => {
                   if(monto < config.minMonto) setMonto(config.minMonto);
                   if(monto > config.maxMonto) setMonto(config.maxMonto);
                }}
                className="pl-6 text-right font-medium"
              />
            </div>
          </div>
          <Slider
            value={[monto]}
            min={config.minMonto}
            max={config.maxMonto}
            step={config.stepMonto}
            onValueChange={handleMontoChange}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatCurrency(config.minMonto)}</span>
            <span>{formatCurrency(config.maxMonto)}</span>
          </div>
        </div>

        {/* Plazo Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="plazo">Plazo (meses)</Label>
            <span className="text-2xl font-bold text-primary">{plazo}</span>
          </div>
          <Slider
             value={[plazo]}
             min={config.minPlazo}
             max={config.maxPlazo}
             step={1} // Step 1 to allow smooth sliding, but we could snap to options if needed
             onValueChange={handlePlazoChange}
             className="py-4"
          />
           <div className="flex justify-between text-xs text-muted-foreground">
            <span>{config.minPlazo} meses</span>
            <span>{config.maxPlazo} meses</span>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-6 pt-6 border-t space-y-4">
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">Pago Mensual Estimado</p>
            <p className="text-4xl font-bold text-primary">{formatCurrency(results.pagoMensual)}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Total a Pagar</p>
              <p className="font-semibold">{formatCurrency(results.totalAPagar)}</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground">Intereses</p>
              <p className="font-semibold">{formatCurrency(results.totalIntereses)}</p>
            </div>
          </div>
          
          <p className="text-xs text-center text-muted-foreground">
            *Tasa de interés anual estimada: {(config.tasaAnual * 100).toFixed(2)}%
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full text-lg h-12" 
          onClick={() => {
            if (onApply) {
              onApply(monto, plazo)
            } else {
              router.push('/solicitud')
            }
          }}
        >
          {config.ctaText}
        </Button>
      </CardFooter>
    </Card>
  )
}
