"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Pointer-proximity border glow.
 *
 * The glow rides the card's border following the cursor. Implemented with two
 * CSS custom properties written on pointermove — no React state, so it never
 * re-renders while tracking. Restrained brand gradient rather than rainbow.
 */
type GlowCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Inner surface classes (padding, layout). */
  innerClassName?: string;
};

export function GlowCard({ children, className, innerClassName }: GlowCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const handleMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
    },
    []
  );

  return (
    <div
      ref={ref}
      onPointerMove={reduceMotion ? undefined : handleMove}
      className={cn(
        "group/glow relative rounded-card p-px",
        // Border layer: a radial highlight over a faint static border
        "bg-white/[0.08]",
        className
      )}
      style={
        {
          "--glow-x": "50%",
          "--glow-y": "0%",
        } as React.CSSProperties
      }
    >
      {/* The travelling highlight, sits in the 1px padding gap */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-card opacity-0 transition-opacity duration-slow ease-out group-hover/glow:opacity-100"
        style={{
          background:
            "radial-gradient(18rem 18rem at var(--glow-x) var(--glow-y), rgba(139,163,224,0.55), rgba(61,90,160,0.18) 40%, transparent 70%)",
        }}
      />

      <div
        className={cn(
          "relative h-full rounded-card bg-surface-raised",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default GlowCard;
