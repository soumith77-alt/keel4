import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * THE KEEL LINE — Keeel's recurring motif.
 *
 * A hairline with one V-shaped notch hanging from it, like a hull's keel
 * seen side-on: the structural line everything else is built along. It is
 * the only decorative device on the site that is ours rather than a
 * convention (cards, pills and browser frames are everyone's), so it is used
 * in a few fixed places and nowhere else:
 *
 *   · <KeelMark>     before every section label and project label
 *   · the hero       a keel line joins the active showcase tab to the stage
 *   · the process    each stage hangs from one continuous keel line
 *
 * Always the accent green, always 1.5px, always the same notch proportion.
 */

const NOTCH = 'M0 1 H7 L12 8 L17 1 H24';

/** The inline mark: 24 × 9, sized to sit beside a mono label. */
export function KeelMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 9"
      width="24"
      height="9"
      fill="none"
      aria-hidden
      className={cn('shrink-0 text-accent-500', className)}
    >
      <path d={NOTCH} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Section / project eyebrow: keel mark, optional index, mono label. */
export function Eyebrow({
  children,
  index,
  className,
  as: Tag = 'p',
}: {
  children: React.ReactNode;
  index?: string;
  className?: string;
  as?: 'p' | 'span' | 'div';
}) {
  return (
    <Tag className={cn('type-label flex items-center gap-2.5 text-signal', className)}>
      {index && <span className="tabular-nums">{index}</span>}
      <KeelMark className="-translate-y-px" />
      <span>{children}</span>
    </Tag>
  );
}
