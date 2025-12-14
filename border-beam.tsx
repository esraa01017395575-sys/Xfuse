import { useEffect, useRef } from "react";
import { cn } from "./utils";

interface BorderBeamProps {
  children: React.ReactNode;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  reverse?: boolean;
  initialOffset?: number;
  borderThickness?: number;
  opacity?: number;
  glowIntensity?: number;
  beamBorderRadius?: number;
  pauseOnHover?: boolean;
  speedMultiplier?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function BorderBeam({
  children,
  size = 60,
  duration = 3.2,
  delay = 0,
  colorFrom = "var(--primary, #6a5cff)",
  colorTo = "var(--accent, #ff6db3)",
  reverse = false,
  initialOffset = 0,
  borderThickness = 2,
  opacity = 1,
  glowIntensity = 4,
  beamBorderRadius = 60,
  pauseOnHover = false,
  speedMultiplier = 1.5,
  className,
  style,
  onClick,
}: BorderBeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create the border beam element
    const beam = document.createElement("div");
    beam.className = "border-beam";
    beam.style.cssText = `
      position: absolute;
      top: -${borderThickness}px;
      left: -${borderThickness}px;
      right: -${borderThickness}px;
      bottom: -${borderThickness}px;
      border-radius: ${beamBorderRadius}px;
      padding: ${borderThickness}px;
      background: conic-gradient(
        from ${initialOffset}deg,
        transparent 0deg,
        ${colorFrom} 60deg,
        ${colorTo} 120deg,
        transparent 180deg,
        transparent 360deg
      );
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: xor;
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      animation: border-beam-spin ${duration}s linear infinite ${delay}s;
      opacity: ${opacity};
      filter: blur(${glowIntensity / 4}px);
      pointer-events: none;
      z-index: 0;
    `;

    // Add keyframes if they don't exist
    if (!document.getElementById("border-beam-keyframes")) {
      const style = document.createElement("style");
      style.id = "border-beam-keyframes";
      style.textContent = `
        @keyframes border-beam-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(${reverse ? "-" : ""}360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    // Handle pause on hover
    if (pauseOnHover) {
      const handleMouseEnter = () => {
        beam.style.animationPlayState = "paused";
      };
      const handleMouseLeave = () => {
        beam.style.animationPlayState = "running";
      };
      
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
        if (beam.parentNode) {
          beam.parentNode.removeChild(beam);
        }
      };
    }

    container.appendChild(beam);

    return () => {
      if (beam.parentNode) {
        beam.parentNode.removeChild(beam);
      }
    };
  }, [
    size,
    duration,
    delay,
    colorFrom,
    colorTo,
    reverse,
    initialOffset,
    borderThickness,
    opacity,
    glowIntensity,
    beamBorderRadius,
    pauseOnHover,
    speedMultiplier,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onClick={onClick}
      style={{
        "--primary": "#6a5cff",
        "--secondary": "#38bdf8",
        "--accent": "#ff6db3",
        "--background": "#ffffff",
        ...style,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}