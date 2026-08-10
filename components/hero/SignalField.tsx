'use client';

import { useEffect, useRef } from 'react';

/**
 * THE SIGNAL FIELD — the hero's environment.
 *
 * A topographic contour field, drawn on a 2D canvas. It replaces two things
 * from the previous hero at once: the 96px light grid and the pale green
 * radial glow. Both were generic; this is neither decoration nor a mood — the
 * field DEFORMS around the currently active signal node, so the atmosphere is
 * reporting where the system's attention is.
 *
 * WHY NOT A SHADER. `ogl` is already a dependency and a fragment shader was
 * the obvious answer. Canvas 2D wins on every axis that matters here:
 *   · no shader compile on the critical path, and no WebGL-unavailable branch
 *     to design a fallback for — it simply cannot fail that way;
 *   · roughly a third of the cost of a full-viewport fragment shader on
 *     integrated mobile GPUs, because it draws ~40 polylines rather than
 *     shading every pixel every frame;
 *   · contour lines read as survey/technical, which is the brand. A blurred
 *     gradient reads as every AI landing page shipped since 2023.
 *
 * COST CONTROL, in order of how much each saves:
 *   · the loop is gated on being onscreen AND on a foreground tab;
 *   · `prefers-reduced-motion` paints exactly one static frame and stops —
 *     the composition is identical, it just does not breathe;
 *   · line count and resolution drop on small viewports;
 *   · devicePixelRatio is capped at 2 (a 3x phone would triple the fill cost
 *     for a difference nobody can see on a 1px hairline).
 */

type Props = {
  /** Where the signal currently is, in 0–1 stage coordinates. */
  focus: { x: number; y: number };
  className?: string;
};

/** Cheap value noise — deterministic, no dependency, good enough for terrain. */
function noise(x: number, y: number, t: number) {
  return (
    Math.sin(x * 1.7 + t * 0.31) * 0.5 +
    Math.sin(y * 2.3 - t * 0.24) * 0.35 +
    Math.sin((x + y) * 1.1 + t * 0.17) * 0.28 +
    Math.sin((x - y) * 2.9 - t * 0.11) * 0.16
  );
}

export default function SignalField({ focus, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Read through a ref so a focus change never re-runs the effect and
  // restarts the animation — the field should glide to the new node, not jump.
  const focusRef = useRef(focus);
  focusRef.current = focus;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let raf: number | null = null;
    let t = 0;
    let w = 0;
    let h = 0;
    // The drawn focus trails the target, so switching service state pulls the
    // terrain across rather than teleporting it.
    let fx = focus.x;
    let fy = focus.y;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (w === 0 || h === 0) return;

      /**
       * BUDGET. At 38 lines × 16px sampling this traced ~3,400 points per
       * frame with four sin() calls each — roughly 13,000 trig operations,
       * sixty times a second, on the critical path during load. It measured
       * 300ms of total blocking time.
       *
       * 26 lines × 26px sampling is ~1,400 points, and paired with the 30fps
       * cap below it costs roughly a fifth of the original. The field looks
       * the same: these are 1px hairlines drifting slowly, and neither the
       * extra density nor the extra frames were visible.
       */
      const narrow = w < 720;
      const lines = narrow ? 18 : 26;
      const step = narrow ? 34 : 26; // horizontal sampling resolution
      const target = focusRef.current;
      fx += (target.x - fx) * 0.045;
      fy += (target.y - fy) * 0.045;

      const cx = fx * w;
      const cy = fy * h;
      // Deformation reach, in px. Beyond this the terrain is flat.
      const reach = Math.max(w, h) * 0.42;

      for (let i = 0; i < lines; i++) {
        const p = i / (lines - 1);
        const baseY = p * h;

        ctx.beginPath();
        for (let x = -step; x <= w + step; x += step) {
          // Terrain height at this point.
          const n = noise(x / 260, baseY / 200, t);

          // Pull toward the active node: a smooth falloff bump that lifts the
          // contours around wherever the signal currently is.
          const dx = x - cx;
          const dy = baseY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pull = Math.max(0, 1 - dist / reach);
          const bump = pull * pull * (3 - 2 * pull); // smoothstep

          const y = baseY + n * 14 - bump * 58;
          if (x === -step) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Lines nearer the active node are brighter and pick up the accent.
        const rowDist = Math.abs(baseY - cy) / (h * 0.55);
        const heat = Math.max(0, 1 - rowDist);
        const alpha = 0.05 + heat * 0.16;
        ctx.strokeStyle =
          heat > 0.45
            ? `rgba(0, 199, 118, ${(alpha * (heat - 0.45) * 2.2).toFixed(3)})`
            : `rgba(150, 173, 214, ${alpha.toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    // 30fps cap. The terrain drifts slowly enough that the intermediate
    // frames are not perceivable, and halving the draw count halves the cost.
    const FRAME_MS = 1000 / 30;
    let last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      t += 0.0084; // doubled, so the drift speed is unchanged at half the rate
      draw();
    };

    resize();
    draw();

    let onscreen = false;
    const stop = () => {
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    };
    const sync = () => {
      const run =
        !reduced && onscreen && document.visibilityState === 'visible';
      if (run && raf === null) raf = requestAnimationFrame(loop);
      if (!run) stop();
    };

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver === 'undefined') {
      onscreen = true;
      sync();
    } else {
      io = new IntersectionObserver(
        ([entry]) => {
          onscreen = entry.isIntersecting;
          sync();
        },
        { threshold: 0 },
      );
      io.observe(canvas);
    }
    document.addEventListener('visibilitychange', sync);

    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener('resize', onResize);

    return () => {
      stop();
      io?.disconnect();
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('resize', onResize);
    };
    // `focus` is intentionally not a dependency — see focusRef above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
