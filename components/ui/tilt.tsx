'use client';

/**
 * Tilt — adapted from Motion Primitives
 * (https://motion-primitives.com/docs/tilt), MIT License,
 * Copyright (c) 2024 ibelick. https://github.com/ibelick/motion-primitives
 *
 * Changes: `motion/react` → `framer-motion`; a gentle default (4°) and a
 * soft spring; inert for touch input and under reduced motion, so the
 * content is simply flat there.
 */

import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionStyle,
  type SpringOptions,
} from 'framer-motion';

export type TiltProps = {
  children: React.ReactNode;
  className?: string;
  style?: MotionStyle;
  rotationFactor?: number;
  springOptions?: SpringOptions;
};

export function Tilt({
  children,
  className,
  style,
  rotationFactor = 4,
  springOptions = { stiffness: 160, damping: 22, mass: 0.6 },
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, springOptions);
  const ySpring = useSpring(y, springOptions);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [rotationFactor, -rotationFactor]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-rotationFactor, rotationFactor]);
  const transform = useMotionTemplate`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduceMotion ? style : { transformStyle: 'preserve-3d', ...style, transform }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

export default Tilt;
