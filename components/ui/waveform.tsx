"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Canvas voice waveform. Deliberately not WebGL — this is a 2D bar meter that
 * costs almost nothing, so it can sit above the fold alongside other motion.
 *
 * `active` drives amplitude: idle renders a low flat murmur, active renders a
 * speaking envelope. Under prefers-reduced-motion it paints one static frame.
 */
type WaveformProps = {
  active?: boolean;
  className?: string;
  bars?: number;
  color?: string;
  idleColor?: string;
};

export function Waveform({
  active = true,
  className,
  bars = 44,
  color = "#00c776",
  idleColor = "#0e1836",
}: WaveformProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const activeRef = React.useRef(active);
  activeRef.current = active;
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number | null = null;
    let t = 0;
    // Per-bar phase offsets give the envelope an organic, non-uniform shape.
    const phases = Array.from({ length: bars }, (_, i) => i * 0.55 + Math.sin(i) * 2);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const gap = 3;
      const barW = Math.max(1.5, (width - gap * (bars - 1)) / bars);
      const mid = height / 2;
      const isActive = activeRef.current;

      for (let i = 0; i < bars; i++) {
        // Taper the ends so the waveform fades rather than cutting off.
        const edge = Math.sin((i / (bars - 1)) * Math.PI);
        const wobble =
          Math.sin(t * 0.06 + phases[i]) * 0.5 +
          Math.sin(t * 0.11 + phases[i] * 1.7) * 0.5;
        const amp = isActive ? 0.32 + wobble * 0.68 : 0.08 + wobble * 0.06;
        const h = Math.max(2, Math.abs(amp) * edge * height * 0.85);

        ctx.fillStyle = isActive ? color : idleColor;
        ctx.globalAlpha = isActive ? 0.55 + edge * 0.45 : 0.4;
        const x = i * (barW + gap);
        ctx.beginPath();
        ctx.roundRect(x, mid - h / 2, barW, h, barW / 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      t += 1;
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    draw();

    /**
     * Gate the loop on being both onscreen and on a foreground tab. Without
     * this the canvas repainted 60 times a second for the entire life of the
     * page — including while scrolled past and while the tab sat in the
     * background — which is exactly the kind of cost that shows up as a
     * Lighthouse regression and as battery drain on a phone.
     */
    let onscreen = false;
    const stop = () => {
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    };
    const sync = () => {
      const shouldRun =
        !reduceMotion && onscreen && document.visibilityState === "visible";
      if (shouldRun && raf === null) raf = requestAnimationFrame(loop);
      if (!shouldRun) stop();
    };

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver === "undefined") {
      onscreen = true;
      sync();
    } else {
      io = new IntersectionObserver(
        ([entry]) => {
          onscreen = entry.isIntersecting;
          sync();
        },
        { threshold: 0 },
      );
      io.observe(canvas);
    }
    document.addEventListener("visibilitychange", sync);

    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io?.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", onResize);
    };
  }, [bars, color, idleColor, reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("h-full w-full", className)}
    />
  );
}

export default Waveform;
