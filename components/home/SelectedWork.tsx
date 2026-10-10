import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

import { projects, type Project } from '@/config/content';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';
import { BrowserFrame, Shot } from './frames';

/**
 * SELECTED WORK — real products, straight after the hero.
 *
 * One featured project (large), one complementary project (narrow), and one
 * supporting automation case study (wide, shorter). Every line of copy comes
 * from the project record in config/content.ts, which is traceable to the
 * long-form summary on /work. Scope numbers are presented as scope, never as
 * a commercial result.
 *
 * Mobile order is the DOM order: featured, complementary, supporting — each
 * image first, then its facts.
 */

const FEATURED = 'football-intelligence-os';
const COMPLEMENT = 'artizyn';
const SUPPORTING = 'ivr-audit-engine';

function find(slug: string) {
  return projects.find((p) => p.slug === slug);
}

function Media({ project, sizes, className }: { project: Project; sizes: string; className?: string }) {
  if (!project.image || !project.imageWidth || !project.imageHeight) return null;
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[radial-gradient(110%_80%_at_80%_0%,#D6EADF_0%,#E5F1EA_50%,#EEF2EA_100%)] p-[clamp(1rem,3vw,2.25rem)]',
        className,
      )}
    >
      <BrowserFrame label={project.title} tone="dark" className="transition-transform duration-base ease-out group-hover:-translate-y-1">
        <Shot
          src={project.image}
          srcSmall={project.imageSmall}
          width={project.imageWidth}
          height={project.imageHeight}
          alt={`${project.title}: product interface designed and built by Keeel.`}
          sizes={sizes}
        />
      </BrowserFrame>
    </div>
  );
}

function Meta({ project }: { project: Project }) {
  return (
    <p className="type-mono-sm text-fg-subtle">
      {project.category}
    </p>
  );
}

function Built({ project }: { project: Project }) {
  if (!project.built?.length) return null;
  return (
    <div>
      <h4 className="type-mono-sm text-fg-subtle">What Keeel built</h4>
      <ul className="mt-3 space-y-2.5">
        {project.built.map((line) => (
          <li key={line} className="flex gap-2.5 text-[0.9375rem] leading-snug text-fg-muted">
            <Check aria-hidden className="mt-[0.2rem] h-4 w-4 shrink-0 text-signal" strokeWidth={2.25} />
            <span className="text-pretty">{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailsLink({ project }: { project: Project }) {
  return (
    <Link
      href={`/work#${project.slug}`}
      className="group/link inline-flex min-h-[44px] items-center gap-2 text-[0.9375rem] font-semibold text-fg"
    >
      <span className="border-b border-fg/30 pb-0.5 transition-colors duration-fast group-hover/link:border-emerald group-hover/link:text-signal">
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
    <section id="work" aria-labelledby="work-heading" className="bg-surface pb-[var(--section-y)] pt-[calc(var(--section-y)*0.35)]">
      <div className="site-container">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="type-label text-signal">Selected work</p>
            <h2 id="work-heading" className="type-h2 mt-4 max-w-[16ch] text-fg text-balance">
              Products we’ve brought to life.
            </h2>
          </div>
          <Link
            href="/work"
            className="group inline-flex min-h-[44px] items-center gap-2 self-start text-[0.9375rem] font-semibold text-fg sm:self-end"
          >
            <span className="border-b border-fg/30 pb-0.5 transition-colors duration-fast group-hover:border-emerald group-hover:text-signal">
              All work
            </span>
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-fast ease-micro group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-12 lg:gap-6">
          {/* Featured */}
          <Reveal className="lg:col-span-8">
            <article className="group flex h-full flex-col overflow-hidden rounded-panel border border-hairline bg-surface-raised shadow-glow-sm">
              <Media
                project={featured}
                sizes="(min-width: 1024px) 760px, 92vw"
              />
              <div className="grid flex-1 gap-8 p-6 sm:p-8 md:grid-cols-[1fr_1.05fr] md:gap-10">
                <div>
                  <Meta project={featured} />
                  <h3 className="type-h3 mt-3 text-fg">{featured.title}</h3>
                  <p className="type-body mt-3 text-fg-muted text-pretty">{featured.purpose}</p>
                  <div className="mt-5">
                    <DetailsLink project={featured} />
                  </div>
                </div>
                <Built project={featured} />
              </div>
            </article>
          </Reveal>

          {/* Complementary */}
          <Reveal delay={0.06} className="lg:col-span-4">
            <article className="group flex h-full flex-col overflow-hidden rounded-panel border border-hairline bg-surface-raised shadow-glow-sm">
              <Media
                project={complement}
                sizes="(min-width: 1024px) 380px, 92vw"
              />
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <Meta project={complement} />
                <h3 className="type-h3 mt-3 text-fg">{complement.title}</h3>
                <p className="type-body mt-3 text-fg-muted text-pretty">{complement.purpose}</p>
                <div className="mt-6">
                  <Built project={complement} />
                </div>
                <div className="mt-auto pt-5">
                  <DetailsLink project={complement} />
                </div>
              </div>
            </article>
          </Reveal>

          {/* Supporting automation case study */}
          {supporting && (
            <Reveal className="lg:col-span-12">
              <article className="group grid overflow-hidden rounded-panel border border-hairline bg-surface-raised shadow-glow-sm md:grid-cols-[1.1fr_1fr]">
                <div className="order-2 flex flex-col p-6 sm:p-8 md:order-1 lg:p-10">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="type-mono-sm rounded-pill bg-mint px-2.5 py-1 text-signal">
                      Supporting case study
                    </span>
                    <Meta project={supporting} />
                  </div>
                  <h3 className="type-h3 mt-4 text-fg">{supporting.title}</h3>
                  <p className="type-body mt-3 max-w-[34rem] text-fg-muted text-pretty">{supporting.purpose}</p>
                  <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
                    <Built project={supporting} />
                    {supporting.scope && (
                      <dl className="rounded-card border border-hairline bg-surface px-5 py-4">
                        <dt className="type-mono-sm text-fg-subtle">Project scope</dt>
                        <dd className="mt-1 text-[0.9375rem] font-semibold text-fg">{supporting.scope}</dd>
                      </dl>
                    )}
                  </div>
                  <div className="mt-auto pt-6">
                    <DetailsLink project={supporting} />
                  </div>
                </div>
                <Media
                  project={supporting}
                  sizes="(min-width: 768px) 560px, 92vw"
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
