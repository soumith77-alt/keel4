import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { calendlyLink, services } from '@/config/content';
import { Button } from '@/components/ui/button';
import { Wordmark } from '@/components/ui/wordmark';

const COMPANY_LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/case-studies', label: 'Case studies' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-surface-raised">
      {/* Navy hairline ties the footer back to the brand without a flat slab */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent"
      />

      <div className="mx-auto w-full max-w-content px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          <div className="col-span-2">
            <Link href="/" className="inline-block text-fg" aria-label="Keel, home">
              <Wordmark />
            </Link>
            <p className="type-body measure-tight mt-4 text-fg-muted text-pretty">
              Agentic AI Solutions Studio. Voice agents, automations, video, and
              websites, built to move a number, not a slide.
            </p>
            <Button asChild variant="secondary" className="mt-6">
              <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                Book a call
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </Button>
          </div>

          <div>
            <h2 className="type-label mb-5 text-fg-subtle">Services</h2>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-fg-muted transition-colors duration-base hover:text-fg"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="type-label mb-5 text-fg-subtle">Company</h2>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fg-muted transition-colors duration-base hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-fg-subtle">
            © {new Date().getFullYear()} keel. All rights reserved.
          </p>
          <a
            href="mailto:hello@saykeel.com"
            className="text-sm text-fg-muted transition-colors duration-base hover:text-fg"
          >
            hello@saykeel.com
          </a>
        </div>
      </div>
    </footer>
  );
}
