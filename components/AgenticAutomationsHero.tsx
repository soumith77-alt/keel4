"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { calendlyLink } from "@/config/content";

interface Outcome {
  metric: string;
  label: string;
}

interface AgenticAutomationsHeroProps {
  title: string;
  headline: string;
  subtext: string;
  outcomes?: Outcome[];
  videoSrc?: string;
}

/** Automation-themed visual: glowing nodes/workflow, not voice-related */
function AutomationVisual() {
  return (
    <div
      className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex-shrink-0"
      aria-hidden
    >
      <div className="absolute inset-0 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute inset-8 rounded-full border-2 border-white/20" />
      <div className="absolute inset-16 rounded-full border border-white/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center">
        <svg
          className="w-12 h-12 text-white/90"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          />
        </svg>
      </div>
    </div>
  );
}

export default function AgenticAutomationsHero({
  title,
  headline,
  subtext,
  outcomes = [],
  videoSrc,
}: AgenticAutomationsHeroProps) {
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
            {videoSrc ? (
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
            ) : (
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-base font-medium text-white/90 hover:text-white transition-colors hover:bg-white/10 border border-white/40"
              >
                Get a Demo
              </Link>
            )}
          </div>
        </div>

        {/* Right: demo video or automation visual */}
        <div
          ref={videoSrc ? videoContainerRef : undefined}
          id="watch-demo"
          className="flex-shrink-0 order-1 lg:order-2 w-full lg:w-[480px] xl:w-[520px] flex items-center justify-center min-h-[256px] sm:min-h-[320px] scroll-mt-24"
        >
          {videoSrc ? (
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/30 ring-2 ring-white/10 aspect-video max-w-lg">
              <video
                ref={videoRef}
                src={videoSrc}
                controls
                className="w-full h-full bg-black"
                preload="auto"
                playsInline
                title="Agentic AI Automations demo"
              >
                Your browser does not support the video element.
              </video>
            </div>
          ) : (
            <AutomationVisual />
          )}
        </div>
      </div>
    </section>
  );
}
