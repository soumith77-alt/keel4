"use client";

import React from "react";
import Image from "next/image";
import { calendlyLink } from "@/config/content";

interface Outcome {
  metric: string;
  label: string;
}

interface WebsiteBuildingHeroProps {
  title: string;
  headline: string;
  subtext: string;
  outcomes?: Outcome[];
  imageSrc?: string;
}

/** Website Building hero — same layout as UGC Video (left content, right image), blue background */
export default function WebsiteBuildingHero({
  title,
  headline,
  subtext,
  outcomes = [],
  imageSrc = "/website.png",
}: WebsiteBuildingHeroProps) {
  return (
    <section className="w-full bg-[#253c80] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-col lg:flex-row gap-14 lg:gap-20 items-center lg:items-stretch min-h-[420px]">
        {/* Left: content — centered so button is under full outcomes row */}
        <div className="flex-1 flex flex-col justify-center order-2 lg:order-1 items-center text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-white/70 uppercase tracking-[0.2em] font-medium mb-6">
            {headline}
          </p>
          <p className="text-lg sm:text-xl text-white/95 leading-relaxed max-w-xl mb-12">
            {subtext}
          </p>
          {outcomes.length > 0 && (
            <div className="flex flex-nowrap gap-6 sm:gap-10 lg:gap-12 mb-12 overflow-x-auto justify-center" aria-labelledby="results-heading">
              <h2 id="results-heading" className="sr-only">Measurable Results</h2>
              {outcomes.map((outcome, i) => (
                <div key={i} className="flex flex-col flex-shrink-0">
                  <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none mb-0.5">
                    {outcome.metric}
                  </span>
                  <span className="text-white/90 text-xs sm:text-sm font-medium capitalize">
                    {outcome.label}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={calendlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl text-base font-semibold transition-colors shadow-lg"
              style={{ backgroundColor: "#fff", color: "#253c80" }}
            >
              Book a Call
            </a>
          </div>
        </div>

        {/* Right: image — same treatment as UGC video container */}
        <div className="flex-shrink-0 order-1 lg:order-2 w-full lg:w-[480px] xl:w-[520px] flex items-center justify-center min-h-[256px] sm:min-h-[320px]">
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/30 ring-2 ring-white/10 max-w-lg aspect-[4/3] sm:aspect-video relative">
            <Image
              src={imageSrc}
              alt="Website Building — conversion-optimized sites"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 520px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
