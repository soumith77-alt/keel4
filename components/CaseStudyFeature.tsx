'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { caseStudies } from '@/config/content';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { CountUp } from '@/components/ui/count-up';
import { cn } from '@/lib/utils';

/**
 * The transformation, not the process. This is the highest-authority element on
 * the page, so it sits before "how it works" rather than after.
 *
 * Every figure is parsed out of `caseStudies[].results` in config/content.ts —
 * nothing here is invented. If a result string has no leading number it renders
 * as plain text, so new entries never need a matching code change.
 */

type ParsedResult = {
  value: number | null;
  decimals: number;
  prefix: string;
  suffix: string;
  label: string;
};

/** "40% increase in appointments booked" -> 40 | "%" | "increase in ..." */
function parseResult(result: string): ParsedResult {
  const match = result.match(/^([^\d]*)(\d+(?:\.\d+)?)(%|x)?\s*(.*)$/i);
  if (!match) {
    return { value: null, decimals: 0, prefix: '', suffix: '', label: result };
  }
  const [, prefix, digits, unit, label] = match;
  const decimals = digits.includes('.') ? digits.split('.')[1].length : 0;
  return {
    value: Number(digits),
    decimals,
    prefix: prefix.trim(),
    suffix: unit ?? '',
    label: label.trim(),
  };
}

export default function CaseStudyFeature() {
  const study = caseStudies[0];
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const railScale = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  if (!study) return null;

  const results = study.results.map(parseResult);

  return (
    <Section tone="raised" spacing="lg" className="overflow-hidden">
      <GlowRule />

      <SectionHeading
        eyebrow="Selected work"
        title="What the system actually did"
        lead="One engagement, start to finish, the numbers that came out the other side."
      />

      <div ref={ref} className="relative mt-10 grid grid-cols-1 gap-8 sm:mt-14 sm:gap-12 lg:grid-cols-12">
        {/* The funnel */}
        <div className="lg:col-span-7">
          <ol className="relative space-y-px">
            {/* Progress rail */}
            <motion.span
              aria-hidden
              className="absolute left-0 top-0 w-px origin-top bg-gradient-to-b from-brand-300 via-brand-500 to-transparent"
              style={
                reduceMotion
                  ? { height: '100%' }
                  : { height: '100%', scaleY: railScale }
              }
            />

            {results.map((row, i) => (
              <li key={row.label} className="relative pl-8">
                <div
                  className={cn(
                    'flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b border-white/[0.08] py-5 sm:py-7',
                    i === results.length - 1 && 'border-b-0'
                  )}
                >
                  {row.value !== null && (
                    <span className="font-mono text-4xl font-medium tabular-nums text-fg sm:text-5xl">
                      {row.prefix}
                      <CountUp
                        to={row.value}
                        decimals={row.decimals}
                        start={inView}
                      />
                      {row.suffix}
                    </span>
                  )}
                  <span className="type-body text-fg-muted">{row.label}</span>
                </div>
              </li>
            ))}
          </ol>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild variant="secondary">
                <Link href="/case-studies">
                  Read the full story
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Context */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="rounded-panel border border-white/[0.1] bg-white/[0.02] p-7">
              <span className="type-label text-brand-300">{study.service}</span>
              <h3 className="type-h3 mt-4 text-fg">{study.title}</h3>

              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="type-label mb-1.5 text-fg-subtle">Client</dt>
                  <dd className="text-fg-muted">
                    {study.client} · {study.industry}
                  </dd>
                </div>
                <div>
                  <dt className="type-label mb-1.5 text-fg-subtle">Challenge</dt>
                  <dd className="text-fg-muted leading-relaxed">
                    {study.challenge}
                  </dd>
                </div>
                <div>
                  <dt className="type-label mb-1.5 text-fg-subtle">What we built</dt>
                  <dd className="text-fg-muted leading-relaxed">
                    {study.solution}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function GlowRule() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"
    />
  );
}
