'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';
import { Avatar, SideNav } from './mocks';

/**
 * LIVE CONCEPTS — illustrations that show something HAPPENING.
 *
 * A static dashboard says "we make dashboards". These each play one short,
 * meaningful interaction instead: a subscription changing state, a lead
 * moving through a pipeline. They play only while on screen, hold on the
 * finished state, then replay; under reduced motion they render the finished
 * state and never move. Sized in em inside a <MockCanvas>, like every mock.
 */

const INK = 'text-[#0e1836]';
const MUTED = 'text-[#626879]';
const EASE = [0.22, 1, 0.36, 1] as const;

/** Steps through `durations` (ms per step) while `ref` is in view, looping. */
function useStepper(durations: number[]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '0px 0px -10% 0px' });
  const reduceMotion = useReducedMotion();
  const last = durations.length - 1;
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const t = setTimeout(() => {
      if (step === last) {
        setStep(0);
        setCycle((c) => c + 1);
      } else {
        setStep(step + 1);
      }
    }, durations[step]);
    return () => clearTimeout(t);
  }, [step, inView, reduceMotion, last, durations]);

  return { ref, step: reduceMotion ? last : step, cycle, reduceMotion };
}

/* ------------------------------------------------------------------------ */
/* SaaS: a subscription changing state                                       */
/* ------------------------------------------------------------------------ */

const SUB_STEPS = [2200, 1300, 4200];
const USAGE = [18, 22, 24, 26, 28, 30, 30, 30, 30, 52, 66, 78];

export function SubscriptionMock() {
  const { ref, step, reduceMotion } = useStepper(SUB_STEPS);
  const upgraded = step === 2;
  const processing = step === 1;
  const fade = reduceMotion ? { duration: 0 } : { duration: 0.35, ease: EASE };

  return (
    <div ref={ref} className="relative flex h-full bg-white">
      <SideNav brand="Orbit" active={2} items={['Overview', 'Accounts', 'Billing', 'Usage', 'Settings']} />
      <div className="flex min-w-0 flex-1 flex-col gap-[1em] p-[1.4em]">
        <div>
          <p className={cn('text-[0.7em]', MUTED)}>Kestrel Analytics</p>
          <p className={cn('text-[1.15em] font-semibold tracking-[-0.01em]', INK)}>Billing</p>
        </div>

        {/* Plan card */}
        <div
          className={cn(
            'rounded-[0.8em] border p-[1.2em] transition-colors duration-500',
            upgraded ? 'border-[#00c776]/50 bg-[#F2FBF7]' : 'border-[#E3E6EC] bg-white',
          )}
        >
          <div className="flex items-start justify-between gap-[1em]">
            <div>
              <p className={cn('text-[0.66em] font-semibold uppercase tracking-[0.12em]', MUTED)}>Current plan</p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={upgraded ? 'team' : 'trial'}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={fade}
                  className={cn('mt-[0.2em] text-[1.9em] font-semibold tracking-[-0.03em]', INK)}
                >
                  {upgraded ? 'Team' : 'Trial'}
                </motion.p>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={upgraded ? 'active' : 'trial'}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={fade}
                className={cn(
                  'rounded-full px-[0.8em] py-[0.25em] text-[0.68em] font-semibold',
                  upgraded ? 'bg-[#DDF6EA] text-[#00794a]' : 'bg-[#FDF0D9] text-[#8A5A00]',
                )}
              >
                {upgraded ? '● Active' : '3 days left'}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="mt-[1em]">
            <div className="flex justify-between">
              <span className={cn('text-[0.68em]', MUTED)}>Seats</span>
              <span className={cn('text-[0.68em] font-medium tabular-nums', INK)}>
                3 of {upgraded ? 10 : 3}
              </span>
            </div>
            <div className="mt-[0.4em] h-[0.45em] overflow-hidden rounded-full bg-[#EEF0F4]">
              <motion.div
                className={cn('h-full rounded-full', upgraded ? 'bg-[#00c776]' : 'bg-[#E9A23B]')}
                initial={false}
                animate={{ width: upgraded ? '30%' : '100%' }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: EASE }}
              />
            </div>
          </div>

          <div className="mt-[1.1em] flex items-center justify-between">
            <span className={cn('text-[0.8em] font-semibold tabular-nums', INK)}>
              {upgraded ? '$49 / month' : '$0 · trial'}
            </span>
            <span
              className={cn(
                'rounded-[0.5em] px-[1em] py-[0.45em] text-[0.7em] font-semibold transition-colors duration-300',
                upgraded
                  ? 'border border-[#E3E6EC] text-[#0e1836]'
                  : processing
                    ? 'bg-[#253c80] text-white'
                    : 'bg-[#0e1836] text-white shadow-[0_0_0_0.3em_rgba(0,199,118,0.25)]',
              )}
            >
              {upgraded ? 'Manage plan' : processing ? 'Upgrading…' : 'Upgrade to Team'}
            </span>
          </div>
        </div>

        {/* Activity */}
        <div className="flex flex-col rounded-[0.8em] border border-[#E3E6EC] p-[1em]">
          <p className={cn('text-[0.72em] font-semibold', INK)}>Activity</p>
          <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
            <AnimatePresence initial={false}>
              {upgraded && (
                <motion.div
                  key="inv"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={fade}
                  className="overflow-hidden"
                >
                  <Row title="Invoice INV-0042 paid" meta="$49.00 · just now" tone="green" />
                </motion.div>
              )}
              {upgraded && (
                <motion.div
                  key="up"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={fade}
                  className="overflow-hidden"
                >
                  <Row title="Upgraded Trial → Team" meta="by Dana R. · just now" tone="green" />
                </motion.div>
              )}
            </AnimatePresence>
            <Row title="Trial started" meta="11 days ago" />
            <Row title="3 teammates invited" meta="10 days ago" />
          </div>
        </div>

        {/* Usage: the trial cap holds it flat; after the upgrade
            the team grows into the new seats. */}
        <div className="flex min-h-0 flex-1 flex-col rounded-[0.8em] border border-[#E3E6EC] p-[1em]">
          <div className="flex items-center justify-between">
            <p className={cn('text-[0.72em] font-semibold', INK)}>Weekly active users</p>
            <span className={cn('text-[0.62em]', MUTED)}>Last 12 weeks</span>
          </div>
          <div className="mt-[0.8em] flex min-h-[6em] flex-1 items-end gap-[0.45em]">
            {USAGE.map((h, i) => {
              const after = i >= USAGE.length - 3;
              const height = after && !upgraded ? 30 : h;
              return (
                <motion.span
                  key={i}
                  initial={false}
                  animate={{ height: `${height}%` }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: after ? (i - 9) * 0.08 : 0, ease: EASE }}
                  className={cn('flex-1 rounded-t-[0.25em]', after && upgraded ? 'bg-[#00c776]' : 'bg-[#CBD5EE]')}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {upgraded && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={fade}
            className="absolute right-[1.4em] top-[1.2em] flex items-center gap-[0.5em] rounded-[0.6em] bg-[#0e1836] px-[0.9em] py-[0.55em] text-[0.7em] font-medium text-white shadow-[0_0.6em_1.4em_-0.6em_rgba(14,24,54,0.6)]"
          >
            <span className="h-[0.55em] w-[0.55em] rounded-full bg-[#00c776]" />
            Subscription upgraded
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({ title, meta, tone }: { title: string; meta: string; tone?: 'green' }) {
  return (
    <div className="flex items-center gap-[0.6em]">
      <span className={cn('h-[0.5em] w-[0.5em] shrink-0 rounded-full', tone === 'green' ? 'bg-[#00c776]' : 'bg-[#C8CEDA]')} />
      <span className={cn('flex-1 truncate text-[0.7em]', INK)}>{title}</span>
      <span className={cn('text-[0.62em]', MUTED)}>{meta}</span>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* CRM: a lead progressing through the pipeline                              */
/* ------------------------------------------------------------------------ */

const LEAD_STEPS = [1700, 1700, 3800];
const STAGES = ['New enquiry', 'Qualified', 'Proposal'];
const STATIC: Record<number, { name: string; detail: string; value: string; owner: string }[]> = {
  0: [{ name: 'Atlas Freight', detail: 'Referral', value: '$8,900', owner: 'RM' }],
  1: [{ name: 'Harbor & Pine', detail: 'Discovery booked', value: '$21,000', owner: 'AK' }],
  2: [{ name: 'Copperleaf Homes', detail: 'Sent Tue', value: '$34,500', owner: 'SL' }],
};
const LEAD_DETAIL = ['Website form · just now', 'Discovery call booked', 'Proposal sent'];

export function LeadProgressMock() {
  const { ref, step, cycle, reduceMotion } = useStepper(LEAD_STEPS);

  return (
    <div ref={ref} className="relative flex h-full flex-col bg-white p-[1.2em]">
      <div className="flex items-center justify-between">
        <p className={cn('text-[1.05em] font-semibold tracking-[-0.01em]', INK)}>Pipeline</p>
        <span className="rounded-[0.45em] bg-[#253c80] px-[0.8em] py-[0.35em] text-[0.68em] font-semibold text-white">
          New deal
        </span>
      </div>
      <LayoutGroup id={`lead-${cycle}`}>
        <div className="mt-[0.9em] grid min-h-0 flex-1 grid-cols-3 gap-[0.7em]">
          {STAGES.map((stage, col) => (
            <div key={stage} className="flex min-w-0 flex-col rounded-[0.6em] bg-[#F2F4F8] p-[0.55em]">
              <div className="flex items-center justify-between px-[0.2em] pb-[0.5em]">
                <span className={cn('text-[0.66em] font-semibold uppercase tracking-[0.06em]', MUTED)}>{stage}</span>
                <span className={cn('text-[0.62em] tabular-nums', MUTED)}>
                  {STATIC[col].length + (step === col ? 1 : 0)}
                </span>
              </div>
              <div className="flex flex-col gap-[0.45em]">
                {step === col && (
                  <motion.div
                    layoutId="lead"
                    key={`lead-${cycle}`}
                    initial={col === 0 && !reduceMotion ? { opacity: 0, y: -6 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 30 }}
                    className="rounded-[0.5em] border border-[#00c776]/60 bg-white p-[0.6em] shadow-[0_0.5em_1.2em_-0.6em_rgba(14,24,54,0.35)] ring-[0.18em] ring-[#00c776]/15"
                  >
                    <p className={cn('truncate text-[0.74em] font-semibold', INK)}>Northwind Clinic</p>
                    <p className={cn('mt-[0.15em] truncate text-[0.62em]', MUTED)}>{LEAD_DETAIL[col]}</p>
                    <div className="mt-[0.55em] flex items-center justify-between">
                      <span className={cn('text-[0.68em] font-semibold tabular-nums', INK)}>$12,400</span>
                      <Avatar initials="AK" />
                    </div>
                  </motion.div>
                )}
                {STATIC[col].map((d) => (
                  <div key={d.name} className="rounded-[0.5em] border border-[#E3E6EC] bg-white p-[0.6em]">
                    <p className={cn('truncate text-[0.74em] font-semibold', INK)}>{d.name}</p>
                    <p className={cn('mt-[0.15em] truncate text-[0.62em]', MUTED)}>{d.detail}</p>
                    <div className="mt-[0.55em] flex items-center justify-between">
                      <span className={cn('text-[0.68em] font-semibold tabular-nums', INK)}>{d.value}</span>
                      <Avatar initials={d.owner} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </LayoutGroup>
      <AnimatePresence>
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: EASE }}
            className="absolute bottom-[1em] right-[1.2em] flex items-center gap-[0.5em] rounded-[0.6em] bg-[#0e1836] px-[0.9em] py-[0.55em] text-[0.7em] font-medium text-white"
          >
            <span className="h-[0.55em] w-[0.55em] rounded-full bg-[#00c776]" />
            Moved to Proposal · follow-up scheduled
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
