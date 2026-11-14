import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Rounded, hairline-bordered surface. Carries the hero's metric bar, section
 * eyebrows and any other short label cluster, so those all read as one family.
 */
export function Pill({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-card px-1.5 py-1 shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

/** One entry inside a `Pill`: a value and its label, muted like the reference. */
export function PillItem({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 text-xs text-muted-foreground sm:text-sm",
        className,
      )}
      {...props}
    />
  );
}

/** The hairline that separates entries inside a `Pill`. */
export function PillDivider({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("h-3.5 w-px shrink-0 bg-border", className)}
    />
  );
}
