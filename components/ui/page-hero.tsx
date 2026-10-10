import * as React from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

/**
 * The standard interior-page hero: eyebrow, display headline, lead. Shared by
 * /about, /services, /work and /contact so a retheme is one edit.
 */
type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Extra classes on the <section>, e.g. to tune bottom padding. */
  className?: string;
};

export function PageHero({ eyebrow, title, lead, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative bg-surface pb-[calc(var(--section-y)*0.5)] pt-[calc(68px+clamp(2.5rem,6vw,5rem))]",
        className
      )}
    >
      <div className="site-container">
        <Reveal>
          <span className="type-label inline-flex items-center gap-2.5 text-signal">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald" />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="type-display mt-5 max-w-4xl text-fg text-balance">
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={0.12}>
            <p className="type-body-lg measure mt-6 text-fg-muted text-pretty">
              {lead}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export default PageHero;
