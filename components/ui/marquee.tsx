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
  /**
   * `label` is the small mono ticker. `display` is the oversized section
   * divider — one phrase per screen, used to break up the page rhythm.
   */
  size?: "label" | "display";
  /** Index into `items` that renders in the accent green. */
  accentIndex?: number;
};

export function Marquee({
  items,
  className,
  speed = 42,
  reverse = false,
  size = "label",
  accentIndex,
}: MarqueeProps) {
  const track = [...items, ...items];
  const isDisplay = size === "display";

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
        className={cn(
          "flex shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused]",
          isDisplay ? "gap-8 pr-8" : "gap-10 pr-10"
        )}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track.map((item, i) => {
          // accentIndex refers to the source array, so it must survive the
          // duplication that makes the loop seamless.
          const isAccent = accentIndex !== undefined && i % items.length === accentIndex;
          return (
            <span
              key={`${item}-${i}`}
              className={cn(
                "flex shrink-0 items-center whitespace-nowrap",
                isDisplay ? "gap-8" : "gap-10"
              )}
            >
              <span
                className={cn(
                  "transition-colors duration-base",
                  isDisplay
                    ? "type-h1"
                    : "type-label text-fg-subtle group-hover:text-fg-muted",
                  // Green as TEXT is only safe on the navy band. On light this
                  // must stay accent-700. See the contrast rule in tailwind.config.
                  isDisplay && (isAccent ? "text-accent-700" : "text-fg")
                )}
              >
                {item}
              </span>
              <span
                className={cn(
                  "shrink-0 rounded-full",
                  isDisplay ? "h-2.5 w-2.5 bg-accent-500" : "h-1 w-1 bg-accent-500/60"
                )}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default Marquee;
