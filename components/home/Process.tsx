import { Reveal } from '@/components/ui/reveal';
import { Eyebrow, KeelMark } from '@/components/ui/keel';

/**
 * PROCESS — four stages, all visible at once, hanging from one keel line.
 * Desktop: a single horizontal rule with a keel notch where each stage
 * begins. Mobile: each stage keeps its own rule and notch, stacked. No
 * timelines or prices: those depend on scope and are agreed per project.
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
          <Eyebrow>Process</Eyebrow>
          <h2 id="process-heading" className="type-h2 mt-4 text-fg text-balance">
            From first conversation to working software.
          </h2>
        </Reveal>

        <Reveal delay={0.06} className="mt-9 sm:mt-12">
          <ol className="grid gap-8 lg:grid-cols-4 lg:gap-0">
            {STAGES.map((s) => (
              <li key={s.n} className="relative pt-6 lg:pr-8">
                {/* The rule runs edge to edge across the four columns on
                    desktop, so together they read as one line. */}
                <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line/20" />
                <KeelMark className="absolute left-0 top-0" />
                <span className="font-mono text-[0.8125rem] font-medium text-signal">{s.n}</span>
                <h3 className="type-h4 mt-2 text-fg">{s.title}</h3>
                <p className="type-body mt-2 max-w-[22rem] text-fg-muted text-pretty">{s.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
