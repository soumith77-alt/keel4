'use client';

import Link from 'next/link';
import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

import { calendlyLink } from '@/config/content';
import RotatingHeadlineWord from './RotatingHeadlineWord';
import SystemFlow from './SystemFlow';
import { Button } from '@/components/ui/button';
import { Marquee } from '@/components/ui/marquee';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const CAPABILITIES = [
  'Inbound voice agents',
  'Outbound campaigns',
  'Lead reactivation',
  'Workflow automation',
  'UGC ad creative',
  'AI video',
  'Conversion sites',
  'CRM integration',
  'Appointment booking',
  'Performance reporting',
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Pointer-tracked glow. Written to CSS vars so the grid mask follows too.
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.4);
  const springCfg = { stiffness: 80, damping: 22, mass: 0.6 };
  const glowX = useSpring(useTransform(pointerX, [0, 1], ['0%', '100%']), springCfg);
  const glowY = useSpring(useTransform(pointerY, [0, 1], ['0%', '100%']), springCfg);
  const panelTilt = useSpring(useTransform(pointerX, [0, 1], [1.4, -1.4]), springCfg);

  // Hooks must run unconditionally — build the gradient here, branch at use.
  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(38rem 38rem at ${x} ${y}, rgba(37,60,128,0.4), transparent 70%)`
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
  };

  // Above-the-fold copy is NOT hidden behind an entrance. Framer's `initial`
  // writes opacity:0 into the SSR HTML, so a slow or failed bundle showed an
  // empty hero. Only decorative layers animate, and delays stay under 300ms.
  const fadeIn = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: EASE_OUT },
        };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative isolate flex min-h-[86svh] flex-col overflow-hidden bg-surface lg:min-h-[100svh]"
    >
      {/* ── Technical grid ───────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 z-base opacity-[0.5] [background-image:linear-gradient(to_right,rgba(91,119,201,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(91,119,201,0.18)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_30%,black,transparent)]"
      />

      {/* Pointer-tracked luminance */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-base"
        style={reduceMotion ? undefined : { background: glowBackground }}
      />

      <div
        aria-hidden
        className="gradient-orb absolute -top-40 left-[15%] z-base h-[36rem] w-[36rem] bg-brand-700/45"
      />
      <div aria-hidden className="grain-overlay absolute inset-0 z-base" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-base h-56 bg-gradient-to-b from-transparent to-surface"
      />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="relative z-raised mx-auto flex w-full max-w-content flex-1 items-center px-5 pb-10 pt-28 sm:px-8 sm:pb-14 sm:pt-36">
        <motion.div
          style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
          className="grid w-full grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-12"
        >
          {/* Copy */}
          <div className="lg:col-span-6">
            <span
              className="type-label inline-flex items-center gap-2.5 border border-white/[0.12] bg-white/[0.04] px-3.5 py-2 text-brand-200 backdrop-blur-sm"
            >
              Agentic AI Solutions Studio
            </span>

            {/* type-h1 rather than type-display: the copy shares the row with
                the system panel, so the display scale overflows to four lines. */}
            <h1 className="type-h1 mt-7 text-fg">
              <span className="sr-only">
                We build AI systems that talk, create, automate, and compound
                growth.
              </span>
              <span aria-hidden className="block">
                We build AI systems
              </span>
              <span aria-hidden className="mt-1 block text-brand-200">
                that <RotatingHeadlineWord className="text-brand-200" />
              </span>
            </h1>

            <p className="type-body-lg measure mt-6 text-fg-muted text-pretty">
              Voice agents, automations, video, and websites, built as one
              system that compounds growth, not four disconnected projects.
            </p>

            {/* Credibility line, grounded in the claim already made in the FAQ */}
            <p className="type-label mt-5 flex items-center gap-2.5 text-fg-muted">
              <span className="inline-block h-px w-6 bg-brand-400/60" />
              Voice agents live in as little as one week
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                  Design my AI system
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/services/voice-ai#listen-to-demo">
                  See a voice agent live
                </Link>
              </Button>
            </div>
          </div>

          {/* Live system panel */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE_OUT }}
            style={reduceMotion ? undefined : { rotate: panelTilt }}
            className="lg:col-span-6"
          >
            <SystemFlow />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Capability ticker ────────────────────────────────────────── */}
      <motion.div
        {...fadeIn(0.25)}
        className="relative z-raised border-t border-white/[0.07] bg-surface/50 backdrop-blur-sm"
      >
        <div className="mx-auto flex w-full max-w-content items-center gap-8 px-5 py-4 sm:px-8">
          <span className="hidden shrink-0 items-center gap-2 text-fg-subtle sm:flex">
            <ArrowDown
              className={reduceMotion ? 'h-4 w-4' : 'h-4 w-4 animate-bounce'}
              aria-hidden
            />
            <span className="type-label">Scroll</span>
          </span>
          <Marquee items={CAPABILITIES} className="flex-1" speed={48} />
        </div>
      </motion.div>
    </section>
  );
}
