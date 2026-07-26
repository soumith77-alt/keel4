import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/**
 * Mono eyebrow + heading + optional lead. Replaces the ~8 hand-duplicated
 * "centered title / centered subtitle" blocks scattered across sections.
 */

type SectionHeadingProps = {
  /** Small uppercase mono label above the heading. */
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  /** Heading level — keeps the document outline honest. */
  as?: "h1" | "h2" | "h3";
  /** Type scale for the heading. */
  size?: "display" | "h1" | "h2" | "h3";
  className?: string;
  children?: React.ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
  size = "h2",
  className,
  children,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        centered ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="type-label mb-5 inline-flex items-center gap-2 text-brand-300">
            <span
              aria-hidden
              className="inline-block h-px w-6 bg-brand-400/60"
            />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal delay={0.05}>
        <Tag className={cn(`type-${size}`, "text-fg text-balance")}>{title}</Tag>
      </Reveal>

      {lead && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "type-body-lg mt-4 text-fg-muted text-pretty measure sm:mt-5",
              centered && "mx-auto"
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}

      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}

export default SectionHeading;
