'use client';
import { CalculatorConfig } from '@/lib/types';

export type { CalculatorConfig };

export const constructoraConfig: CalculatorConfig = {
  title: "Simula tu Crédito Puente",
  minMonto: 500000,
  maxMonto: 20000000,
  defaultMonto: 5000000,
  stepMonto: 100000,
  minPlazo: 12,
  maxPlazo: 48,
  defaultPlazo: 24,
  plazoOptions: [12, 18, 24, 36, 48],
  tasaAnual: 0.22, // Tasa preferencial para constructoras
  ctaText: "Iniciar Solicitud de Crédito Puente",
};

export const pymeConfig: CalculatorConfig = {
  title: "Calcula tu Crédito para Negocio",
  minMonto: 50000,
  maxMonto: 5000000,
  defaultMonto: 250000,
  stepMonto: 10000,
  minPlazo: 6,
  maxPlazo: 36,
  defaultPlazo: 12,
  plazoOptions: [6, 12, 18, 24, 36],
  tasaAnual: 0.28, // Tasa ejemplo para Pymes
  ctaText: "Solicitar Crédito Pyme",
};

export const personaFisicaConfig: CalculatorConfig = {
  title: "Simula tu Préstamo Personal",
  minMonto: 10000,
  maxMonto: 500000,
  defaultMonto: 50000,
  stepMonto: 5000,
  minPlazo: 6,
  maxPlazo: 36,
  defaultPlazo: 12,
  plazoOptions: [6, 12, 18, 24, 36],
  tasaAnual: 0.35, // Tasa ejemplo para Personas Físicas
  ctaText: "Solicitar Préstamo",
};
