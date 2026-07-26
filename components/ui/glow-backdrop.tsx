import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Ambient depth for dark sections: blurred brand-hued orbs plus a grain wash.
 *
 * Uses the `.gradient-orb` and `.grain-overlay` classes that were already
 * defined in globals.css but never rendered anywhere.
 *
 * Purely decorative — inert to pointers and hidden from assistive tech.
 */

type GlowBackdropProps = {
  /** Orb placement preset. */
  variant?: "hero" | "section" | "corner";
  /** Overlay film grain for texture. */
  grain?: boolean;
  className?: string;
};

export function GlowBackdrop({
  variant = "section",
  grain = true,
  className,
}: GlowBackdropProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        grain && "grain-overlay",
        className
      )}
    >
      {variant === "hero" && (
        <>
          <div className="gradient-orb absolute -top-32 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 bg-brand-600/60" />
          <div className="gradient-orb absolute -bottom-40 -left-24 h-[30rem] w-[30rem] bg-brand-500/40" />
          <div className="gradient-orb absolute -right-32 top-1/3 h-[26rem] w-[26rem] bg-brand-700/50" />
        </>
      )}

      {variant === "section" && (
        <div className="gradient-orb absolute -top-24 right-0 h-[28rem] w-[28rem] bg-brand-700/35" />
      )}

      {variant === "corner" && (
        <div className="gradient-orb absolute -bottom-32 -right-20 h-[24rem] w-[24rem] bg-brand-600/40" />
      )}
    </div>
  );
}

export default GlowBackdrop;
