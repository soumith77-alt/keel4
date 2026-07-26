"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal ticker. The track is duplicated and translated -50%, so
 * the loop is seamless. Pauses under prefers-reduced-motion via the global
 * animation override in globals.css.
 */
type MarqueeProps = {
  items: string[];
  className?: string;
  /** Seconds for one full pass. */
  speed?: number;
  reverse?: boolean;
};

export function Marquee({
  items,
  className,
  speed = 42,
  reverse = false,
}: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        // Fade the ends so items don't pop at the edges
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
      aria-hidden
    >
      <div
        className="flex shrink-0 items-center gap-10 pr-10 animate-marquee group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-10 whitespace-nowrap"
          >
            <span className="type-label text-fg-subtle transition-colors duration-base group-hover:text-fg-muted">
              {item}
            </span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-brand-500/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
