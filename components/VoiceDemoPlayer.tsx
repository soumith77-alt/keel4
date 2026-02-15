'use client';

/**
 * Voice AI demo audio player. Place your recording at public/audio/voice-ai-demo.mp3
 * (or set demoAudioUrl in config/content.ts to your file path).
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
    <div className="rounded-2xl border-2 border-[#253c80]/20 bg-white p-6 sm:p-8 shadow-lg">
      <p className="font-semibold text-gray-900 text-lg mb-1">{title}</p>
      <p className="text-sm text-gray-500 mb-4">
        Sample of our Voice AI in action
      </p>
      <audio
        src={src}
        controls
        className="w-full max-w-md h-12 accent-[#253c80] [&::-webkit-media-controls-panel]:bg-[#253c80]/5"
        preload="metadata"
      >
        Your browser does not support the audio element. Download the file or try another browser.
      </audio>
    </div>
  );
}
