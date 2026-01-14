import React from "react";

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    shimmerColor?: string;
    shimmerSize?: string;
    borderRadius?: string;
    shimmerDuration?: string;
    background?: string;
  }
>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      borderRadius = "100px",
      shimmerDuration = "3s",
      background = "rgba(28, 124, 119, 0.8)",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`relative inline-flex h-12 w-full items-center justify-center rounded-lg border border-slate-800 bg-slate-950 px-6 font-medium text-white shadow-2xl transition-colors hover:bg-slate-900 ${className}`}
        style={{
          background,
          borderRadius,
        }}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-lg"
          style={{
            borderRadius,
          }}
        >
          <div
            className="absolute inset-0 z-0 animate-shimmer"
            style={{
              background: `linear-gradient(
                90deg,
                transparent,
                ${shimmerColor},
                transparent
              )`,
              backgroundSize: "200% 100%",
              animation: `shimmer ${shimmerDuration} infinite`,
            }}
          />
        </div>
        <span className="relative z-10 flex items-center justify-center">
          {children}
        </span>
        <style>{`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}</style>
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
