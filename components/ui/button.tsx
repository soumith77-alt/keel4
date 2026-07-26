import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Button variants tuned for the dark canvas.
 *
 * `primary` is the locked brand navy as a FILL with white text — 10.3:1, the
 * one place #253c80 runs at full strength. Navy is never applied as text on a
 * dark surface (1.9:1).
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
          "bg-brand-600 text-white shadow-glow-sm hover:bg-brand-700 hover:shadow-glow-md active:scale-[0.98]",
        secondary:
          "border border-white/[0.14] bg-white/[0.06] text-fg backdrop-blur-sm hover:border-white/[0.24] hover:bg-white/[0.1] active:scale-[0.98]",
        ghost: "text-fg-muted hover:bg-white/[0.06] hover:text-fg",
        // On the full-strength navy CTA band, invert: white fill on navy.
        inverse: "bg-white text-brand-700 hover:bg-brand-200 active:scale-[0.98]",
        link: "text-brand-300 underline-offset-4 hover:text-brand-200 hover:underline",
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
