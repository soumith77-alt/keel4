'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { projectChapterEnv, projects, type Project } from '@/config/content';
import { Reveal } from '@/components/ui/reveal';

/**
 * SELECTED WORK — one chapter layout, used everywhere.
 *
 * This has been narrowed twice. It began as three bespoke compositions, which
 * opened most of an empty viewport at the IVR → Artizyn seam and put the same
 * three facts in three different places. That was replaced by two patterns, a
 * full-width "featured" treatment for the first project and a 40/60 split for
 * the rest — and the featured project then read as substantially more
 * premium than the other two, which is a ranking nobody asked for.
 *
 * There is now ONE layout: 40% information, 60% media, sides alternating,
 * every stage 16:10. Every project gets the same room, the same fact
 * structure, the same CTA and the same mobile order (title → visual → facts).
 * The only thing that varies between chapters is the surface a chapter sits
 * on, which carries the page's light/dark rhythm.
 *
 * NO ENTRANCE ANIMATION ON THE MEDIA. The stage used to wipe open with a
 * clip-path reveal, which meant a screenshot could be caught mid-transition
 * and read as washed out — a fade that makes the product look worse is worse
 * than no fade. Images are simply present.
 *
 * IMAGE RULES ARE NON-NEGOTIABLE. Dense product UI is contained, never cropped
 * through its own interface text; every image declares its intrinsic size and
 * a responsive source set.
 */

/**
 * Chapter environments. Restrained on purpose: the difference between the
 * three is the SURFACE and how the product frame is lit, not a new palette.
 * Giving each project its own colours would have broken the one thing that
 * makes these read as one studio's work.
 */
export type Env = 'obsidian' | 'paper' | 'raised';

const ENV: Record<Env, { section: string; frame: string }> = {
  // Near-black. The hero project, and the only chapter that inverts.
  obsidian: {
    section: 'theme-obsidian bg-surface text-fg',
    frame: 'border-line/14 bg-[rgb(var(--canvas-raised))]',
  },
  // The canvas, with the interface held in a navy frame — a cool, technical
  // surround for a dense workflow diagram.
  paper: {
    section: 'theme-light bg-surface text-fg',
    frame: 'border-line/12 bg-surface-raised',
  },
  // White paper, same navy frame. Warmer by contrast with the canvas above it
  // rather than by introducing a warmer colour.
  raised: {
    section: 'theme-light bg-surface-raised text-fg',
    frame: 'border-line/12 bg-surface',
  },
};

/**
 * THE PRODUCT STAGE.
 *
 * One definition for every project image on the page. It declares a ratio, a
 * fit, a frame, an internal pad and a loading strategy, because the previous
 * version left those to each chapter and produced a 3:2 here, a 16:10 there,
 * and dashboards enlarged past the point where their own labels stayed
 * readable.
 *
 * `contain` is the default and it is deliberate: every asset on this page is
 * dense product UI, and `cover` crops through interface text. Only an image
 * whose crop has been approved sets `fit: 'cover'` in the data layer.
 */
function Stage({
  project,
  env,
  priority,
  className,
}: {
  project: Project;
  env: Env;
  priority?: boolean;
  className?: string;
}) {
  const contain = project.fit !== 'cover';

  return (
    <div
      className={cn(
        // ONE ratio, every project, every breakpoint. The exceptions that
        // used to live here (16:9 for the featured chapter, 4:3 on phones)
        // are exactly what made the section read as unfinished.
        'relative overflow-hidden rounded-panel border aspect-project-standard',
        ENV[env].frame,
        className,
      )}
    >
      {project.video ? (
        <video
          src={project.video}
          muted
          loop
          autoPlay
          playsInline
          className="h-full w-full object-cover"
        />
      ) : project.image ? (
        // 20–56px of internal pad, fluid. Dense UI needs air inside its frame
        // or it reads as a screenshot pasted onto the page.
        <div className={cn('h-full w-full', contain && 'p-[clamp(0.75rem,1.4vw,1.5rem)]')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            srcSet={
              project.imageSmall && project.imageWidth
                ? `${project.imageSmall} 800w, ${project.image} ${project.imageWidth}w`
                : undefined
            }
            alt={`${project.title} — product interface`}
            width={project.imageWidth}
            height={project.imageHeight}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            // Matches the seven-of-twelve media column, so the browser does
            // not pick the 800px source for a 1200px stage and upscale it.
            sizes="(min-width: 1024px) 58vw, 92vw"
            className={cn(
              'h-full w-full',
              contain ? 'object-contain' : 'object-cover object-top',
            )}
          />
        </div>
      ) : null}
    </div>
  );
}

/** Number · service · year. Identical in both patterns. */
function MetaLine({ project, index }: { project: Project; index: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="type-mono-sm text-signal">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span aria-hidden className="h-px w-6 bg-line/25" />
      <span className="type-mono-sm text-fg-subtle">
        {project.service} · {project.year}
      </span>
    </div>
  );
}

/**
 * Challenge / System / Status — always these three, always in this order,
 * always labelled the same way. `layout` only changes whether they run across
 * or down; the content structure never varies between projects.
 */
function Facts({ project }: { project: Project }) {
  const rows = (
    [
      ['Challenge', project.challenge],
      ['System', project.systemBuilt],
      ['Status', project.status],
    ] as const
  ).filter(([, value]) => Boolean(value));

  if (!rows.length) return null;

  return (
    <dl className="grid gap-4">
      {rows.map(([label, value]) => (
        <div key={label} className="border-t border-line/15 pt-3.5">
          <dt className="type-mono-sm text-fg-subtle">{label}</dt>
          <dd
            className={cn(
              'type-small mt-1.5 text-pretty',
              label === 'Status' ? 'text-signal' : 'text-fg-muted',
            )}
          >
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function CaseStudyLink({ project }: { project: Project }) {
  if (!project.summary.trim()) return null;

  return (
    <Link
      href={`/work#${project.slug}`}
      className="group inline-flex min-h-[44px] items-center gap-2 border-b border-fg pb-1 text-fg transition-colors duration-fast ease-micro hover:border-accent-500 hover:text-signal"
    >
      <span className="type-small font-medium">Read project details</span>
      <ArrowRight
        aria-hidden
        className="h-4 w-4 transition-transform duration-fast ease-micro group-hover:translate-x-1"
      />
    </Link>
  );
}

type ChapterProps = {
  project: Project;
  index: number;
  env: Env;
  /** Which side the media sits on from `lg`. Alternate down the page. */
  media?: 'left' | 'right';
  priority?: boolean;
  showDetails?: boolean;
};

/**
 * ONE CHAPTER. 40% information, 60% media, sides alternating.
 *
 * Three blocks in a twelve-column grid rather than two columns, so the mobile
 * order is title → visual → facts on every project while the desktop layout
 * is still a clean 40/60. Two columns could not do both.
 */
export function ProjectChapter({
  project,
  index,
  env,
  media = 'right',
  priority,
  showDetails = false,
}: ChapterProps) {
  // The one vertical rhythm every chapter uses — 56px on a phone, 96px at the
  // top end, down from 80/144. Nothing else on the page sets its own.
  const hasMedia = Boolean(project.video || project.image);
  const infoCols = hasMedia
    ? media === 'right'
      ? 'lg:col-span-5 lg:col-start-1'
      : 'lg:col-span-5 lg:col-start-8'
    : 'lg:col-span-8 lg:col-start-1';
  const mediaCols = media === 'right' ? 'lg:col-start-6' : 'lg:col-start-1';

  return (
    <section
      id={project.slug}
      className={cn(
        'relative overflow-hidden py-[clamp(3.5rem,6vw,6rem)]',
        ENV[env].section,
      )}
    >
      <div className="mx-auto w-full max-w-wide px-5 sm:px-8">
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-5">
          <Reveal className={cn('lg:row-start-1', infoCols)}>
            <MetaLine project={project} index={index} />
            <h3 className="type-h3 mt-3 text-fg text-balance">{project.title}</h3>
          </Reveal>

          {hasMedia && (
            <div
              className={cn(
                'lg:col-span-7 lg:row-span-2 lg:row-start-1 lg:self-center',
                mediaCols,
              )}
            >
              <Stage project={project} env={env} priority={priority} />
            </div>
          )}

          <div className={cn('lg:row-start-2', infoCols)}>
            <Facts project={project} />
            {showDetails && project.summary.trim() ? (
              <div className="mt-6 border-t border-line/15 pt-4">
                <span className="type-mono-sm text-fg-subtle">Project overview</span>
                <p className="type-body mt-2 text-fg-muted text-pretty">
                  {project.summary}
                </p>
              </div>
            ) : (
              <div className="mt-6">
                <CaseStudyLink project={project} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FeaturedWork() {
  const featured = projects.filter((p) => p.featured);
  const pool = featured.length > 0 ? featured : projects;
  const chapters = pool.slice(0, 3);

  if (!chapters.length) return null;

  return (
    <div id="work" className="scroll-mt-24">
      <section className="theme-light bg-surface pt-14 sm:pt-20">
        <div className="mx-auto w-full max-w-wide px-5 sm:px-8">
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="flex items-baseline gap-3">
                <span aria-hidden className="h-px w-8 translate-y-[-0.35rem] bg-accent-600" />
                <span className="type-mono-sm text-fg-subtle">Selected work</span>
              </span>
              <h2 className="type-h2 mt-4 text-fg text-balance">
                Selected systems.
              </h2>
            </div>
            <Link
              href="/work"
              className="group inline-flex min-h-[44px] items-center gap-2 self-start border-b border-fg pb-1 text-fg transition-colors duration-fast ease-micro hover:border-accent-700 hover:text-signal sm:self-end"
            >
              <span className="type-small font-medium">View all work</span>
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-fast ease-micro group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {chapters.map((project, i) => (
        <ProjectChapter
          key={project.slug}
          project={project}
          index={i}
          env={projectChapterEnv(i)}
          media={i % 2 === 0 ? 'right' : 'left'}
          priority={i === 0}
        />
      ))}
    </div>
  );
}
