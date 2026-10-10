'use client';

/**
 * BorderTrail — adapted from Motion Primitives
 * (https://motion-primitives.com/docs/border-trail), MIT License,
 * Copyright (c) 2024 ibelick. https://github.com/ibelick/motion-primitives
 *
 * Changes: `motion/react` → `framer-motion`; brand green default; renders
 * nothing under reduced motion (the static border it sits on stays).
 *
 * A small glowing segment travels the element's border via `offset-path`.
 * The parent must be `relative` and have a border radius to inherit.
 */

import { motion, useReducedMotion, type Transition } from 'framer-motion';

import { cn } from '@/lib/utils';

export type BorderTrailProps = {
  className?: string;
  size?: number;
  transition?: Transition;
  style?: React.CSSProperties;
};

export function BorderTrail({ className, size = 60, transition, style }: BorderTrailProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
    >
      <motion.div
        className={cn('absolute aspect-square bg-accent-500', className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          ...style,
        }}
        animate={{ offsetDistance: ['0%', '100%'] }}
        transition={transition ?? { repeat: Infinity, duration: 5, ease: 'linear' }}
      />
    </div>
  );
}

export default BorderTrail;
