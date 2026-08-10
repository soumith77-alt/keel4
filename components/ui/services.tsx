"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import {
  AutomationDemo,
  SaaSDemo,
  VideoDemo,
  VoiceDemo,
  WebsiteDemo,
} from "@/components/ServiceDemos";

/**
 * SERVICES — an editorial index, not a second control panel.
 *
 * The last version put a dark rounded panel with a tab rail here. That is the
 * same object as the old hero, at the same scale, forty percent down the page:
 * two dashboards is what made the site read as one repeated pattern rather
 * than as a sequence of scenes.
 *
 * The composition now inverts the hero completely:
 *   · PAPER, not obsidian. The scene changes.
 *   · TYPE IS THE INTERFACE. Five oversized service names ARE the control.
 *     Inactive entries are outlined; the active one fills in. No tabs, no
 *     chrome, no card.
 *   · THE VISUAL BLEEDS. The active demonstration runs off the right edge of
 *     the viewport instead of sitting inside the same centred container as
 *     everything else, so the section has a different shape to its neighbours.
 *
 * The tablist semantics are unchanged and correct: one tab stop, arrows to
 * move, selection does not follow focus.
 */

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

const PROPOSITION: Record<string, string> = {
  "voice-ai":
    "AI voice systems that qualify, support and convert without losing context.",
  "agentic-automations":
    "Operational systems that understand context, choose actions and execute across your tools.",
  "ugc-video":
    "A repeatable creative system for producing and improving campaign content.",
  websites:
    "High-performance websites designed as measurable acquisition systems.",
  "saas-products":
    "SaaS products designed, engineered and launched by one integrated team.",
};

const CAPABILITIES: Record<string, string[]> = {
  "voice-ai": [
    "Inbound and outbound agents",
    "Qualification and routing",
    "CRM and calendar integration",
  ],
  "agentic-automations": [
    "Multi-step agents",
    "Workflow automation",
    "Human approval and monitoring",
  ],
  "ugc-video": [
    "Creative ideation",
    "AI-assisted production",
    "Performance-led iteration",
  ],
  websites: [
    "Positioning and UX",
    "Design and development",
    "Conversion instrumentation",
  ],
  "saas-products": [
    "Product strategy",
    "Application development",
    "AI-native features",
  ],
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
        <div className="flex min-h-[18rem] items-center p-6 sm:min-h-[21rem] sm:p-9">
          <VoiceDemo className="mx-auto w-full max-w-xl" />
        </div>
      );
    case "agentic-automations":
      return <AutomationDemo className="h-[18rem] p-6 sm:h-[21rem] sm:p-9" />;
    case "ugc-video":
      return demoVideoUrl ? (
        <VideoDemo src={demoVideoUrl} className="h-[18rem] w-full border-0 sm:h-[21rem]" />
      ) : null;
    case "websites":
      return <WebsiteDemo className="h-[18rem] border-0 sm:h-[21rem]" />;
    case "saas-products":
      return <SaaSDemo className="h-[18rem] border-0 sm:h-[21rem]" />;
    default:
      return null;
  }
}

export default function ServicesSection({
  services,
  className,
}: ServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion() ?? false;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = services[activeIndex];

  if (!active) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = services.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight")
      next = activeIndex === last ? 0 : activeIndex + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft")
      next = activeIndex === 0 ? last : activeIndex - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="services"
      className={cn(
        "theme-light relative scroll-mt-24 overflow-hidden bg-surface py-12 sm:py-20 lg:py-24",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-wide px-5 sm:px-8">
        <Reveal className="flex items-baseline gap-3">
          <span aria-hidden className="h-px w-8 translate-y-[-0.35rem] bg-accent-600" />
          <p className="type-mono-sm text-fg-subtle">What we build</p>
        </Reveal>
      </div>

      {/**
        * THE STAGE NO LONGER BLEEDS OFF THE RIGHT EDGE.
        *
        * It used to sit outside the centred container so the demonstration ran
        * to the viewport edge — a deliberate choice, meant to give the section
        * a different shape to its neighbours. In practice it read as the panel
        * falling out of the page: every other block on the site stops at the
        * same gutter, and this one alone had a right margin of zero, so it
        * looked clipped rather than composed.
        *
        * The grid now sits INSIDE the same `max-w-wide` container as the
        * section label above it, so the stage's right edge lines up with the
        * eyebrow, the headline and the footer.
        */}
      <div className="mx-auto mt-8 grid w-full max-w-wide gap-8 px-5 sm:px-8 lg:mt-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-12">
        {/* ── The index. The type is the control. ── */}
        <div className="w-full min-w-0">
          <div
            role="tablist"
            aria-label="Services"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex flex-col"
          >
            {services.map((service, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={service.slug}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  id={`service-tab-${service.slug}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="service-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  className="group flex min-h-[56px] items-baseline gap-4 border-b border-line/12 py-3.5 text-left sm:gap-6 sm:py-4"
                >
                  <span
                    className={cn(
                      "type-mono-sm shrink-0 transition-colors duration-fast ease-micro",
                      selected ? "text-signal" : "text-fg-subtle",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/**
                   * Weight and tone carry the state, not an outline.
                   *
                   * These were `text-transparent` with a `-webkit-text-stroke`,
                   * which looked good and measured 2.02:1 — the four services
                   * you have not selected were, by the numbers, unreadable, and
                   * this list is the section's only navigation. Hollow type is
                   * not worth an illegible control.
                   *
                   * `text-fg/60` is 4.48:1, which clears normal-text contrast
                   * even though this qualifies as large text and only needed
                   * 3:1. The size jump plus the weight change still makes the
                   * selected item unmistakable.
                   */}
                  <span
                    className={cn(
                      "transition-all duration-base ease-out",
                      selected
                        ? "type-h2 text-fg"
                        // 70%, not 60%. `type-h3` now starts at 23.2px, which
                        // is UNDER the 24px large-text threshold, so 4.46:1 is
                        // measured against the 4.5:1 normal-text bar and fails.
                        // At 70% it is 6.2:1, and the size and weight jump to
                        // the selected state still carries the distinction.
                        : "type-h3 text-fg/70 group-hover:text-fg",
                    )}
                  >
                    {service.title}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{
                duration: reduceMotion ? 0 : 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pt-6"
            >
              <p className="type-body-lg max-w-md text-fg text-pretty">
                {PROPOSITION[active.slug] ?? active.shortDescription}
              </p>

              <ul className="mt-5 space-y-1.5" aria-label="Capabilities">
                {(CAPABILITIES[active.slug] ?? []).map((capability) => (
                  <li
                    key={capability}
                    className="type-small flex items-baseline gap-2.5 text-fg-muted"
                  >
                    <span
                      aria-hidden
                      className="block h-1 w-1 shrink-0 translate-y-[-0.15rem] rounded-full bg-accent-600"
                    />
                    {capability}
                  </li>
                ))}
              </ul>

              <Link
                href={`/services/${active.slug}`}
                className="group mt-7 inline-flex min-h-[44px] items-center gap-2 border-b border-fg pb-1 text-fg transition-colors duration-fast ease-micro hover:border-accent-700 hover:text-signal"
              >
                <span className="type-body">Explore {active.title}</span>
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-fast ease-micro group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── The stage. Aligned to the container gutter, both sides. ── */}
        <div
          id="service-panel"
          role="tabpanel"
          aria-labelledby={`service-tab-${active.slug}`}
          // Sticky from `lg`. The index column is roughly twice the height of
          // the stage, so without this the demonstration scrolls away while
          // the visitor is still reading the service it belongs to — and it
          // left ~500px of empty paper beside the capabilities list.
          className="min-w-0 lg:sticky lg:top-24"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.slug}
              // Progressive blur on the switch: the outgoing scene defocuses
              // rather than sliding, which is what a system swapping context
              // should look like.
              initial={
                reduceMotion ? false : { opacity: 0, filter: "blur(10px)", scale: 0.99 }
              }
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={
                reduceMotion ? undefined : { opacity: 0, filter: "blur(10px)", scale: 1.005 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden rounded-panel border border-line/12 bg-surface-raised"
            >
              <ServiceVisual
                slug={active.slug}
                demoVideoUrl={active.demoVideoUrl}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
