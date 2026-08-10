'use client';

import { cn } from '@/lib/utils';
import type { TraceForm, TraceStep } from '@/config/content';

/**
 * The instruments in the hero's system row.
 *
 * These are deliberately NOT cards. No fill, no shadow, no 12px radius — a
 * 1px rule, a 3px corner, and a translucent obsidian backing just dark enough
 * to hold text over the contour field.
 *
 * TWO THINGS THIS FILE NO LONGER DOES, and both were defects:
 *
 *   · NOTHING HAS AN INACTIVE STATE. An earlier version dimmed every step a
 *     running sequence had not yet reached, so four of five states sat at low
 *     contrast while the visitor waited. Everything renders at final contrast.
 *   · NOTHING IS SET AT 13px ANY MORE. The payloads were `type-small` at its
 *     old floor and the state labels were 11px mono; the panel looked precise
 *     and could not actually be read. Payloads are body copy and labels are
 *     the shared mono label role, which now starts at 12px.
 *
 * `form` decides what each row DRAWS. A waveform is not a decision branch is
 * not a reel strip — that is what stops the five services from looking like
 * the same diagram with different words in it.
 */

const TONE = {
  input: 'text-technical-400',
  system: 'text-fg',
  result: 'text-signal',
} as const;

/** The little instrument beside each line. All CSS/SVG, no assets. */
export function Form({ form, className }: { form: TraceForm; className?: string }) {
  switch (form) {
    case 'pulse':
      return (
        <span className={cn('relative flex h-6 w-6 items-center justify-center', className)}>
          <span className="block h-2 w-2 rounded-full bg-accent-500" />
          <span className="absolute h-3.5 w-3.5 rounded-full border border-accent-500/55" />
          <span className="absolute h-6 w-6 rounded-full border border-accent-500/25" />
        </span>
      );

    case 'wave':
      return (
        <span className={cn('flex h-6 items-center gap-[2px]', className)}>
          {[0.45, 0.85, 1, 0.6, 0.9, 0.4].map((s, i) => (
            <span
              key={i}
              className="block w-[2px] rounded-full bg-accent-500/85"
              style={{ height: `${s * 22}px` }}
            />
          ))}
        </span>
      );

    case 'transcript':
      return (
        <span className={cn('flex w-9 flex-col gap-1', className)}>
          <span className="block h-[3px] w-full rounded-full bg-accent-500/85" />
          <span className="block h-[3px] w-3/5 rounded-full bg-fg/25" />
        </span>
      );

    case 'branch':
      return (
        <svg viewBox="0 0 36 22" className={cn('h-6 w-9', className)} aria-hidden>
          <path
            d="M2 11 H12 M12 11 V5 H24 M12 11 V17 H24"
            fill="none"
            strokeWidth="1.4"
            className="stroke-accent-500/85"
          />
          <circle cx="28" cy="5" r="2.4" className="fill-accent-500" />
          <circle cx="28" cy="17" r="2" className="fill-fg/25" />
        </svg>
      );

    case 'slots':
      return (
        <span className={cn('flex gap-1', className)}>
          {['10:30', '14:15'].map((s, i) => (
            <span
              key={s}
              className={cn(
                'rounded-[2px] border px-1 py-0.5 font-mono text-[11px] leading-none',
                i === 0
                  ? 'border-accent-500/70 text-signal'
                  : 'border-line/20 text-fg-muted',
              )}
            >
              {s}
            </span>
          ))}
        </span>
      );

    case 'reels':
      return (
        <span className={cn('flex items-end gap-1', className)}>
          {[14, 22, 16].map((h, i) => (
            <span
              key={i}
              className={cn(
                'block w-3.5 rounded-[2px] border',
                i === 1
                  ? 'border-accent-500/70 bg-accent-500/25'
                  : 'border-line/20 bg-fg/[0.07]',
              )}
              style={{ height: `${h}px` }}
            />
          ))}
        </span>
      );

    case 'browser':
      return (
        <span className={cn('block w-10 rounded-[2px] border border-line/20', className)}>
          <span className="flex items-center gap-[3px] border-b border-line/15 px-1 py-[3px]">
            <span className="block h-[3px] w-[3px] rounded-full bg-accent-500" />
            <span className="block h-[3px] flex-1 rounded-full bg-fg/15" />
          </span>
          <span className="flex gap-[3px] p-1">
            <span className="block h-3 flex-1 rounded-[1px] bg-fg/10" />
            <span className="block h-3 w-3 rounded-[1px] bg-accent-500/45" />
          </span>
        </span>
      );

    case 'chart':
      return (
        <span className={cn('flex h-6 items-end gap-[2px]', className)}>
          {[8, 14, 11, 20, 17].map((h, i) => (
            <span
              key={i}
              className={cn(
                'block w-1.5 rounded-[1px]',
                i > 2 ? 'bg-accent-500' : 'bg-fg/22',
              )}
              style={{ height: `${h}px` }}
            />
          ))}
        </span>
      );

    case 'confirm':
      return (
        <svg viewBox="0 0 24 24" className={cn('h-6 w-6', className)} aria-hidden>
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            strokeWidth="1.4"
            className="stroke-accent-500"
          />
          <path
            d="M7.5 12.4 10.6 15.4 16.5 8.8"
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-accent-500"
          />
        </svg>
      );

    case 'chip':
    default:
      return (
        <span
          className={cn('inline-block h-2 w-8 rounded-full bg-accent-500', className)}
        />
      );
  }
}

/**
 * A terminal object — the input at one end of the row, the outcome at the
 * other. Two lines: what it is, and what it says.
 */
export function SignalObject({
  step,
  role,
  className,
}: {
  step: TraceStep;
  role: 'input' | 'outcome';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-[3px] border px-4 py-4 backdrop-blur-[2px]',
        // The outcome is the one object allowed to be brighter than the rest:
        // it is what the visitor came to find out.
        role === 'outcome'
          ? 'border-accent-500/45 bg-[rgb(var(--canvas))]/85'
          : 'border-line/18 bg-[rgb(var(--canvas))]/75',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            'type-mono-sm',
            role === 'outcome' ? 'text-signal' : 'text-technical-400',
          )}
        >
          {step.state}
        </span>
        <Form form={step.form} />
      </div>
      <p className={cn('type-body mt-3 leading-snug text-pretty', TONE[step.tone])}>
        {step.payload}
      </p>
    </div>
  );
}

/**
 * The transformation area — the middle of the row, where the three system
 * states live as rows of one object rather than as three boxes floating
 * around the headline.
 */
export function CoreArea({
  steps,
  service,
  className,
}: {
  steps: TraceStep[];
  service: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-[3px] border border-line/18 bg-[rgb(var(--canvas))]/80 backdrop-blur-[2px]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line/12 px-4 py-3">
        <span className="type-mono-sm text-fg-muted">{service}</span>
        <span className="type-mono-sm text-fg-subtle">Example run</span>
      </div>
      <ul className="divide-y divide-line/10">
        {steps.map((step) => (
          <li key={step.state} className="flex items-start gap-4 px-4 py-3">
            <span className="mt-[2px] shrink-0">
              <Form form={step.form} />
            </span>
            <span className="min-w-0">
              <span className="type-mono-sm block text-fg-subtle">{step.state}</span>
              <span
                className={cn('type-body mt-1 block leading-snug text-pretty', TONE[step.tone])}
              >
                {step.payload}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
