import React from "react";

export const BorderBeam = ({
  className = "",
  size = 300,
  duration = 15,
  delay = 0,
  colorFrom = "#2a9f96",
  colorTo = "#1c7c77",
}: {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] ${className}`}
    >
      <div
        className="absolute inset-0 [mask-image:radial-gradient(farthest-side,white,transparent)]"
        style={{
          animation: `beam ${duration}s infinite`,
          animationDelay: `${delay}s`,
          background: `conic-gradient(from 90deg, ${colorFrom}, ${colorTo}, ${colorFrom})`,
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
      <style>{`
        @keyframes beam {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
