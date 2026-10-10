"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

import { serviceFeatureCards, services, voiceDemoBookingLink } from "@/config/content";
import FinalCTA from '@/components/FinalCTA';
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { GlowCard } from "@/components/ui/glow-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { DeferredWebGL } from "@/components/ui/deferred-webgl";
import { CountUp } from "@/components/ui/count-up";
import VoiceDemoPlayer from "@/components/VoiceDemoPlayer";
import { AutomationDemo, VideoDemo } from "@/components/ServiceDemos";
import { BrowserFrame, ConceptTag, MockCanvas, PhoneFrame, Shot } from "@/components/home/frames";
import {
  BookingPhoneMock,
  ClinicSiteMock,
  CrmPipelineMock,
  CrmRecordMock,
} from "@/components/home/mocks";

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
  () =>
    import("@/components/ui/voice-powered-orb").then((m) => m.VoicePoweredOrb),
  { ssr: false, loading: () => null },
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
    contactType?: string;
    tier?: "primary" | "additional";
    related?: { label: string; slug: string }[];
  };
};

/** Split "40%" / "3x" / "24/7" into a countable number plus its unit. */
function parseMetric(metric: string) {
  const match = metric.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match)
    return { value: null as number | null, decimals: 0, suffix: metric };
  const [, digits, suffix] = match;
  return {
    value: Number(digits),
    decimals: digits.includes(".") ? digits.split(".")[1].length : 0,
    suffix,
  };
}

/** The media slot — each service shows what it actually does. */
function ServiceHeroMedia({ service }: ServiceLayoutProps) {
  switch (service.slug) {
    case "voice-ai":
      return (
        <div className="flex flex-col gap-6">
          {/* The orb is a WebGL shader built to bloom against a dark surface —
              on the off-white canvas it washed out to a pale grey ring. Giving
              it its own navy panel restores the contrast it was designed for
              and reads as a deliberate viewport rather than a stray graphic. */}
          <div className="theme-dark relative overflow-hidden rounded-panel bg-surface p-6">
            <div className="relative mx-auto aspect-square w-full max-w-[20rem]">
              <div className="absolute inset-[14%] rounded-full bg-accent-500/25 blur-[60px]" />
              {/* The shader waits for the slot to be in view, for the main
                  thread to be idle, and for motion to be allowed. The fallback
                  below is a static ring in the same geometry — it is what a
                  reduced-motion visitor sees permanently, so it is designed to
                  look finished rather than to look like a placeholder. */}
              <DeferredWebGL
                fallback={
                  <div
                    aria-hidden
                    className="relative h-full w-full rounded-full border border-accent-500/35 bg-[radial-gradient(circle_at_50%_45%,rgba(0,199,118,0.30),transparent_62%)]"
                  >
                    <span className="absolute inset-[18%] rounded-full border border-accent-500/25" />
                    <span className="absolute inset-[34%] rounded-full border border-accent-500/15" />
                  </div>
                }
              >
                <VoicePoweredOrb
                  className="relative h-full w-full"
                  variant="brand"
                  maxRotationSpeed={0.5}
                />
              </DeferredWebGL>
            </div>
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
    case "agentic-automations":
      return (
        <div className="rounded-panel border border-line/15 bg-surface-raised/70 p-8">
          <AutomationDemo className="h-48" />
        </div>
      );
    case "ugc-video":
      return service.demoVideoUrl ? (
        <VideoDemo
          src={service.demoVideoUrl}
          className="aspect-[4/5] w-full rounded-panel"
        />
      ) : null;
    case "websites":
      return (
        <figure>
          <div className="relative pb-[12%]">
            <BrowserFrame label="Linden Physio">
              <MockCanvas ratio={1.5}>
                <ClinicSiteMock />
              </MockCanvas>
            </BrowserFrame>
            <div className="absolute bottom-0 right-[4%] w-[24%]">
              <PhoneFrame>
                <MockCanvas ratio={0.5} units={40}>
                  <BookingPhoneMock />
                </MockCanvas>
              </PhoneFrame>
            </div>
            <ConceptTag className="absolute -top-3 left-4 z-raised" />
          </div>
          <figcaption className="mt-4 text-sm text-fg-muted">
            Illustrative concept of a clinic website and booking step. Not client work.
          </figcaption>
        </figure>
      );
    case "crm-business-systems":
      return (
        <figure>
          <div className="relative pb-[14%]">
            <BrowserFrame label="Pipeline">
              <MockCanvas ratio={1.5}>
                <CrmPipelineMock />
              </MockCanvas>
            </BrowserFrame>
            <div className="absolute bottom-0 left-[-3%] w-[36%] overflow-hidden rounded-[14px] shadow-frame ring-1 ring-[#111814]/[0.07]">
              <MockCanvas ratio={1.05} units={24}>
                <CrmRecordMock />
              </MockCanvas>
            </div>
            <ConceptTag className="absolute -top-3 right-4 z-raised" />
          </div>
          <figcaption className="mt-4 text-sm text-fg-muted">
            Illustrative concept of a custom CRM pipeline and contact record. Not client work.
          </figcaption>
        </figure>
      );
    case "saas-products":
      return (
        <figure>
          <BrowserFrame label="Football Intelligence OS" tone="dark">
            <Shot
              src="/football-intelligence-os.webp"
              srcSmall="/football-intelligence-os-800.webp"
              width={1536}
              height={1024}
              alt="Football Intelligence OS overview dashboard."
              sizes="(min-width: 1024px) 600px, 92vw"
              priority
            />
          </BrowserFrame>
          <figcaption className="mt-4 text-sm text-fg-muted">
            Football Intelligence OS, a club operations platform built by Keeel.{" "}
            <Link href="/work#football-intelligence-os" className="font-medium text-signal underline-offset-4 hover:underline">
              Project details
            </Link>
          </figcaption>
        </figure>
      );
    default:
      return null;
  }
}

export default function ServiceLayout({ service }: ServiceLayoutProps) {
  const featureCards = serviceFeatureCards[service.slug] ?? [];
  const media = ServiceHeroMedia({ service });
  const contactHref = service.contactType
    ? `/contact?type=${encodeURIComponent(service.contactType)}`
    : "/contact";
  // Resolve related links against the live service list so a renamed or
  // removed page can never leave a dead link here.
  const related = (service.related ?? []).filter((r) =>
    services.some((s) => s.slug === r.slug),
  );

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-surface pb-[calc(var(--section-y)*0.8)] pt-[calc(68px+clamp(2.5rem,6vw,5rem))]">
        <div className="site-container relative z-raised grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <Link
                href="/services"
                className="type-label inline-flex items-center gap-2.5 text-signal underline-offset-4 hover:underline"
              >
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald" />
                {service.title}
              </Link>
            </Reveal>

            {/* shortDescription is a sentence; outcomeStatement is often a
                comma-list of capabilities, which reads badly at display size. */}
            <Reveal delay={0.05}>
              <h1 className="type-h1 mt-5 text-fg text-balance">
                {service.shortDescription || service.title}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="type-body-lg measure mt-6 text-fg-muted text-pretty">
                {service.description}
              </p>
            </Reveal>

            {/* On the four primary pages the description already lists the
                examples, so the summary line would repeat it. */}
            {service.outcomeStatement && service.tier !== "primary" && (
              <Reveal delay={0.13}>
                <p className="mt-5 text-[0.9375rem] text-fg-subtle">
                  {service.outcomeStatement}
                </p>
              </Reveal>
            )}

            {service.outcomes.length > 0 && (
              <Reveal delay={0.15}>
                <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line/10 pt-8">
                  {service.outcomes.map((outcome) => {
                    const { value, decimals, suffix } = parseMetric(
                      outcome.metric,
                    );
                    return (
                      <div key={outcome.label}>
                        <dt className="sr-only">{outcome.label}</dt>
                        <dd className="font-mono text-3xl font-medium tabular-nums text-fg">
                          {value !== null ? (
                            <>
                              <CountUp to={value} decimals={decimals} />
                              <span className="text-accent-700">{suffix}</span>
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
                  <Link href={contactHref}>
                    Discuss your project
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                {/* The existing Cal.com event is a voice agent demo, so it is
                    offered on the voice page and nowhere else. */}
                {service.slug === "voice-ai" ? (
                  <Button asChild size="lg" variant="secondary">
                    <a href={voiceDemoBookingLink} target="_blank" rel="noopener noreferrer">
                      Book a voice agent demo
                    </a>
                  </Button>
                ) : (
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/work">Explore our work</Link>
                  </Button>
                )}
              </div>
            </Reveal>

            {related.length > 0 && (
              <Reveal delay={0.24}>
                <p className="mt-6 text-sm text-fg-muted">
                  Related:{" "}
                  {related.map((r, i) => (
                    <span key={r.slug}>
                      {i > 0 && " · "}
                      <Link
                        href={`/services/${r.slug}`}
                        className="font-medium text-signal underline-offset-4 hover:underline"
                      >
                        {r.label}
                      </Link>
                    </span>
                  ))}
                </p>
              </Reveal>
            )}
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
            title="What we can build"
            lead="Every project is scoped individually. These are the pieces this kind of work most often includes."
          />

          <RevealGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Titles only. Nine cards each carrying a 12-word description was
                16 paragraphs on one page — the heaviest block left on the site,
                and every title already says the thing ("Answers in under 2
                seconds"). The description is kept in config for the `title`
                attribute rather than deleted. */}
            {featureCards.map((card) => (
              <RevealItem key={card.title}>
                <GlowCard className="h-full">
                  <div
                    className="flex h-full items-center gap-4 p-6"
                    title={card.desc}
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-mint text-signal">
                      <Icon name={card.icon} size={20} />
                    </span>
                    <h3 className="type-h4 text-fg text-balance">
                      {card.title}
                    </h3>
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
                eyebrow="Typical fit"
                title="Where this usually fits"
                lead="The situations we most often see behind this kind of project."
              />
            </div>
            <ul className="lg:col-span-7">
              {service.useCases.map((useCase, i) => (
                <li key={useCase}>
                  <Reveal delay={i * 0.04}>
                    <div className="flex items-baseline gap-6 border-t border-line/10 py-6">
                      <span className="type-label tabular-nums text-accent-700">
                        {String(i + 1).padStart(2, "0")}
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

      <FinalCTA
        // Not `.toLowerCase()` — that rendered "voice ai", and the acronym
        // matters more than the sentence case does.
        heading="What are you ready to build?"
        contactHref={contactHref}
      />
    </>
  );
}
