"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";
import { Waveform } from "@/components/ui/waveform";

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
  { who: "caller", text: "Hi, do you have anything Tuesday morning?" },
  { who: "agent", text: "We do. 10:30 works. Shall I book it for you?" },
  { who: "caller", text: "That would be great, thanks." },
];

export function VoiceDemo({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-10%" });
  const [line, setLine] = useState(reduceMotion ? TRANSCRIPT.length - 1 : 0);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const id = setInterval(
      () => setLine((l) => (l + 1) % (TRANSCRIPT.length + 1)),
      2100,
    );
    return () => clearInterval(id);
  }, [reduceMotion, inView]);

  return (
    <div ref={ref} className={cn("flex flex-col gap-4 sm:gap-5", className)}>
      <div className="h-12 w-full sm:h-16">
        <Waveform
          active={reduceMotion ? true : inView && line < TRANSCRIPT.length}
          // The default idle colour is the structural navy, which is invisible
          // inside the dark service panel — between transcript lines the meter
          // simply vanished. This is the muted foreground of the dark theme.
          idleColor="#8b93a6"
        />
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        {TRANSCRIPT.map((entry, i) => (
          <motion.div
            key={entry.text}
            initial={false}
            /**
             * DIMMING TEXT WITH OPACITY IS THE WRONG MECHANISM, and this is the
             * second time it was wrong here. It started at 0.18 (≈1.4:1 —
             * invisible). Raising it to 0.55 still measured 2.67:1 against the
             * navy bubble, because opacity multiplies the TEXT down as well as
             * the background.
             *
             * So the pending state is now carried by colour and position, not
             * transparency: `fg-muted` (5.7:1 on the bubble) for a line not yet
             * said, `fg` (12.2:1) once it has been. Both pass at 12px, the
             * progression still reads, and it survives the animation being off.
             */
            animate={{ y: i <= line ? 0 : 4 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            // Theme-neutral. These bubbles were tuned when this demo lived on
            // a navy panel; the section is paper now, and `bg-ink/25` rendered
            // as a flat grey slab. A bordered raised surface for the agent and
            // a tinted foreground wash for the caller both resolve correctly
            // on either polarity, because both are expressed in theme tokens
            // rather than in a fixed colour.
            className={cn(
              "max-w-[90%] rounded-control px-3 py-2 text-xs leading-relaxed transition-colors duration-base ease-out",
              entry.who === "agent" ? "ml-auto text-right" : "",
              i <= line
                ? entry.who === "agent"
                  ? "border border-line/12 bg-surface-raised text-fg"
                  : "bg-fg/[0.07] text-fg"
                : "bg-fg/[0.03] text-fg-muted",
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
  { id: "trigger", label: "Trigger", x: 12, y: 50 },
  { id: "enrich", label: "Enrich", x: 38, y: 20 },
  { id: "decide", label: "Route", x: 38, y: 80 },
  { id: "act", label: "Act", x: 66, y: 50 },
  { id: "log", label: "Log", x: 90, y: 50 },
];

const EDGES = [
  ["trigger", "enrich"],
  ["trigger", "decide"],
  ["enrich", "act"],
  ["decide", "act"],
  ["act", "log"],
] as const;

export function AutomationDemo({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    // The inner wrapper is load-bearing. `className` carries the panel padding,
    // so the <svg> filled the CONTENT box while the node labels were positioned
    // against the BORDER box — the edges rendered offset from the nodes they
    // were supposed to connect by exactly the padding. Both layers now share
    // one coordinate space.
    <div className={cn("relative w-full", className)}>
      <div className="relative h-full w-full">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
        {EDGES.map(([from, to], i) => {
          const a = byId[from];
          const b = byId[to];
          const d = `M ${a.x} ${a.y} C ${(a.x + b.x) / 2} ${a.y}, ${(a.x + b.x) / 2} ${b.y}, ${b.x} ${b.y}`;
          return (
            <g key={`${from}-${to}`}>
              {/* currentColor, not a hardcoded navy: this demo renders inside
                  the dark service panel, where rgba(14,24,54,…) is navy on
                  navy — the resting workflow graph was invisible and only the
                  travelling green pulse showed. */}
              <path
                d={d}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.2}
                strokeWidth={0.6}
                vectorEffect="non-scaling-stroke"
              />
              {!reduceMotion && (
                <motion.path
                  d={d}
                  fill="none"
                  stroke="#00c776"
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
                    ease: "easeInOut",
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
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-line/15 bg-surface px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-fg"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          initial={false}
          animate={
            reduceMotion
              ? undefined
              : {
                  borderColor: [
                    "rgba(255,255,255,0.12)",
                    "rgba(0,199,118,0.7)",
                    "rgba(255,255,255,0.12)",
                  ],
                }
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
    v.play()
      .then(() => setPlaying(true))
      .catch(() => {});
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
        "relative grid grid-cols-[0.72fr_1fr_0.72fr] items-center gap-3 overflow-hidden rounded-panel border border-line/10 bg-surface-raised/50 p-4 sm:gap-5 sm:p-6",
        className,
      )}
    >
      <div className="relative aspect-[9/16] -rotate-3 overflow-hidden rounded-control border border-line/15 bg-gradient-to-b from-accent-500/25 to-surface">
        <div className="absolute inset-x-3 bottom-3 space-y-2">
          <span className="block h-1.5 w-4/5 rounded-full bg-fg/60" />
          <span className="block h-1.5 w-3/5 rounded-full bg-fg/25" />
          <span className="block h-6 w-16 rounded-full bg-accent-500" />
        </div>
      </div>

      <div className="relative z-raised aspect-[9/16] overflow-hidden rounded-control border border-accent-500/35 bg-black shadow-glow-lg">
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/ai-video-creative.webp"
          className="h-full w-full object-cover"
        />
        {!playing && (
          <span className="absolute inset-0 flex items-center justify-center bg-ink/25">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-ink/70 backdrop-blur-sm">
              <Play className="ml-0.5 h-4 w-4 text-white" aria-hidden />
            </span>
          </span>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-accent-500 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-ink">
          Creative 02
        </span>
      </div>

      <div className="relative aspect-[9/16] rotate-3 overflow-hidden rounded-control border border-line/15 bg-surface">
        <div className="absolute inset-3 flex flex-col justify-between">
          <div className="flex justify-between">
            <span className="h-2 w-2 rounded-full bg-accent-500" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-fg-subtle">
              00:15
            </span>
          </div>
          <div className="space-y-2">
            <span className="block h-10 w-10 rounded-full border border-line/20" />
            <span className="block h-1.5 w-full rounded-full bg-fg/45" />
            <span className="block h-1.5 w-2/3 rounded-full bg-fg/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Websites ──────────────────────────────────────────────────────────
   Two browser frames: where the visitor came from, and what they were
   shown. Same form as before — the content is no longer placeholder.

   WHY THIS CHANGED. The front frame used to be four grey bars and a green
   circle standing in for a headline, body copy and an image. Beside the Voice
   panel, which shows a real conversation, a visitor clicking through the five
   services read "voice is the real business, web is a side line". A wireframe
   is a fine way to draw a website and a bad way to argue you build good ones.

   Nothing here is a metric. The labels describe the mechanism — intent read,
   proof surfaced, enquiry attributed — in the same words the hero uses. No
   invented conversion rate, no fabricated client.                            */

export function WebsiteDemo({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-panel border border-line/10 bg-surface-raised/50 p-5 sm:p-7",
        className,
      )}
    >
      {/* Where they came from. */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18, rotate: -2 }}
        animate={
          reduceMotion || inView ? { opacity: 1, y: 0, rotate: -2 } : undefined
        }
        transition={{ duration: 0.65, ease: EASE_OUT }}
        className="absolute left-[5%] top-[12%] h-[52%] w-[52%] overflow-hidden rounded-control border border-line/15 bg-surface"
      >
        <div className="flex items-center gap-1 border-b border-line/10 px-2 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-fg/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-fg/20" />
        </div>
        <div className="space-y-2 p-3">
          <span className="type-mono-sm block text-fg-subtle">Paid search</span>
          <span className="block text-[13px] font-medium leading-snug text-fg">
            “ai receptionist pricing”
          </span>
          <span className="block h-1 w-2/3 rounded-full bg-fg/12" />
          <span className="block h-1 w-1/2 rounded-full bg-fg/12" />
        </div>
      </motion.div>

      {/* What they were shown. */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: 2 }}
        animate={
          reduceMotion || inView ? { opacity: 1, y: 0, rotate: 2 } : undefined
        }
        transition={{ duration: 0.75, delay: 0.12, ease: EASE_OUT }}
        className="absolute bottom-[14%] right-[4%] h-[72%] w-[62%] overflow-hidden rounded-control border border-accent-500/30 bg-surface shadow-glow-lg"
      >
        <div className="flex items-center gap-1.5 border-b border-line/10 px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
          <span className="h-1.5 w-1.5 rounded-full bg-fg/20" />
          <span className="ml-2 h-3 flex-1 rounded-full bg-fg/[0.07]" />
        </div>

        <div className="flex h-[calc(100%-2.25rem)] flex-col gap-2.5 p-4">
          <span className="type-mono-sm text-signal">Intent · pricing</span>
          <span className="text-[15px] font-semibold leading-tight text-fg">
            What it costs, and what it replaces
          </span>

          {/* The proof that matches the intent — the section's whole point. */}
          <div className="rounded-control border border-line/12 bg-fg/[0.03] px-2.5 py-2">
            <span className="type-mono-sm block text-fg-subtle">
              Proof surfaced
            </span>
            <span className="mt-1 block text-[12px] leading-snug text-fg-muted">
              The case that matches this intent, not the homepage reel
            </span>
          </div>

          <span className="mt-auto inline-flex w-fit items-center rounded-control bg-accent-500 px-3 py-1.5 text-[12px] font-semibold text-ink">
            Book a call
          </span>
        </div>
      </motion.div>

      {/* The outcome, in the same green the hero reserves for results. */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
        animate={reduceMotion || inView ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.5, delay: 0.45, ease: EASE_OUT }}
        /**
         * Anchored BOTTOM-LEFT under the back frame, and the CTA sits at the
         * bottom of the front frame on the right. A `max-w` cap was not enough:
         * at 1024 the panel narrows, the frames slide together, and the two
         * still collided. Pinning the callout below the back frame's footprint
         * means no width can bring them into the same row.
         */
        className="absolute bottom-4 left-4 z-raised max-w-[46%] rounded-control border border-accent-500/30 bg-ink px-3 py-2 shadow-glow-md"
      >
        <span className="type-mono-sm block text-white/55">Outcome</span>
        <span className="mt-0.5 block font-mono text-[13px] leading-snug text-accent-500">
          Attributed to source
        </span>
      </motion.div>
    </div>
  );
}

/* ── SaaS products ─────────────────────────────────────────────────────
   A compact product shell: navigation, live KPIs, and a working data view. */

export function SaaSDemo({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "overflow-hidden rounded-panel border border-line/10 bg-surface-raised/55 p-4 sm:p-6",
        className,
      )}
    >
      <div className="grid h-full grid-cols-[4.25rem_1fr] overflow-hidden rounded-control border border-line/10 bg-surface">
        <div className="flex flex-col gap-3 border-r border-line/10 p-3">
          <span className="mb-2 h-7 w-7 rounded-full bg-accent-500" />
          {[0, 1, 2, 3, 4].map((n) => (
            <span
              key={n}
              className={cn(
                "h-2 rounded-full",
                n === 1 ? "w-full bg-accent-500/70" : "w-4/5 bg-fg/12",
              )}
            />
          ))}
        </div>

        <div className="flex min-w-0 flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <span className="block h-2.5 w-28 rounded-sm bg-fg/60" />
              <span className="block h-1.5 w-20 rounded-full bg-fg/15" />
            </div>
            <span className="rounded-sm bg-accent-500 px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-ink">
              Live
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* These read "Live / Synced / Owned" with a grey bar under each —
                three words that describe nothing a visitor can act on. They
                are now the SaaS run from the hero, in the same order and the
                same language, so the panel says what the product does rather
                than gesturing at a dashboard.

                Deliberately no numbers. A fabricated metric in a demo is still
                a fabricated metric. */}
            {[
              { state: "User action", detail: "In-product event" },
              { state: "Context", detail: "Loaded and attributed" },
              { state: "AI assist", detail: "Offered at drop-off" },
            ].map((tile, i) => (
              <div
                key={tile.state}
                className={cn(
                  "border p-3",
                  i === 2
                    ? "border-accent-500/35 bg-accent-500/[0.06]"
                    : "border-line/10 bg-fg/[0.025]",
                )}
              >
                <span
                  className={cn(
                    "block text-[13px] font-semibold leading-tight",
                    i === 2 ? "text-signal" : "text-fg",
                  )}
                >
                  {tile.state}
                </span>
                <span className="mt-1 block text-[11px] leading-snug text-fg-muted">
                  {tile.detail}
                </span>
              </div>
            ))}
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[1fr_0.7fr] gap-2">
            <div className="relative overflow-hidden border border-line/10 p-3">
              <span className="type-label text-fg-subtle">Product events</span>
              <div className="absolute inset-x-3 bottom-3 flex h-16 items-end gap-1">
                {[35, 58, 45, 72, 62, 88, 78, 96].map((height, i) => (
                  <motion.span
                    key={i}
                    className="flex-1 bg-accent-500"
                    initial={reduceMotion ? false : { height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{
                      duration: 0.55,
                      delay: i * 0.05,
                      ease: EASE_OUT,
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Was four grey bars beside four dots. Same shape, but each row
                now names a step the product actually completed. */}
            <div className="space-y-2.5 border border-line/10 p-3">
              <span className="type-label text-fg-subtle">Activity</span>
              {[
                "Workflow completed",
                "Event recorded",
                "Insight generated",
              ].map((row, n) => (
                <span key={row} className="flex items-start gap-2">
                  <span
                    className={cn(
                      "mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full",
                      n === 0 ? "bg-accent-500" : "bg-fg/25",
                    )}
                  />
                  <span className="text-[11px] leading-snug text-fg-muted">
                    {row}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
