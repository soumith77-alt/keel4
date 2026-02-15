"use client";

import Link from "next/link";

const DEFAULT_IMAGE = "https://placehold.co/512x512/e2e8f0/4a5568?text=Image";

type Service = {
  slug: string;
  title: string;
  image?: string;
  outcomeStatement?: string;
};

export default function ServicesPageGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
      {services.map((service) => {
        const image = service.image || DEFAULT_IMAGE;
        const outcome = service.outcomeStatement ?? "";
        return (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group block bg-white rounded-2xl p-5 sm:p-6 flex flex-col min-h-[280px] sm:min-h-[300px] transition-all duration-300 border border-gray-100/80 hover:border-gray-200 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative flex-1 flex items-center justify-center mb-5 min-h-[180px]">
              <img
                src={image}
                alt=""
                className="w-full max-w-[200px] sm:max-w-[240px] h-auto aspect-square object-contain rounded-xl shadow-lg transition-transform duration-300 ease-out group-hover:-translate-y-1"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.onerror) target.onerror = null;
                  target.src = DEFAULT_IMAGE;
                }}
              />
            </div>
            <div className="flex flex-col gap-1 shrink-0">
              <h3 className="text-left text-lg font-semibold text-gray-900">
                {service.title}
              </h3>
              {outcome && (
                <p className="text-left text-sm text-gray-500 font-normal leading-snug">
                  {outcome}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
