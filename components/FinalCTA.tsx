'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { calendlyLink } from '@/config/content';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';

/**
 * THE FINAL CTA — one component, every route.
 *
 * There were three of these, and they had drifted the way copy-pasted
 * sections always do. /about ended on "Let's work together." over "Book a call
 * to discuss how we can help transform your business" — generic enough to
 * belong to any agency, and the exact opposite of the positioning the rest of
 * the page argues for. Each copy also painted its own dark band with its own
 * gradient, so the navy at the bottom of /about was not quite the navy at the
 * bottom of a service page.
 *
 * Now: one band, one set of tokens, one piece of copy. A page may override the
 * heading when it genuinely has something more specific to say; everything
 * else is shared by construction.
 *
 * The CTA uses the same obsidian surface as the hero. A single green hairline
 * marks the boundary without introducing another blue or a decorative fade.
 */

type Props = {
  /** Override only when a page has a genuinely more specific promise. */
  heading?: string;
  lead?: string;
  className?: string;
};

const DEFAULT_HEADING = 'Let’s build the system behind the result.';
const DEFAULT_LEAD =
  'Tell us what needs to improve. We’ll identify where a system can help and where it cannot.';

export default function FinalCTA({ heading, lead, className }: Props) {
  return (
    <section
      className={cn(
        'theme-obsidian relative w-full overflow-hidden bg-surface py-16 text-fg sm:py-28',
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent-500/45" />
      <div
        aria-hidden
        className="grain-overlay pointer-events-none absolute inset-0"
      />

      <div className="relative z-raised mx-auto w-full max-w-content px-5 sm:px-8">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <span className="type-label text-signal">Next step</span>
            <h2 className="type-h2 mt-5 text-fg text-balance">
              {heading ?? DEFAULT_HEADING}
            </h2>
            <p className="type-body-lg measure mt-5 text-fg-muted text-pretty">
              {lead ?? DEFAULT_LEAD}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="w-full shrink-0 lg:w-auto">
            {/* Full-bleed below `sm`. Stacked auto-width buttons left-aligned
                in a full-width band read as a layout bug on a phone. */}
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button asChild size="lg" variant="inverse" className="w-full sm:w-auto">
                <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                  Book a working session
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full border-line/25 bg-fg/[0.08] text-fg hover:border-line/40 hover:bg-fg/[0.16] sm:w-auto"
              >
                <Link href="/contact">Tell us about the problem</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
