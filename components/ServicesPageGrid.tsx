import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Service = {
  slug: string;
  title: string;
  image?: string;
  outcomeStatement?: string;
  shortDescription?: string;
};

/**
 * THE SERVICES INDEX — five rows, no cards.
 *
 * This was a two-column grid of glow cards, each with a stock-ish image at the
 * top. Two things were wrong with it and neither was fixable by restyling the
 * card:
 *
 *   · THE IMAGERY RANKED THE SERVICES. Voice had a rendered orb and Automation
 *     had a real workflow screenshot, while Video, Web and SaaS had generic
 *     stock art. A visitor reads that as "three of these are the real business
 *     and two are filler" — which is the exact opposite of the positioning the
 *     rest of the site argues for.
 *   · IT WAS THE OLD WEBSITE. A grid of white cards on a light page is the
 *     pattern the redesign replaced everywhere else. /services was the last
 *     page still using it.
 *
 * Rows give all five services identical weight, which is honest, and they
 * echo the homepage's oversized type index rather than inventing a third way
 * of presenting the same five things. The type IS the interface here too.
 */
export default function ServicesPageGrid({ services }: { services: Service[] }) {
  return (
    <ul className="border-t border-line/15">
      {services.map((service, i) => {
        const blurb = service.outcomeStatement || service.shortDescription || "";
        return (
          <li key={service.slug} className="border-b border-line/15">
            <Link
              href={`/services/${service.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 py-6 sm:gap-x-8 sm:py-8 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.1fr)_auto] lg:gap-x-10"
            >
              <span className="type-mono-sm text-fg-subtle transition-colors duration-fast ease-micro group-hover:text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="type-h3 text-fg transition-colors duration-fast ease-micro group-hover:text-signal">
                {service.title}
              </h3>

              {/* Below `lg` the blurb drops to its own row under the title
                  rather than being squeezed into a third column at 11px. */}
              {blurb && (
                <p className="type-body col-start-2 mt-2 text-fg-muted text-pretty lg:col-start-3 lg:mt-0">
                  {blurb}
                </p>
              )}

              <ArrowUpRight
                aria-hidden
                className="col-start-3 row-start-1 h-5 w-5 shrink-0 self-center text-fg-subtle transition duration-base ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal lg:col-start-4"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
