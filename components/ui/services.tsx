"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import {
  AutomationDemo,
  SaaSDemo,
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

function ServiceVisual({
  slug,
  demoVideoUrl,
}: {
  slug: string;
  demoVideoUrl?: string;
}) {
  switch (slug) {
    case "voice-ai":
      return (
        <div className="flex min-h-72 items-center rounded-panel border border-line/10 bg-surface-raised/35 p-6 sm:p-10">
          <VoiceDemo className="mx-auto w-full max-w-xl" />
        </div>
      );
    case "agentic-automations":
      return (
        <AutomationDemo className="h-72 rounded-panel border border-line/10 bg-surface-raised/35 p-5 sm:h-80 sm:p-8" />
      );
    case "ugc-video":
      return demoVideoUrl ? (
        <VideoDemo src={demoVideoUrl} className="h-72 w-full sm:h-80" />
      ) : null;
    case "websites":
      return <WebsiteDemo className="h-72 sm:h-80" />;
    case "saas-products":
      return <SaaSDemo className="h-72 sm:h-80" />;
    default:
      return null;
  }
}

export default function ServicesSection({
  services,
  className,
}: ServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const active = services[activeIndex];

  if (!active) return null;

  return (
    <Section id="services" spacing="lg" className={className}>
      <SectionHeading
        eyebrow="What we build"
        title="Five disciplines. One connected system."
        lead="Choose a surface. The product, automation and growth thinking stays joined up behind it."
      />

      <Reveal className="mt-12 sm:mt-14">
        <div className="theme-dark relative overflow-hidden rounded-panel bg-surface">
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-10%] top-[10%] h-[34rem] w-[34rem] rounded-full bg-accent-500/15 blur-[120px]"
          />

          <div className="relative grid lg:grid-cols-[0.7fr_1.3fr]">
            <div
              role="tablist"
              aria-label="Services"
              className="border-b border-line/10 lg:border-b-0 lg:border-r"
            >
              {services.map((service, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={service.slug}
                    id={`service-tab-${service.slug}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`service-panel-${service.slug}`}
                    onClick={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onPointerEnter={() => setActiveIndex(index)}
                    className={cn(
                      "group flex w-full items-center gap-4 border-b border-line/10 px-5 py-4 text-left transition-colors duration-base ease-out last:border-b-0 sm:px-7 sm:py-5",
                      selected
                        ? "bg-fg/[0.07]"
                        : "hover:bg-fg/[0.035] focus-visible:bg-fg/[0.035]",
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-xs transition-colors",
                        selected ? "text-accent-500" : "text-fg-subtle",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "type-h3 flex-1 transition-colors",
                        selected ? "text-fg" : "text-fg-muted",
                      )}
                    >
                      {service.title}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className={cn(
                        "h-4 w-4 transition duration-base ease-out",
                        selected
                          ? "translate-x-0 text-accent-500"
                          : "-translate-x-1 text-fg-subtle opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                      )}
                    />
                  </button>
                );
              })}
            </div>

            <div
              id={`service-panel-${active.slug}`}
              role="tabpanel"
              aria-labelledby={`service-tab-${active.slug}`}
              className="min-h-[34rem] p-6 sm:p-9 lg:p-11"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.slug}
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    reduceMotion
                      ? undefined
                      : { opacity: 0, y: -12, scale: 0.99 }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.42,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex h-full flex-col"
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <span className="type-label text-accent-500">
                        Active system
                      </span>
                      <h3 className="type-h2 mt-3 text-fg text-balance">
                        {active.title}
                      </h3>
                      <p className="type-body-lg mt-3 max-w-xl text-fg-muted text-pretty">
                        {active.outcomeStatement || active.shortDescription}
                      </p>
                    </div>
                    <Link
                      href={`/services/${active.slug}`}
                      className="group inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start border-b border-fg/45 pb-1 text-fg transition-colors hover:border-accent-500 hover:text-accent-500 sm:min-h-0"
                    >
                      Explore service
                      <ArrowRight
                        aria-hidden
                        className="h-4 w-4 transition-transform duration-base group-hover:translate-x-1"
                      />
                    </Link>
                  </div>

                  {active.features && active.features.length > 0 && (
                    <ul
                      className="my-7 flex flex-wrap gap-2"
                      aria-label="Included capabilities"
                    >
                      {active.features.slice(0, 3).map((feature) => (
                        <li
                          key={feature}
                          className="rounded-full border border-line/10 bg-fg/[0.04] px-3 py-1.5 text-xs text-fg-muted"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto">
                    <ServiceVisual
                      slug={active.slug}
                      demoVideoUrl={active.demoVideoUrl}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Reveal>

      <ProcessRow />
    </Section>
  );
}

const PROCESS = [
  "Discovery call",
  "System design",
  "Build & deploy",
  "Measure & compound",
];

function ProcessRow() {
  return (
    <RevealGroup className="mt-14 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line/15 pt-8 lg:grid-cols-4 lg:gap-x-10">
      {PROCESS.map((step, i) => (
        <RevealItem key={step} className="flex min-h-16 flex-col gap-2">
          <span className="font-mono text-sm text-accent-700">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="type-h3 text-fg">{step}</span>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
