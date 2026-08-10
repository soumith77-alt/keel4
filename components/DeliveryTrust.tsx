import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

/**
 * TRUST AND CAPABILITY — compressed.
 *
 * The previous version spent 78 words and a five-line ragged headline making
 * one point: when the engagement ends, you own a working system. It now makes
 * that point in a headline and three short lines, and uses the space it saved
 * to state the surfaces Keel actually deploys into — which is the question a
 * serious buyer asks next and which the page did not answer anywhere.
 *
 * `SURFACES` is deliberately generic-by-category rather than a logo wall. A
 * marquee of vendor logos would imply partnerships that have not been claimed;
 * naming the categories is true, useful, and can be sharpened into named
 * integrations the moment there is permission to name them.
 */
const COMMITMENTS = [
  {
    title: "A working product",
    detail: "Deployed and usable — not a deck or a disconnected prototype.",
  },
  {
    title: "Your code, your infrastructure",
    detail: "Repos, accounts, docs and credentials stay with you from handoff.",
  },
  {
    title: "A measurable loop",
    detail: "Events and dashboards are built in, not added at the end.",
  },
];

const SURFACES = [
  "Telephony and voice",
  "CRM and pipeline",
  "Calendars and scheduling",
  "Payments and billing",
  "Data warehouse and events",
  "Ad platforms",
  "Internal tooling and APIs",
  "Web and product analytics",
];

export default function DeliveryTrust() {
  return (
    <Section tone="light" spacing="md">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <span className="type-label flex items-center gap-3 text-signal">
            <span aria-hidden className="h-px w-8 bg-accent-600" />
            Built for handoff
          </span>
          <h2 className="type-h2 mt-5 text-fg text-balance">
            The engagement ends. The system keeps working.
          </h2>
        </Reveal>

        <div className="lg:col-span-7">
          <RevealGroup className="grid border-t border-line/15">
            {COMMITMENTS.map((item) => (
              <RevealItem
                key={item.title}
                className="grid gap-1 border-b border-line/15 py-5 sm:grid-cols-[1fr_1.4fr] sm:gap-8"
              >
                <h3 className="type-h4 text-fg">{item.title}</h3>
                <p className="type-body text-fg-muted text-pretty">
                  {item.detail}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-9">
            <span className="type-mono-sm text-fg-subtle">
              Surfaces we deploy into
            </span>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SURFACES.map((surface) => (
                <li
                  key={surface}
                  className="rounded-pill border border-line/15 px-3 py-1.5 text-xs text-fg-muted"
                >
                  {surface}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
