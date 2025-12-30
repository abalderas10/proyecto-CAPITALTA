export interface CalculatorConfig {
  title: string;
  minMonto: number;
  maxMonto: number;
  defaultMonto: number;
  stepMonto: number;
  minPlazo: number;
  maxPlazo: number;
  defaultPlazo: number;
  plazoOptions: number[]; // Opciones específicas para el slider de plazo
  tasaAnual: number;
  ctaText: string;
}
