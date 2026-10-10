import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Button variants. Theme-aware: `secondary` and `ghost` resolve through the
 * fg/hairline variables, so they invert automatically inside a `theme-dark`
 * band.
 *
 * `primary` is the emerald fill with white text — 6.4:1, darkening to 8.2:1 on
 * hover. `inverse` is for the dark surface: page-white fill, ink text.
 *
 * All sizes meet the 44px minimum touch target. Use `asChild` to render an
 * anchor or a next/link while keeping the styling.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-semibold tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-fast ease-micro cursor-pointer disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-emerald text-white shadow-accent hover:bg-emerald-hover",
        secondary:
          "border border-hairline bg-surface-raised text-fg shadow-glow-sm hover:border-line/25 hover:bg-surface-raised",
        ghost: "text-fg-muted hover:bg-fg/[0.05] hover:text-fg",
        inverse: "bg-[#F6F5F0] text-[#111814] hover:bg-white",
        link: "text-signal underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-11 px-5 text-sm",
        default: "h-12 px-6 text-[0.9375rem]",
        lg: "h-[3.25rem] px-7 text-base",
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
