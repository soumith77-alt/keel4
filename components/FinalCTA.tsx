import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { projectBookingLink } from '@/config/content';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';

/**
 * THE CLOSING CTA for interior pages — one component, every route.
 *
 * The contact form is the primary path. "Book a call" appears only when a
 * general project booking link is configured; the existing Cal.com event is
 * a voice agent demo and is offered on the Voice AI page only.
 */

type Props = {
  heading?: string;
  lead?: string;
  /** Lets a service page pre-select its project type on the form. */
  contactHref?: string;
  className?: string;
};

const DEFAULT_HEADING = 'What are you ready to build?';
const DEFAULT_LEAD =
  'Tell us about the product, website, or workflow you have in mind.';

export default function FinalCTA({ heading, lead, contactHref = '/contact', className }: Props) {
  return (
    <section className={cn('section-y bg-surface', className)}>
      <div className="site-container">
        <div className="theme-dark relative overflow-hidden rounded-[28px] bg-surface p-8 text-fg sm:p-12 lg:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_80%_at_90%_0%,rgba(31,138,99,0.25),transparent_70%)]"
          />
          <div className="relative flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
            <Reveal className="max-w-2xl">
              <p className="type-label text-signal">Start a project</p>
              <h2 className="type-h2 mt-4 text-fg text-balance">
                {heading ?? DEFAULT_HEADING}
              </h2>
              <p className="type-body-lg measure mt-5 text-fg-muted text-pretty">
                {lead ?? DEFAULT_LEAD}
              </p>
            </Reveal>

            <Reveal delay={0.08} className="w-full shrink-0 lg:w-auto">
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button asChild size="lg" variant="inverse" className="w-full sm:w-auto">
                  <Link href={contactHref}>
                    Discuss your project
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                {projectBookingLink && (
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="w-full border-hairline bg-transparent text-fg shadow-none hover:bg-fg/[0.06] sm:w-auto"
                  >
                    <a href={projectBookingLink} target="_blank" rel="noopener noreferrer">
                      Book a call
                    </a>
                  </Button>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
