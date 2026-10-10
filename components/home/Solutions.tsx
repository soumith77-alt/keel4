'use client';

import Link from 'next/link';
import { forwardRef, useRef } from 'react';
import {
  ArrowRight,
  CalendarCheck,
  CreditCard,
  Database,
  FileText,
  Mail,
  MessageSquare,
  PhoneIncoming,
  Workflow,
} from 'lucide-react';

import { RevealGroup, RevealItem, Reveal } from '@/components/ui/reveal';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { AnimatedList } from '@/components/ui/animated-list';
import { BorderTrail } from '@/components/ui/border-trail';
import { Tilt } from '@/components/ui/tilt';
import { cn } from '@/lib/utils';
import { BrowserFrame, ConceptTag, MockCanvas } from './frames';
import { StaySiteMock } from './mocks';
import { LeadProgressMock, SubscriptionMock } from './live-mocks';
import { Eyebrow } from '@/components/ui/keel';

/**
 * SOLUTIONS — an asymmetric four-tile grid, after Magic UI's Bento Grid.
 *
 * Kept from the reference: the visual-first card, the CSS-only group-hover
 * (the visual lifts, the "Explore" affordance slides), and the whole card as
 * one target. Changed: tiles are not a uniform 22rem row height — the SaaS
 * tile spans two rows, the automation tile runs the full width — so the grid
 * reads as a hierarchy rather than a catalogue.
 *
 * Each tile's heading contains its link, stretched over the card with
 * ::after, so there is exactly one tab stop and one accessible name per tile.
 * Visuals are coded concepts and carry an "Illustrative" tag.
 */

type TileProps = {
  title: string;
  copy: string;
  examples: string;
  href: string;
  className?: string;
  visual: React.ReactNode;
  visualClassName?: string;
  large?: boolean;
};

function Tile({ title, copy, examples, href, className, visual, visualClassName, large }: TileProps) {
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-panel border border-hairline bg-surface-raised shadow-glow-sm transition-[border-color,box-shadow] duration-fast ease-micro hover:border-[#253c80]/30 hover:shadow-glow-md',
        className,
      )}
    >
      <div className={cn('p-6 sm:p-8', large && 'lg:p-10')}>
        <h3 className={cn('text-fg', large ? 'type-h3' : 'type-h4')}>
          <Link
            href={href}
            className="after:absolute after:inset-0 after:z-raised after:rounded-panel focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-[-2px] focus-visible:after:outline-[#00794a]"
          >
            {title}
          </Link>
        </h3>
        <p className={cn('mt-2 text-fg-muted text-pretty', large ? 'type-body-lg max-w-[30rem]' : 'type-body')}>
          {copy}
        </p>
        <p className="mt-3 text-sm text-fg-subtle">{examples}</p>
        <span
          aria-hidden
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-signal"
        >
          Explore
          <ArrowRight className="h-4 w-4 transition-transform duration-fast ease-micro group-hover:translate-x-1" />
        </span>
      </div>
      <div className={cn('relative mt-auto', visualClassName)}>{visual}</div>
    </article>
  );
}

/* ---------------------------------------------------------------------- */
/* Automation hub — after Magic UI's multiple-input/output beam demo:        */
/* tools feed one workflow, which fans out to where the work lands.          */
/* ---------------------------------------------------------------------- */

const INPUTS = [
  { label: 'Website form', icon: FileText },
  { label: 'Calendar booking', icon: CalendarCheck },
  { label: 'Inbound call', sub: 'Voice agent', icon: PhoneIncoming },
  { label: 'Payment received', icon: CreditCard },
];

const OUTPUTS = [
  { label: 'CRM record', icon: Database },
  { label: 'Team notified', icon: MessageSquare },
  { label: 'Follow-up email', icon: Mail },
];

const Node = forwardRef<
  HTMLDivElement,
  { icon: React.ElementType; label: string; sub?: string; className?: string }
>(function Node({ icon: Icon, label, sub, className }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        'relative z-raised flex items-center gap-2.5 rounded-control border border-hairline bg-surface-raised px-3 py-2.5',
        className,
      )}
    >
      <span className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-fg/[0.06] text-signal sm:inline-flex">
        <Icon className="h-3.5 w-3.5" aria-hidden />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[0.8125rem] font-medium text-fg">{label}</span>
        {sub && <span className="block text-[0.6875rem] text-fg-subtle">{sub}</span>}
      </span>
    </div>
  );
});

function AutomationHub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const inRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const outRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Example: a website form, calendar booking, inbound call or payment starts one workflow, which updates the CRM, notifies the team and sends a follow-up email."
      className="theme-dark relative overflow-hidden rounded-card bg-surface p-5 text-fg sm:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(50%_70%_at_50%_50%,rgba(0,199,118,0.14),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(245,247,250,0.12)_1px,transparent_1px)] [background-size:18px_18px]"
      />

      <div className="relative grid grid-cols-2 items-center gap-x-3 gap-y-10 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-x-12">
        {/* Inputs */}
        <div className="col-span-2 grid grid-cols-2 gap-2.5 md:col-span-1 md:grid-cols-1">
          {INPUTS.map((n, i) => (
            <Node key={n.label} ref={inRefs[i]} icon={n.icon} label={n.label} sub={n.sub} />
          ))}
        </div>

        {/* Hub */}
        <div className="col-span-2 flex flex-col items-center md:col-span-1">
          <div
            ref={hubRef}
            className="relative z-raised flex h-20 w-20 items-center justify-center rounded-[22px] border border-hairline bg-surface-raised shadow-[0_0_40px_-8px_rgba(0,199,118,0.45)]"
          >
            <BorderTrail size={44} className="bg-accent-500 blur-[1px]" transition={{ repeat: Infinity, duration: 6, ease: 'linear' }} />
            <Workflow className="h-8 w-8 text-signal" aria-hidden />
          </div>
          <span className="type-mono-sm mt-3 text-fg-subtle">Your workflow</span>
        </div>

        {/* Outputs */}
        <div className="col-span-2 grid grid-cols-1 gap-2.5 sm:grid-cols-3 md:col-span-1 md:grid-cols-1">
          {OUTPUTS.map((n, i) => (
            <Node key={n.label} ref={outRefs[i]} icon={n.icon} label={n.label} />
          ))}
        </div>
      </div>

      {inRefs.map((r, i) => (
        <AnimatedBeam
          key={`in-${i}`}
          containerRef={containerRef}
          fromRef={r}
          toRef={hubRef}
          delay={i * 0.35}
          pathColor="#f5f7fa"
          pathOpacity={0.14}
        />
      ))}
      {outRefs.map((r, i) => (
        <AnimatedBeam
          key={`out-${i}`}
          containerRef={containerRef}
          fromRef={hubRef}
          toRef={r}
          delay={1.4 + i * 0.35}
          pathColor="#f5f7fa"
          pathOpacity={0.14}
        />
      ))}
    </div>
  );
}

/** An example run, arriving event by event (Magic UI "AnimatedList"). */
const RUN = [
  { title: 'Website enquiry received', detail: 'Contact created in the CRM', time: '09:12', icon: FileText },
  { title: 'Follow-up email sent', detail: 'First reply, from your template', time: '09:12', icon: Mail },
  { title: 'Call booked for Thursday', detail: 'Calendar and CRM updated', time: '09:31', icon: CalendarCheck },
  { title: 'Team notified', detail: 'Assigned to the right owner', time: '09:31', icon: MessageSquare },
];

function RunLog() {
  return (
    <div className="rounded-card border border-hairline bg-surface p-4">
      <div className="flex items-center justify-between">
        <span className="type-mono-sm text-fg-subtle">Example run</span>
        <span className="flex items-center gap-1.5 text-xs font-medium text-signal">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-500" aria-hidden />
          Running
        </span>
      </div>
      <AnimatedList delay={1300} className="mt-3 min-h-[15.5rem]">
        {RUN.map((e) => (
          <div
            key={e.title}
            className="flex items-center gap-3 rounded-control border border-hairline bg-surface-raised px-3 py-2.5 shadow-glow-sm"
          >
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-mint text-signal">
              <e.icon className="h-4 w-4" aria-hidden />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-sm font-medium text-fg">{e.title}</span>
              <span className="block truncate text-xs text-fg-muted">{e.detail}</span>
            </span>
            <span className="font-mono text-[0.6875rem] text-fg-subtle">{e.time}</span>
          </div>
        ))}
      </AnimatedList>
    </div>
  );
}

export default function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-heading" className="section-y bg-surface">
      <div className="site-container">
        <Reveal className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Solutions</Eyebrow>
            <h2 id="solutions-heading" className="type-h2 mt-4 text-fg text-balance">
              What do you need to build?
            </h2>
          </div>
          <p className="type-body-lg text-fg-muted text-pretty lg:col-span-5">
            Four kinds of work, and most projects touch more than one: a product
            needs a website, and a CRM needs the integrations around it.
          </p>
        </Reveal>

        <RevealGroup
          stagger={0.06}
          className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-6 [&>*]:min-w-0"
        >
          <RevealItem className="md:col-span-2 lg:col-span-7 lg:row-span-2">
            <Tile
              large
              title="SaaS & digital products"
              copy="Turn a product idea into software people can use."
              examples="MVPs, customer platforms, learning platforms (LMS), subscription products."
              href="/services/saas-products"
              visualClassName="flex-1 min-h-[16rem] sm:min-h-[22rem]"
              visual={
                // Fills whatever height the two-row span leaves, cropped at the
                // tile's bottom edge, so the large tile never has a dead gap.
                <>
                  <div className="absolute inset-x-6 top-0 translate-y-2 transition-transform duration-base ease-out group-hover:translate-y-0 sm:inset-x-8 lg:inset-x-10">
                    <BrowserFrame label="Orbit · Billing">
                      {/* Taller than the space on purpose: the frame runs off
                          the tile's bottom edge, so the tile never has a gap. */}
                      <MockCanvas ratio={1.08}>
                        <SubscriptionMock />
                      </MockCanvas>
                    </BrowserFrame>
                  </div>
                  <ConceptTag className="absolute bottom-3 right-3 z-raised">Illustrative</ConceptTag>
                </>
              }
            />
          </RevealItem>

          <RevealItem className="lg:col-span-5">
            <Tile
              title="CRMs & business systems"
              copy="Build around the way your team actually works."
              examples="Custom CRMs, client portals, dashboards, internal tools."
              href="/services/crm-business-systems"
              visualClassName="pl-6 sm:pl-8"
              visual={
                <div className="relative translate-y-2 transition-transform duration-base ease-out group-hover:translate-y-0">
                  <div className="overflow-hidden rounded-tl-[14px] border-l border-t border-hairline shadow-glow-md">
                    <MockCanvas ratio={2.6} units={44}>
                      <LeadProgressMock />
                    </MockCanvas>
                  </div>
                  <ConceptTag className="absolute bottom-3 right-3">Illustrative</ConceptTag>
                </div>
              }
            />
          </RevealItem>

          <RevealItem className="lg:col-span-5">
            <Tile
              title="Websites & digital experiences"
              copy="Give your business a website that earns attention and makes the next step clear."
              examples="Marketing websites, ecommerce, booking experiences."
              href="/services/websites"
              visualClassName="pr-6 sm:pr-8"
              visual={
                <div className="relative translate-y-2 transition-transform duration-base ease-out group-hover:translate-y-0">
                  <Tilt rotationFactor={3}>
                    <div className="overflow-hidden rounded-tr-[14px] border-r border-t border-hairline shadow-glow-md">
                      <MockCanvas ratio={2.2}>
                        <StaySiteMock />
                      </MockCanvas>
                    </div>
                  </Tilt>
                  <ConceptTag className="absolute right-3 top-3">Illustrative</ConceptTag>
                </div>
              }
            />
          </RevealItem>

          <RevealItem className="md:col-span-2 lg:col-span-12">
            <article className="group relative grid gap-8 overflow-hidden rounded-panel border border-hairline bg-surface-raised p-6 shadow-glow-sm transition-[border-color,box-shadow] duration-fast ease-micro hover:border-[#253c80]/30 hover:shadow-glow-md sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
              <div className="flex flex-col lg:col-span-4">
                <h3 className="type-h3 text-fg">
                  <Link
                    href="/services/agentic-automations"
                    className="after:absolute after:inset-0 after:z-raised after:rounded-panel focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-[-2px] focus-visible:after:outline-[#00794a]"
                  >
                    Automation & integrations
                  </Link>
                </h3>
                <p className="type-body-lg mt-2 text-fg-muted text-pretty">
                  Connect your tools and keep work moving.
                </p>
                <p className="mt-3 text-sm text-fg-subtle">
                  Workflow automation, data sync, AI assistants, voice capabilities.
                </p>
                <span aria-hidden className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-signal">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform duration-fast ease-micro group-hover:translate-x-1" />
                </span>
                <div className="mt-8 lg:mt-auto lg:pt-8">
                  <RunLog />
                </div>
              </div>
              <div className="lg:col-span-8 lg:self-center">
                <AutomationHub />
              </div>
            </article>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
