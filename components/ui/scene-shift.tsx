'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * A scroll-driven scene change between two sections.
 *
 * The page previously relied on entrance reveals and counters for its sense
 * of motion — things fading in as they arrive. The reference sites instead
 * change the COMPOSITION as you scroll: the surface itself moves from one
 * state to another, so sections feel joined rather than stacked.
 *
 * Here a navy plane wipes up over the light canvas as the boundary crosses
 * the viewport, and a hairline of accent green rides its leading edge. It
 * renders as a plain solid band under prefers-reduced-motion.
 */
export default function SceneShift({
  height = 'h-24 sm:h-40',
}: {
  /** Tailwind height classes for the transition zone. */
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // The plane covers 0 → 100% of the band across the crossing.
  const clip = useTransform(
    scrollYProgress,
    [0.15, 0.85],
    ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']
  );
  const lineY = useTransform(scrollYProgress, [0.15, 0.85], ['100%', '0%']);

  if (reduceMotion) {
    return <div className={`-mb-px w-full bg-ink ${height}`} aria-hidden />;
  }

  return (
    // -mb-px: the wipe plane is a clipped layer over a TRANSPARENT wrapper, so
    // the off-white page background sits directly behind it. When the band's
    // box lands on a fractional pixel the bottom edge rasterises as partial
    // coverage and that light background bleeds through as a full-width
    // hairline — measured (71,79,100) against (14,24,54) ink. Overlapping the
    // next section by 1px puts its navy under the seam so nothing can show.
    <div
      ref={ref}
      className={`relative -mb-px w-full overflow-hidden ${height}`}
      aria-hidden
    >
      <motion.div className="absolute inset-0 bg-ink" style={{ clipPath: clip }} />
      <motion.div
        className="absolute inset-x-0 h-px bg-accent-500"
        style={{ top: lineY }}
      />
    </div>
  );
}
