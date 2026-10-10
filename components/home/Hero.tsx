'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';
import { BrowserFrame, ConceptTag, CropShot, MockCanvas, PhoneFrame, Shot } from './frames';
import { Eyebrow, KeelMark } from '@/components/ui/keel';
import { CrmPipelineMock, CrmRecordMock, StayPhoneMock, StaySiteMock } from './mocks';
import { Tilt } from '@/components/ui/tilt';

/**
 * HERO — copy left (~45%), product showcase right (~55%).
 *
 * Structure follows the dashboard-hero reference: one large interface on a
 * tinted stage, one smaller supporting card overhanging a corner. The split
 * layout and the selector come from the alternative references; nothing is
 * stacked beneath this as a second hero.
 *
 * THE SELECTOR IS HONEST BY CONSTRUCTION. "SaaS products" shows two real
 * Keeel builds. "Business systems" and "Websites" have no client screenshots
 * to show, so they render coded concepts and the stage carries a small
 * "Illustrative concept" tag while either is active. A CRM label never sits
 * on an unrelated screenshot.
 *
 * Click/tap or arrow keys only; nothing cycles on its own. The stage has a
 * fixed aspect ratio and every view is absolutely positioned inside it, so
 * switching never moves the page.
 */

type ViewId = 'products' | 'systems' | 'websites';

const VIEWS: {
  id: ViewId;
  label: string;
  concept: boolean;
  caption: React.ReactNode;
  link: { href: string; label: string };
}[] = [
  {
    id: 'products',
    label: 'SaaS products',
    concept: false,
    caption: (
      <>
        <span className="font-medium text-fg">Football Intelligence OS</span> and{' '}
        <span className="font-medium text-fg">Artizyn</span>, products designed and built by Keeel.
      </>
    ),
    link: { href: '#work', label: 'See the projects' },
  },
  {
    id: 'systems',
    label: 'Business systems',
    concept: true,
    caption: 'Custom CRMs, client portals and internal tools, shaped around how your team already works.',
    link: { href: '/services/crm-business-systems', label: 'CRMs & business systems' },
  },
  {
    id: 'websites',
    label: 'Websites',
    concept: true,
    caption: 'Marketing sites, ecommerce and booking experiences that make the next step obvious.',
    link: { href: '/services/websites', label: 'Websites & digital experiences' },
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function ProductsView() {
  return (
    <>
      <div className="absolute right-[4%] top-[7%] w-[86%]">
        <BrowserFrame label="Football Intelligence OS" tone="dark">
          <Shot
            src="/football-intelligence-os.webp"
            srcSmall="/football-intelligence-os-800.webp"
            width={1536}
            height={1024}
            alt="Football Intelligence OS overview dashboard: team form, tactical board, league table and upcoming fixtures."
            sizes="(min-width: 1024px) 560px, 88vw"
            priority
          />
        </BrowserFrame>
      </div>
      {/* Not a second whole dashboard: one legible Artizyn interaction,
          the artisan matches a client receives for a project. */}
      <div className="absolute bottom-[3%] left-[-2%] w-[40%] sm:left-[-3%]">
        <BrowserFrame label="Artizyn · Matches" tone="dark">
          <CropShot
            src="/artizyn-marketplace.webp"
            srcSmall="/artizyn-marketplace-800.webp"
            width={1448}
            height={1086}
            crop={{ x: 530, y: 700, w: 385, h: 285 }}
            alt="Artizyn: artisan matches for a client project, at 95% and 92% match."
            sizes="(min-width: 1024px) 1000px, 150vw"
            priority
          />
        </BrowserFrame>
      </div>
    </>
  );
}

function SystemsView() {
  return (
    <>
      <div className="absolute right-[4%] top-[7%] w-[86%]">
        <BrowserFrame label="Pipeline">
          <MockCanvas ratio={1.5}>
            <CrmPipelineMock />
          </MockCanvas>
        </BrowserFrame>
      </div>
      <div className="absolute bottom-[3%] left-[-2%] w-[38%] overflow-hidden rounded-[14px] shadow-frame ring-1 ring-[#0e1836]/[0.07] sm:left-[-3%]">
        <MockCanvas ratio={1.05} units={24}>
          <CrmRecordMock />
        </MockCanvas>
      </div>
    </>
  );
}

function WebsitesView() {
  // Narrower main frame than the other views, so the phone only clips its
  // edge and never covers the booking bar's call to action.
  return (
    <>
      <div className="absolute left-[3%] top-[10%] w-[79%]">
        <BrowserFrame label="Halden">
          <MockCanvas ratio={1.5}>
            <StaySiteMock />
          </MockCanvas>
        </BrowserFrame>
      </div>
      <div className="absolute bottom-[3%] right-[1%] w-[21%]">
        <PhoneFrame>
          <MockCanvas ratio={0.5} units={40}>
            <StayPhoneMock />
          </MockCanvas>
        </PhoneFrame>
      </div>
    </>
  );
}

const VIEW_COMPONENTS: Record<ViewId, () => JSX.Element> = {
  products: ProductsView,
  systems: SystemsView,
  websites: WebsitesView,
};

function Showcase() {
  const [active, setActive] = useState<ViewId>('products');
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const index = VIEWS.findIndex((v) => v.id === active);
  const view = VIEWS[index];
  const View = VIEW_COMPONENTS[active];

  // Where the keel notch sits: under the centre of the active tab.
  const [notchX, setNotchX] = useState<number | null>(null);
  useEffect(() => {
    const place = () => {
      const tab = tabRefs.current[index];
      if (tab) setNotchX(tab.offsetLeft + tab.offsetWidth / 2 - 12);
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [index]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = VIEWS.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    if (e.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(VIEWS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="relative">
      <div
        role="tablist"
        aria-label="Showcase"
        onKeyDown={onKeyDown}
        className="scrollbar-hide -mx-1 flex overflow-x-auto px-1 py-1"
      >
        <div className="flex rounded-pill border border-hairline bg-surface-raised p-1 shadow-glow-sm">
          {VIEWS.map((v, i) => {
            const selected = v.id === active;
            return (
              <button
                key={v.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`${baseId}-tab-${v.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(v.id)}
                className={cn(
                  'relative isolate min-h-[40px] whitespace-nowrap rounded-pill px-3 text-[0.8125rem] font-medium sm:px-4 sm:text-sm transition-colors duration-fast ease-micro',
                  selected ? 'text-white' : 'text-fg-muted hover:text-fg',
                )}
              >
                {/* Motion Primitives "AnimatedBackground": one shared pill
                    that slides between tabs via layoutId. */}
                {selected && (
                  <motion.span
                    layoutId={`${baseId}-pill`}
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-pill bg-ink"
                    transition={
                      reduceMotion ? { duration: 0 } : { type: 'spring', bounce: 0.15, duration: 0.32 }
                    }
                  />
                )}
                {v.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* The keel line: joins the active tab to the stage below it. */}
      <div aria-hidden className="relative mt-2 h-[9px]">
        <span className="absolute inset-x-0 top-0 h-px bg-hairline" />
        {notchX !== null && (
          <motion.span
            className="absolute left-0 top-0 block"
            initial={false}
            animate={{ x: notchX }}
            transition={reduceMotion ? { duration: 0 } : { type: 'spring', bounce: 0.15, duration: 0.32 }}
          >
            <KeelMark />
          </motion.span>
        )}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="mt-3"
      >
        {/* The stage. Fixed ratio = stable height for every view. A gentle
            pointer tilt (Motion Primitives "Tilt") gives it depth on desktop. */}
        <Tilt>
        <div className="relative aspect-[1.32/1] w-full rounded-panel bg-[radial-gradient(120%_90%_at_85%_0%,#DCE3F3_0%,#E7ECF6_45%,#EEF0F4_100%)] ring-1 ring-inset ring-[#0e1836]/[0.08]">
          <div
            aria-hidden
            className="absolute inset-0 rounded-panel opacity-60 [background-image:linear-gradient(to_right,rgba(14,24,54,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,24,54,0.06)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(80%_70%_at_70%_30%,black,transparent)]"
          />
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              <View />
            </motion.div>
          </AnimatePresence>

          {view.concept && (
            <ConceptTag className="absolute left-3 top-3 z-raised sm:left-4 sm:top-4" />
          )}
        </div>
        </Tilt>

        {/* Caption: says in words what the stage shows. Two-line reserve so
            switching views never changes its height. */}
        <div className="mt-4 flex min-h-[3.25rem] flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <p className="text-sm leading-relaxed text-fg-muted text-pretty" aria-live="polite">
            {view.caption}
          </p>
          <Link
            href={view.link.href}
            className="inline-flex min-h-[32px] shrink-0 items-center gap-1 text-sm font-medium text-signal underline-offset-4 hover:underline"
          >
            {view.link.label}
            <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface pb-[clamp(2rem,4vw,3rem)] pt-[calc(68px+clamp(1.75rem,4vw,3rem))]">
      <div className="site-container grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-20">
        <div className="min-w-0">
          <Reveal>
            <Eyebrow>Product &amp; software studio</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            {/* One phrase per line at every width. On desktop the size is
                tied to the viewport so "Your next product." always fits the
                ~49% copy column (it measures ~8em). */}
            <h1 className="type-display-xl mt-5 text-fg lg:text-[clamp(2.5rem,4.7vw,4.3rem)]">
              <span className="block">Your next product.</span>
              <span className="block text-signal">Built to work.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="type-body-lg mt-6 max-w-[32rem] text-fg-muted text-pretty">
              We design and build SaaS products, custom CRMs, and websites, with the
              integrations and automation that keep your business moving.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="#start">
                  Start a project
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="#work">Explore our work</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="min-w-0">
          <Showcase />
        </Reveal>
      </div>
    </section>
  );
}
