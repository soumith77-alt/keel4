import { Section } from '@/components/ui/section';

/**
 * Evidence only. Every number either comes from a named shipped project or
 * describes the visible scope of this site; no category-benchmark claims.
 */
const STATS: {
  metric: string;
  suffix?: string;
  label: string;
  source: string;
}[] = [
  {
    metric: '39',
    label: 'Institutions audited',
    source: 'University IVR audit engine',
  },
  {
    metric: '405',
    label: 'Live call minutes crawled',
    source: 'University IVR audit engine',
  },
  {
    metric: '19',
    label: 'Marketplace trades',
    source: 'Artizyn',
  },
  {
    metric: '0%',
    label: 'Marketplace commission',
    source: 'Artizyn',
  },
];

export default function ProofStrip() {
  return (
    <Section tone="dark" spacing="none" className="py-20 sm:py-28">
      <div className="mb-10 flex items-center gap-3">
        <span aria-hidden className="h-px w-8 bg-accent-500" />
        <p className="type-label text-fg-muted">Evidence from shipped work</p>
      </div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex min-h-[10rem] flex-col gap-3 ${
              i > 0 ? 'lg:border-l lg:border-line/10 lg:pl-8' : ''
            }`}
          >
            <dt className="sr-only">{stat.label}</dt>
            <dd className="flex min-h-[4.25rem] items-baseline whitespace-nowrap font-mono text-4xl font-medium tracking-tight text-accent-500 tabular-nums sm:text-5xl xl:text-6xl">
              {stat.metric}
            </dd>
            <span className="type-label text-fg-muted">{stat.label}</span>
            <span className="mt-auto text-xs leading-snug text-fg-subtle">
              Source: {stat.source}
            </span>
          </div>
        ))}
      </dl>
    </Section>
  );
}
