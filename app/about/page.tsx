import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { calendlyLink } from '@/config/content';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { GlowCard } from '@/components/ui/glow-card';
import { Icon } from '@/components/ui/icon';
import GlowBackdrop from '@/components/ui/glow-backdrop';

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
      <section className="relative isolate overflow-hidden bg-surface px-5 pb-20 pt-36 sm:px-8 sm:pt-44">
        <div
          aria-hidden
          className="absolute inset-0 z-base opacity-[0.4] [background-image:linear-gradient(to_right,rgba(91,119,201,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(91,119,201,0.16)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]"
        />
        <GlowBackdrop variant="hero" className="z-base" />

        <div className="relative z-raised mx-auto w-full max-w-content">
          <Reveal>
            <span className="type-label inline-flex items-center gap-2.5 border border-white/[0.12] bg-white/[0.04] px-3.5 py-2 text-brand-200">
              About
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="type-display mt-7 max-w-4xl text-fg text-balance">
              We build AI that moves a number.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="type-body-lg measure mt-7 text-fg-muted text-pretty">
              Keel started with a simple mission: help businesses use AI to solve
              real problems and get real results. We&apos;re not here to sell
              buzzwords or ship experiments that are half finished.
            </p>
          </Reveal>
        </div>
      </section>

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
            <Reveal>
              <div className="space-y-6 type-body-lg text-fg-muted text-pretty">
                <p>
                  We begin by understanding your goals, your current bottlenecks,
                  and the numbers that actually matter to the business. Then we
                  design and build around that, clean execution, measurable
                  impact.
                </p>
                <p>
                  Our expertise spans Voice AI, autonomous automations, UGC
                  content, AI video, and modern web development. Every build is
                  made with conversion, performance, and clarity in mind, so it
                  doesn&apos;t just look impressive, it moves your numbers.
                </p>
                <p className="text-fg">
                  We move fast, iterate quickly, and hold a high bar. Most
                  clients start seeing results in weeks, not months.
                </p>
              </div>
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
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-control border border-white/[0.1] bg-brand-600/25 text-brand-200">
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
