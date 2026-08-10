"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-entrance primitives.
 *
 * Deliberately CSS-driven rather than Framer-driven. Framer's `initial` prop
 * writes `opacity: 0` into the server-rendered HTML, which means a JS failure,
 * a blocked bundle, or an IntersectionObserver that never fires leaves the page
 * blank. Here the hidden state lives behind `html.js` (set before first paint)
 * and is removed by adding `.is-visible`.
 *
 * Three independent safety nets guarantee content appears:
 *   1. No `js` class (JS disabled/failed) → never hidden at all.
 *   2. No IntersectionObserver support → revealed immediately on mount.
 *   3. Observer present but never fires → revealed by a timeout backstop.
 */

const FALLBACK_MS = 1200;

function useRevealOnView<T extends HTMLElement>(delayMs = 0) {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeout: ReturnType<typeof setTimeout> | null = null;
    const show = () => el.classList.add("is-visible");

    // Safety net 2: no observer support at all.
    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          observer.disconnect();
          if (timeout) clearTimeout(timeout);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );
    observer.observe(el);

    // Safety net 3: reveal regardless if the observer never reports.
    timeout = setTimeout(show, FALLBACK_MS + delayMs);

    return () => {
      observer.disconnect();
      if (timeout) clearTimeout(timeout);
    };
  }, [delayMs]);

  return ref;
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Entrance delay in seconds (kept small above the fold). */
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const delayMs = Math.round(delay * 1000);
  const ref = useRevealOnView<HTMLDivElement>(delayMs);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Clip-path reveal — the same three safety nets as <Reveal>, a different
 * gesture. Used for project imagery so the work chapters do not enter the page
 * with the identical fade-up as everything else.
 */
export function ClipReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRevealOnView<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("clip-reveal", className)}>
      {children}
    </div>
  );
}

type RevealGroupProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child's entrance. */
  stagger?: number;
};

/**
 * Staggers direct children by index. The children opt in by rendering
 * <RevealItem>, which reads its stagger position from a context value.
 */
const StaggerContext = React.createContext(0.05);

export function RevealGroup({
  children,
  className,
  stagger = 0.05,
}: RevealGroupProps) {
  return (
    <StaggerContext.Provider value={stagger}>
      <div className={className}>
        {React.Children.map(children, (child, i) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<{ index?: number }>, {
                index: i,
              })
            : child
        )}
      </div>
    </StaggerContext.Provider>
  );
}

export function RevealItem({
  children,
  className,
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  const stagger = React.useContext(StaggerContext);
  // Cap the cumulative delay so late items never sit hidden for long.
  const delayMs = Math.min(Math.round(index * stagger * 1000), 320);
  const ref = useRevealOnView<HTMLDivElement>(delayMs);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* Legacy aliases — keeps older imports compiling. */
export const AnimatedSection = Reveal;
export const StaggerContainer = RevealGroup;
export const StaggerItem = RevealItem;
