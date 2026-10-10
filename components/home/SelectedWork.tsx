import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { projects, type Project } from '@/config/content';
import { Reveal } from '@/components/ui/reveal';
import { Eyebrow } from '@/components/ui/keel';
import { cn } from '@/lib/utils';
import { CropShot } from './frames';

/**
 * SELECTED WORK — real products, straight after the hero.
 *
 * The hero shows Football Intelligence OS whole; here each project shows ONE
 * focused, legible region instead (`focus` in config/content.ts), so the two
 * sections never repeat the same dashboard at two sizes.
 *
 * Copy is deliberately short: a purpose line and two or three highlight
 * chips. Everything deeper (challenge, system, full summary) lives on /work.
 * Scope numbers are presented as scope, never as a commercial result.
 *
 * Mobile order is the DOM order: featured, complementary, supporting.
 */

const FEATURED = 'football-intelligence-os';
const COMPLEMENT = 'artizyn';
const SUPPORTING = 'ivr-audit-engine';

function find(slug: string) {
  return projects.find((p) => p.slug === slug);
}

function Focus({ project, sizes, className }: { project: Project; sizes: string; className?: string }) {
  const { image, imageWidth, imageHeight, focus } = project;
  if (!image || !imageWidth || !imageHeight || !focus) return null;
  return (
    <figure className={cn('bg-[radial-gradient(110%_80%_at_80%_0%,#DCE3F3_0%,#E7ECF6_50%,#EEF0F4_100%)] p-3 sm:p-4', className)}>
      <div className="w-full overflow-hidden rounded-[12px] shadow-frame ring-1 ring-[#0e1836]/10 transition-transform duration-base ease-out group-hover:-translate-y-0.5">
        <CropShot
          src={image}
          srcSmall={project.imageSmall}
          width={imageWidth}
          height={imageHeight}
          crop={focus}
          alt={`${project.title}: ${focus.label}.`}
          sizes={sizes}
        />
      </div>
    </figure>
  );
}

function Highlights({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Highlights">
      {items.map((h) => (
        <li key={h} className="rounded-pill border border-hairline bg-surface px-3 py-1 text-[0.8125rem] text-fg-muted">
          {h}
        </li>
      ))}
    </ul>
  );
}

function DetailsLink({ project }: { project: Project }) {
  return (
    <Link
      href={`/work#${project.slug}`}
      className="group/link inline-flex min-h-[44px] shrink-0 items-center gap-2 text-[0.9375rem] font-semibold text-fg"
    >
      <span className="border-b border-fg/30 pb-0.5 transition-colors duration-fast group-hover/link:border-accent-500 group-hover/link:text-signal">
        Project details
      </span>
      <ArrowRight
        aria-hidden
        className="h-4 w-4 transition-transform duration-fast ease-micro group-hover/link:translate-x-1"
      />
      <span className="sr-only">: {project.title}</span>
    </Link>
  );
}

export default function SelectedWork() {
  const featured = find(FEATURED);
  const complement = find(COMPLEMENT);
  const supporting = find(SUPPORTING);
  if (!featured || !complement) return null;

  return (
    <section id="work" aria-labelledby="work-heading" className="bg-surface pb-[calc(var(--section-y)*0.6)] pt-[calc(var(--section-y)*0.4)]">
      <div className="site-container">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <h2 id="work-heading" className="type-h2 mt-4 max-w-[18ch] text-fg text-balance">
              Products we’ve brought to life.
            </h2>
          </div>
          <Link
            href="/work"
            className="group inline-flex min-h-[44px] items-center gap-2 self-start text-[0.9375rem] font-semibold text-fg sm:self-end"
          >
            <span className="border-b border-fg/30 pb-0.5 transition-colors duration-fast group-hover:border-accent-500 group-hover:text-signal">
              All work
            </span>
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-fast ease-micro group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-12 lg:gap-6">
          {/* Featured */}
          <Reveal className="lg:col-span-8">
            <article className="group flex h-full flex-col overflow-hidden rounded-panel border border-hairline bg-surface-raised shadow-glow-sm">
              <Focus project={featured} sizes="(min-width: 1024px) 1250px, 150vw" />
              <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
                <Eyebrow as="div" index="01" className="text-fg-subtle">
                  {featured.category}
                </Eyebrow>
                <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end md:gap-8">
                  <div>
                    <h3 className="type-h3 text-fg">{featured.title}</h3>
                    <p className="type-body mt-2 max-w-[34rem] text-fg-muted text-pretty">{featured.purpose}</p>
                  </div>
                  <DetailsLink project={featured} />
                </div>
                <Highlights items={featured.highlights} />
              </div>
            </article>
          </Reveal>

          {/* Complementary */}
          <Reveal delay={0.06} className="lg:col-span-4">
            <article className="group flex h-full flex-col overflow-hidden rounded-panel border border-hairline bg-surface-raised shadow-glow-sm">
              <Focus project={complement} sizes="(min-width: 1024px) 950px, 230vw" />
              <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
                <Eyebrow as="div" index="02" className="text-fg-subtle">
                  {complement.category}
                </Eyebrow>
                <div>
                  <h3 className="type-h3 text-fg">{complement.title}</h3>
                  <p className="type-body mt-2 text-fg-muted text-pretty">{complement.purpose}</p>
                </div>
                <Highlights items={complement.highlights} />
                <div className="mt-auto">
                  <DetailsLink project={complement} />
                </div>
              </div>
            </article>
          </Reveal>

          {/* Supporting automation case study — compact, horizontal */}
          {supporting && (
            <Reveal className="lg:col-span-12">
              <article className="group grid overflow-hidden rounded-panel border border-hairline bg-surface-raised shadow-glow-sm md:grid-cols-[1fr_minmax(0,0.9fr)]">
                <div className="order-2 flex flex-col gap-4 p-6 sm:p-7 md:order-1 lg:p-9">
                  <Eyebrow as="div" index="03" className="text-fg-subtle">
                    Supporting case study · {supporting.category}
                  </Eyebrow>
                  <div>
                    <h3 className="type-h3 text-fg">{supporting.title}</h3>
                    <p className="type-body mt-2 max-w-[34rem] text-fg-muted text-pretty">{supporting.purpose}</p>
                  </div>
                  <Highlights items={supporting.highlights} />
                  <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2">
                    {supporting.scope && (
                      <p className="text-[0.9375rem] text-fg-muted">
                        <span className="type-mono-sm mr-2 text-fg-subtle">Scope</span>
                        <span className="font-semibold text-fg">{supporting.scope}</span>
                      </p>
                    )}
                    <DetailsLink project={supporting} />
                  </div>
                </div>
                <Focus
                  project={supporting}
                  sizes="(min-width: 768px) 900px, 165vw"
                  className="order-1 flex items-center md:order-2"
                />
              </article>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
