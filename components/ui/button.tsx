import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Button variants. Theme-aware: `secondary` and `ghost` resolve through the
 * fg/line variables, so they invert automatically inside a `theme-dark` band.
 *
 * `primary` is the locked brand navy as a FILL with white text — 10.3:1, and
 * the one place #253c80 runs at full strength. It reads on both themes.
 *
 * `link` uses accent-700, not accent-500: green text on the off-white canvas
 * needs the darker step to clear 4.5:1. See the contrast rule in tailwind.config.
 *
 * All sizes meet the 44px minimum touch target. Use `asChild` to render an
 * anchor or a next/link while keeping the styling.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-card font-semibold transition duration-base ease-out cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-white shadow-glow-sm hover:bg-brand-600 hover:shadow-glow-md active:scale-[0.98]",
        secondary:
          "border border-line/20 bg-fg/[0.05] text-fg backdrop-blur-sm hover:border-line/25 hover:bg-fg/[0.06] active:scale-[0.98]",
        ghost: "text-fg-muted hover:bg-fg/[0.05] hover:text-fg",
        // On the full-strength navy CTA band, invert: white fill on navy.
        inverse: "bg-white text-ink hover:bg-fg/10 active:scale-[0.98]",
        link: "text-accent-700 underline-offset-4 hover:text-accent-600 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-11 px-4 text-sm",
        default: "h-12 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
