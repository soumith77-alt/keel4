'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

import { Section } from '@/components/ui/section';
import { CountUp } from '@/components/ui/count-up';

/**
 * Thin outcome row. Its job is rhythm — it breaks the page immediately after
 * the hero so the eye doesn't hit two large blocks in a row — and proof.
 *
 * Numeric stats count up on entry; non-numeric ones ("24/7", "2–4") render as
 * static text, since animating a range reads as a glitch rather than a count.
 */
const STATS: {
  value?: number;
  display?: string;
  suffix?: string;
  label: string;
}[] = [
  { display: '2 to 4', suffix: 'wks', label: 'Typical launch window' },
  { display: '24/7', label: 'Agents answering & acting' },
  { value: 80, suffix: '%', label: 'Manual work automated away' },
  { value: 4, label: 'Disciplines under one roof' },
];

export default function ProofStrip() {
  const ref = useRef<HTMLDListElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <Section
      tone="raised"
      spacing="none"
      className="border-y border-white/[0.06] py-10 sm:py-12"
    >
      <dl
        ref={ref}
        className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1.5">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="font-mono text-3xl font-medium tracking-tight text-fg tabular-nums sm:text-4xl">
              {stat.value !== undefined ? (
                <CountUp to={stat.value} start={inView} />
              ) : (
                stat.display
              )}
              {stat.suffix && <span className="text-brand-300">{stat.suffix}</span>}
            </dd>
            <span className="text-xs leading-snug text-fg-subtle sm:text-sm">
              {stat.label}
            </span>
          </div>
        ))}
      </dl>
    </Section>
  );
}
