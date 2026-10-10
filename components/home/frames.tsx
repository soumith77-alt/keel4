import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * PRODUCT FRAMES — the containers every interface on the homepage sits in.
 *
 * Real screenshots and coded concepts share the same chrome so the showcase
 * reads as one system, while the caption beneath each one says which is
 * which. Nothing here crops through interface text: screenshots are shown
 * whole at their intrinsic ratio, with width/height declared so the browser
 * reserves the box before the image arrives.
 */

export function BrowserFrame({
  label,
  children,
  className,
  tone = 'light',
}: {
  /** Text in the address pill — a product name, never an invented URL. */
  label?: string;
  children: React.ReactNode;
  className?: string;
  tone?: 'light' | 'dark';
}) {
  const dark = tone === 'dark';
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[14px] shadow-frame',
        dark ? 'bg-[#0B1310] ring-1 ring-white/10' : 'bg-white ring-1 ring-[#111814]/[0.07]',
        className,
      )}
    >
      <div
        className={cn(
          'flex h-[clamp(1.5rem,2.6vw,2rem)] items-center gap-[clamp(0.25rem,0.5vw,0.375rem)] px-[clamp(0.5rem,1vw,0.75rem)]',
          dark ? 'border-b border-white/[0.06]' : 'border-b border-[#111814]/[0.06] bg-[#FBFBF8]',
        )}
        aria-hidden
      >
        <span className="h-[clamp(0.375rem,0.6vw,0.5rem)] w-[clamp(0.375rem,0.6vw,0.5rem)] rounded-full bg-[#E0E3DD]" />
        <span className="h-[clamp(0.375rem,0.6vw,0.5rem)] w-[clamp(0.375rem,0.6vw,0.5rem)] rounded-full bg-[#E0E3DD]" />
        <span className="h-[clamp(0.375rem,0.6vw,0.5rem)] w-[clamp(0.375rem,0.6vw,0.5rem)] rounded-full bg-[#E0E3DD]" />
        {label && (
          <span
            className={cn(
              'mx-auto max-w-[60%] truncate rounded-pill px-[0.75em] py-[0.15em] text-[clamp(0.5625rem,0.8vw,0.6875rem)] font-medium',
              dark ? 'bg-white/[0.06] text-white/60' : 'bg-[#111814]/[0.045] text-[#526158]',
            )}
          >
            {label}
          </span>
        )}
        {label && <span className="w-[clamp(1.25rem,2vw,1.75rem)]" />}
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[clamp(1rem,2.4vw,1.75rem)] bg-[#111814] p-[clamp(0.25rem,0.5vw,0.375rem)] shadow-frame',
        className,
      )}
    >
      <div className="overflow-hidden rounded-[clamp(0.8rem,2vw,1.4rem)] bg-white">
        {children}
      </div>
    </div>
  );
}

/**
 * A screenshot at its intrinsic ratio. `sizes` should describe the rendered
 * width so the browser picks the 800px source on phones.
 */
export function Shot({
  src,
  srcSmall,
  width,
  height,
  alt,
  sizes,
  priority,
  className,
}: {
  src: string;
  srcSmall?: string;
  width: number;
  height: number;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={srcSmall ? `${srcSmall} 800w, ${src} ${width}w` : undefined}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      // React 18 does not know `fetchPriority`; the lowercase attribute is
      // passed through untouched and is what the browser reads.
      {...(priority ? { fetchpriority: 'high' } : {})}
      decoding="async"
      className={cn('block h-auto w-full', className)}
    />
  );
}

/**
 * MOCK CANVAS — a coded interface that scales like an image.
 *
 * The canvas is `units` em wide by definition (60 by default): its font-size
 * is 1/units of its own container width, and everything inside is sized in
 * em. Small canvases (a phone, a single record card) use fewer units so
 * their text stays legible. A
 * mock therefore keeps its exact composition at any width, with no
 * JavaScript and no layout shift. Text leaves set their own font-size; layout
 * containers stay at the base em so spacing does not compound.
 */
export function MockCanvas({
  ratio,
  units = 60,
  children,
  className,
}: {
  /** width / height */
  ratio: number;
  /** How many em fit across the canvas. Fewer units = larger content. */
  units?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      style={{ aspectRatio: ratio, containerType: 'inline-size' }}
      aria-hidden
    >
      <div
        className="absolute inset-0 leading-[1.3]"
        style={{ fontSize: `calc(100cqw / ${units})` }}
      >
        {children}
      </div>
    </div>
  );
}

/** The small badge that marks a concept as a concept. */
export function ConceptTag({
  className,
  children = 'Illustrative concept',
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-surface-raised/95 px-2.5 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-fg-muted backdrop-blur',
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full border border-fg-subtle" />
      {children}
    </span>
  );
}
