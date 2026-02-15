'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = ['Drive', 'Scale', 'Automate', 'Optimize', 'Convert'];
const CYCLE_MS = 2500;

type Props = { className?: string };

export default function RotatingHeadlineWord({ className = 'text-[#253c80]' }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-block min-w-[10ch] align-middle overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`inline-block ${className}`}
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
