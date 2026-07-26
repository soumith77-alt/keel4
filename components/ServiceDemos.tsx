'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Waveform } from '@/components/ui/waveform';

/**
 * Functional micro-demos for the service bento. Each one shows what the service
 * actually does rather than illustrating it with an icon.
 *
 * All of them are cheap: 2D canvas, SVG, or CSS. The only video is loaded lazily
 * and only starts on hover, because the source files are multi-megabyte.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/* ── Voice AI ──────────────────────────────────────────────────────────
   Reactive waveform with a transcript that types itself in.               */

const TRANSCRIPT = [
  { who: 'caller', text: 'Hi, do you have anything Tuesday morning?' },
  { who: 'agent', text: 'We do. 10:30 works. Shall I book it for you?' },
  { who: 'caller', text: 'That would be great, thanks.' },
];

export function VoiceDemo({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-10%' });
  const [line, setLine] = useState(reduceMotion ? TRANSCRIPT.length - 1 : 0);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const id = setInterval(
      () => setLine((l) => (l + 1) % (TRANSCRIPT.length + 1)),
      2100
    );
    return () => clearInterval(id);
  }, [reduceMotion, inView]);

  return (
    <div ref={ref} className={cn('flex flex-col gap-4 sm:gap-5', className)}>
      <div className="h-12 w-full sm:h-16">
        <Waveform active={reduceMotion ? true : inView && line < TRANSCRIPT.length} />
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        {TRANSCRIPT.map((entry, i) => (
          <motion.div
            key={entry.text}
            initial={false}
            animate={{
              opacity: i <= line ? 1 : 0.18,
              y: i <= line ? 0 : 4,
            }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className={cn(
              'max-w-[90%] rounded-control px-3 py-1.5 text-xs leading-relaxed sm:py-2',
              entry.who === 'agent'
                ? 'ml-auto bg-brand-600/30 text-brand-100 text-right'
                : 'bg-white/[0.05] text-fg-muted'
            )}
          >
            {entry.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Automations ───────────────────────────────────────────────────────
   Workflow map with a signal travelling the edges.                        */

const NODES = [
  { id: 'trigger', label: 'Trigger', x: 12, y: 50 },
  { id: 'enrich', label: 'Enrich', x: 38, y: 20 },
  { id: 'decide', label: 'Route', x: 38, y: 80 },
  { id: 'act', label: 'Act', x: 66, y: 50 },
  { id: 'log', label: 'Log', x: 90, y: 50 },
];

const EDGES = [
  ['trigger', 'enrich'],
  ['trigger', 'decide'],
  ['enrich', 'act'],
  ['decide', 'act'],
  ['act', 'log'],
] as const;

export function AutomationDemo({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <div className={cn('relative w-full', className)}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden
      >
        {EDGES.map(([from, to], i) => {
          const a = byId[from];
          const b = byId[to];
          const d = `M ${a.x} ${a.y} C ${(a.x + b.x) / 2} ${a.y}, ${(a.x + b.x) / 2} ${b.y}, ${b.x} ${b.y}`;
          return (
            <g key={`${from}-${to}`}>
              <path
                d={d}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth={0.6}
                vectorEffect="non-scaling-stroke"
              />
              {!reduceMotion && (
                <motion.path
                  d={d}
                  fill="none"
                  stroke="#8ba3e0"
                  strokeWidth={1.1}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2.2,
                    delay: i * 0.35,
                    repeat: Infinity,
                    repeatDelay: 1.4,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {NODES.map((n, i) => (
        <motion.span
          key={n.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-white/[0.12] bg-surface px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-fg"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          initial={false}
          animate={
            reduceMotion
              ? undefined
              : { borderColor: ['rgba(255,255,255,0.12)', 'rgba(139,163,224,0.6)', 'rgba(255,255,255,0.12)'] }
          }
          transition={{
            duration: 2.2,
            delay: i * 0.35,
            repeat: Infinity,
            repeatDelay: 1.4,
          }}
        >
          {n.label}
        </motion.span>
      ))}
    </div>
  );
}

/* ── AI Video ──────────────────────────────────────────────────────────
   Vertical reel. Source is multi-MB, so: preload none, play on hover only. */

export function VideoDemo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const reduceMotion = useReducedMotion();

  const start = () => {
    const v = videoRef.current;
    if (!v || reduceMotion) return;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };

  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
  };

  return (
    <div
      onPointerEnter={start}
      onPointerLeave={stop}
      className={cn(
        'relative overflow-hidden rounded-control bg-black/40',
        className
      )}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        className="h-full w-full object-cover"
      />
      {!playing && (
        <span className="absolute inset-0 flex items-center justify-center bg-surface/50 backdrop-blur-[1px]">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10">
            <Play className="ml-0.5 h-4 w-4 text-fg" aria-hidden />
          </span>
        </span>
      )}
    </div>
  );
}

/* ── Websites ──────────────────────────────────────────────────────────
   Browser chrome whose content assembles itself.                          */

export function WebsiteDemo({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  const blocks = [
    'h-2 w-1/3 bg-white/25',
    'h-2 w-2/3 bg-white/10',
    'h-2 w-1/2 bg-white/10',
    'h-6 w-24 bg-brand-500/60',
  ];

  return (
    <div
      ref={ref}
      className={cn(
        'overflow-hidden rounded-control border border-white/[0.1] bg-surface',
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="ml-2 h-3 flex-1 rounded-full bg-white/[0.06]" />
      </div>
      <div className="flex flex-col gap-2 p-3.5 sm:gap-2.5 sm:p-4">
        {blocks.map((b, i) => (
          <motion.span
            key={b}
            className={cn('block rounded-sm', b)}
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            animate={
              reduceMotion || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }
            }
            transition={{ duration: 0.5, delay: 0.1 + i * 0.12, ease: EASE_OUT }}
          />
        ))}
      </div>
    </div>
  );
}
