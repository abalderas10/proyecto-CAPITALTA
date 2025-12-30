import React from 'react';

interface SliderProps {
  id?: string;
  min: number;
  max: number;
  step: number;
  value: number[];
  onValueChange: (value: number[]) => void;
  className?: string;
}

export function Slider({ id, min, max, step, value, onValueChange, className }: SliderProps) {
  const currentValue = value[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange([parseFloat(e.target.value)]);
  };

  // Calculate percentage for background gradient if needed, but simple range is fine for now.
  // We can add a custom track style later.
  
  return (
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={currentValue}
      onChange={handleChange}
      className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 ${className || ''}`}
    />
  );
}
