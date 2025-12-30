
import { Check } from 'lucide-react';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export function Stepper({ currentStep, totalSteps, stepTitle }: StepperProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Bar Background */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10" />
        
        {/* Progress Bar Active */}
        <div 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-teal-600 -z-10 transition-all duration-300"
          style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
        />

        {Array.from({ length: totalSteps }).map((_, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-white
                  ${isCompleted ? 'border-teal-600 bg-teal-600 text-white' : ''}
                  ${isCurrent ? 'border-teal-600 text-teal-600 scale-110' : 'border-gray-300 text-gray-400'}
                `}
              >
                {isCompleted ? <Check size={16} /> : <span className="text-xs font-bold">{index + 1}</span>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-4">
        <p className="text-xs font-medium text-teal-600 uppercase tracking-wider">Paso {currentStep + 1} de {totalSteps}</p>
        <h2 className="text-lg font-bold text-gray-900">{stepTitle}</h2>
      </div>
    </div>
  );
}
