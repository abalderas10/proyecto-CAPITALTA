import React from "react";

export const NumberTicker = ({
  value = 100,
  direction = "up",
  delay = 0,
  duration = 2000,
  decimals = 0,
  className = "",
}: {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  decimals?: number;
  className?: string;
}) => {
  const [displayValue, setDisplayValue] = React.useState<number>(
    direction === "up" ? 0 : value
  );

  React.useEffect(() => {
    const startTime = Date.now() + delay;
    const endValue = direction === "up" ? value : 0;
    const startValue = direction === "up" ? 0 : value;

    const updateValue = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      if (progress < 0) {
        requestAnimationFrame(updateValue);
        return;
      }

      const currentValue = startValue + (endValue - startValue) * progress;
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    const frameId = requestAnimationFrame(updateValue);
    return () => cancelAnimationFrame(frameId);
  }, [value, direction, delay, duration]);

  return (
    <span className={className}>
      {displayValue.toFixed(decimals)}
    </span>
  );
};
