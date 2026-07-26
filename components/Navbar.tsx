'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
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
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // Transparent over the hero, glass once you start scrolling.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-nav transition-colors duration-base ease-out',
        scrolled || isOpen
          ? 'border-b border-white/[0.08] bg-surface/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto w-full max-w-content px-5 sm:px-8"
      >
        <div className="flex h-[72px] items-center justify-between">
          <Link href="/" className="text-fg" aria-label="Keel, home">
            <Wordmark />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-fg-muted transition-colors duration-base hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild size="sm">
              <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                Book a call
              </a>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-control text-fg-muted transition-colors duration-base hover:bg-white/[0.06] hover:text-fg md:hidden"
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
              <div className="flex flex-col gap-1 border-t border-white/[0.08] py-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex min-h-[44px] items-center rounded-control px-2 text-base font-medium text-fg-muted transition-colors duration-base hover:bg-white/[0.06] hover:text-fg"
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
