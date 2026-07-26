import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Keel logo.
 *
 * Renders the brand asset in public/ exactly as supplied, with its own
 * background intact. Do not substitute a drawn mark or retype the wordmark in
 * a UI typeface: the asset is the logo.
 *
 * Plain <img> rather than next/image, because next/image's default loader is
 * incompatible with output: 'export'.
 */
export function Wordmark({
  className,
  showMark = true,
}: {
  className?: string;
  /** Retained for call-site compatibility; the asset is a single lockup. */
  showMark?: boolean;
}) {
  void showMark;

  return (
    <span className={cn("inline-flex items-center", className)}>
      <img
        src="/brand_logo.webp"
        alt="Keel"
        width={512}
        height={512}
        className="h-11 w-11 shrink-0 rounded-lg"
      />
    </span>
  );
}

export default Wordmark;
