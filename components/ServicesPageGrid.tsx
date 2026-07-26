import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { GlowCard } from "@/components/ui/glow-card";

type Service = {
  slug: string;
  title: string;
  image?: string;
  outcomeStatement?: string;
  shortDescription?: string;
};

/**
 * Grid for the /services index.
 *
 * Images carry explicit width/height and an aspect-ratio box so they reserve
 * space before load — the previous version had neither, which meant every card
 * shifted as images arrived. `loading="lazy"` since this grid sits below the
 * fold on every viewport.
 */
export default function ServicesPageGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {services.map((service) => {
        const blurb = service.outcomeStatement || service.shortDescription || "";
        return (
          <GlowCard key={service.slug} className="h-full">
            <Link
              href={`/services/${service.slug}`}
              className="group flex h-full flex-col gap-6 p-6 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="type-h3 text-fg">{service.title}</h3>
                <ArrowUpRight
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-fg-subtle transition duration-base ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300"
                />
              </div>

              {service.image && (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-control border border-white/[0.06] bg-white/[0.02]">
                  {/* eslint-disable-next-line @next/next/no-img-element --
                      next/image's default loader is incompatible with
                      output: 'export'; these are pre-optimized WebP already. */}
                  <img
                    src={service.image}
                    alt=""
                    width={1200}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-slow ease-out group-hover:scale-[1.03]"
                  />
                </div>
              )}

              {blurb && (
                <p className="mt-auto text-sm leading-relaxed text-fg-muted text-pretty">
                  {blurb}
                </p>
              )}
            </Link>
          </GlowCard>
        );
      })}
    </div>
  );
}
