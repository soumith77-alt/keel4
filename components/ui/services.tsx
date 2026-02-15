"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ServiceCard = {
  title: string;
  slug: string;
  image?: string;
  overlayImage?: string;
  outcomeStatement?: string;
};

const DEFAULT_IMAGE = "https://placehold.co/512x512/e2e8f0/4a5568?text=Image";

type ServicesSectionProps = {
  services: ServiceCard[];
  className?: string;
};

export default function ServicesSection({ services, className }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className={cn(
        "scroll-mt-16 bg-white pt-4 pb-20 md:pt-6 md:pb-24 px-6 w-full",
        className
      )}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header — centered */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#253c80] mb-4 tracking-tight">
            Our Services
          </h2>
          <p className="text-xl text-[#253c80] max-w-2xl mx-auto">
            Let&apos;s turn your vision into something amazing.
          </p>
        </div>

        {/* Desktop: 4-col grid — all 4 visible. Mobile/tablet: horizontal scroll */}
        <div className="relative">
          {/* Horizontal scroll — visible on md and below */}
          <div
            className="flex lg:hidden gap-6 overflow-x-auto overflow-y-hidden pb-2 snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-2 px-2 sm:mx-0 sm:px-0"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {services.map((service, i) => {
              const image = service.image || DEFAULT_IMAGE;
              const outcome = service.outcomeStatement ?? "";
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex-shrink-0 w-[280px] sm:w-[300px] min-w-[260px] snap-center"
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex flex-col h-full rounded-2xl border border-slate-200/60 bg-white p-5 md:p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.onerror) target.onerror = null;
                          target.src = DEFAULT_IMAGE;
                        }}
                      />
                    </div>
                    <div className="mt-4 flex flex-col gap-0.5 shrink-0">
                      <h3 className="text-left text-base font-semibold text-[#253c80]">
                        {service.title}
                      </h3>
                      {outcome && (
                        <p className="text-left text-sm text-[#253c80] font-normal leading-snug">
                          {outcome}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <p className="lg:hidden mt-4 text-center text-xs text-[#253c80]">
            Swipe to see all services
          </p>

          {/* Desktop: 4-col grid — all 4 cards visible at once */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {services.map((service, i) => {
              const image = service.image || DEFAULT_IMAGE;
              const outcome = service.outcomeStatement ?? "";
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex flex-col h-full rounded-2xl border border-slate-200/60 bg-white p-5 md:p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.onerror) target.onerror = null;
                          target.src = DEFAULT_IMAGE;
                        }}
                      />
                    </div>
                    <div className="mt-4 flex flex-col gap-0.5 shrink-0">
                      <h3 className="text-left text-base font-semibold text-[#253c80]">
                        {service.title}
                      </h3>
                      {outcome && (
                        <p className="text-left text-sm text-[#253c80] font-normal leading-snug">
                          {outcome}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
