'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { calendlyLink } from '@/config/content';
import KeelSystem, { SYSTEM_FORMS, type SystemForm } from './KeelSystem';

/**
 * Hero. The headline is deliberately set to break into TWO lines, not four —
 * at 1280px the old wording stacked four deep and made the left column read
 * as a dense block. The explicit <br/> plus a wider column enforces that.
 *
 * The rotating label under the headline is the only body copy on the screen;
 * the system object carries the rest.
 */

const LABELS: Record<SystemForm, { title: string; detail: string }> = {
  voice: { title: 'Voice', detail: 'Answers, qualifies, books' },
  workflow: { title: 'Automation', detail: 'One trigger, everything downstream' },
  video: { title: 'AI Video', detail: 'Short-form creative built to test and scale' },
  convert: { title: 'Conversion Websites', detail: 'Pages engineered to turn traffic into action' },
  product: { title: 'SaaS', detail: 'From product logic to shipped software' },
};

const INTERVAL = 4200;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [i, setI] = useState(0);
  // Once the visitor picks, stop cycling — otherwise the timer overrides the
  // click a moment later and the control feels broken.
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (reduceMotion || touched) return;
    const id = setInterval(() => setI((v) => (v + 1) % SYSTEM_FORMS.length), INTERVAL);
    return () => clearInterval(id);
  }, [reduceMotion, touched]);

  const form = SYSTEM_FORMS[i];
  const label = LABELS[form];

  const pick = (n: number) => {
    setTouched(true);
    setI(n);
  };

  return (
    <section className="theme-light relative isolate flex min-h-[92svh] flex-col justify-center overflow-hidden bg-surface">
      <div
        aria-hidden
        className="absolute inset-0 z-base [background-image:linear-gradient(to_right,rgb(var(--line)/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--line)/0.06)_1px,transparent_1px)] [background-size:96px_96px]"
      />

      {/* The one atmospheric moment on the light canvas — a soft green bloom
          behind the object, so the composition has a material centre rather
          than sitting entirely flat. */}
      {/* Sized in viewport units below `sm`: at a fixed 38rem the bloom is
          wider than the phone itself, so it stops reading as a glow behind the
          object and tints the entire screen mint. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-1/2 z-base h-[55vw] w-[55vw] -translate-y-1/2 rounded-full bg-accent-500/20 blur-[70px] sm:h-[38rem] sm:w-[38rem] sm:blur-[120px]"
      />

      <div className="relative z-raised mx-auto w-full max-w-wide px-5 py-14 sm:px-8 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1 className="type-hero text-fg">
              We build AI systems
              <br />
              that compound.
            </h1>

            {/* The label IS the copy — it changes with the form, so the object
                explains itself instead of needing a paragraph. */}
            {/* Fixed height so switching form doesn't shift the CTA under it.
                Taller below `sm` because the longer details ("Pages engineered
                to turn traffic into action") run to two lines on a phone. */}
            <div className="mt-6 h-28 sm:mt-10 sm:h-20">
              <motion.div
                key={form}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className="type-h2 block text-accent-700">{label.title}</span>
                <span className="type-body-lg mt-1 block text-fg-muted">
                  {label.detail}
                </span>
              </motion.div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-2 sm:mt-12 sm:gap-y-6">
              <a
                href={calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[44px] items-center gap-3 border-b border-fg pb-1.5 text-fg transition-colors duration-base ease-out hover:border-accent-700 hover:text-accent-700 sm:min-h-0"
              >
                <span className="type-body-lg">Book a discovery call</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-base ease-out group-hover:translate-x-1"
                  aria-hidden
                />
              </a>

              {/* gap-0, not gap-2: each button is w-11 with a w-9 bar centred
                  inside, so the 4px of padding either side already produces
                  the same 8px visual gap while meeting the 44px touch box. */}
              <div className="flex" role="tablist" aria-label="What we build">
                {SYSTEM_FORMS.map((f, n) => (
                  <button
                    key={f}
                    type="button"
                    role="tab"
                    aria-selected={n === i}
                    onClick={() => pick(n)}
                    onMouseEnter={() => pick(n)}
                    onFocus={() => pick(n)}
                    // h-11 not py-3: these are the only control on the hero and
                    // at 28px tall they fell under the 44px touch minimum.
                    className="group/tab flex h-11 w-11 items-center justify-center"
                  >
                    <span
                      className={`block h-1 w-9 rounded-full transition-colors duration-base ${
                        n === i ? 'bg-accent-500' : 'bg-fg/15 group-hover/tab:bg-fg/35'
                      }`}
                    />
                    <span className="sr-only">{LABELS[f].title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <KeelSystem
              form={form}
              // Capped below `sm` so the square object finishes inside the
              // first screen instead of being sliced by the fold.
              className="mx-auto aspect-square w-full max-w-[17rem] text-fg sm:max-w-[34rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
