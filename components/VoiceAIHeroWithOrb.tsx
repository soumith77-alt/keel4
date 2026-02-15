"use client";

import React, { useRef, useState, useEffect } from "react";
import { VoicePoweredOrb } from "@/components/ui/voice-powered-orb";
import { calendlyLink } from "@/config/content";

interface Outcome {
  metric: string;
  label: string;
}

interface VoiceAIHeroWithOrbProps {
  headline: string;
  subtext: string;
  audioSrc: string;
  outcomes?: Outcome[];
}

export default function VoiceAIHeroWithOrb({
  headline,
  subtext,
  audioSrc,
  outcomes = [],
}: VoiceAIHeroWithOrbProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    setAudioElement(audio);

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      audio.pause();
      audioRef.current = null;
      setAudioElement(null);
    };
  }, [audioSrc]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  return (
    <section className="w-full bg-[#253c80] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-col lg:flex-row gap-14 lg:gap-20 items-center lg:items-stretch min-h-[420px]">
      {/* Left: content */}
      <div className="flex-1 flex flex-col justify-center order-2 lg:order-1">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
          Voice AI
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
            style={{ backgroundColor: '#fff', color: '#253c80' }}
          >
            Book a Call
          </a>
          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-base font-medium text-white/90 hover:text-white transition-colors hover:bg-white/10"
            aria-label={isPlaying ? "Pause demo" : "Play demo"}
          >
            {isPlaying ? (
              <>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
                Listen to demo
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right: white orb — full size, clearly visible */}
      <div className="flex-shrink-0 order-1 lg:order-2 w-full lg:w-[400px] xl:w-[440px] flex items-center justify-center min-h-[256px] sm:min-h-[320px]">
        <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden flex-shrink-0" aria-hidden>
          <VoicePoweredOrb
            audioElement={audioElement}
            variant="white"
            className="w-full h-full"
          />
        </div>
      </div>
      </div>
    </section>
  );
}
