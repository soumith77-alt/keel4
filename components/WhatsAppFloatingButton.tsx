'use client';

import { useEffect, useState } from 'react';

import { whatsappLink } from '@/config/content';
import { cn } from '@/lib/utils';

/**
 * Floating WhatsApp entry point.
 *
 * Deliberately absent for the first viewport: over the hero it overlapped the
 * system panel and the service cards on mobile. It fades in once the user has
 * scrolled past the fold, and hides again whenever the mobile menu is open
 * (Navbar broadcasts that via a data attribute on <body>).
 *
 * 44px on mobile, 48px from sm up. It was 48/56 and sat 20px from the edge,
 * which put it on top of CTAs and body copy on a phone; 44px is the touch
 * target minimum, not a size to exceed for a secondary action.
 */
/**
 * The button's own footprint plus its viewport offset, per breakpoint.
 * Anything overlapping this corner box is something the button would sit on
 * top of, and it steps aside rather than covering it.
 */
function buttonZone() {
  const wide = window.innerWidth >= 640;
  const size = wide ? 48 : 44;
  const inset = wide ? 32 : 16;
  const pad = 12; // breathing room, so "nearly touching" also counts

  return {
    left: window.innerWidth - inset - size - pad,
    right: window.innerWidth - inset + pad,
    top: window.innerHeight - inset - size - pad,
    bottom: window.innerHeight - inset + pad,
  };
}

export default function WhatsAppFloatingButton() {
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [overContent, setOverContent] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.85);

      // Step aside while a guarded element occupies the button's corner. Rect
      // maths rather than an IntersectionObserver because the region of
      // interest is a fixed box in the viewport, not a slice of the root.
      const zone = buttonZone();
      const clash = Array.from(
        document.querySelectorAll<HTMLElement>('[data-float-guard]')
      ).some((el) => {
        const r = el.getBoundingClientRect();
        return (
          r.left < zone.right &&
          r.right > zone.left &&
          r.top < zone.bottom &&
          r.bottom > zone.top
        );
      });
      setOverContent(clash);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const sync = () => setMenuOpen(document.body.dataset.menuOpen === 'true');
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-menu-open'],
    });
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !menuOpen && !overContent;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        /**
         * NOT WhatsApp green.
         *
         * #25D366 on a 56px circle was the single most saturated thing on the
         * site by a wide margin — a consumer-brand accent sitting on a
         * restrained navy/off-white palette, and the first thing the eye
         * landed on regardless of what the page was actually saying.
         *
         * The affordance is unchanged: same position, same size, same icon,
         * still obviously a chat button. It is now painted in the site's own
         * ink with a Keel-green hairline, so it reads as part of the interface
         * rather than as a widget bolted onto it.
         */
        'fixed bottom-6 right-4 z-float flex h-11 w-11 items-center justify-center rounded-full border border-accent-500/45 bg-ink text-white shadow-lg transition-all duration-base ease-out sm:bottom-8 sm:right-8 sm:h-12 sm:w-12',
        'hover:border-accent-500 hover:shadow-xl',
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      )}
    >
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}
