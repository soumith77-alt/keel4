'use client';

import Link from 'next/link';
import { forwardRef, useRef } from 'react';
import { ArrowRight, Database, FileText, Send } from 'lucide-react';

import { RevealGroup, RevealItem, Reveal } from '@/components/ui/reveal';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { cn } from '@/lib/utils';
import { BrowserFrame, ConceptTag, MockCanvas } from './frames';
import { CrmPipelineMock, SaasAppMock, StoreSiteMock } from './mocks';

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
        'group relative flex h-full flex-col overflow-hidden rounded-panel border border-hairline bg-surface-raised shadow-glow-sm transition-[border-color,box-shadow] duration-fast ease-micro hover:border-[#146C50]/30 hover:shadow-glow-md',
        className,
      )}
    >
      <div className={cn('p-6 sm:p-8', large && 'lg:p-10')}>
        <h3 className={cn('text-fg', large ? 'type-h3' : 'type-h4')}>
          <Link
            href={href}
            className="after:absolute after:inset-0 after:z-raised after:rounded-panel focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-[-2px] focus-visible:after:outline-[#146C50]"
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
/* Automation flow: enquiry → CRM record → follow-up, joined by beams.      */
/* ---------------------------------------------------------------------- */

const FlowNode = forwardRef<
  HTMLDivElement,
  { icon: React.ReactNode; title: string; detail: string; className?: string }
>(function FlowNode({ icon, title, detail, className }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        'relative z-raised flex items-center gap-3 rounded-card border border-hairline bg-surface-raised px-4 py-3 shadow-glow-sm',
        className,
      )}
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-mint text-signal">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-fg">{title}</span>
        <span className="block text-[0.8125rem] text-fg-muted">{detail}</span>
      </span>
    </div>
  );
});

function AutomationFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLDivElement>(null);
  const bRef = useRef<HTMLDivElement>(null);
  const cRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col gap-10 rounded-card bg-surface p-5 sm:p-6 md:flex-row md:items-center md:justify-between md:gap-8"
      aria-label="Example workflow: a website enquiry creates a CRM record, which starts a follow-up workflow."
      role="img"
    >
      <FlowNode
        ref={aRef}
        icon={<FileText className="h-4 w-4" aria-hidden />}
        title="Website enquiry"
        detail="Form submitted"
        className="md:w-[30%]"
      />
      <FlowNode
        ref={bRef}
        icon={<Database className="h-4 w-4" aria-hidden />}
        title="CRM record"
        detail="Contact and deal created"
        className="md:w-[30%]"
      />
      <FlowNode
        ref={cRef}
        icon={<Send className="h-4 w-4" aria-hidden />}
        title="Follow-up workflow"
        detail="Email sent, task assigned"
        className="md:w-[30%]"
      />
      <AnimatedBeam containerRef={containerRef} fromRef={aRef} toRef={bRef} />
      <AnimatedBeam containerRef={containerRef} fromRef={bRef} toRef={cRef} delay={0.9} />
    </div>
  );
}

export default function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-heading" className="section-y bg-surface">
      <div className="site-container">
        <Reveal className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="type-label text-signal">Solutions</p>
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
          className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-6"
        >
          <RevealItem className="md:col-span-2 lg:col-span-7 lg:row-span-2">
            <Tile
              large
              title="SaaS & digital products"
              copy="Turn a product idea into software people can use."
              examples="MVPs, customer platforms, subscription products."
              href="/services/saas-products"
              visualClassName="flex-1 min-h-[16rem] sm:min-h-[22rem]"
              visual={
                // Fills whatever height the two-row span leaves, cropped at the
                // tile's bottom edge, so the large tile never has a dead gap.
                <>
                  <div className="absolute inset-x-6 top-0 translate-y-2 transition-transform duration-base ease-out group-hover:translate-y-0 sm:inset-x-8 lg:inset-x-10">
                    <BrowserFrame label="Orbit">
                      <MockCanvas ratio={1.3}>
                        <SaasAppMock />
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
                    <MockCanvas ratio={2.1}>
                      <CrmPipelineMock compact />
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
                  <div className="overflow-hidden rounded-tr-[14px] border-r border-t border-hairline shadow-glow-md">
                    <MockCanvas ratio={2.1}>
                      <StoreSiteMock />
                    </MockCanvas>
                  </div>
                  <ConceptTag className="absolute bottom-3 left-3">Illustrative</ConceptTag>
                </div>
              }
            />
          </RevealItem>

          <RevealItem className="md:col-span-2 lg:col-span-12">
            <article className="group relative grid gap-6 overflow-hidden rounded-panel border border-hairline bg-surface-raised p-6 shadow-glow-sm transition-[border-color,box-shadow] duration-fast ease-micro hover:border-[#146C50]/30 hover:shadow-glow-md sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-10 lg:p-10">
              <div className="lg:col-span-4">
                <h3 className="type-h4 text-fg">
                  <Link
                    href="/services/agentic-automations"
                    className="after:absolute after:inset-0 after:z-raised after:rounded-panel focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-[-2px] focus-visible:after:outline-[#146C50]"
                  >
                    Automation & integrations
                  </Link>
                </h3>
                <p className="type-body mt-2 text-fg-muted text-pretty">
                  Connect your tools and keep work moving.
                </p>
                <p className="mt-3 text-sm text-fg-subtle">
                  Workflow automation, data sync, AI assistants, voice capabilities.
                </p>
                <span aria-hidden className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-signal">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform duration-fast ease-micro group-hover:translate-x-1" />
                </span>
              </div>
              <div className="lg:col-span-8">
                <AutomationFlow />
              </div>
            </article>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
