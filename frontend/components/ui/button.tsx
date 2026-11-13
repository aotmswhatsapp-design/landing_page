import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium outline-none transition-[background-color,color,box-shadow,filter] duration-200 focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-background shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_10px_24px_-14px_rgb(30_24_17/0.6)] hover:bg-brand hover:text-white hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_10px_24px_-14px_rgb(162_104_28/0.65)]",
        outline:
          "border border-border bg-card/60 text-foreground hover:border-foreground/20 hover:bg-foreground/[0.06]",
      },
      size: {
        sm: "h-9 px-3.5",
        md: "h-10 px-4",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export { buttonVariants };
