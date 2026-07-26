import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Section owns vertical rhythm and container width so individual sections stop
 * inventing their own `max-w-*` + `py-*` combinations.
 */

const WIDTHS = {
  prose: "max-w-prose", // 704px, long-form copy
  default: "max-w-content", // 1152px, standard sections
  wide: "max-w-wide", // 1344px, full-width grids
  bleed: "max-w-none", // edge-to-edge; caller handles insets
} as const;

const TONES = {
  base: "bg-surface",
  raised: "bg-surface-raised",
  overlay: "bg-surface-overlay",
  brand: "bg-brand-600",
  none: "",
} as const;

const SPACING = {
  none: "",
  sm: "py-12 sm:py-20",
  md: "py-12 sm:py-28",
  lg: "py-12 sm:py-32",
} as const;

type SectionProps = {
  children: React.ReactNode;
  /** Container width. Defaults to the 1152px content column. */
  width?: keyof typeof WIDTHS;
  /** Background treatment. */
  tone?: keyof typeof TONES;
  /** Vertical rhythm tier. */
  spacing?: keyof typeof SPACING;
  className?: string;
  /** Classes applied to the inner container rather than the outer <section>. */
  containerClassName?: string;
  id?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "children" | "className" | "id">;

export function Section({
  children,
  width = "default",
  tone = "base",
  spacing = "md",
  className,
  containerClassName,
  id,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        TONES[tone],
        SPACING[spacing],
        id && "scroll-mt-24",
        className
      )}
      {...rest}
    >
      <div
        className={cn(
          "mx-auto w-full px-5 sm:px-8",
          WIDTHS[width],
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

export default Section;
