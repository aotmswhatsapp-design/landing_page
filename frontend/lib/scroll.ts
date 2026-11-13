import type { MouseEvent } from "react";

/** Split "/#products" → "products". Returns "" when the href has no hash. */
export function hashOf(href: string): string {
  const index = href.indexOf("#");
  return index === -1 ? "" : href.slice(index + 1);
}

/**
 * Scroll to an in-page section and record the hash. The scroll target's own
 * `scroll-margin-top` clears the sticky navbar, so sections and the demo form
 * can each pick their own offset.
 */
export function scrollToSection(href: string): boolean {
  const hash = hashOf(href);
  if (!hash) return false;

  const target = document.getElementById(hash);
  if (!target) return false;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
  window.history.replaceState(null, "", `#${hash}`);
  return true;
}

/**
 * Click handler for in-page links: keeps the page (no route change, no reload)
 * and scrolls smoothly instead of relying on the router.
 */
export function handleSectionLink(event: MouseEvent<HTMLElement>, href: string) {
  if (!hashOf(href)) return;
  event.preventDefault();
  scrollToSection(href);
}
