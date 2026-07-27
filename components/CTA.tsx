'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { calendlyLink } from '@/config/content';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';

/**
 * The one place the locked brand navy runs at full strength as a full-bleed
 * fill. White on #253c80 measures 10.3:1, so this band is both the loudest
 * moment on the page and the most legible.
 */
export default function CTA() {
  return (
    <Section tone="brand" spacing="lg" className="overflow-hidden">
      {/* Depth so the flat navy doesn't read as a solid slab.
          Centred INSIDE the band, not at `50% 0%`. Anchored to the top edge
          the highlight was at full 0.16 strength on its first pixel row, so it
          landed a bright dome directly on the light/navy cut and blunted it.
          Peaking mid-band means the gradient reaches zero before either
          boundary, leaving the inversion to read as the hard edge it is. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_55%,rgba(255,255,255,0.07),transparent_70%)]"
      />
      <div
        aria-hidden
        className="grain-overlay pointer-events-none absolute inset-0"
      />

      <div className="relative z-raised flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
        <Reveal className="max-w-2xl">
          <span className="type-label text-white/70">Next step</span>
          <h2 className="type-h1 mt-5 text-white text-balance">
            Let&apos;s find the one thing worth automating first.
          </h2>
          <p className="type-body-lg measure mt-5 text-white/80 text-pretty">
            A 30 minute call. We&apos;ll show live examples, tell you where AI
            won&apos;t help, and scope what it would take if it will.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="w-full shrink-0 lg:w-auto">
          {/* Full-bleed below `sm`. Stacked auto-width buttons left-aligned in
              a full-width band read as a layout bug on a phone. */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg" variant="inverse" className="w-full sm:w-auto">
              <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                Design my AI system
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-full border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/20 sm:w-auto"
            >
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
