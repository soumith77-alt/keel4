"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlowCard } from "@/components/ui/glow-card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import GlowBackdrop from "@/components/ui/glow-backdrop";
import {
  AutomationDemo,
  VideoDemo,
  VoiceDemo,
  WebsiteDemo,
} from "@/components/ServiceDemos";

export type ServiceCard = {
  title: string;
  slug: string;
  icon?: string;
  image?: string;
  overlayImage?: string;
  outcomeStatement?: string;
  shortDescription?: string;
  features?: string[];
  outcomes?: { metric: string; label: string }[];
  demoVideoUrl?: string;
};

type ServicesSectionProps = {
  services: ServiceCard[];
  className?: string;
};

/** Each service renders its own working micro-demo rather than an icon. */
function ServiceVisual({ slug, demoVideoUrl }: { slug: string; demoVideoUrl?: string }) {
  switch (slug) {
    case "voice-ai":
      return <VoiceDemo />;
    case "agentic-automations":
      return <AutomationDemo className="h-28 sm:h-32" />;
    case "ugc-video":
      // Fixed height rather than a 9:12 aspect: at one column wide the portrait
      // ratio made this tile dominate the whole second row.
      return demoVideoUrl ? (
        <VideoDemo src={demoVideoUrl} className="h-44 w-full sm:h-56" />
      ) : null;
    case "websites":
      return <WebsiteDemo />;
    default:
      return null;
  }
}

/**
 * Asymmetric bento. Voice AI dominates so the offering reads as one focused
 * system rather than four equally-weighted, unrelated services.
 */
export default function ServicesSection({
  services,
  className,
}: ServicesSectionProps) {
  const feature = services.find((s) => s.slug === "voice-ai") ?? services[0];
  const rest = services.filter((s) => s.slug !== feature?.slug);

  return (
    <Section id="services" spacing="lg" className={className}>
      <GlowBackdrop variant="section" />

      <SectionHeading
        eyebrow="What we build"
        title="One system. Four surfaces."
        lead="Voice answers and books. Automations move the data. Video fills the top of the funnel. The site converts what arrives. Each part feeds the next."
      />

      {/* Two rows, mirrored spans: [feature 2 | a 1] / [b 1 | c 2]. Nothing has
          to stretch to fill a row-span, which is what left the dead zone. */}
      <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
        {feature && (
          <RevealItem className="md:col-span-2">
            <ServiceTile service={feature} featured />
          </RevealItem>
        )}
        {rest.map((service, i) => (
          <RevealItem
            key={service.slug}
            className={cn(i === rest.length - 1 && "md:col-span-2")}
          >
            <ServiceTile service={service} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

function ServiceTile({
  service,
  featured = false,
}: {
  service: ServiceCard;
  featured?: boolean;
}) {
  const blurb = service.outcomeStatement || service.shortDescription || "";

  return (
    <GlowCard className="h-full">
      <Link
        href={`/services/${service.slug}`}
        className={cn(
          "group flex h-full flex-col gap-4 p-5 sm:gap-6 sm:p-6",
          featured && "sm:p-8 lg:gap-8"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className={cn("text-fg", featured ? "type-h2" : "type-h3")}>
              {service.title}
            </h3>
            {blurb && (
              <p
                className={cn(
                  "mt-2 text-fg-muted text-pretty",
                  featured ? "type-body measure" : "text-sm leading-relaxed"
                )}
              >
                {blurb}
              </p>
            )}
          </div>
          <ArrowUpRight
            aria-hidden
            className="mt-1 h-5 w-5 shrink-0 text-fg-subtle transition duration-base ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300"
          />
        </div>

        {/* The demo itself */}
        <div className="w-full">
          <ServiceVisual
            slug={service.slug}
            demoVideoUrl={service.demoVideoUrl}
          />
        </div>

        {featured && service.outcomes && service.outcomes.length > 0 && (
          /* data-float-guard: the third metric sits bottom-right, exactly where
             the floating WhatsApp button lands on mobile. The button watches
             for this attribute and steps aside while it is in that corner. */
          <dl
            data-float-guard
            className="mt-auto grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-6"
          >
            {service.outcomes.slice(0, 3).map((outcome) => (
              <div key={outcome.label}>
                <dt className="sr-only">{outcome.label}</dt>
                <dd className="font-mono text-2xl font-medium tracking-tight text-brand-200 tabular-nums">
                  {outcome.metric}
                </dd>
                <span className="mt-1 block text-xs leading-snug text-fg-subtle">
                  {outcome.label}
                </span>
              </div>
            ))}
          </dl>
        )}
      </Link>
    </GlowCard>
  );
}
