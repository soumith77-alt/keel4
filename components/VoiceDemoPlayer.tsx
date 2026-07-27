'use client';

/**
 * Voice AI demo audio player. Source path comes from `demoAudioUrl` in
 * config/content.ts (currently public/audio/voice_ai_audio.mp4).
 *
 * Uses the native <audio> control deliberately: it is keyboard accessible,
 * screen-reader labelled, and respects platform media conventions for free.
 * `color-scheme: dark` is what makes the native chrome render dark rather than
 * as a white bar on the dark surface.
 */
type VoiceDemoPlayerProps = {
  src: string;
  title?: string;
};

export default function VoiceDemoPlayer({
  src,
  title = 'Listen to a demo',
}: VoiceDemoPlayerProps) {
  return (
    <div className="rounded-panel border border-line/15 bg-fg/[0.03] p-6 backdrop-blur-sm sm:p-7">
      <p className="type-h3 text-fg">{title}</p>
      <p className="mt-1.5 text-sm text-fg-muted">
        A real call, start to finish.
      </p>
      <audio
        src={src}
        controls
        preload="metadata"
        aria-label={title}
        className="mt-5 h-11 w-full [color-scheme:dark]"
      >
        Your browser does not support the audio element.{' '}
        <a href={src} className="underline">
          Download the recording
        </a>{' '}
        instead.
      </audio>
    </div>
  );
}
