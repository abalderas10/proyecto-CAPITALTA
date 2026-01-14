import React from "react";

export const BlurFade = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
    variant?: "up" | "down" | "left" | "right";
    duration?: number;
    delay?: number;
    inView?: boolean;
    inViewMargin?: string;
  }
>(
  (
    {
      children,
      className = "",
      variant = "up",
      duration = 0.5,
      delay = 0,
      inView = true,
      inViewMargin = "0px",
    },
    ref
  ) => {
    const [isInView, setIsInView] = React.useState(!inView);

    React.useEffect(() => {
      if (!inView) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.unobserve(entry.target);
            }
          },
          { rootMargin: inViewMargin }
        );

        const element = document.querySelector(`[data-blur-fade="${delay}"]`);
        if (element) observer.observe(element);

        return () => observer.disconnect();
      }
    }, [inView, inViewMargin, delay]);

    const getInitialTransform = () => {
      switch (variant) {
        case "down":
          return "translateY(-10px)";
        case "left":
          return "translateX(-10px)";
        case "right":
          return "translateX(10px)";
        default:
          return "translateY(10px)";
      }
    };

    return (
      <div
        ref={ref}
        className={className}
        data-blur-fade={delay}
        style={{
          animation: isInView
            ? `blurFade ${duration}s ease-out ${delay}s forwards`
            : undefined,
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translate(0, 0)" : getInitialTransform(),
          filter: isInView ? "blur(0px)" : "blur(10px)",
        }}
      >
        {children}
        <style>{`
          @keyframes blurFade {
            0% {
              opacity: 0;
              filter: blur(10px);
              transform: ${getInitialTransform()};
            }
            100% {
              opacity: 1;
              filter: blur(0px);
              transform: translate(0, 0);
            }
          }
        `}</style>
      </div>
    );
  }
);

BlurFade.displayName = "BlurFade";
