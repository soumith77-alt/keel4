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

const INK = 'text-[#111814]';
const MUTED = 'text-[#5E6B63]';

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

function Avatar({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-[1.6em] w-[1.6em] items-center justify-center rounded-full bg-[#E5F1EA] text-[0.62em] font-semibold text-[#146C50]',
        className,
      )}
    >
      {initials}
    </span>
  );
}

function SideNav({ items, active, brand }: { items: string[]; active: number; brand: string }) {
  return (
    <div className="flex w-[10.5em] shrink-0 flex-col border-r border-[#E6EAE4] bg-[#F7F8F5] p-[1em]">
      <div className="flex items-center gap-[0.5em]">
        <span className="h-[1.4em] w-[1.4em] rounded-[0.35em] bg-[#146C50]" />
        <span className={cn('text-[0.8em] font-semibold', INK)}>{brand}</span>
      </div>
      <div className="mt-[1.4em] flex flex-col gap-[0.25em]">
        {items.map((item, i) => (
          <span
            key={item}
            className={cn(
              'rounded-[0.4em] px-[0.6em] py-[0.45em] text-[0.72em]',
              i === active ? 'bg-white font-semibold text-[#111814] shadow-[0_1px_2px_rgba(17,24,20,0.08)]' : MUTED,
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
            <span className={cn('rounded-[0.45em] border border-[#E6EAE4] px-[0.7em] py-[0.35em] text-[0.68em]', MUTED)}>
              All owners
            </span>
            <span className="rounded-[0.45em] bg-[#146C50] px-[0.8em] py-[0.35em] text-[0.68em] font-semibold text-white">
              New deal
            </span>
          </div>
        </div>

        <div
          className="mt-[1em] grid min-h-0 flex-1 gap-[0.7em]"
          style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
        >
          {columns.map((col) => (
            <div key={col.stage} className="flex min-w-0 flex-col rounded-[0.6em] bg-[#F4F6F2] p-[0.55em]">
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
                      'rounded-[0.5em] border bg-white p-[0.6em] shadow-[0_1px_2px_rgba(17,24,20,0.05)]',
                      d.hot ? 'border-[#146C50]/40' : 'border-[#E6EAE4]',
                    )}
                  >
                    <p className={cn('truncate text-[0.74em] font-semibold', INK)}>{d.name}</p>
                    <p className={cn('mt-[0.15em] truncate text-[0.62em]', MUTED)}>{d.detail}</p>
                    <div className="mt-[0.55em] flex items-center justify-between gap-[0.3em]">
                      <span className={cn('text-[0.68em] font-semibold tabular-nums', INK)}>{d.value}</span>
                      <span className="flex items-center gap-[0.3em]">
                        {d.tag && !compact && (
                          <span className="rounded-full bg-[#E5F1EA] px-[0.55em] py-[0.1em] text-[0.56em] font-medium text-[#146C50]">
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
        <span className="inline-flex h-[2.6em] w-[2.6em] items-center justify-center rounded-[0.7em] bg-[#E5F1EA] text-[1em] font-semibold text-[#146C50]">
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
                  e.done ? 'bg-[#146C50]' : 'border-[0.15em] border-[#C9D3CB] bg-white',
                )}
              />
              {i < events.length - 1 && <span className="w-[0.1em] flex-1 bg-[#E6EAE4]" />}
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
/* SaaS application                                                          */
/* ------------------------------------------------------------------------ */

const BARS = [38, 52, 46, 61, 58, 70, 66, 78, 74, 86, 82, 94];

export function SaasAppMock() {
  return (
    <div className="flex h-full bg-white">
      <SideNav brand="Orbit" active={0} items={['Overview', 'Accounts', 'Billing', 'Usage', 'Settings']} />
      <div className="flex min-w-0 flex-1 flex-col gap-[1em] p-[1.3em]">
        <div className="flex items-center justify-between">
          <p className={cn('text-[1.05em] font-semibold tracking-[-0.01em]', INK)}>Overview</p>
          <span className={cn('rounded-[0.45em] border border-[#E6EAE4] px-[0.7em] py-[0.35em] text-[0.68em]', MUTED)}>
            Last 30 days
          </span>
        </div>
        <div className="grid grid-cols-3 gap-[0.7em]">
          {[
            ['Active accounts', '1,284'],
            ['Trials started', '136'],
            ['Plan upgrades', '42'],
          ].map(([k, v]) => (
            <div key={k} className="rounded-[0.6em] border border-[#E6EAE4] p-[0.8em]">
              <p className={cn('text-[0.64em]', MUTED)}>{k}</p>
              <p className={cn('mt-[0.2em] text-[1.25em] font-semibold tabular-nums tracking-[-0.02em]', INK)}>{v}</p>
            </div>
          ))}
        </div>
        <div className="flex min-h-0 flex-1 flex-col rounded-[0.6em] border border-[#E6EAE4] p-[0.9em]">
          <div className="flex items-center justify-between">
            <p className={cn('text-[0.74em] font-semibold', INK)}>Weekly active usage</p>
            <span className="flex items-center gap-[0.35em] text-[0.62em] text-[#146C50]">
              <span className="h-[0.5em] w-[0.5em] rounded-full bg-[#146C50]" />
              Live
            </span>
          </div>
          <div className="mt-[0.8em] flex min-h-0 flex-1 items-end gap-[0.45em]">
            {BARS.map((h, i) => (
              <span
                key={i}
                className={cn('flex-1 rounded-t-[0.25em]', i === BARS.length - 1 ? 'bg-[#146C50]' : 'bg-[#CFE3D7]')}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="rounded-[0.6em] border border-[#E6EAE4]">
          {[
            ['Kestrel Analytics', 'Team', 'Upgraded'],
            ['Pinecone Legal', 'Starter', 'Trial'],
          ].map(([n, p, s], i) => (
            <div
              key={n}
              className={cn('flex items-center justify-between px-[0.9em] py-[0.55em]', i > 0 && 'border-t border-[#E6EAE4]')}
            >
              <span className={cn('text-[0.7em] font-medium', INK)}>{n}</span>
              <span className={cn('text-[0.64em]', MUTED)}>{p}</span>
              <span className="rounded-full bg-[#E5F1EA] px-[0.6em] py-[0.1em] text-[0.6em] font-medium text-[#146C50]">
                {s}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Websites — deliberately NOT in the app idiom: warm palette, editorial     */
/* type, imagery blocks, a single clear next step.                           */
/* ------------------------------------------------------------------------ */

export function ClinicSiteMock() {
  return (
    <div className="flex h-full flex-col bg-[#F4EEE6] text-[#2B2420]">
      <div className="flex items-center justify-between px-[2.4em] py-[1.2em]">
        <span className="text-[1em] font-semibold tracking-[-0.02em]">Linden Physio</span>
        <div className="flex items-center gap-[1.6em] text-[0.72em] text-[#6B5E55]">
          <span>Treatments</span>
          <span>Team</span>
          <span>Prices</span>
          <span className="rounded-full bg-[#2B2420] px-[1.1em] py-[0.5em] font-semibold text-[#F4EEE6]">Book a visit</span>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-[1.05fr_1fr] gap-[2em] px-[2.4em] pb-[2em] pt-[1.2em]">
        <div className="flex flex-col justify-center">
          <span className="text-[0.7em] font-semibold uppercase tracking-[0.14em] text-[#B4532A]">Sports & recovery</span>
          <p className="mt-[0.4em] text-[3.3em] font-semibold leading-[0.98] tracking-[-0.04em]">Move well again.</p>
          <p className="mt-[0.9em] max-w-[22em] text-[0.88em] leading-[1.5] text-[#6B5E55]">
            Assessment, treatment and a plan you can follow at home. Same-week appointments.
          </p>
          <div className="mt-[1.4em] flex items-center gap-[0.8em]">
            <span className="rounded-full bg-[#B4532A] px-[1.4em] py-[0.7em] text-[0.8em] font-semibold text-white">
              Book an assessment
            </span>
            <span className="text-[0.8em] font-medium underline underline-offset-[0.3em]">See treatments</span>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[1.2em] bg-[linear-gradient(160deg,#E9B892_0%,#C9784E_55%,#8E4A2D_100%)]">
          <span className="absolute -right-[3em] -top-[3em] h-[14em] w-[14em] rounded-full bg-[#F4D7BE]/60" />
          <span className="absolute bottom-[2em] left-[2em] h-[6em] w-[6em] rounded-full bg-[#F4EEE6]/25" />
          <span className="absolute bottom-[1.2em] right-[1.2em] rounded-[0.8em] bg-[#F4EEE6] px-[1em] py-[0.7em] text-[0.7em] font-semibold shadow-[0_0.6em_1.4em_-0.6em_rgba(43,36,32,0.5)]">
            Next available · Tue 10:30
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 border-t border-[#E3D8CB]">
        {['Sports injury', 'Back & neck', 'Post-surgery rehab'].map((s, i) => (
          <div key={s} className={cn('px-[2.4em] py-[1em]', i > 0 && 'border-l border-[#E3D8CB]')}>
            <p className="text-[0.8em] font-semibold">{s}</p>
            <p className="mt-[0.2em] text-[0.66em] text-[#6B5E55]">45 min · in clinic</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Phone view of the same site: the booking step. Canvas ratio ~0.5. */
export function BookingPhoneMock() {
  return (
    <div className="flex h-full flex-col bg-[#F4EEE6] px-[3.6em] pb-[3em] pt-[4em] text-[#2B2420]">
      <p className="text-[2.2em] font-semibold tracking-[-0.03em]">Choose a time</p>
      <p className="mt-[0.4em] text-[1.6em] text-[#6B5E55]">Initial assessment · 45 min</p>
      <div className="mt-[2.4em] grid grid-cols-3 gap-[1.2em]">
        {['Mon 14', 'Tue 15', 'Wed 16'].map((d, i) => (
          <span
            key={d}
            className={cn(
              'rounded-[1.2em] py-[1em] text-center text-[1.5em] font-semibold',
              i === 1 ? 'bg-[#2B2420] text-[#F4EEE6]' : 'bg-white',
            )}
          >
            {d}
          </span>
        ))}
      </div>
      <div className="mt-[2.4em] grid grid-cols-2 gap-[1.2em]">
        {['09:00', '10:30', '12:15', '15:45'].map((t) => (
          <span
            key={t}
            className={cn(
              'rounded-[1.2em] border py-[1.2em] text-center text-[1.6em] font-medium tabular-nums',
              t === '10:30' ? 'border-[#B4532A] bg-[#B4532A]/10 text-[#8E3D1C]' : 'border-[#E3D8CB] bg-white',
            )}
          >
            {t}
          </span>
        ))}
      </div>
      <span className="mt-auto rounded-full bg-[#B4532A] py-[1.3em] text-center text-[1.7em] font-semibold text-white">
        Confirm booking
      </span>
    </div>
  );
}

/** Ecommerce storefront — the Websites tile in the solutions grid. */
export function StoreSiteMock() {
  const products = [
    { n: 'House blend', p: '$16', c: 'bg-[#2F4B6E]' },
    { n: 'Single origin', p: '$19', c: 'bg-[#C8873A]' },
    { n: 'Decaf', p: '$17', c: 'bg-[#7C8F6A]' },
  ];
  return (
    <div className="flex h-full flex-col bg-[#FBF7F0] text-[#1F2A37]">
      <div className="flex items-center justify-between px-[2em] py-[1.1em]">
        <span className="text-[1.05em] font-bold tracking-[-0.02em]">Fieldhouse</span>
        <div className="flex items-center gap-[1.3em] text-[0.78em] text-[#5B6573]">
          <span>Shop</span>
          <span>Subscriptions</span>
          <span className="rounded-full border border-[#1F2A37] px-[0.9em] py-[0.3em] font-semibold text-[#1F2A37]">Cart · 2</span>
        </div>
      </div>
      <div className="mx-[2em] flex items-end justify-between rounded-[1em] bg-[#1F2A37] px-[1.8em] py-[1.6em] text-[#FBF7F0]">
        <div>
          <p className="text-[0.66em] font-semibold uppercase tracking-[0.16em] text-[#E9B872]">Roasted this week</p>
          <p className="mt-[0.3em] text-[2.2em] font-bold leading-[1] tracking-[-0.035em]">Coffee worth the wait.</p>
        </div>
        <span className="rounded-full bg-[#E9B872] px-[1.2em] py-[0.6em] text-[0.78em] font-bold text-[#1F2A37]">Shop beans</span>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-[1em] px-[2em] py-[1.2em]">
        {products.map((p) => (
          <div key={p.n} className="flex flex-col">
            <div className="flex flex-1 items-center justify-center rounded-[0.8em] bg-[#EFE7DA]">
              <span className={cn('h-[62%] w-[42%] rounded-[0.5em_0.5em_0.9em_0.9em]', p.c)} />
            </div>
            <div className="mt-[0.5em] flex items-center justify-between">
              <span className="text-[0.8em] font-semibold">{p.n}</span>
              <span className="text-[0.8em] text-[#5B6573]">{p.p}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
