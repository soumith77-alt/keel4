'use client';

import { Quote } from 'lucide-react';

import { testimonials } from '@/config/content';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { RevealGroup, RevealItem } from '@/components/ui/reveal';
import { GlowCard } from '@/components/ui/glow-card';

/**
 * Social proof. Deliberately quiet — the brief's principle is three loud
 * moments (hero, service demos, case study) with disciplined typography either
 * side. This is one of the quiet sections.
 *
 * Renders nothing when there are no testimonials, so removing them from
 * content.ts removes the section rather than leaving an empty shell.
 */
export default function Testimonials() {
  if (!testimonials.length) return null;

  return (
    <Section spacing="lg">
      <SectionHeading
        eyebrow="What clients say"
        title="In their words"
        align="center"
        className="mx-auto"
      />

      {/* Mobile: one card prominent, the rest swipeable, three stacked cards
          added ~900px to the mobile document. Desktop: three-up grid. */}
      <RevealGroup className="mt-12 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 scrollbar-hide sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:overflow-visible">
        {testimonials.map((t) => (
          <RevealItem
            key={t.name}
            className="w-[85vw] shrink-0 snap-center sm:w-[60vw] md:w-auto"
          >
            <GlowCard className="h-full">
              <figure className="flex h-full flex-col gap-5 p-6 sm:gap-6 sm:p-7">
                <Quote
                  className="h-5 w-5 shrink-0 text-accent-700"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <blockquote className="type-body flex-1 text-fg text-pretty">
                  {t.content}
                </blockquote>
                <figcaption className="border-t border-line/10 pt-5">
                  <span className="block text-sm font-medium text-fg">
                    {t.name}
                  </span>
                  <span className="type-label mt-1 block text-fg-subtle">
                    {t.role} · {t.company}
                  </span>
                </figcaption>
              </figure>
            </GlowCard>
          </RevealItem>
        ))}
      </RevealGroup>

      <p className="mt-4 text-center text-xs text-fg-subtle md:hidden">
        Swipe for more
      </p>
    </Section>
  );
}
