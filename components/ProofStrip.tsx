'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Section } from '@/components/ui/section';

/**
 * THE PROOF RAIL — evidence, not a database table.
 *
 * The previous version was a four-column grid with column headers, which is
 * literally a table: correct, attributable, and visually indistinguishable
 * from an admin screen. It also sat on navy, so it read as a continuation of
 * the hero rather than as a change of scene.
 *
 * Now it is the first paper moment on the page — obsidian hero, then daylight —
 * and the evidence is folded away behind the number. What is visible is the
 * figure and what it means; what is behind the disclosure is where it came
 * from. That inverts the old hierarchy, where the sourcing took as much room
 * as the finding.
 *
 * A NUMBER IS NEVER SHOWN ALONE. Every item carries its `context` line in the
 * closed state, because "39" on its own reads as a performance claim even when
 * it is an honest count. The disclosure adds the project, the system and the
 * status — it never adds a bigger number.
 */
const ITEMS: {
  figure: string;
  context: string;
  project: string;
  system: string;
  status: string;
}[] = [
  {
    figure: '39',
    context: 'institutions audited',
    project: 'University IVR audit engine',
    system: 'A voice agent that dials every branch of a phone tree, plus a weighted friction model scoring only the paths it genuinely reached.',
    status: 'Built',
  },
  {
    figure: '405',
    context: 'live call minutes crawled',
    project: 'University IVR audit engine',
    system: 'A phone tree cannot be scraped — there is no API and no sitemap. Every branch is a separate live call.',
    status: 'Built',
  },
  {
    figure: '19',
    context: 'trades represented',
    project: 'Artizyn',
    system: 'A two-way marketplace across the PACA region: clients post projects, artisans publish services, both directions inside one platform.',
    status: 'Built',
  },
  {
    figure: '0%',
    context: 'marketplace commission',
    project: 'Artizyn',
    system: 'Revenue comes from three subscription tiers instead of a cut of every job, so a relationship forming does not push the artisan off the platform.',
    status: 'Built',
  },
];

export default function ProofStrip() {
  const [open, setOpen] = useState<number | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <Section tone="light" spacing="none" className="py-14 sm:py-20" width="wide">
      <div className="mb-8 flex items-baseline gap-3">
        <span aria-hidden className="h-px w-8 translate-y-[-0.35rem] bg-accent-600" />
        <p className="type-mono-sm text-fg-subtle">Evidence from shipped work</p>
      </div>

      {/* 2×2 from the smallest screen. Stacked one-per-row, the four figures
          took almost a full phone viewport to say four short things — the rail
          is meant to be scanned, not scrolled. */}
      <ul className="grid grid-cols-2 gap-px border-y border-line/12 lg:grid-cols-4">
        {ITEMS.map((item, i) => {
          const isOpen = open === i;
          const panelId = `evidence-${i}`;
          return (
            <li
              key={item.figure + item.context}
              className={cn(
                'relative bg-surface py-5 pr-3 sm:py-6 lg:py-7',
                // Hairline separators drawn as borders on the item rather than
                // as a table's grid lines — the rail should read as four
                // findings side by side, not as cells.
                // Hairlines follow the grid: a left rule on every column but
                // the first, a top rule on the second row.
                i % 2 === 1 && 'border-l border-line/12',
                i > 1 && 'border-t border-line/12 lg:border-t-0',
                'lg:border-l lg:border-line/12 lg:first:border-l-0',
                i > 0 && 'lg:pl-7',
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group flex w-full items-start justify-between gap-4 pr-5 text-left"
              >
                <span>
                  {/* The figure is the loudest thing in the rail, and it uses the
                      shared H2 role rather than a pair of literal sizes — this
                      was `text-[2.75rem] lg:text-[3.25rem]`, two numbers that
                      belonged to no scale and tracked nothing else on the site. */}
                  <span className="type-h2 block text-fg">
                    {item.figure}
                  </span>
                  <span className="type-small mt-2.5 block text-fg-muted">
                    {item.context}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-base ease-out',
                    isOpen
                      ? 'rotate-45 border-accent-600 bg-accent-500 text-ink'
                      : 'border-line/20 text-fg-subtle group-hover:border-accent-600 group-hover:text-signal',
                  )}
                >
                  <Plus className="h-3.5 w-3.5" />
                </span>
                <span className="sr-only">
                  {isOpen ? 'Hide' : 'Show'} the source for this figure
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.34,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pr-5 pt-5">
                      <span className="type-mono-sm block text-signal">
                        {item.project}
                      </span>
                      <p className="type-small mt-2 text-fg-muted text-pretty">
                        {item.system}
                      </p>
                      <span className="type-mono-sm mt-3 inline-block rounded-pill border border-line/20 px-2.5 py-1 text-fg-subtle">
                        {item.status}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
