import React from "react";

export const AnimatedGridPattern = ({
  className = "",
  width = 40,
  height = 40,
  x = 0,
  y = 0,
  strokeDasharray = 0,
  numSquares = 50,
  maxOpacity = 0.5,
  duration = 20,
  repeatDelay = 0,
}: {
  className?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number | string;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}) => {
  const id = `grid-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M ${width} 0 L 0 0 0 ${height}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray={strokeDasharray}
            strokeOpacity={maxOpacity}
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${id})`}
        style={{
          animation: `grid ${duration}s linear infinite`,
          animationDelay: `${repeatDelay}s`,
        }}
      />
      <style>{`
        @keyframes grid {
          0% {
            transform: translateY(-${height}px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </svg>
  );
};
