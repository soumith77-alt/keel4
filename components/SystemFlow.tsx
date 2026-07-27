'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CalendarCheck,
  Database,
  MessageSquare,
  PhoneIncoming,
  Sparkles,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Waveform } from '@/components/ui/waveform';

/**
 * The hero's "live product moment": one signal travelling through the system
 * Keel actually builds — call in, agent handles it, CRM updates, follow up
 * sends, appointment books.
 *
 * This replaces an abstract decorative visual. The motion is the explanation:
 * each step activates in sequence so the pipeline reads as a single system
 * rather than four unrelated services.
 */

const STEPS = [
  {
    icon: PhoneIncoming,
    label: 'Inbound call',
    detail: 'Answered in 1.8s',
    /** Shown on mobile too — the first three steps carry the whole story. */
    core: true,
  },
  {
    icon: Sparkles,
    label: 'Agent handles it',
    detail: 'Intent captured, questions answered',
    core: true,
  },
  {
    icon: Database,
    label: 'CRM updated',
    detail: 'Contact created, call transcribed',
  },
  {
    icon: MessageSquare,
    label: 'Follow up sent',
    detail: 'Confirmation SMS delivered',
  },
  {
    icon: CalendarCheck,
    label: 'Appointment booked',
    detail: 'Tuesday, 10:30, added to calendar',
    core: true,
  },
];

const STEP_MS = 1700;

export default function SystemFlow() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), STEP_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // With reduced motion the whole pipeline reads as complete rather than idle.
  const isDone = (i: number) => (reduceMotion ? true : i < step);
  const isActive = (i: number) => (reduceMotion ? false : i === step);

  return (
    <div className="relative w-full rounded-panel border border-line/15 bg-surface-raised/80 backdrop-blur-sm shadow-panel">
      {/* Panel chrome.
          Labelled as a simulation on purpose: "live / connected" on an
          animation implies a running system and would be misleading. */}
      <div className="flex items-center justify-between border-b border-line/10 px-5 py-3.5">
        <span className="type-label text-fg-muted">Voice agent workflow</span>
        <span className="type-label flex items-center gap-2 text-fg-muted">
          <span
            aria-hidden
            className="inline-flex h-1.5 w-1.5 rounded-full bg-accent-500"
          />
          Simulation
        </span>
      </div>

      {/* Waveform, the incoming call itself */}
      <div className="border-b border-line/10 px-5 py-5">
        <div className="h-14 w-full">
          <Waveform active={reduceMotion ? true : step === 0 || step === 1} />
        </div>
      </div>

      {/* Pipeline */}
      <ol className="relative px-5 py-4">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const active = isActive(i);
          const done = isDone(i);

          return (
            <li
              key={s.label}
              className={cn(
                'relative flex gap-4 py-2.5',
                // Mobile shows the three stages that carry the story.
                !s.core && 'hidden sm:flex'
              )}
            >
              {/* Connector rail */}
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[15px] top-[34px] h-[calc(100%-16px)] w-px bg-fg/[0.06]"
                >
                  <motion.span
                    className="absolute inset-x-0 top-0 bg-accent-500"
                    initial={false}
                    animate={{ height: done || active ? '100%' : '0%' }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
              )}

              <span
                className={cn(
                  'relative z-raised flex h-8 w-8 shrink-0 items-center justify-center rounded-control border transition-colors duration-base',
                  active
                    ? 'border-ink/50 bg-ink text-white'
                    : done
                      ? 'border-ink/25 bg-ink/10 text-accent-700'
                      : 'border-line/15 bg-fg/[0.03] text-fg-subtle'
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                {active && !reduceMotion && (
                  <motion.span
                    className="absolute inset-0 rounded-control ring-1 ring-accent-500"
                    initial={{ opacity: 0.9, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.5 }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                  />
                )}
              </span>

              <div className="min-w-0 flex-1 pb-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span
                    className={cn(
                      'text-sm font-medium transition-colors duration-base',
                      active || done ? 'text-fg' : 'text-fg-muted'
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                <motion.p
                  className="mt-0.5 truncate text-xs text-fg-muted"
                  initial={false}
                  animate={{ opacity: active || done ? 1 : 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  {s.detail}
                </motion.p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
