'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Each word completes "We build AI systems that ___" on its own. Keep these
// single words: the slot reserves the width of the longest one, and a two-word
// entry forces the whole headline to reserve an extra line.
const WORDS = ['talk.', 'create.', 'automate.', 'compound.'];
const CYCLE_MS = 2600;

// Longest word reserves the width, so the headline never reflows mid-swap.
const LONGEST = WORDS.reduce((a, b) => (b.length > a.length ? b : a));

type Props = { className?: string };

export default function RotatingHeadlineWord({ className = '' }: Props) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // Static word when motion is reduced — no timer, no transition.
  if (reduceMotion) {
    return <span className={className}>{WORDS[0]}</span>;
  }

  return (
    <span className="relative inline-grid align-bottom">
      {/* Invisible sizer holds the line height stable while words swap. The word
          sits alone on its line, so its width is free to vary. */}
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {LONGEST}
      </span>

      <span className="col-start-1 row-start-1 overflow-hidden text-left">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={WORDS[index]}
            initial={{ opacity: 0, y: '0.4em' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-0.4em' }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className={`inline-block ${className}`}
          >
            {WORDS[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
