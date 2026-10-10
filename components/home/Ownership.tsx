import { Check } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';

/**
 * HANDOFF / OWNERSHIP — the one dark section on the page.
 *
 * Every line is carried over from commitments the site already made
 * (previously "Built for handoff"): a deployed, usable product; repos,
 * accounts, docs and credentials staying with the client; measurement built
 * in. Measurement is now qualified by scope, because not every project
 * includes it. Ongoing support is NOT included by default — the FAQ offers it
 * as a separate arrangement, and the note below says exactly that.
 */
const ITEMS = [
  {
    title: 'A deployed, usable product',
    body: 'Live and in use at handoff, not a deck or a disconnected prototype.',
    tag: 'deploy',
  },
  {
    title: 'Code and infrastructure ownership',
    body: 'Repositories, accounts and credentials stay with you from handoff.',
    tag: 'ownership',
  },
  {
    title: 'Documentation and handoff',
    body: 'Documentation comes with the handoff, alongside the code it describes.',
    tag: 'docs',
  },
  {
    title: 'Measurement, where it’s in scope',
    body: 'When a project includes analytics, events and dashboards are built in from the start, not added at the end.',
    tag: 'measurement',
  },
];

export default function Ownership() {
  return (
    <section
      aria-labelledby="ownership-heading"
      className="theme-dark section-y relative overflow-hidden bg-surface text-fg"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_60%_at_85%_10%,rgba(31,138,99,0.22),transparent_70%)]"
      />
      <div className="site-container relative grid gap-10 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-12">
        <Reveal className="lg:col-span-12">
          <p className="type-label text-signal">Handoff</p>
          <h2 id="ownership-heading" className="type-h2 mt-4 text-fg">
            Built for your business.
            <br />
            <span className="text-signal">Owned by you.</span>
          </h2>
        </Reveal>
        <Reveal className="lg:col-span-4">
          <p className="type-body-lg max-w-[30rem] text-fg-muted text-pretty">
            When the project ends, what we built is yours to run, change and
            take wherever you like.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-8">
          <div className="rounded-panel border border-hairline bg-surface-raised">
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4 sm:px-8">
              <span className="type-mono-sm text-fg-subtle">At handoff</span>
              <span className="type-mono-sm text-signal">4 items</span>
            </div>
            <ul>
              {ITEMS.map((item, i) => (
                <li
                  key={item.tag}
                  className={`grid grid-cols-[auto_1fr] gap-x-4 px-6 py-5 sm:px-8 sm:py-6 ${i > 0 ? 'border-t border-hairline' : ''}`}
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#6FD3A5]/15 text-signal">
                    <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-fg">{item.title}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-fg-muted text-pretty">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-sm text-fg-subtle">
            Ongoing maintenance is available as a separate arrangement, if you want it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
