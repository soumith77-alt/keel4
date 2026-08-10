'use client';

import * as React from 'react';

/**
 * Magnetic pull on the primary CTA. One instance on the page, deliberately.
 *
 * The constraints are what keep this from being a gimmick:
 *   · POINTER DEVICES ONLY. Gated on `(hover: hover) and (pointer: fine)`, so
 *     it never runs on a touch screen where there is no cursor to attract.
 *   · SMALL. The button moves at most `strength` px — 6 by default. The target
 *     stays under the cursor; this reads as weight, not as the button dodging.
 *   · REDUCED MOTION DISABLES IT. It is decorative feedback and nothing depends
 *     on it.
 *   · TRANSFORM ONLY. No layout property is touched, so it cannot reflow the
 *     row it sits in.
 */
export default function MagneticButton({
  children,
  strength = 6,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const fine = window.matchMedia?.('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    setEnabled(Boolean(fine?.matches) && !reduced?.matches);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !enabled) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    el.style.transform = `translate(${(dx * strength).toFixed(2)}px, ${(dy * strength).toFixed(2)}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = '';
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={className}
      style={{
        display: 'inline-block',
        transition: 'transform 220ms cubic-bezier(0.32, 0.72, 0, 1)',
        willChange: enabled ? 'transform' : undefined,
      }}
    >
      {children}
    </span>
  );
}
