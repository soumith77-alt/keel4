'use client';

/**
 * AnimatedList — adapted from Magic UI
 * (https://magicui.design/docs/components/animated-list), MIT License,
 * Copyright (c) Magic UI. https://github.com/magicuidesign/magicui
 *
 * Changes: `motion/react` → `framer-motion`; items start arriving only once
 * the list is on screen; it runs once and stops on the full list rather than
 * looping; under reduced motion every item is shown at once, unanimated.
 *
 * Children arrive one at a time, newest on top.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

export function AnimatedList({
  children,
  className,
  delay = 1200,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduceMotion = useReducedMotion();
  const items = useMemo(() => React.Children.toArray(children), [children]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion || index >= items.length - 1) return;
    const t = setTimeout(() => setIndex((i) => i + 1), delay);
    return () => clearTimeout(t);
  }, [inView, reduceMotion, index, items.length, delay]);

  const shown = reduceMotion ? items : items.slice(0, index + 1);
  const ordered = [...shown].reverse();

  return (
    <div ref={ref} className={cn('flex flex-col gap-2.5', className)}>
      <AnimatePresence initial={false}>
        {ordered.map((item) => (
          <motion.div
            key={(item as React.ReactElement).key}
            layout={!reduceMotion}
            initial={reduceMotion ? false : { scale: 0.92, opacity: 0, y: -8 }}
            animate={{ scale: 1, opacity: 1, y: 0, originY: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 40 }}
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default AnimatedList;
