import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { calendlyLink } from '@/config/content';
import { Section } from '@/components/ui/section';
import PageHero from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { GlowCard } from '@/components/ui/glow-card';
import { Icon } from '@/components/ui/icon';

export const metadata = {
  title: 'About Keel - Agentic AI Solutions Studio',
  description:
    'Keel is an Agentic AI Solutions Studio building Voice AI systems, business automations, UGC content, AI video, and high converting websites. Real results in 2 to 4 weeks.',
  alternates: { canonical: 'https://saykeel.com/about' },
  openGraph: {
    title: 'About Keel - Agentic AI Solutions Studio',
    description:
      'We build Voice AI, automations, UGC content, and websites for businesses that scale. Real measurable results.',
    url: 'https://saykeel.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Keel - Agentic AI Solutions Studio',
    description:
      'Voice AI, automations, UGC content, and websites for businesses that scale.',
  },
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Keel',
  url: 'https://saykeel.com/about',
  description:
    'Keel is an Agentic AI Solutions Studio building Voice AI, automations, UGC content, AI video, and websites.',
  mainEntity: {
    '@type': 'Organization',
    name: 'Keel',
    url: 'https://saykeel.com',
    email: 'hello@saykeel.com',
    description:
      'We build premium AI solutions that drive measurable business outcomes. Voice AI, automations, UGC ads, AI video, and websites.',
  },
};

const PRINCIPLES = [
  {
    icon: 'chart',
    title: 'Outcomes, not deliverables',
    body: 'We start from the metric that matters and work backwards. If a build won’t move it, we say so before you pay for it.',
  },
  {
    icon: 'bolt',
    title: 'Fast deployment',
    body: 'Most solutions launch within 2 to 4 weeks. Voice agents can be live in as little as one week.',
  },
  {
    icon: 'layers',
    title: 'One system, not four projects',
    body: 'Voice, automations, video, and web are built to feed each other rather than sit in separate silos.',
  },
  {
    icon: 'refresh',
    title: 'Ongoing optimisation',
    body: 'We stay on after launch. Most of the gain arrives from tuning against real traffic, not from the first release.',
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      {/* Hero */}
      <PageHero
        eyebrow="About"
        title="We build AI that moves a number."
        lead="We solve real problems with AI. No buzzwords, no half-finished experiments."
        className="pb-20"
      />

      {/* Approach */}
      <Section tone="raised" spacing="lg">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Our approach"
              title="Start with the metric"
              lead="Not with the tech, and not with a deliverables list."
            />
          </div>
          <div className="lg:col-span-7">
            {/* Was three paragraphs of 29, 36 and 20 words. The same three
                ideas, as statements you can read at a glance. */}
            <Reveal>
              <dl className="divide-y divide-line/10 border-y border-line/10">
                {[
                  ['We find the number first', 'Goals and bottlenecks before tools.'],
                  ['We build the whole system', 'Voice, automation, video and web.'],
                  ['We move in weeks', 'Not months.'],
                ].map(([term, detail]) => (
                  <div key={term} className="py-6">
                    <dt className="type-h3 text-fg">{term}</dt>
                    <dd className="mt-1.5 type-body text-fg-muted">{detail}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Principles */}
      <Section spacing="lg">
        <SectionHeading
          eyebrow="Why Keel"
          title="How we work"
          lead="Four commitments that shape every engagement."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <GlowCard className="h-full">
                <div className="flex h-full flex-col gap-4 p-7">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-control border border-line/15 bg-ink/10 text-accent-700">
                    <Icon name={p.icon} size={20} />
                  </span>
                  <h3 className="type-h3 text-fg">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-fg-muted text-pretty">
                    {p.body}
                  </p>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section tone="brand" spacing="lg" className="overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_50%_0%,rgba(255,255,255,0.16),transparent_70%)]"
        />
        <div aria-hidden className="grain-overlay pointer-events-none absolute inset-0" />

        <div className="relative z-raised flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <span className="type-label text-white/70">Next step</span>
            <h2 className="type-h1 mt-5 text-white text-balance">
              Let&apos;s work together.
            </h2>
            <p className="type-body-lg measure mt-5 text-white/80 text-pretty">
              Book a call to discuss how we can help transform your business.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="shrink-0">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="inverse">
                <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                  Book a call
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/20"
              >
                <Link href="/contact">Get in touch</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
