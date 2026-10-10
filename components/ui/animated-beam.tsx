'use client';

/**
 * AnimatedBeam — adapted from Magic UI's animated-beam
 * (https://magicui.design/docs/components/animated-beam), MIT License,
 * Copyright (c) Magic UI. https://github.com/magicuidesign/magicui
 *
 * Changes from the original:
 *   · `motion/react` → `framer-motion` (the dependency this repo already has).
 *   · Emerald defaults and a hairline track, per the Keeel tokens.
 *   · Reduced motion: the travelling gradient is not rendered; the track is
 *     drawn at full strength instead, so the connection still reads.
 *   · The beam only animates while its container is on screen.
 *   · Recomputes on window resize as well as container resize, because the
 *     endpoints can move when only the nodes reflow.
 *
 * Path: a quadratic Bézier from the centre of `fromRef` to the centre of
 * `toRef`, both measured relative to `containerRef`.
 */

import { useEffect, useId, useState, type RefObject } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  repeatDelay?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 3.2,
  delay = 0,
  pathColor = '#146C50',
  pathWidth = 2,
  pathOpacity = 0.18,
  gradientStartColor = '#1F8A63',
  gradientStopColor = '#6FD3A5',
  repeatDelay = 0.8,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId();
  const reduceMotion = useReducedMotion();
  const inView = useInView(containerRef as RefObject<Element>, { margin: '0px 0px -10% 0px' });
  const [pathD, setPathD] = useState('');
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Vertical paths need the gradient to run along y, horizontal along x.
  const [vertical, setVertical] = useState(false);

  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const a = fromRef.current;
      const b = toRef.current;
      if (!container || !a || !b) return;

      const c = container.getBoundingClientRect();
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      setSize({ width: c.width, height: c.height });

      const startX = ra.left - c.left + ra.width / 2 + startXOffset;
      const startY = ra.top - c.top + ra.height / 2 + startYOffset;
      const endX = rb.left - c.left + rb.width / 2 + endXOffset;
      const endY = rb.top - c.top + rb.height / 2 + endYOffset;

      setVertical(Math.abs(endY - startY) > Math.abs(endX - startX));
      const controlY = startY - curvature;
      setPathD(`M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`);
    };

    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', update);
    update();
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  const from = reverse ? ['90%', '-10%'] : ['10%', '110%'];
  const to = reverse ? ['100%', '0%'] : ['0%', '100%'];
  const coords = vertical
    ? { x1: ['0%', '0%'], x2: ['0%', '0%'], y1: from, y2: to }
    : { x1: from, x2: to, y1: ['0%', '0%'], y2: ['0%', '0%'] };

  return (
    <svg
      fill="none"
      width={size.width}
      height={size.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn('pointer-events-none absolute left-0 top-0', className)}
      viewBox={`0 0 ${size.width} ${size.height}`}
      aria-hidden
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={reduceMotion ? 0.55 : pathOpacity}
        strokeLinecap="round"
      />
      {!reduceMotion && (
        <>
          <path d={pathD} strokeWidth={pathWidth} stroke={`url(#${id})`} strokeLinecap="round" />
          <defs>
            <motion.linearGradient
              id={id}
              gradientUnits="userSpaceOnUse"
              initial={{ x1: '0%', x2: '0%', y1: '0%', y2: '0%' }}
              animate={inView ? coords : undefined}
              transition={{
                delay,
                duration,
                ease: [0.16, 1, 0.3, 1],
                repeat: Infinity,
                repeatDelay,
              }}
            >
              <stop stopColor={gradientStartColor} stopOpacity="0" />
              <stop stopColor={gradientStartColor} />
              <stop offset="32.5%" stopColor={gradientStopColor} />
              <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </>
      )}
    </svg>
  );
}

export default AnimatedBeam;
