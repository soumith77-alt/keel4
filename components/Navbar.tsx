'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';

import { additionalServices, primaryServices } from '@/config/content';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Wordmark } from '@/components/ui/wordmark';

const PAGE_LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
];

/** One line per offering in the Solutions menu. */
const SOLUTION_BLURBS: Record<string, string> = {
  'saas-products': 'MVPs, customer platforms, subscription products',
  'crm-business-systems': 'Custom CRMs, client portals, internal tools',
  websites: 'Marketing sites, ecommerce, booking experiences',
  'agentic-automations': 'Workflow automation, data sync, AI assistants',
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Desktop hover highlight — the Motion Primitives "AnimatedBackground"
 * pattern: one pill shared between items through `layoutId`, so it slides
 * from item to item instead of fading in place. Pure decoration; every item
 * has its own hover colour, so nothing depends on it.
 */
function NavHighlight({ id }: { id: string }) {
  return (
    <motion.span
      layoutId={id}
      aria-hidden
      className="absolute inset-x-0 inset-y-1.5 -z-10 rounded-pill bg-fg/[0.06]"
      transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
    />
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const highlightId = useId();

  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const solutionsButtonRef = useRef<HTMLButtonElement>(null);
  const solutionsPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  // Broadcast menu state so the floating WhatsApp button can hide behind it.
  useEffect(() => {
    document.body.dataset.menuOpen = mobileOpen ? 'true' : 'false';
    return () => {
      delete document.body.dataset.menuOpen;
    };
  }, [mobileOpen]);

  /**
   * Solutions disclosure: closes on Escape (returning focus to its button),
   * on a click outside, and when focus leaves both button and panel.
   */
  const closeSolutions = useCallback((returnFocus: boolean) => {
    setSolutionsOpen(false);
    if (returnFocus) solutionsButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!solutionsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSolutions(true);
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (
        !solutionsPanelRef.current?.contains(t) &&
        !solutionsButtonRef.current?.contains(t)
      ) {
        closeSolutions(false);
      }
    };
    const onFocus = (e: FocusEvent) => {
      const t = e.target as Node;
      if (
        !solutionsPanelRef.current?.contains(t) &&
        !solutionsButtonRef.current?.contains(t)
      ) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('focusin', onFocus);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('focusin', onFocus);
    };
  }, [solutionsOpen, closeSolutions]);

  /**
   * Mobile menu: scroll lock, Escape to close, focus moved into the panel on
   * open, Tab kept inside the header while open, and focus returned to the
   * toggle on close.
   */
  useEffect(() => {
    if (!mobileOpen) return;

    const { body } = document;
    const toggle = toggleRef.current;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    const focusables = () =>
      [
        toggle,
        ...Array.from(
          mobilePanelRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? [],
        ),
      ].filter(Boolean) as HTMLElement[];

    // Wait a frame for the panel to mount before moving focus into it.
    const raf = requestAnimationFrame(() => {
      mobilePanelRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      toggle?.focus();
    };
  }, [mobileOpen]);

  const solutionsActive = pathname.startsWith('/services');

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-nav transition-[background-color,border-color,box-shadow] duration-base ease-out',
        scrolled || mobileOpen
          ? 'border-b border-hairline bg-surface/90 backdrop-blur-md supports-[backdrop-filter]:bg-surface/80'
          : 'border-b border-transparent bg-surface/0',
      )}
    >
      <nav aria-label="Main" className="site-container">
        <div className="flex h-[68px] items-center justify-between gap-6">
          <Link
            href="/"
            className="-ml-1 flex min-h-[44px] items-center rounded-control px-1 text-fg"
            aria-label="Keeel, home"
          >
            <Wordmark className="h-8" />
          </Link>

          {/* Desktop */}
          <div className="hidden flex-1 items-center justify-between md:flex">
            <ul
              className="relative ml-6 flex items-center lg:ml-10"
              onMouseLeave={() => setHovered(null)}
            >
              <li className="relative">
                <button
                  ref={solutionsButtonRef}
                  type="button"
                  aria-expanded={solutionsOpen}
                  aria-controls="solutions-menu"
                  onClick={() => setSolutionsOpen((o) => !o)}
                  onMouseEnter={() => setHovered('solutions')}
                  className={cn(
                    'relative isolate flex min-h-[44px] items-center gap-1.5 px-4 text-[0.9375rem] font-medium transition-colors duration-fast ease-micro hover:text-fg',
                    solutionsOpen || solutionsActive ? 'text-fg' : 'text-fg-muted',
                  )}
                >
                  {hovered === 'solutions' && !reduceMotion && <NavHighlight id={highlightId} />}
                  Solutions
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      'h-4 w-4 transition-transform duration-fast ease-micro',
                      solutionsOpen && 'rotate-180',
                    )}
                  />
                </button>

                <AnimatePresence>
                  {solutionsOpen && (
                    <motion.div
                      ref={solutionsPanelRef}
                      id="solutions-menu"
                      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: EASE }}
                      className="absolute left-0 top-[calc(100%+10px)] w-[min(40rem,calc(100vw-4rem))] rounded-panel border border-hairline bg-surface-raised p-2 shadow-glow-lg"
                    >
                      <ul className="grid grid-cols-2 gap-1">
                        {primaryServices.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/services/${s.slug}`}
                              onClick={() => setSolutionsOpen(false)}
                              className="group flex h-full flex-col rounded-card p-4 transition-colors duration-fast ease-micro hover:bg-mint focus-visible:bg-mint"
                            >
                              <span className="flex items-center justify-between gap-3 text-[0.9375rem] font-semibold text-fg">
                                {s.navLabel}
                                <ArrowRight
                                  aria-hidden
                                  className="h-4 w-4 -translate-x-1 text-signal opacity-0 transition duration-fast ease-micro group-hover:translate-x-0 group-hover:opacity-100"
                                />
                              </span>
                              <span className="mt-1 text-sm text-fg-muted">
                                {SOLUTION_BLURBS[s.slug]}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-card bg-surface px-4 py-3">
                        <span className="type-mono-sm text-fg-subtle">Also</span>
                        {additionalServices.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            onClick={() => setSolutionsOpen(false)}
                            className="inline-flex min-h-[32px] items-center text-sm text-fg-muted underline-offset-4 transition-colors duration-fast hover:text-fg hover:underline"
                          >
                            {s.navLabel}
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          onClick={() => setSolutionsOpen(false)}
                          className="ml-auto inline-flex min-h-[32px] items-center gap-1 text-sm font-medium text-signal underline-offset-4 hover:underline"
                        >
                          All services
                          <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {PAGE_LINKS.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      onMouseEnter={() => setHovered(link.href)}
                      className={cn(
                        'relative isolate flex min-h-[44px] items-center px-4 text-[0.9375rem] font-medium transition-colors duration-fast ease-micro hover:text-fg',
                        active ? 'text-fg' : 'text-fg-muted',
                      )}
                    >
                      {hovered === link.href && !reduceMotion && <NavHighlight id={highlightId} />}
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Button asChild size="sm">
              <Link href="/contact">Discuss your project</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-pill text-fg transition-colors duration-fast hover:bg-fg/[0.06] md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            ref={mobilePanelRef}
            id="mobile-menu"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: EASE }}
            className="h-[calc(100dvh-68px)] overflow-y-auto border-t border-hairline bg-surface md:hidden"
          >
            <div className="site-container flex min-h-full flex-col pb-8 pt-5">
              <p className="type-mono-sm text-fg-subtle">Solutions</p>
              <ul className="mt-2">
                {primaryServices.map((s) => (
                  <li key={s.slug} className="border-b border-hairline">
                    <Link
                      href={`/services/${s.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-h-[56px] items-center justify-between gap-4 text-lg font-semibold tracking-[-0.01em] text-fg"
                    >
                      {s.navLabel}
                      <ArrowRight aria-hidden className="h-4 w-4 text-signal" />
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="mt-6 flex flex-col">
                {[...PAGE_LINKS, { href: '/contact', label: 'Contact' }].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-h-[48px] items-center text-base font-medium text-fg-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-fg-subtle">
                Also:{' '}
                {additionalServices.map((s, i) => (
                  <span key={s.slug}>
                    {i > 0 && ' · '}
                    <Link
                      href={`/services/${s.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="inline-flex min-h-[44px] items-center text-fg-muted underline underline-offset-4"
                    >
                      {s.navLabel}
                    </Link>
                  </span>
                ))}
              </p>

              <Button asChild size="lg" className="mt-auto w-full">
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  Discuss your project
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
