import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * CODED CONCEPT INTERFACES.
 *
 * Every mock here is an illustration of a KIND of system, not client work,
 * and every place that renders one also renders a visible "Illustrative"
 * label. Names are deliberately generic, and no mock carries a result claim.
 *
 * All sizing is in em inside a <MockCanvas> (60em wide), so a mock keeps its
 * composition at any width. Text leaves set their own font-size; containers
 * stay at the base em so spacing never compounds.
 */

const INK = 'text-[#0e1836]';
const MUTED = 'text-[#626879]';

/* ------------------------------------------------------------------------ */
/* CRM pipeline                                                              */
/* ------------------------------------------------------------------------ */

type Deal = { name: string; detail: string; value: string; owner: string; tag?: string; hot?: boolean };

const PIPELINE: { stage: string; deals: Deal[] }[] = [
  {
    stage: 'New enquiry',
    deals: [
      { name: 'Northwind Clinic', detail: 'Website form', value: '$12,400', owner: 'AK', tag: 'Website', hot: true },
      { name: 'Atlas Freight', detail: 'Referral', value: '$8,900', owner: 'RM', tag: 'Portal' },
      { name: 'Juniper Studio', detail: 'Inbound call', value: '$4,200', owner: 'SL' },
    ],
  },
  {
    stage: 'Qualified',
    deals: [
      { name: 'Harbor & Pine', detail: 'Discovery booked', value: '$21,000', owner: 'AK', tag: 'CRM' },
      { name: 'Fieldstone Dental', detail: 'Needs proposal', value: '$9,600', owner: 'RM' },
    ],
  },
  {
    stage: 'Proposal',
    deals: [
      { name: 'Copperleaf Homes', detail: 'Sent Tue', value: '$34,500', owner: 'SL', tag: 'Platform' },
      { name: 'Meridian Labs', detail: 'Review call Fri', value: '$15,800', owner: 'AK' },
    ],
  },
  {
    stage: 'Won',
    deals: [{ name: 'Brightwater Co.', detail: 'Kick-off scheduled', value: '$18,200', owner: 'RM', tag: 'Website' }],
  },
];

export function Avatar({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-[1.6em] w-[1.6em] items-center justify-center rounded-full bg-[#E6EBF7] text-[0.62em] font-semibold text-[#253c80]',
        className,
      )}
    >
      {initials}
    </span>
  );
}

export function SideNav({ items, active, brand }: { items: string[]; active: number; brand: string }) {
  return (
    <div className="flex w-[10.5em] shrink-0 flex-col border-r border-[#E3E6EC] bg-[#F6F7FA] p-[1em]">
      <div className="flex items-center gap-[0.5em]">
        <span className="h-[1.4em] w-[1.4em] rounded-[0.35em] bg-[#253c80]" />
        <span className={cn('text-[0.8em] font-semibold', INK)}>{brand}</span>
      </div>
      <div className="mt-[1.4em] flex flex-col gap-[0.25em]">
        {items.map((item, i) => (
          <span
            key={item}
            className={cn(
              'rounded-[0.4em] px-[0.6em] py-[0.45em] text-[0.72em]',
              i === active ? 'bg-white font-semibold text-[#0e1836] shadow-[0_1px_2px_rgba(14,24,54,0.08)]' : MUTED,
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CrmPipelineMock({ compact = false }: { compact?: boolean }) {
  const columns = compact ? PIPELINE.slice(0, 3) : PIPELINE;
  return (
    <div className="flex h-full bg-white">
      {!compact && (
        <SideNav brand="Studio CRM" active={0} items={['Pipeline', 'Contacts', 'Companies', 'Tasks', 'Reports']} />
      )}
      <div className="flex min-w-0 flex-1 flex-col p-[1.2em]">
        <div className="flex items-center justify-between">
          <div>
            <p className={cn('text-[1.05em] font-semibold tracking-[-0.01em]', INK)}>Pipeline</p>
            <p className={cn('mt-[0.2em] text-[0.68em]', MUTED)}>8 open deals · this quarter</p>
          </div>
          <div className="flex items-center gap-[0.5em]">
            <span className={cn('rounded-[0.45em] border border-[#E3E6EC] px-[0.7em] py-[0.35em] text-[0.68em]', MUTED)}>
              All owners
            </span>
            <span className="rounded-[0.45em] bg-[#253c80] px-[0.8em] py-[0.35em] text-[0.68em] font-semibold text-white">
              New deal
            </span>
          </div>
        </div>

        <div
          className="mt-[1em] grid min-h-0 flex-1 gap-[0.7em]"
          style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
        >
          {columns.map((col) => (
            <div key={col.stage} className="flex min-w-0 flex-col rounded-[0.6em] bg-[#F2F4F8] p-[0.55em]">
              <div className="flex items-center justify-between px-[0.2em] pb-[0.5em]">
                <span className={cn('text-[0.66em] font-semibold uppercase tracking-[0.06em]', MUTED)}>
                  {col.stage}
                </span>
                <span className={cn('text-[0.62em]', MUTED)}>{col.deals.length}</span>
              </div>
              <div className="flex flex-col gap-[0.45em]">
                {col.deals.map((d) => (
                  <div
                    key={d.name}
                    className={cn(
                      'rounded-[0.5em] border bg-white p-[0.6em] shadow-[0_1px_2px_rgba(14,24,54,0.05)]',
                      d.hot ? 'border-[#253c80]/40' : 'border-[#E3E6EC]',
                    )}
                  >
                    <p className={cn('truncate text-[0.74em] font-semibold', INK)}>{d.name}</p>
                    <p className={cn('mt-[0.15em] truncate text-[0.62em]', MUTED)}>{d.detail}</p>
                    <div className="mt-[0.55em] flex items-center justify-between gap-[0.3em]">
                      <span className={cn('text-[0.68em] font-semibold tabular-nums', INK)}>{d.value}</span>
                      <span className="flex items-center gap-[0.3em]">
                        {d.tag && !compact && (
                          <span className="rounded-full bg-[#E6EBF7] px-[0.55em] py-[0.1em] text-[0.56em] font-medium text-[#253c80]">
                            {d.tag}
                          </span>
                        )}
                        <Avatar initials={d.owner} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** A single contact record with its activity timeline. */
export function CrmRecordMock() {
  const events = [
    { t: 'Website enquiry received', s: 'Form · 09:12', done: true },
    { t: 'Contact and deal created', s: 'Automation · 09:12', done: true },
    { t: 'Follow-up email sent', s: 'Workflow · 09:13', done: true },
    { t: 'Discovery call', s: 'Thu 14:00 · AK', done: false },
  ];
  return (
    <div className="flex h-full flex-col bg-white p-[1.6em]">
      <div className="flex items-center gap-[0.8em]">
        <span className="inline-flex h-[2.6em] w-[2.6em] items-center justify-center rounded-[0.7em] bg-[#E6EBF7] text-[1em] font-semibold text-[#253c80]">
          N
        </span>
        <div className="min-w-0">
          <p className={cn('truncate text-[1.25em] font-semibold tracking-[-0.01em]', INK)}>Northwind Clinic</p>
          <p className={cn('text-[0.9em]', MUTED)}>New enquiry · $12,400</p>
        </div>
      </div>
      <div className="mt-[1.4em] flex flex-col">
        {events.map((e, i) => (
          <div key={e.t} className="flex gap-[0.8em]">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  'mt-[0.35em] h-[0.75em] w-[0.75em] shrink-0 rounded-full',
                  e.done ? 'bg-[#253c80]' : 'border-[0.15em] border-[#C8CEDA] bg-white',
                )}
              />
              {i < events.length - 1 && <span className="w-[0.1em] flex-1 bg-[#E3E6EC]" />}
            </div>
            <div className="pb-[1em]">
              <p className={cn('text-[0.95em] font-medium', INK)}>{e.t}</p>
              <p className={cn('text-[0.8em]', MUTED)}>{e.s}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Websites — deliberately NOT in the app idiom: a client's own palette,     */
/* editorial serif type, full-bleed art and one obvious next step.           */
/* The wave art is hand-written SVG in the layered-wave style haikei.app     */
/* generates, so there is no image request and it scales with the canvas.    */
/* ------------------------------------------------------------------------ */

const SERIF = 'font-[Georgia,"Times_New_Roman",serif]';

function SeaArt({ className, sun = true }: { className?: string; sun?: boolean }) {
  // Unique per instance: the art appears several times on one page.
  const id = React.useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" className={cn('h-full w-full', className)}>
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4B48C" />
          <stop offset="0.45" stopColor="#EE9677" />
          <stop offset="1" stopColor="#D9786D" />
        </linearGradient>
      </defs>
      <rect width="600" height="340" fill={`url(#sky-${id})`} />
      {sun && <circle cx="430" cy="150" r="54" fill="#FBE3C8" opacity="0.92" />}
      <path d="M0 176 C 80 160 150 186 230 174 S 380 150 460 168 S 560 182 600 170 L600 340 L0 340Z" fill="#4E8A93" />
      <path d="M0 204 C 90 188 170 214 260 200 S 420 182 500 198 S 570 210 600 202 L600 340 L0 340Z" fill="#2F6E7C" />
      <path d="M0 236 C 70 222 160 246 250 232 S 400 214 480 230 S 560 244 600 236 L600 340 L0 340Z" fill="#1F5464" />
      <path d="M0 272 C 100 256 190 282 300 268 S 470 252 600 266 L600 340 L0 340Z" fill="#163F4D" />
      <path d="M0 306 C 120 292 230 316 340 304 S 520 290 600 300 L600 340 L0 340Z" fill="#E9D5B7" />
    </svg>
  );
}

/** Desktop homepage of a fictional coastal-stays brand. Canvas 60em × 40em. */
export function StaySiteMock() {
  const stays = [
    { n: 'The Dune House', p: 'from $240', tint: 'hue-rotate-0' },
    { n: 'Harbour Loft', p: 'from $185', tint: 'hue-rotate-[-18deg] saturate-[0.85]' },
    { n: 'Lighthouse Cottage', p: 'from $310', tint: 'hue-rotate-[14deg]' },
  ];
  return (
    <div className="relative flex h-full flex-col bg-[#FBF6EE] text-[#1D3B45]">
      <div className="relative h-[25em] shrink-0 overflow-hidden">
        <SeaArt className="absolute inset-0" />
        <div className="relative flex items-center justify-between px-[2.4em] py-[1.3em] text-white">
          <span className={cn('text-[1.25em] tracking-[0.02em]', SERIF)}>Halden</span>
          <div className="flex items-center gap-[1.6em] text-[0.74em] text-white/90">
            <span>Stays</span>
            <span>Experiences</span>
            <span>Journal</span>
            <span className="rounded-full bg-white px-[1.1em] py-[0.5em] font-semibold text-[#1D3B45]">Book a stay</span>
          </div>
        </div>
        <div className="relative px-[2.4em] pt-[2.6em] text-white">
          <span className="text-[0.68em] font-semibold uppercase tracking-[0.22em] text-white/85">Coastal stays · Norfolk</span>
          <p className={cn('mt-[0.35em] max-w-[11em] text-[3.5em] leading-[1.02] tracking-[-0.01em]', SERIF)}>
            Slow days by the sea.
          </p>
        </div>
      </div>

      {/* The next step: a booking bar straddling the hero edge. */}
      <div className="relative z-10 mx-[2.4em] -mt-[2.6em] flex items-stretch rounded-[1em] bg-white p-[0.5em] shadow-[0_1.2em_2.4em_-1em_rgba(29,59,69,0.45)]">
        {[
          ['Check in', 'Fri 14 Mar'],
          ['Check out', 'Sun 16 Mar'],
          ['Guests', '2 adults'],
        ].map(([k, v], i) => (
          <div key={k} className={cn('flex-1 px-[1em] py-[0.45em]', i > 0 && 'border-l border-[#EDE3D4]')}>
            <p className="text-[0.6em] font-semibold uppercase tracking-[0.14em] text-[#8A7A66]">{k}</p>
            <p className="mt-[0.15em] text-[0.86em] font-semibold">{v}</p>
          </div>
        ))}
        <span className="flex items-center rounded-[0.7em] bg-[#1D3B45] px-[1.4em] text-[0.8em] font-semibold text-white">
          Check availability
        </span>
      </div>

      <div className="grid flex-1 grid-cols-3 gap-[1.1em] px-[2.4em] pb-[1.6em] pt-[1.4em]">
        {stays.map((s) => (
          <div key={s.n} className="flex min-h-0 flex-col">
            <div className={cn('min-h-0 flex-1 overflow-hidden rounded-[0.8em]', s.tint)}>
              <SeaArt sun={false} />
            </div>
            <div className="mt-[0.55em] flex items-baseline justify-between">
              <span className={cn('text-[0.92em]', SERIF)}>{s.n}</span>
              <span className="text-[0.66em] text-[#8A7A66]">{s.p}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** The same brand on a phone: choosing dates. Canvas 40em × 80em. */
export function StayPhoneMock() {
  const days = ['12', '13', '14', '15', '16', '17', '18'];
  return (
    <div className="flex h-full flex-col bg-[#FBF6EE] text-[#1D3B45]">
      <div className="relative h-[34em] shrink-0 overflow-hidden">
        <SeaArt className="absolute inset-0" />
        <div className="relative flex items-center justify-between px-[2.4em] pt-[3em] text-white">
          <span className={cn('text-[2em]', SERIF)}>Halden</span>
          <span className="flex flex-col gap-[0.35em]">
            <span className="block h-[0.22em] w-[2em] rounded bg-white" />
            <span className="block h-[0.22em] w-[2em] rounded bg-white" />
          </span>
        </div>
        {/* Margin on the wrapper, not the text: em margins on a 3.4em
            element would compound. */}
        <div className="relative mt-[5em] px-[2.4em]">
          <p className={cn('text-[3.4em] leading-[1.05] text-white', SERIF)}>The Dune House</p>
        </div>
      </div>
      <div className="relative z-10 mx-[1.6em] -mt-[4em] rounded-[1.6em] bg-white p-[2em] shadow-[0_1.4em_3em_-1.4em_rgba(29,59,69,0.5)]">
        <p className="text-[1.2em] font-semibold uppercase tracking-[0.14em] text-[#8A7A66]">March</p>
        <div className="mt-[1em] grid grid-cols-7 gap-[0.5em]">
          {days.map((d) => {
            const inRange = d === '14' || d === '15' || d === '16';
            const edge = d === '14' || d === '16';
            return (
              <span
                key={d}
                className={cn(
                  'rounded-[0.8em] py-[0.7em] text-center text-[1.5em] font-semibold tabular-nums',
                  edge ? 'bg-[#1D3B45] text-white' : inRange ? 'bg-[#E6EEF0]' : 'text-[#8A7A66]',
                )}
              >
                {d}
              </span>
            );
          })}
        </div>
        <div className="mt-[1.6em] flex items-center justify-between border-t border-[#EDE3D4] pt-[1.4em]">
          <span className="text-[1.5em]">2 nights · 2 adults</span>
          <span className="text-[1.6em] font-semibold">$480</span>
        </div>
      </div>
      <span className="mx-[1.6em] mb-[2.4em] mt-auto rounded-full bg-[#E07A5F] py-[1.3em] text-center text-[1.7em] font-semibold text-white">
        Book a stay
      </span>
    </div>
  );
}
