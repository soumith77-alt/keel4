'use client';

import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { calendlyLink, systemRuns } from '@/config/content';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/ui/magnetic';
import SignalField from './SignalField';
import { CoreArea, Form, SignalObject } from './TraceFragment';

/**
 * THE HERO — one complete example, on screen in the first painted frame.
 *
 * TWO ROUNDS OF CORRECTION LIVE IN THIS FILE. Round one removed a five-step
 * sequential reveal and an 8s auto-rotation: a visitor who scrolled within a
 * few seconds never reached an outcome and left thinking Keel sells
 * appointment booking. Round two removed what replaced it, which was still
 * wrong in a different way — three absolutely-positioned objects scattered
 * across a 92svh field, each measured in JavaScript and faded in from zero.
 *
 * That version had three faults the measurements did not catch:
 *
 *   · IT LOADED BLANK. The objects started at `opacity: 0` and could not be
 *     positioned until a layout pass had measured the stage, so the first
 *     thing a desktop visitor saw was an empty dark rectangle.
 *   · IT WAS MOSTLY EMPTY. Three small panels scattered across a near
 *     full-height field is a lot of dark space around not much information.
 *   · IT WAS TOO SMALL TO READ. 13px payloads and 11px labels look precise in
 *     a mock-up and are genuinely hard to read on a screen.
 *
 * WHAT IT IS NOW: one system ROW, in normal document flow. Input, the
 * transformation area, and the outcome, connected left to right, sized to the
 * container. No measurement, no absolute positioning, no clamping, no
 * entrance animation — the server-rendered HTML is already the finished
 * composition, so there is no frame in which anything is missing.
 *
 * The only motion is a green signal running the connectors on a 3s circuit.
 * It reinforces the relationship between the three objects and reveals
 * nothing: every word is legible before it has moved a pixel.
 */

/** The line between two objects, with the travelling signal on it. */
function Connector({ delay = 0 }: { delay?: number }) {
  return (
    // `w-14 shrink-0`, never `flex-1`. As a flex-1 it competed with the
    // transformation area for the same free space and squeezed it to a
    // 200px column, which wrapped every payload to four lines.
    <span
      aria-hidden
      className="relative mt-16 hidden h-[3px] w-14 shrink-0 overflow-hidden lg:block"
    >
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line/20" />
      <span
        className="signal-run absolute inset-0 bg-[linear-gradient(90deg,transparent_20%,rgb(var(--signal-text))_50%,transparent_80%)]"
        style={{ animationDelay: `${delay}s` }}
      />
    </span>
  );
}

export default function HeroSignal() {
  const reduceMotion = useReducedMotion() ?? false;
  const [runIndex, setRunIndex] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const run = systemRuns[runIndex];

  const select = useCallback((next: number) => {
    setRunIndex(next);
    setDetailOpen(false);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = systemRuns.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
      next = runIndex === last ? 0 : runIndex + 1;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
      next = runIndex === 0 ? last : runIndex - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      // Read by <Navbar> so the bar knows it is over an obsidian environment
      // and must invert. Pages with a light hero carry no such attribute.
      data-hero-tone="obsidian"
      className="theme-obsidian relative isolate overflow-hidden bg-surface text-fg"
      aria-label="What Keel builds"
    >
      <SignalField
        // The field breathes around the middle of the row rather than tracking
        // a moving node — there is no moving node any more.
        focus={{ x: 0.5, y: 0.3 }}
        className="absolute inset-0 h-full w-full"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_10%,transparent_25%,rgb(var(--canvas))_88%)]"
      />

      {/* svh, not vh: on iOS `100vh` counts the collapsing browser chrome, so
          the CTA would sit under the fold until the visitor scrolled.
          78svh, down from 92: the previous height was mostly empty field. */}
      <div className="relative z-raised mx-auto flex w-full max-w-wide flex-col px-5 pb-14 pt-24 sm:px-8 lg:min-h-[70svh] lg:pb-14 lg:pt-28">
        {/* ── The system row. Desktop. ── */}
        {/* `items-start`, not `items-stretch`: stretched terminals matched the
            transformation area's height and became two tall, mostly-empty
            boxes. Each object is now the height of its own content. */}
        <div className="hidden items-start lg:flex">
          <SignalObject
            step={run.steps[0]}
            role="input"
            className="w-[16rem] shrink-0 xl:w-[17.5rem]"
          />
          <Connector />
          <CoreArea
            steps={run.steps.slice(1, 4)}
            service={run.service}
            className="min-w-0 flex-1"
          />
          <Connector delay={1.5} />
          <SignalObject
            step={run.steps[4]}
            role="outcome"
            className="w-[16rem] shrink-0 xl:w-[17.5rem]"
          />
        </div>

        {/* ── Copy. Below the system, hard left. ── */}
        <div className="lg:mt-auto lg:pt-12">
          <h1 className="type-display-xl max-w-[18ch] text-fg text-balance">
            We build AI systems that compound.
          </h1>

          <p className="type-body-lg measure-tight mt-6 text-fg-muted text-pretty">
            Strategy, software and automation built as one connected growth
            system.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <MagneticButton>
              <Button asChild size="lg" variant="inverse" className="w-full sm:w-auto">
                <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                  Build your system
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </Button>
            </MagneticButton>

            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-full border-line/25 bg-fg/[0.06] text-fg hover:border-line/40 hover:bg-fg/[0.12] sm:w-auto"
            >
              <Link href="#work">View selected work</Link>
            </Button>
          </div>
        </div>
      </div>

      {/**
       * THE SERVICE SELECTOR — the hero's primary interaction.
       *
       * A 3+2 GRID BELOW `sm`, not a horizontal scroller. The scrolling rail
       * clipped "Web" and "SaaS" off the right edge of every phone, so two of
       * the five things Keel sells were invisible unless you happened to swipe
       * a strip that gave no indication it could be swiped. A grid shows all
       * five at once and needs no affordance to discover.
       */}
      <div className="relative z-raised border-t border-line/12 bg-[rgb(var(--canvas))]/70 backdrop-blur-[2px]">
        <div className="mx-auto w-full max-w-wide px-5 sm:px-8">
          <div
            role="tablist"
            aria-label="Choose a system"
            onKeyDown={onKeyDown}
            className="grid grid-cols-3 sm:flex"
          >
            {systemRuns.map((r, i) => {
              const selected = i === runIndex;
              return (
                <button
                  key={r.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`mode-${r.id}`}
                  aria-selected={selected}
                  aria-controls="hero-system"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  className={cn(
                    'group relative flex min-h-[56px] items-center gap-2 border-line/10 text-left transition-colors duration-fast ease-micro max-sm:justify-center max-sm:border-b sm:flex-1 sm:gap-2.5 sm:pr-4',
                    // Grid gutters below `sm`, so the 3+2 reads as a grid.
                    i % 3 !== 0 && 'max-sm:border-l',
                    selected ? 'text-fg' : 'text-fg-muted hover:text-fg',
                  )}
                >
                  <span
                    className={cn(
                      'type-mono-sm transition-colors duration-fast',
                      selected ? 'text-signal' : 'text-fg-subtle',
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="type-small font-medium">{r.label}</span>

                  {selected && (
                    <motion.span
                      layoutId="mode-underline"
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-accent-500"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 480, damping: 38 }
                      }
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── The phone system card. Input → system action → outcome, complete
          in one screen. The full five-state run is one tap away rather than
          being animated at the visitor. ── */}
      <div
        id="hero-system"
        role="tabpanel"
        aria-labelledby={`mode-${run.id}`}
        className="relative z-raised border-t border-line/12 px-5 py-8 lg:hidden"
      >
        <p className="type-mono-sm text-fg-subtle">{run.service} · example run</p>

        <ol className="mt-5 space-y-0">
          {[
            { label: 'Input', text: run.compact.input, tone: 'text-technical-400' },
            { label: 'System', text: run.compact.action, tone: 'text-fg' },
            { label: 'Outcome', text: run.compact.outcome, tone: 'text-signal' },
          ].map((row, i, all) => (
            <li key={row.label} className="relative grid grid-cols-[1.25rem_1fr] gap-x-4">
              {i < all.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[0.34rem] top-4 h-full w-px bg-accent-500/35"
                />
              )}
              <span
                aria-hidden
                className="relative z-raised mt-[0.4rem] block h-3 w-3 shrink-0 rounded-full border border-accent-500 bg-accent-500"
              />
              <div className="pb-5">
                <span className="type-mono-sm block text-fg-subtle">{row.label}</span>
                <p className={cn('type-body mt-1 leading-snug text-pretty', row.tone)}>
                  {row.text}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <button
          type="button"
          onClick={() => setDetailOpen((v) => !v)}
          aria-expanded={detailOpen}
          aria-controls={`hero-detail-${run.id}`}
          className="type-mono-sm flex min-h-[44px] w-full items-center justify-between gap-4 border-t border-line/12 pt-4 text-fg-muted"
        >
          {detailOpen ? 'Hide the five states' : 'See all five states'}
          <Plus
            aria-hidden
            className={cn(
              'h-4 w-4 shrink-0 transition-transform duration-fast ease-micro',
              detailOpen && 'rotate-45',
            )}
          />
        </button>

        {detailOpen && (
          <ul id={`hero-detail-${run.id}`} className="mt-4 divide-y divide-line/10">
            {run.steps.map((step) => (
              <li key={step.state} className="flex items-start gap-3 py-3">
                <span className="mt-[3px] shrink-0">
                  <Form form={step.form} />
                </span>
                <span className="min-w-0">
                  <span className="type-mono-sm block text-fg-subtle">{step.state}</span>
                  <span
                    className={cn(
                      'type-small mt-0.5 block leading-snug text-pretty',
                      step.tone === 'input'
                        ? 'text-technical-400'
                        : step.tone === 'result'
                          ? 'text-signal'
                          : 'text-fg',
                    )}
                  >
                    {step.payload}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Announce the service change. The complete run is in the DOM either
          way — this exists so a switch is not silent. */}
      <p className="sr-only" aria-live="polite">
        {run.service}: {run.compact.input} to {run.compact.outcome}.
      </p>
    </section>
  );
}
