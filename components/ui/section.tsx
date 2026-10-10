import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Section owns vertical rhythm and container width so individual sections stop
 * inventing their own `max-w-*` + `py-*` combinations.
 */

const WIDTHS = {
  prose: "site-container max-w-[calc(44rem+2*var(--gutter))]", // long-form copy
  default: "site-container", // the 1240px site column
  wide: "site-container",
  bleed: "w-full", // edge-to-edge; caller handles insets
} as const;

/**
 * Tones carry a theme scope, not just a background. `theme-light` and
 * `theme-dark` re-point the --canvas / --fg / --line variables for the whole
 * subtree, so inverting a band costs one prop and every child follows.
 *
 * `dark` is the #0e1836 feature surface, full bleed with a hard edge.
 */
const TONES = {
  light: "theme-light bg-surface text-fg",
  raised: "theme-light bg-surface-raised text-fg",
  dark: "theme-dark bg-surface text-fg",
  brand: "theme-dark bg-ink text-fg",
  none: "",
  /** @deprecated alias kept so pre-inversion call sites keep compiling */
  base: "theme-light bg-surface text-fg",
  /** @deprecated alias — was a dark elevated surface */
  overlay: "theme-light bg-surface-raised text-fg",
} as const;

/**
 * Vertical rhythm. `md` and `lg` are the site rhythm (~56px on a phone, ~120px
 * on a desktop, see --section-y); `sm` is for tightly coupled follow-ons.
 */
const SPACING = {
  none: "",
  sm: "py-[calc(var(--section-y)*0.6)]",
  md: "section-y",
  lg: "section-y",
} as const;

type SectionProps = {
  children: React.ReactNode;
  /** Container width. Defaults to the 1240px site column. */
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
      <div className={cn(WIDTHS[width], containerClassName)}>
        {children}
      </div>
    </section>
  );
}

export default Section;
