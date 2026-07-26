'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';

import { calendlyLink, serviceFeatureCards } from '@/config/content';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { GlowCard } from '@/components/ui/glow-card';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';
import GlowBackdrop from '@/components/ui/glow-backdrop';
import { CountUp } from '@/components/ui/count-up';
import VoiceDemoPlayer from '@/components/VoiceDemoPlayer';
import {
  AutomationDemo,
  VideoDemo,
  WebsiteDemo,
} from '@/components/ServiceDemos';

/**
 * One layout for every service page.
 *
 * This replaces 524 lines of `isVoiceAI / isAgenticAutomations / isUgcVideo /
 * isWebsites` branching, three near-identical "Key Features" blocks, three
 * separate hero components, and a bespoke 313-line Voice AI page. Adding a
 * fifth service is now a config/content.ts edit.
 */

// WebGL stays client-only and out of the initial bundle.
const VoicePoweredOrb = dynamic(
  () => import('@/components/ui/voice-powered-orb').then((m) => m.VoicePoweredOrb),
  { ssr: false, loading: () => null }
);

type Outcome = { metric: string; label: string };

export type ServiceLayoutProps = {
  service: {
    slug: string;
    title: string;
    description: string;
    outcomeStatement?: string;
    shortDescription?: string;
    outcomes: Outcome[];
    useCases: string[];
    features: string[];
    demoAudioUrl?: string;
    demoVideoUrl?: string;
  };
};

/** Split "40%" / "3x" / "24/7" into a countable number plus its unit. */
function parseMetric(metric: string) {
  const match = metric.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { value: null as number | null, decimals: 0, suffix: metric };
  const [, digits, suffix] = match;
  return {
    value: Number(digits),
    decimals: digits.includes('.') ? digits.split('.')[1].length : 0,
    suffix,
  };
}

/** The media slot — each service shows what it actually does. */
function ServiceHeroMedia({ service }: ServiceLayoutProps) {
  switch (service.slug) {
    case 'voice-ai':
      return (
        <div className="flex flex-col gap-6">
          <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
            <div className="absolute inset-[14%] rounded-full bg-brand-500/20 blur-[60px]" />
            <VoicePoweredOrb
              className="relative h-full w-full"
              variant="brand"
              maxRotationSpeed={0.5}
            />
          </div>
          {service.demoAudioUrl && (
            <div id="listen-to-demo" className="scroll-mt-28">
              <VoiceDemoPlayer
                src={service.demoAudioUrl}
                title="Hear a real call"
              />
            </div>
          )}
        </div>
      );
    case 'agentic-automations':
      return (
        <div className="rounded-panel border border-white/[0.1] bg-surface-raised/70 p-8">
          <AutomationDemo className="h-48" />
        </div>
      );
    case 'ugc-video':
      return service.demoVideoUrl ? (
        <VideoDemo
          src={service.demoVideoUrl}
          className="aspect-[4/5] w-full rounded-panel"
        />
      ) : null;
    case 'websites':
      return <WebsiteDemo />;
    default:
      return null;
  }
}

export default function ServiceLayout({ service }: ServiceLayoutProps) {
  const featureCards = serviceFeatureCards[service.slug] ?? [];
  const media = ServiceHeroMedia({ service });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-surface px-5 pb-20 pt-36 sm:px-8 sm:pt-40">
        <div
          aria-hidden
          className="absolute inset-0 z-base opacity-[0.45] [background-image:linear-gradient(to_right,rgba(91,119,201,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(91,119,201,0.16)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_25%,black,transparent)]"
        />
        <GlowBackdrop variant="hero" className="z-base" />

        <div className="relative z-raised mx-auto grid w-full max-w-content grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="type-label inline-flex items-center gap-2.5 border border-white/[0.12] bg-white/[0.04] px-3.5 py-2 text-brand-200">
                {service.title}
              </span>
            </Reveal>

            {/* shortDescription is a sentence; outcomeStatement is often a
                comma-list of capabilities, which reads badly at display size. */}
            <Reveal delay={0.05}>
              <h1 className="type-h1 mt-7 text-fg text-balance">
                {service.shortDescription || service.title}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="type-body-lg measure mt-6 text-fg-muted text-pretty">
                {service.description}
              </p>
            </Reveal>

            {service.outcomeStatement && (
              <Reveal delay={0.13}>
                <p className="type-label mt-5 flex items-center gap-2.5 text-fg-subtle">
                  <span className="inline-block h-px w-6 shrink-0 bg-brand-400/60" />
                  {service.outcomeStatement}
                </p>
              </Reveal>
            )}

            {service.outcomes.length > 0 && (
              <Reveal delay={0.15}>
                <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-white/[0.08] pt-8">
                  {service.outcomes.map((outcome) => {
                    const { value, decimals, suffix } = parseMetric(outcome.metric);
                    return (
                      <div key={outcome.label}>
                        <dt className="sr-only">{outcome.label}</dt>
                        <dd className="font-mono text-3xl font-medium tabular-nums text-fg">
                          {value !== null ? (
                            <>
                              <CountUp to={value} decimals={decimals} />
                              <span className="text-brand-300">{suffix}</span>
                            </>
                          ) : (
                            suffix
                          )}
                        </dd>
                        <span className="mt-1.5 block text-xs leading-snug text-fg-subtle">
                          {outcome.label}
                        </span>
                      </div>
                    );
                  })}
                </dl>
              </Reveal>
            )}

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg">
                  <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                    Design my AI system
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/contact">Talk to us</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          {media && (
            <Reveal delay={0.15} className="lg:justify-self-end lg:w-full">
              {media}
            </Reveal>
          )}
        </div>
      </section>

      {/* ── Capabilities ─────────────────────────────────────────────── */}
      {featureCards.length > 0 && (
        <Section tone="raised" spacing="lg">
          <SectionHeading
            eyebrow="Capabilities"
            title="What's included"
            lead="Everything below ships as part of the engagement, not as an upsell later."
          />

          <RevealGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((card) => (
              <RevealItem key={card.title}>
                <GlowCard className="h-full">
                  <div className="flex h-full flex-col gap-4 p-6">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-control border border-white/[0.1] bg-brand-600/25 text-brand-200">
                      <Icon name={card.icon} size={20} />
                    </span>
                    <h3 className="text-base font-semibold text-fg">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-fg-muted text-pretty">
                      {card.desc}
                    </p>
                  </div>
                </GlowCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {/* ── Fit ──────────────────────────────────────────────────────── */}
      {service.useCases.length > 0 && (
        <Section spacing="lg">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Best fit"
                title="Where this works hardest"
                lead="If you recognise your business here, the payback tends to arrive fastest."
              />
            </div>
            <ul className="lg:col-span-7">
              {service.useCases.map((useCase, i) => (
                <li key={useCase}>
                  <Reveal delay={i * 0.04}>
                    <div className="flex items-baseline gap-6 border-t border-white/[0.08] py-6">
                      <span className="type-label tabular-nums text-brand-300">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="type-body-lg text-fg">{useCase}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────── */}
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
              Ready to put {service.title.toLowerCase()} to work?
            </h2>
            <p className="type-body-lg measure mt-5 text-white/80 text-pretty">
              Book a call and we&apos;ll walk through your setup, show live
              examples, and scope what it would take.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="shrink-0">
            <Button asChild size="lg" variant="inverse">
              <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                Book a call
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
