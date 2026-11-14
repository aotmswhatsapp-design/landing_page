import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Product card on the shared surface language: a `bg-card` shell with a
 * hairline border and a cover holding either the product screenshot or glyph,
 * its index and the open-arrow disc.
 */
export type ProductCardProps = {
  href: string;
  title: string;
  description?: string;
  /** The product glyph shown on the cover when no screenshot is provided. */
  icon: ReactNode;
  /** Optional product screenshot from `public/src`. */
  image?: string | null;
  /** Small pill in the cover's top-left corner, e.g. the index. */
  badge?: string;
  /** Short capability labels, shown as chips under the description. */
  tags?: string[];
  className?: string;
};

export function ProductCard({
  href,
  title,
  description,
  icon,
  image,
  badge,
  tags = [],
  className,
}: ProductCardProps) {
  const external = /^https?:\/\//i.test(href);

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-border bg-card p-2 shadow-sm outline-none transition-[border-color,box-shadow] duration-300 hover:border-brand/30 hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/40",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[linear-gradient(145deg,#ffffff_0%,#eff6ff_52%,#fff7ed_100%)] ring-1 ring-inset ring-foreground/[0.06]">
        {image ? (
          <>
            <Image
              src={image}
              alt={`${title} preview`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-slate-950/15"
            />
          </>
        ) : (
          <>
            {/* hairline grid, faded to the edges */}
            <div
              aria-hidden="true"
              className="absolute inset-0 [background-image:linear-gradient(to_right,rgb(0_102_255/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_102_255/0.07)_1px,transparent_1px)] [background-size:38px_38px] [mask-image:radial-gradient(ellipse_at_50%_45%,black,transparent_78%)]"
            />
            {/* brand glow */}
            <div
              aria-hidden="true"
              className="absolute -left-8 -top-10 size-40 rounded-full bg-brand/20 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-10 -right-8 size-36 rounded-full bg-[#ff5a1f]/15 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
            />
            {/* light catch along the top edge */}
            <div
              aria-hidden="true"
              className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-brand/40 to-transparent"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-14 items-center justify-center rounded-xl border border-border bg-card/70 text-brand shadow-[inset_0_1px_0_rgb(255_255_255/0.9)] backdrop-blur-sm transition-colors duration-300 group-hover:border-brand/40 group-hover:bg-brand/10">
                {icon}
              </span>
            </div>
          </>
        )}

        {badge ? (
          <span className="absolute left-3 top-3 z-10 rounded-full border border-border bg-card/85 px-2.5 py-1 font-mono text-[10px] font-medium tabular-nums tracking-[0.16em] text-muted-foreground backdrop-blur-sm">
            {badge}
          </span>
        ) : null}

        <span
          aria-hidden="true"
          className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full border border-transparent bg-[#FF5A1F] text-white shadow-sm backdrop-blur-sm transition-[background-color,border-color,color,scale] duration-300 group-hover:scale-105 group-hover:bg-[#0066FF] group-hover:text-white"
        >
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4 sm:pb-4 sm:pt-6">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h3>

        {description ? (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}

        {tags.length > 0 ? (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
            {tags.map((tag, index) => (
              <li
                key={`${tag}-${index}`}
                className="rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-medium leading-none text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Link>
  );
}
