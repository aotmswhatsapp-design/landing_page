import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background outline-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#FF5A1F] via-[#F97316] to-[#FB923C] text-white shadow-[0_8px_24px_-6px_rgba(255,90,31,0.45)] hover:from-[#0052D4] hover:via-[#0066FF] hover:to-[#38BDF8] hover:shadow-[0_10px_28px_-6px_rgba(0,102,255,0.45)]",
        primary:
          "bg-gradient-to-r from-[#0052D4] via-[#0066FF] to-[#38BDF8] text-white shadow-[0_8px_24px_-6px_rgba(0,102,255,0.45)] hover:from-[#0041B0] hover:via-[#0052D4] hover:to-[#0066FF]",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
        outline:
          "border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-muted text-foreground hover:bg-muted/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-brand underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3.5",
        md: "h-10 px-5",
        lg: "h-11 rounded-xl px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    void asChild;
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
