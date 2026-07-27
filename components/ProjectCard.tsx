import type { Project } from '@/config/content';
import { GlowCard } from '@/components/ui/glow-card';

/**
 * Project tile. Deliberately not a link: each entry stands on its own, so
 * there is no detail page behind it to open.
 *
 * Cards show `claim` — one line. The 85-122 word `summary` is detail, and on
 * /work it sits behind a disclosure: still in the DOM for crawlers, but not a
 * wall of prose on first look. `compact` (homepage) drops it entirely.
 */
export default function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <GlowCard className="h-full">
      <div className="flex h-full flex-col gap-6 p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="type-label text-accent-700">{project.service}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-fg/25" />
            <span className="type-label text-fg-subtle">{project.year}</span>
          </div>
        </div>

        <div className="flex-1">
          {project.placeholder && (
            <span className="type-label mb-3 inline-block border border-amber-500/40 bg-amber-500/10 px-2 py-1 text-amber-700">
              Placeholder
            </span>
          )}
          <h3 className="type-h3 text-fg text-balance">{project.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted text-pretty">
            {project.claim}
          </p>

          {!compact && (
            <details className="group/detail mt-4">
              <summary className="type-label inline-flex cursor-pointer list-none items-center gap-2 text-fg-subtle transition-colors duration-base hover:text-accent-700 [&::-webkit-details-marker]:hidden">
                Detail
                <span
                  aria-hidden
                  className="transition-transform duration-base group-open/detail:rotate-90"
                >
                  &rsaquo;
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted text-pretty">
                {project.summary}
              </p>
            </details>
          )}
        </div>

        {project.results && project.results.length > 0 && (
          <dl className="grid grid-cols-2 gap-4 border-t border-line/10 pt-6">
            {project.results.slice(0, 2).map((r) => (
              <div key={r.label}>
                <dt className="sr-only">{r.label}</dt>
                <dd className="font-mono text-xl font-medium tabular-nums text-accent-700">
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
    </GlowCard>
  );
}
