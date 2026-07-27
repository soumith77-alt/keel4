import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Keel wordmark.
 *
 * The letterforms are the ORIGINAL artwork — not retyped in a lookalike UI
 * face. `public/brand-logo-mask.png` is generated from `brand_logo.webp` by
 * converting ink coverage to alpha and trimming the square asset's heavy
 * padding (512x512 → 318x135), so the serif is pixel-identical to the supplied
 * logo, just with the white ground removed.
 *
 * It is applied as a CSS mask over `bg-fg` rather than drawn as an <img>, so
 * the mark inherits the theme foreground: navy on the warm canvas, near-white
 * inside a `.theme-dark` band. That is why it can now sit on the navy footer
 * or CTA, which the previous white-square asset could not.
 *
 * COLOUR NOTE: the source artwork is #1e4a7b — a third navy, one step off the
 * site ink (#0e1836). Tinting via the mask folds it into the single navy the
 * rest of the site uses. To restore the exact original colour instead, drop
 * the mask and render `public/brand-logo.png` (same letterforms, transparent
 * background, original navy) as a plain <img>.
 */

/** Intrinsic aspect of the trimmed artwork: 318 x 135. */
const ASPECT = 318 / 135;

export function Wordmark({
  className,
  showMark = true,
}: {
  className?: string;
  /** Retained for call-site compatibility; the asset is a single lockup. */
  showMark?: boolean;
}) {
  void showMark;

  return (
    <span
      role="img"
      aria-label="Keel"
      className={cn("inline-block h-9 shrink-0 bg-fg", className)}
      style={{
        width: `${9 * 0.25 * ASPECT}rem`,
        WebkitMaskImage: "url(/brand-logo-mask.png)",
        maskImage: "url(/brand-logo-mask.png)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

export default Wordmark;
