import * as React from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import GlowBackdrop from "@/components/ui/glow-backdrop";

/**
 * The standard interior-page hero: eyebrow, display headline, lead.
 *
 * This block was previously copy-pasted character-for-character across
 * /about, /services, /work and /contact — four copies that differed only in
 * their copy and one padding value. Any retheme had to be applied four times
 * and inevitably drifted.
 *
 * The grid hairline uses the theme-scoped --line variable, so it inverts with
 * the surrounding tone. GlowBackdrop hides itself outside a .theme-dark scope,
 * so it is inert here on the light canvas but stays correct if a page is ever
 * flipped to dark.
 *
 * Not used by ServiceLayout — that hero also carries metrics, two buttons and
 * a media slot, so it stays bespoke.
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
        // pt-28 below `sm`: pt-36 was tuned against the desktop bar and left a
        // near-empty first screen on a phone before the headline appeared.
        "relative isolate overflow-hidden bg-surface px-5 pb-10 pt-28 sm:px-8 sm:pb-16 sm:pt-44",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 z-base [background-image:linear-gradient(to_right,rgb(var(--line)/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--line)/0.07)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]"
      />
      <GlowBackdrop variant="hero" className="z-base" />

      <div className="relative z-raised mx-auto w-full max-w-content">
        <Reveal>
          <span className="type-label inline-flex items-center gap-2.5 border border-line/15 bg-fg/[0.04] px-3.5 py-2 text-accent-700">
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="type-display mt-5 max-w-4xl text-fg text-balance sm:mt-7">
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={0.1}>
            <p className="type-body-lg measure mt-5 text-fg-muted text-pretty sm:mt-7">
              {lead}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export default PageHero;
