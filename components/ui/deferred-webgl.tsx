"use client";

import * as React from "react";

/**
 * DEFER EXPENSIVE WEBGL UNTIL IT IS ACTUALLY WANTED.
 *
 * The voice orb is a real shader. It was dynamically imported — so it stayed
 * out of the initial bundle — but it still mounted and compiled the moment the
 * page rendered, on the critical path, which is what put 310ms of blocking
 * time on /services/voice-ai.
 *
 * Three gates, in the order they matter:
 *
 *   1. IN VIEW. Nothing is compiled until the slot is near the viewport.
 *   2. IDLE. Even then it waits for the main thread to be free, so it never
 *      competes with hydration.
 *   3. MOTION PREFERENCE. `prefers-reduced-motion` never mounts it at all —
 *      an animated shader is exactly the kind of continuous motion that
 *      preference exists to switch off.
 *
 * `fallback` holds the space in every case where the shader does not mount, so
 * the layout is identical either way and there is no shift when it arrives.
 * That fallback is the DESIGNED static state — it has to look finished on its
 * own, not like something waiting to load.
 */
export function DeferredWebGL({
  children,
  fallback,
  rootMargin = "200px",
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
  rootMargin?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    let idle: number | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const schedule =
          window.requestIdleCallback ??
          ((cb: () => void) => window.setTimeout(cb, 200));
        idle = schedule(() => setMounted(true)) as unknown as number;
      },
      { rootMargin },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (idle !== null) window.cancelIdleCallback?.(idle);
    };
  }, [rootMargin]);

  return (
    <div ref={ref} className="contents">
      {mounted ? children : fallback}
    </div>
  );
}

export default DeferredWebGL;
