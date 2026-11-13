import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Product card whose cover has a rounded notch bitten out of its bottom-right
 * corner, with the "open" arrow nested inside it. The cut is concentric with
 * the arrow disc, and filleted where it meets the cover's edges.
 *
 * There is no photography: the cover is a designed panel (brand glow, hairline
 * grid, product glyph), so the notch and arrow carry the interaction.
 *
 * The notch is painted in the card's own surface colour, which is why the card
 * sits on an opaque `bg-card` shell rather than on the shader directly.
 */
const DISC = 56; // the arrow disc, px
const BLOCK = 72; // the notch block, px (radius = BLOCK - DISC / 2)
const FILLET = 24; // the curve where the cut meets the cover's edges, px

export type NotchedProjectCardProps = {
  href: string;
  title: string;
  description?: string;
  /** the product glyph shown on the cover */
  icon: ReactNode;
  /** small pill in the cover's top-left corner, e.g. the index */
  badge?: string;
  /** short capability labels, shown as chips under the description */
  tags?: string[];
  className?: string;
};

export function NotchedProjectCard({
  href,
  title,
  description,
  icon,
  badge,
  tags = [],
  className,
}: NotchedProjectCardProps) {
  const external = /^https?:\/\//i.test(href);

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className={cn(
        "group flex h-full flex-col rounded-[26px] border border-border/70 bg-card p-2.5 outline-none transition-[border-color,box-shadow] duration-300 hover:border-brand/35 hover:shadow-[0_30px_70px_-40px_rgb(162_104_28/0.5)] focus-visible:border-brand/60 focus-visible:ring-2 focus-visible:ring-ring/50",
        className,
      )}
    >
      <div className="relative">
        {/* the cover */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-[linear-gradient(150deg,#fffdf7_0%,#f9f0dc_55%,#f2e3c6_100%)] ring-1 ring-inset ring-foreground/[0.06]">
          {/* hairline grid, faded to the edges */}
          <div
            aria-hidden="true"
            className="absolute inset-0 [background-image:linear-gradient(to_right,rgb(30_24_17/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(30_24_17/0.06)_1px,transparent_1px)] [background-size:38px_38px] [mask-image:radial-gradient(ellipse_at_50%_45%,black,transparent_78%)]"
          />
          {/* brand glow */}
          <div
            aria-hidden="true"
            className="absolute -left-8 -top-10 size-40 rounded-full bg-brand/20 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
          />
          {/* light catch along the top edge */}
          <div
            aria-hidden="true"
            className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-brand/40 to-transparent"
          />

          {badge ? (
            <span className="absolute left-3 top-3 rounded-full border border-foreground/10 bg-white/70 px-2 py-0.5 font-mono text-[10px] font-medium tabular-nums tracking-[0.16em] text-foreground/70 backdrop-blur-md">
              {badge}
            </span>
          ) : null}

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-14 items-center justify-center rounded-2xl border border-foreground/10 bg-white/60 text-brand shadow-[inset_0_1px_0_rgb(255_255_255/0.9)] backdrop-blur-sm transition-colors duration-300 group-hover:border-brand/40 group-hover:bg-brand/15 group-hover:text-brand">
              {icon}
            </span>
          </div>
        </div>

        {/* the notch: a block with a concave corner, and a fillet at each end
            where the cut meets the cover's right and bottom edges */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 bg-card"
          style={{
            width: BLOCK,
            height: BLOCK,
            borderTopLeftRadius: BLOCK - DISC / 2,
          }}
        />
        {[
          { bottom: BLOCK, right: 0 },
          { bottom: 0, right: BLOCK },
        ].map((pos, index) => (
          <div
            key={index}
            aria-hidden="true"
            className="absolute"
            style={{
              ...pos,
              width: FILLET,
              height: FILLET,
              background: `radial-gradient(circle at top left, transparent ${FILLET - 0.5}px, var(--card) ${FILLET}px)`,
            }}
          />
        ))}

        {/* the arrow, nested in the notch */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-background text-foreground ring-1 ring-inset ring-foreground/15 transition-[background-color,color,scale] duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary/40"
          style={{ width: DISC, height: DISC }}
        >
          <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4 sm:pb-4 sm:pt-6">
        <h3 className="text-xl font-medium tracking-tight text-foreground">
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
                className="rounded-md bg-foreground/[0.06] px-2 py-1 text-[11px] font-medium leading-none text-foreground/70"
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
