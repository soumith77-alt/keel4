import { Check } from "lucide-react";

import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const COMMITMENTS = [
  {
    title: "Working product",
    detail:
      "A deployed system your team can use—not a concept deck or a disconnected prototype.",
  },
  {
    title: "Your code and infrastructure",
    detail:
      "Repos, accounts, documentation and credentials remain with you from handoff onward.",
  },
  {
    title: "A measurable operating loop",
    detail:
      "Events, dashboards and next-iteration decisions are designed into the product.",
  },
];

export default function DeliveryTrust() {
  return (
    <Section tone="raised" spacing="md">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <Reveal>
          <span className="type-label text-accent-700">Built for handoff</span>
          <h2 className="type-h2 mt-4 text-fg text-balance">
            The engagement ends. The system keeps working.
          </h2>
          <p className="type-body-lg mt-5 max-w-md text-fg-muted text-pretty">
            Clear ownership, deployable work and measurement are part of the
            build—not extras added at the end.
          </p>
        </Reveal>

        <RevealGroup className="grid gap-0 border-t border-line/15">
          {COMMITMENTS.map((item) => (
            <RevealItem
              key={item.title}
              className="grid gap-3 border-b border-line/15 py-6 sm:grid-cols-[1fr_1.35fr] sm:gap-8"
            >
              <h3 className="type-h3 flex items-start gap-3 text-fg">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500 text-ink">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                {item.title}
              </h3>
              <p className="type-body text-fg-muted text-pretty">
                {item.detail}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
