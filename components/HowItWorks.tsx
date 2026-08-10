'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';

import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { calendlyLink } from '@/config/content';
import { cn } from '@/lib/utils';

const steps = [
  {
    number: '01',
    title: 'Discovery call',
    description:
      'We map your goals, constraints, and current processes to find where AI actually moves a number, not where it merely looks impressive.',
    state: 'Scoping',
  },
  {
    number: '02',
    title: 'System design',
    description:
      'We design one connected system that fits your stack and your team, with integration points and success metrics agreed up front.',
    state: 'Designing',
  },
  {
    number: '03',
    title: 'Build & deploy',
    description:
      'We build, test, and ship, then stay on to watch the first real traffic and fix what reality disagrees with.',
    state: 'Shipping',
  },
  {
    number: '04',
    title: 'Measure & compound',
    description:
      'We track performance against the metrics we set and keep tuning. Most of the gain arrives after launch, not at it.',
    state: 'Compounding',
  },
];

/**
 * Sticky scroll: one system evolving through four states as you scroll, rather
 * than four equal cards sitting side by side. The left panel pins and updates;
 * the right column drives it.
 */
export default function HowItWorks() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduceMotion) return;
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setActive(next);
  });

  return (
    <Section spacing="lg">
      <div className="grid grid-cols-1 gap-8 sm:gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Pinned system state */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="How it works"
              title="From problem to production"
              lead="A deliberately short path. You should know whether this is working in weeks, not quarters."
            />

            <div className="mt-7 rounded-panel border border-line/15 bg-surface-raised/70 p-6">
              <div className="flex items-baseline justify-between">
                <span className="type-label text-fg-subtle">Current stage</span>
                <span className="font-mono text-xs tabular-nums text-accent-700">
                  {steps[active].number} / {steps[steps.length - 1].number}
                </span>
              </div>

              <motion.p
                key={steps[active].state}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="type-h2 mt-3 text-fg"
              >
                {steps[active].state}
              </motion.p>

              {/* Progress segments */}
              <div className="mt-6 flex gap-1.5">
                {steps.map((s, i) => (
                  <span
                    key={s.number}
                    className="h-1 flex-1 overflow-hidden bg-fg/[0.06]"
                  >
                    <motion.span
                      className="block h-full bg-accent-500"
                      initial={false}
                      animate={{ scaleX: i <= active ? 1 : 0 }}
                      style={{ originX: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                ))}
              </div>
            </div>

            <Button asChild variant="secondary" className="mt-7">
              <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                Start with a call
              </a>
            </Button>
          </div>
        </div>

        {/* Scroll driver */}
        <ol ref={ref} className="relative lg:col-span-7">
          {steps.map((step, index) => (
            <li key={step.number}>
              <motion.div
                initial={false}
                animate={{ opacity: reduceMotion || index <= active ? 1 : 0.7 }}
                transition={{ duration: 0.35 }}
                className={cn(
                  'flex gap-5 border-t border-line/10 py-5 sm:gap-8 sm:py-12',
                  index === active && !reduceMotion && 'border-accent-500/40'
                )}
              >
                <span className="type-label pt-1.5 tabular-nums text-accent-700">
                  {step.number}
                </span>
                <div>
                  <h3 className="type-h4 text-fg">{step.title}</h3>
                  <p className="type-body measure mt-3 text-fg-muted text-pretty">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
