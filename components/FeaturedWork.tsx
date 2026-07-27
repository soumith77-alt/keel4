'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { projects, type Project } from '@/config/content';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/ui/reveal';
import KeelSystem, { type SystemForm } from '@/components/KeelSystem';

/**
 * Selected work, media-led.
 *
 * The previous version was three text-only cards, which asked project titles
 * and descriptions to carry all the visual weight. Here the visual occupies
 * roughly two thirds of each composition: one large cinematic panel, two
 * smaller ones beneath.
 *
 * ASSETS: `project.image` / `project.video` are the real thing and should be
 * filled in — an interface crop, render or branded still per project. Until
 * then the panel renders the Keel system object keyed to the project's
 * service. That is a deliberate choice over a grey placeholder: it reuses the
 * hero's visual language so it recurs across the page (which is what makes a
 * visual system read as identity), and it is an honest diagram rather than a
 * fabricated screenshot.
 */

/** Map a project's service onto the matching system form. */
function formFor(service: string): SystemForm {
  const s = service.toLowerCase();
  if (s.includes('voice')) return 'voice';
  if (s.includes('automation')) return 'workflow';
  if (s.includes('video') || s.includes('ugc')) return 'video';
  return 'convert';
}

function IVRAuditVisual() {
  return (
    <div className="grid h-full grid-cols-[0.72fr_1.28fr] gap-4 p-6 sm:p-8">
      <div className="flex flex-col justify-between border border-line/10 bg-fg/[0.025] p-5">
        <span className="type-label text-fg-subtle">Friction score</span>
        <div>
          <span className="font-mono text-5xl text-accent-500">82</span>
          <span className="ml-1 font-mono text-sm text-fg-subtle">/100</span>
        </div>
        <div className="space-y-2">
          {[76, 52, 88].map((width, i) => (
            <span key={i} className="block h-1.5 bg-fg/10">
              <span
                className="block h-full bg-accent-500"
                style={{ width: `${width}%` }}
              />
            </span>
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden border border-line/10 bg-fg/[0.025]">
        <span className="type-label absolute left-4 top-4 text-fg-subtle">
          IVR map
        </span>
        <div className="absolute inset-x-5 bottom-6 top-12">
          <span className="absolute left-1/2 top-0 h-9 w-20 -translate-x-1/2 border border-accent-500/60 bg-accent-500/10" />
          <span className="absolute left-1/2 top-9 h-8 w-px bg-fg/20" />
          <span className="absolute left-[20%] right-[20%] top-[4.25rem] h-px bg-fg/20" />
          {[20, 50, 80].map((left) => (
            <span key={left}>
              <span
                className="absolute top-[4.25rem] h-9 w-px bg-fg/20"
                style={{ left: `${left}%` }}
              />
              <span
                className="absolute top-[6.5rem] h-8 w-16 -translate-x-1/2 border border-line/15 bg-surface"
                style={{ left: `${left}%` }}
              />
              <span
                className="absolute top-[9.75rem] h-1.5 w-12 -translate-x-1/2 bg-fg/12"
                style={{ left: `${left}%` }}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarketplaceVisual() {
  return (
    <div className="h-full p-6 sm:p-8">
      <div className="flex h-full flex-col overflow-hidden border border-line/10 bg-fg/[0.025]">
        <div className="flex items-center justify-between border-b border-line/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-accent-500" />
            <span className="h-2 w-20 rounded-full bg-fg/45" />
          </div>
          <span className="h-7 w-20 bg-accent-500" />
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[0.42fr_1fr]">
          <div className="space-y-3 border-r border-line/10 p-4">
            <span className="type-label text-fg-subtle">Filters</span>
            {[90, 70, 82, 58].map((width) => (
              <span
                key={width}
                className="block h-2 rounded-full bg-fg/10"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 p-4">
            {[0, 1, 2, 3].map((n) => (
              <div key={n} className="flex flex-col border border-line/10 bg-surface p-3">
                <span className="mb-3 block aspect-[16/8] bg-gradient-to-br from-accent-500/35 to-fg/[0.03]" />
                <span className="h-2 w-4/5 rounded-full bg-fg/45" />
                <span className="mt-2 h-1.5 w-1/2 rounded-full bg-fg/12" />
                <span className="mt-auto pt-3 font-mono text-[10px] text-accent-500">
                  AVAILABLE
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Visual({ project }: { project: Project }) {
  if (project.video) {
    return (
      <video
        src={project.video}
        muted
        loop
        autoPlay
        playsInline
        className="h-full w-full object-cover"
      />
    );
  }
  if (project.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.image}
        alt={`${project.title} product interface`}
        className="h-full w-full object-cover object-top"
        loading="lazy"
      />
    );
  }
  if (project.slug === 'ivr-audit-engine') return <IVRAuditVisual />;
  if (project.slug === 'artizyn') return <MarketplaceVisual />;

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        aria-hidden
        className="pointer-events-none absolute h-2/3 w-2/3 rounded-full bg-accent-500/20 blur-[90px]"
      />
      <KeelSystem
        form={formFor(project.service)}
        className="relative h-[82%] w-[82%] text-fg"
      />
    </div>
  );
}

function Panel({ project }: { project: Project }) {
  return (
    <article className="theme-dark group grid h-full grid-rows-[auto_1fr] overflow-hidden rounded-panel bg-surface">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line/10">
        <Visual project={project} />
      </div>

      <div className="flex min-h-[18rem] flex-col gap-4 p-7">
        <div className="flex items-center gap-3">
          <span className="type-label text-accent-500">{project.service}</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-fg/30" />
          <span className="type-label text-fg-subtle">{project.year}</span>
        </div>

        <h3 className="type-h3 min-h-[3.25rem] text-fg">
          {project.title}
        </h3>
        <p className="type-body text-fg-muted text-pretty">{project.claim}</p>

        {project.results && project.results.length > 0 && (
          <dl className="mt-auto flex flex-wrap gap-x-10 gap-y-4 pt-4">
            {project.results.slice(0, 2).map((r) => (
              <div key={r.label}>
                <dt className="sr-only">{r.label}</dt>
                <dd className="font-mono text-2xl font-medium tabular-nums text-accent-500">
                  {r.metric}
                </dd>
                <span className="mt-1 block text-xs leading-snug text-fg-subtle">
                  {r.label}
                </span>
              </div>
            ))}
          </dl>
        )}
      </div>
    </article>
  );
}

export default function FeaturedWork() {
  const featured = projects.filter((p) => p.featured);
  const pool = featured.length > 0 ? featured : projects;
  const [lead, ...rest] = pool.slice(0, 3);

  if (!lead) return null;

  return (
    <Section tone="light" spacing="lg" id="work">
      <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="type-h1 text-fg text-balance">Selected work</h2>
        <Link
          href="/work"
          className="group inline-flex min-h-[44px] items-center gap-2 self-start border-b border-fg pb-1 text-fg transition-colors duration-base ease-out hover:border-accent-700 hover:text-accent-700 sm:min-h-0"
        >
          <span className="type-body">View all</span>
          <ArrowRight
            className="h-4 w-4 transition-transform duration-base ease-out group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[lead, ...rest].map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05} className="h-full">
            <Panel project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
