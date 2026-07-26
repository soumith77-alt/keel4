import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Dark glass card. One card definition for the whole site — the previous code
 * had `rounded-panel border border-gray-200 shadow-sm` hand-written in ~10 places
 * with slightly different values each time.
 *
 * Hover lift uses transform only (no layout-affecting properties) so it can't
 * cause reflow, and it is suppressed under prefers-reduced-motion by the global
 * rule in globals.css.
 */

type CardProps = {
  children: React.ReactNode;
  className?: string;
  /** Adds hover lift + brand glow. Use for cards that are links. */
  interactive?: boolean;
  /** Slightly brighter surface for cards that need to sit forward. */
  emphasis?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const cardBaseClasses =
  "relative overflow-hidden rounded-card border border-white/[0.08] bg-white/[0.03]";

export const cardInteractiveClasses =
  "transition duration-base ease-out hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.05] hover:shadow-glow-md";

export function Card({
  children,
  className,
  interactive = false,
  emphasis = false,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        cardBaseClasses,
        emphasis && "bg-white/[0.05] border-white/[0.12]",
        interactive && cardInteractiveClasses,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
