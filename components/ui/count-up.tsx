"use client";

import * as React from "react";
import { animate, useReducedMotion } from "framer-motion";

/**
 * Counts from 0 to `to` once `start` flips true. Writes straight to the DOM
 * node so the animation doesn't re-render React on every frame.
 *
 * Under prefers-reduced-motion it renders the final value immediately.
 */
type CountUpProps = {
  to: number;
  start?: boolean;
  duration?: number;
  className?: string;
  /** Decimal places to preserve (e.g. 1 for "2.5"). */
  decimals?: number;
};

export function CountUp({
  to,
  start = true,
  duration = 0.9,
  className,
  decimals = 0,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  const format = React.useCallback(
    (v: number) =>
      v.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [decimals]
  );

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduceMotion || !start) {
      el.textContent = format(reduceMotion ? to : 0);
      return;
    }

    // Start near the target and ease hard: a slow ramp parades a series of
    // wrong numbers ("42%", "2") that read as real claims mid-animation.
    const from = to <= 10 ? 0 : Math.round(to * 0.72);
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [to, start, duration, reduceMotion, format]);

  // Server-render the final value so it is present without JS and for crawlers.
  return (
    <span ref={ref} className={className}>
      {format(to)}
    </span>
  );
}

export default CountUp;
