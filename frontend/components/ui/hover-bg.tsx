"use client";

import { useEffect, useRef, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

/**
 * Pointer-lit backdrop for the hero: a hairline grid plus a warm wash that only
 * appear inside a soft radius around the cursor. Decorative, so it never takes
 * pointer events and stays dark on touch-only devices.
 */
export function HoverBg({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    const host = node?.parentElement;
    if (!node || !host) return;

    // Coarse pointers (touch) get no spotlight: there is no cursor to follow.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      node.style.setProperty("--hover-x", `${x.toFixed(1)}px`);
      node.style.setProperty("--hover-y", `${y.toFixed(1)}px`);
      node.style.setProperty("--hover-o", "1");
    };

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      if (event.clientY < rect.top || event.clientY > rect.bottom) return;
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      node.style.setProperty("--hover-o", "0");
    };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      style={{ "--hover-o": "0" } as CSSProperties}
    >
      <div className="absolute inset-0 opacity-[var(--hover-o)] transition-opacity duration-500 [background-image:linear-gradient(to_right,rgb(0_102_255/0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_102_255/0.12)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(circle_320px_at_var(--hover-x,50%)_var(--hover-y,50%),black,transparent_75%)]" />
      <div className="absolute inset-0 opacity-[calc(var(--hover-o)*0.85)] transition-opacity duration-500 [background:radial-gradient(circle_360px_at_var(--hover-x,50%)_var(--hover-y,50%),rgb(56_189_248/0.22),rgb(255_90_31/0.10)_45%,transparent_72%)]" />
    </div>
  );
}
