'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { calendlyLink } from '@/config/content';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Wordmark } from '@/components/ui/wordmark';

const NAV_LINKS = [
  { href: '/#services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Transparent over the hero, opaque once you start scrolling.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /**
   * Does this route open on an obsidian environment?
   *
   * The homepage hero is now near-black, and a navy wordmark on it is
   * invisible — which is exactly what shipped for a moment. Rather than
   * hardcode `pathname === '/'` (which breaks the first time another route
   * gets a dark hero), the hero declares itself with `data-hero-tone` and the
   * bar reads it. Re-checked on navigation because App Router keeps this
   * component mounted across routes.
   */
  useEffect(() => {
    setOverDark(
      Boolean(document.querySelector('[data-hero-tone="obsidian"]')),
    );
  }, [pathname]);

  // Inverted only while sitting ON the dark hero. Once scrolled, the bar
  // becomes the warm-white bar and reverts to navy ink.
  const inverted = overDark && !scrolled && !isOpen;

  // Close the mobile menu on navigation.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Broadcast menu state so the floating WhatsApp button can hide behind it.
  useEffect(() => {
    document.body.dataset.menuOpen = isOpen ? 'true' : 'false';
    return () => {
      delete document.body.dataset.menuOpen;
    };
  }, [isOpen]);

  /**
   * Open-drawer behaviour. Three things the drawer was missing, and each of
   * them is a real problem rather than a polish item:
   *
   *   · SCROLL LOCK. The page scrolled behind the open menu, so a scroll
   *     gesture aimed at the menu moved the content underneath it instead.
   *   · ESCAPE. The only way out was to hit the toggle again — the standard
   *     dismissal for any overlay was simply absent.
   *   · FOCUS RETURN. On close, focus was left wherever it happened to be,
   *     which for a keyboard user means being dropped at the top of the
   *     document with no idea where they are.
   */
  useEffect(() => {
    if (!isOpen) return;

    const { body } = document;
    // Captured now rather than read in the cleanup: by the time cleanup runs
    // the ref may point at a different node, and the whole purpose of this is
    // to return focus to the element the visitor actually opened the menu with.
    const toggle = toggleRef.current;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      // Return focus to the control that opened it.
      toggle?.focus();
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-nav transition-colors duration-base ease-out',
        // Opaque, not bg-surface/80. The bar is navy-on-off-white, and the
        // page crosses several full-bleed dark bands — at 80% the navy band
        // showed through and the navy wordmark went invisible against it.
        // That is worst on mobile, where the bar is pinned the whole scroll.
        scrolled || isOpen
          ? 'border-b border-line/10 bg-surface'
          : 'border-b border-transparent bg-transparent',
        // Over the obsidian hero the bar paints itself in the dark theme, so
        // every child (wordmark, links, button) resolves against it.
        inverted && 'theme-obsidian'
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto w-full max-w-content px-5 sm:px-8"
      >
        <div className="flex h-[72px] items-center justify-between">
          <Link
            href="/"
            className={cn('flex min-h-[44px] items-center', inverted ? 'text-white' : 'text-fg')}
            aria-label="Keel, home"
          >
            <Wordmark />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                // `min-h-[44px]` on the desktop links too, not just the mobile
                // drawer. The desktop nav starts at `md` — 768px — which is a
                // TOUCH width on every tablet, and at 20px tall these were
                // less than half the minimum target there.
                className={cn(
                  'flex min-h-[44px] items-center text-sm font-medium transition-colors duration-fast ease-micro',
                  inverted
                    ? 'text-white/70 hover:text-white'
                    : 'text-fg-muted hover:text-fg',
                )}
              >
                {link.label}
              </Link>
            ))}
            {/* `primary` is the navy fill — on the obsidian hero that is
                #0e1836 on #070b18, effectively an invisible button. Inverted,
                the CTA is the brightest thing in the bar, which is also the
                right hierarchy while it sits over the environment. */}
            <Button asChild size="sm" variant={inverted ? 'inverse' : 'primary'}>
              <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                Book a call
              </a>
            </Button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-control transition-colors duration-base md:hidden',
              inverted
                ? 'text-white/80 hover:bg-white/10 hover:text-white'
                : 'text-fg-muted hover:bg-fg/[0.05] hover:text-fg',
            )}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
              animate={
                reduceMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }
              }
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1 border-t border-line/10 py-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex min-h-[44px] items-center rounded-control px-2 text-base font-medium text-fg-muted transition-colors duration-base hover:bg-fg/[0.05] hover:text-fg"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild size="lg" className="mt-3 w-full">
                  <a
                    href={calendlyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    Book a call
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
