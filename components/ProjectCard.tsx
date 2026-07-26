import type { Project } from '@/config/content';
import { GlowCard } from '@/components/ui/glow-card';

/**
 * Project tile. Deliberately not a link: each entry is a short summary that
 * stands on its own, so there is no detail page behind it to open.
 */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <GlowCard className="h-full">
      <div className="flex h-full flex-col gap-6 p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="type-label text-brand-300">{project.service}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-white/20" />
            <span className="type-label text-fg-subtle">{project.year}</span>
          </div>
        </div>

        <div className="flex-1">
          {project.placeholder && (
            <span className="type-label mb-3 inline-block border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-amber-300">
              Placeholder
            </span>
          )}
          <h3 className="type-h3 text-fg text-balance">{project.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted text-pretty">
            {project.summary}
          </p>
        </div>

        {project.results && project.results.length > 0 && (
          <dl className="grid grid-cols-2 gap-4 border-t border-white/[0.08] pt-6">
            {project.results.slice(0, 2).map((r) => (
              <div key={r.label}>
                <dt className="sr-only">{r.label}</dt>
                <dd className="font-mono text-xl font-medium tabular-nums text-brand-200">
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
