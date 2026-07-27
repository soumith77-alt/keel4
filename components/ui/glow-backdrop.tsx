import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Ambient depth for DARK sections only: blurred brand-hued orbs plus grain.
 *
 * Renders nothing on the light canvas. A 90px-blurred navy orb at 50% opacity
 * over off-white reads as a smudge, not as depth — and the reference set
 * (BIDATA, Playex) keeps its light surfaces perfectly flat. Rather than make
 * every light-page caller drop the component, it hides itself outside a
 * `.theme-dark` scope, so the same markup works in both.
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
        // Dark bands only — see the note above.
        "hidden [.theme-dark_&]:block",
        grain && "grain-overlay",
        className
      )}
    >
      {variant === "hero" && (
        <>
          <div className="gradient-orb absolute -top-32 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 bg-accent-500/25" />
          <div className="gradient-orb absolute -bottom-40 -left-24 h-[30rem] w-[30rem] bg-accent-500/15" />
          <div className="gradient-orb absolute -right-32 top-1/3 h-[26rem] w-[26rem] bg-accent-500/12" />
        </>
      )}

      {variant === "section" && (
        <div className="gradient-orb absolute -top-24 right-0 h-[28rem] w-[28rem] bg-accent-500/12" />
      )}

      {variant === "corner" && (
        <div className="gradient-orb absolute -bottom-32 -right-20 h-[24rem] w-[24rem] bg-accent-500/15" />
      )}
    </div>
  );
}

export default GlowBackdrop;
