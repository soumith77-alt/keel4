import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Keeel wordmark.
 *
 * The letterforms are the ORIGINAL artwork — not retyped in a lookalike UI
 * face. `public/brand-logo-mask.png` is generated from `brand_logo.webp` by
 * converting ink coverage to alpha and trimming the square asset's heavy
 * padding (512x512 → 318x135), so the serif is pixel-identical to the supplied
 * logo, just with the white ground removed.
 *
 * It is applied as a CSS mask over `bg-fg` rather than drawn as an <img>, so
 * the mark inherits the theme foreground: #0e1836 ink on the light page,
 * near-white on the dark surface.
 *
 * COLOUR NOTE: the source artwork is navy (#1e4a7b). Tinting via the mask
 * folds it into the site ink. To restore the original colour, render
 * `public/brand-logo.png` (same letterforms, transparent background) as an
 * <img> instead. Width follows from the height via `aspect-ratio`.
 *
 * SPELLING: the mark reads "keeel", three e's. The site text and the artwork
 * disagreed for one commit — the copy was renamed before the logo existed —
 * and both now match. If either is ever changed again, change the other in
 * the same commit: a wordmark that contradicts the <title> is worse than
 * either spelling on its own.
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
      aria-label="Keeel"
      className={cn("inline-block h-9 shrink-0 bg-fg", className)}
      style={{
        aspectRatio: ASPECT,
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
