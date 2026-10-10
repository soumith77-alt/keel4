import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import {
  CONTACT_EMAIL,
  additionalServices,
  primaryServices,
  whatsappLink,
} from '@/config/content';
import { Button } from '@/components/ui/button';
import { Wordmark } from '@/components/ui/wordmark';

const COMPANY_LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'All services' },
  { href: '/contact', label: 'Contact' },
];

const linkClass =
  'inline-flex min-h-[44px] items-center text-[0.9375rem] text-fg-muted transition-colors duration-fast ease-micro hover:text-fg md:min-h-[36px]';

/**
 * Footer. The four primary offerings lead; voice and video sit under
 * "Additional capabilities" so the footer agrees with the navigation about
 * what Keeel is. There are no legal pages on the site yet, so none are
 * linked — add them to COMPANY_LINKS when they exist.
 */
export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface-raised">
      <div className="site-container pb-10 pt-16 sm:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="col-span-2 lg:col-span-4">
            <Link
              href="/"
              className="-ml-1 inline-flex min-h-[44px] items-center rounded-control px-1 text-fg"
              aria-label="Keeel, home"
            >
              <Wordmark className="h-8" />
            </Link>
            <p className="type-body measure-tight mt-4 text-fg-muted text-pretty">
              A product and software studio. We design and build SaaS products,
              custom CRMs, websites and the workflows that connect them.
            </p>
            <Button asChild className="mt-7">
              <Link href="/contact">
                Start a project
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>

          <nav aria-labelledby="footer-solutions" className="col-span-2 sm:col-span-1 lg:col-span-3 lg:col-start-6">
            <h2 id="footer-solutions" className="type-mono-sm mb-4 text-fg-subtle">
              Solutions
            </h2>
            <ul>
              {primaryServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkClass}>
                    {s.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="type-mono-sm mb-2 mt-7 text-fg-subtle">
              Additional capabilities
            </h2>
            <ul>
              {additionalServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkClass}>
                    {s.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company" className="lg:col-span-2">
            <h2 id="footer-company" className="type-mono-sm mb-4 text-fg-subtle">
              Company
            </h2>
            <ul>
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="type-mono-sm mb-4 text-fg-subtle">Get in touch</h2>
            <ul>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={`${linkClass} break-all`}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-fg-subtle">
            © {new Date().getFullYear()} Keeel. All rights reserved.
          </p>
          <p className="text-sm text-fg-subtle">Product &amp; software studio</p>
        </div>
      </div>
    </footer>
  );
}
