'use client';

import { useEffect, useRef, useState } from 'react';

import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

/**
 * HOW KEEEL THINKS — one connected sequence, not four blocks.
 *
 * The previous version was four stacked rows, each with a panel beside it. It
 * was honest, and it was also the same shape four times — the pattern this
 * redesign exists to remove.
 *
 * This is a single signal running through four stages: left to right from
 * `lg`, top to bottom below it. The stage being read is lit and emphasised;
 * the others stay fully visible, so the whole method is legible at a glance.
 *
 * SCROLL DRIVES IT, BUT SCROLL NEVER TRAPS IT. The section is normal height,
 * nothing is pinned and nothing is hijacked — an IntersectionObserver simply
 * decides which stage is nearest the middle of the viewport. Every stage is
 * also a real button, so the sequence is fully operable by keyboard and by tap
 * with no scrolling at all, and if the observer never runs, stage 01 is lit
 * and all four artefacts are still readable.
 */

const STEPS = [
  {
    n: '01',
    title: 'Diagnose',
    detail: 'Walk the real journey and find where it breaks.',
    artefact: 'Journey map',
    lines: ['Enquiry lands', 'No reply until morning', 'Caller books elsewhere'],
  },
  {
    n: '02',
    title: 'Model',
    detail: 'Write the decision path before the code.',
    artefact: 'Agent boundary',
    lines: ['if known contact', 'then skip qualification', 'escalate anything else'],
  },
  {
    n: '03',
    title: 'Build',
    detail: 'Ship it into your stack, integrated and deployed.',
    artefact: 'Build state',
    lines: ['Agent logic', 'Calendar + CRM', 'Escalation to a human'],
  },
  {
    n: '04',
    title: 'Measure',
    detail: 'Let what actually happened choose the next iteration.',
    artefact: 'Event stream',
    lines: ['call.received', 'booking.created', 'escalation.raised'],
  },
];

export default function ProcessLog() {
  const [active, setActive] = useState(0);
  const [horizontal, setHorizontal] = useState(false);
  const stageRefs = useRef<(HTMLLIElement | null)[]>([]);

  // The rail runs on a different axis per breakpoint, and a transform cannot
  // be expressed in Tailwind for both at once, so the axis is state rather
  // than a media query. Read after mount — never during render, which would
  // produce different server and client output.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setHorizontal(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const i = stageRefs.current.indexOf(visible.target as HTMLLIElement);
        if (i >= 0) setActive(i);
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: [0.1, 0.5, 1] },
    );
    const els = stageRefs.current.filter(Boolean) as HTMLLIElement[];
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const progress = (active + 1) / STEPS.length;

  return (
    <Section tone="raised" spacing="lg" id="process" width="wide">
      <Reveal>
        <span className="flex items-baseline gap-3">
          <span aria-hidden className="h-px w-8 translate-y-[-0.35rem] bg-accent-500" />
          <span className="type-mono-sm text-fg-subtle">How Keeel thinks</span>
        </span>
        <h2 className="type-h2 mt-5 max-w-3xl text-fg text-balance">
          One signal, four stages, and every one leaves{' '}
          {/* The single editorial serif moment outside the hero. */}
          something behind.
        </h2>
      </Reveal>

      <ol className="relative mt-14 grid gap-0 lg:grid-cols-4">
        <span
          aria-hidden
          className="absolute left-[0.4375rem] top-2 h-[calc(100%-1rem)] w-px bg-line/12 lg:left-0 lg:top-[0.4375rem] lg:h-px lg:w-full"
        >
          <span
            className="absolute inset-0 origin-top bg-accent-500 transition-transform duration-slow ease-out lg:origin-left"
            style={{
              transform: horizontal
                ? `scaleX(${progress})`
                : `scaleY(${progress})`,
            }}
          />
        </span>

        {STEPS.map((step, i) => {
          const lit = i <= active;
          const isActive = i === active;
          return (
            <li
              key={step.n}
              ref={(el) => {
                stageRefs.current[i] = el;
              }}
              className="relative grid grid-cols-[1.25rem_1fr] gap-x-4 pb-10 lg:block lg:pb-0 lg:pr-8"
            >
              <span
                aria-hidden
                className={cn(
                  'mt-1 block h-3.5 w-3.5 shrink-0 rounded-full border transition-colors duration-slow lg:mt-0',
                  lit
                    ? 'border-accent-500 bg-accent-500'
                    : 'border-line/25 bg-[rgb(var(--canvas))]',
                )}
              />

              <div className="lg:mt-7">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="group block w-full text-left"
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span
                    className={cn(
                      'type-mono-sm block transition-colors duration-slow',
                      lit ? 'text-signal' : 'text-fg-subtle',
                    )}
                  >
                    {step.n}
                  </span>
                  <span
                    className={cn(
                      'type-h4 mt-2 block transition-colors duration-slow',
                      isActive ? 'text-fg' : 'text-fg-muted group-hover:text-fg',
                    )}
                  >
                    {step.title}
                  </span>
                  <span className="type-body mt-2 block text-fg-muted text-pretty">
                    {step.detail}
                  </span>
                </button>

                {/* The artefact. Always rendered and always readable — the
                    active state changes its EMPHASIS, never its presence, so
                    nothing here is conditional on scroll position or a click. */}
                <div
                  className={cn(
                    'mt-5 border-l-2 pl-4 transition-colors duration-slow',
                    isActive ? 'border-accent-500' : 'border-line/12',
                  )}
                >
                  <span className="type-mono-sm block text-fg-subtle">
                    {step.artefact}
                  </span>
                  <ul className="mt-2.5 space-y-1.5">
                    {step.lines.map((line) => (
                      <li
                        key={line}
                        className={cn(
                          'type-mono transition-colors duration-slow',
                          isActive ? 'text-fg' : 'text-fg-subtle',
                        )}
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
