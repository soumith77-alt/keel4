'use client';

/**
 * Video demo player for UGC / Animation service pages.
 * Video file is served from public/video/ (see config/content.ts demoVideoUrl).
 */
type VideoDemoPlayerProps = {
  src: string;
  title?: string;
};

export default function VideoDemoPlayer({
  src,
  title = 'Watch a demo',
}: VideoDemoPlayerProps) {
  return (
    <div className="rounded-2xl border-2 border-[#253c80]/20 bg-white p-6 sm:p-8 shadow-lg overflow-hidden">
      <p className="font-semibold text-gray-900 text-lg mb-1">{title}</p>
      <p className="text-sm text-gray-500 mb-4">
        Sample of our video work
      </p>
      <div className="rounded-xl overflow-hidden bg-black aspect-video max-w-2xl">
        <video
          src={src}
          controls
          className="w-full h-full"
          preload="metadata"
          playsInline
        >
          Your browser does not support the video element.
        </video>
      </div>
    </div>
  );
}
