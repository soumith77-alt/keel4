"use client";

import React, { useRef } from "react";
import { calendlyLink } from "@/config/content";

interface Outcome {
  metric: string;
  label: string;
}

interface UGCVideoHeroWithVideoProps {
  title: string;
  headline: string;
  subtext: string;
  videoSrc: string;
  outcomes?: Outcome[];
}

export default function UGCVideoHeroWithVideo({
  title,
  headline,
  subtext,
  videoSrc,
  outcomes = [],
}: UGCVideoHeroWithVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const handleWatchDemo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="w-full bg-[#253c80] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-col lg:flex-row gap-14 lg:gap-20 items-center lg:items-stretch min-h-[420px]">
        {/* Left: content */}
        <div className="flex-1 flex flex-col justify-center order-2 lg:order-1">
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
            <div className="flex flex-nowrap gap-6 sm:gap-10 lg:gap-12 mb-12 overflow-x-auto" aria-labelledby="results-heading">
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
          <div className="flex flex-wrap gap-4">
            <a
              href={calendlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl text-base font-semibold transition-colors shadow-lg"
              style={{ backgroundColor: "#fff", color: "#253c80" }}
            >
              Book a Call
            </a>
            <button
              type="button"
              onClick={handleWatchDemo}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-base font-medium text-white/90 hover:text-white transition-colors hover:bg-white/10 border border-white/40"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch a Demo
            </button>
          </div>
        </div>

        {/* Right: demo video — dark blue background behind the video */}
        <div
          ref={videoContainerRef}
          id="watch-demo"
          className="flex-shrink-0 order-1 lg:order-2 w-full lg:w-[480px] xl:w-[520px] flex items-center justify-center min-h-[256px] sm:min-h-[320px] scroll-mt-24"
        >
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/30 ring-2 ring-white/10 aspect-video max-w-lg">
            <video
              ref={videoRef}
              src={videoSrc}
              controls
              className="w-full h-full bg-black"
              preload="metadata"
              playsInline
              title="UGC & AI Video demo"
            >
              Your browser does not support the video element.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
