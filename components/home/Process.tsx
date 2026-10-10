import { Reveal } from '@/components/ui/reveal';

/**
 * PROCESS — four stages, all visible at once. A horizontal track on desktop,
 * a vertical rail on mobile. No timelines or prices: those depend on scope
 * and are agreed per project.
 */
const STAGES = [
  { n: '01', title: 'Define', body: 'Understand the problem, the people who will use it, and the scope.' },
  { n: '02', title: 'Design', body: 'Map the workflow and shape the experience before it is built.' },
  { n: '03', title: 'Build', body: 'Implement, integrate with your tools, and test.' },
  { n: '04', title: 'Launch', body: 'Deploy to production and prepare the handoff.' },
];

export default function Process() {
  return (
    <section aria-labelledby="process-heading" className="section-y border-y border-hairline bg-surface-raised">
      <div className="site-container">
        <Reveal className="max-w-[40rem]">
          <p className="type-label text-signal">Process</p>
          <h2 id="process-heading" className="type-h2 mt-4 text-fg text-balance">
            From first conversation to working software.
          </h2>
        </Reveal>

        {/* One reveal for the whole list: <ol> may only contain <li>. */}
        <Reveal delay={0.06} className="mt-10 sm:mt-14">
          <ol className="relative grid gap-0 lg:grid-cols-4 lg:gap-8">
            {STAGES.map((s, i) => (
                <li key={s.n} className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 pb-9 last:pb-0 lg:block lg:pb-0">
                  {/* Rail: vertical on mobile, horizontal on desktop. */}
                  {i < STAGES.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-[1.25rem] top-10 h-[calc(100%-2.5rem)] w-px bg-hairline lg:left-12 lg:right-[-2rem] lg:top-5 lg:h-px lg:w-auto"
                    />
                  )}
                  <span className="relative z-raised flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface font-mono text-[0.8125rem] font-medium text-signal">
                    {s.n}
                  </span>
                  <div className="lg:mt-6">
                    <h3 className="type-h4 pt-1.5 text-fg lg:pt-0">{s.title}</h3>
                    <p className="type-body mt-2 max-w-[22rem] text-fg-muted text-pretty">{s.body}</p>
                  </div>
                </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
