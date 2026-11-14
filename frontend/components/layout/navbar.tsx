"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { OriginButton } from "@/components/ui/origin-button";
import { demoHref, primaryNav } from "@/lib/content/navigation";
import { handleSectionLink, hashOf } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("hero");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = primaryNav
      .map((item) => hashOf(item.href))
      .filter(Boolean);

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveHash(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-blue-500/15 bg-white/92 shadow-[0_8px_30px_-10px_rgba(0,102,255,0.14)] backdrop-blur-2xl"
          : "border-b border-slate-200/75 bg-white/80 backdrop-blur-xl",
      )}
    >
      {/* Bright top brand spectrum line */}
      <div
        aria-hidden="true"
        className="h-[3px] w-full bg-gradient-to-r from-[#0052D4] via-[#38BDF8] to-[#FF5A1F]"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div className="relative flex h-18 w-full items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            aria-label="AOTMS Global — Home"
            onClick={(event) => handleSectionLink(event, "/#hero")}
            className="group relative flex shrink-0 items-center gap-2.5 rounded-xl py-1 outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
          >
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-orange-500/0 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
              />
              <Image
                src="/brand/logo.png"
                alt="AOTMS Global Pvt. Ltd."
                width={738}
                height={195}
                priority
                className="relative h-9 w-auto transition-transform duration-300 group-hover:scale-[1.02] sm:h-10"
              />
            </div>
          </Link>

          {/* Desktop Navigation Pill Track */}
          <nav
            aria-label="Main"
            className="hidden lg:block"
            onMouseLeave={() => setHoveredItem(null)}
          >
            <ul className="flex items-center gap-0.5 rounded-full border border-slate-200/80 bg-slate-100/70 p-1 shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-md">
              {primaryNav.map((item) => {
                const sectionId = hashOf(item.href);
                const isActive = activeHash === sectionId;
                const isHovered = hoveredItem === item.label;

                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.label)}
                  >
                    <Link
                      href={item.href}
                      onClick={(event) => handleSectionLink(event, item.href)}
                      className={cn(
                        "relative z-10 inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-sm font-medium outline-none transition-colors duration-200 focus-visible:ring-3 focus-visible:ring-ring/40",
                        isActive
                          ? "font-semibold text-[#0052D4]"
                          : "text-slate-600 hover:text-slate-950",
                      )}
                    >
                      {/* Animated hover / active pill background */}
                      {isHovered || (isActive && hoveredItem === null) ? (
                        <motion.span
                          layoutId="navbar-active-pill"
                          aria-hidden="true"
                          className={cn(
                            "absolute inset-0 -z-10 rounded-full",
                            isActive
                              ? "border border-blue-500/25 bg-white shadow-[0_2px_10px_rgba(0,102,255,0.12)]"
                              : "border border-slate-200/90 bg-white/90 shadow-xs",
                          )}
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                          }}
                        />
                      ) : null}

                      {/* Active dot indicator */}
                      {isActive ? (
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#FF5A1F]"
                        />
                      ) : null}

                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right CTA Cluster */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/#products"
              onClick={(event) => handleSectionLink(event, "/#products")}
              className="hidden items-center gap-2 rounded-full border border-blue-500/20 bg-gradient-to-r from-blue-500/8 via-sky-500/8 to-orange-500/8 px-3.5 py-1.5 text-xs font-semibold text-[#0052D4] transition-all duration-200 hover:border-blue-500/40 hover:shadow-xs xl:inline-flex"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5A1F] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#FF5A1F]" />
              </span>
              <span>6 Live Products</span>
            </Link>

            <OriginButton
              className="hidden rounded-xl font-semibold sm:inline-flex"
              href={demoHref}
              onClick={(event) => handleSectionLink(event, demoHref)}
              variant="outline"
              size="sm"
            >
              <Sparkles className="size-3.5" aria-hidden="true" />
              Get a Demo
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </OriginButton>

            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
