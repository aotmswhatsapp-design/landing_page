"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type MotionProps,
} from "framer-motion";
import {
  Activity,
  ArrowRight,
  Layers,
  PhoneCall,
  Play,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { ProductIcon } from "@/components/layout/product-icon";
import { HoverBg } from "@/components/ui/hover-bg";
import { OriginButton } from "@/components/ui/origin-button";
import { demoHref } from "@/lib/content/navigation";
import { products } from "@/lib/content/products";
import { handleSectionLink } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const productsHref = "/#products";

const trustHighlights = [
  { icon: Layers, label: "6 Integrated Products" },
  { icon: Zap, label: "Smart AI Automation" },
  { icon: Activity, label: "Real-Time Analytics" },
  { icon: ShieldCheck, label: "Scalable Cloud Architecture" },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [shouldReduceMotion, paused]);

  const activeProduct = products[activeIndex] ?? products[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  } satisfies MotionProps["variants"];

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  } satisfies MotionProps["variants"];

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate scroll-mt-18 overflow-hidden pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24 lg:pt-10"
    >
      {/* Bright Multi-Layer Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.08, 1],
                  opacity: [0.38, 0.52, 0.38],
                }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-36 left-1/2 h-[32rem] w-[68rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.28)_0%,rgba(56,189,248,0.16)_42%,transparent_72%)] blur-3xl"
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -25, 0],
                  y: [0, 20, 0],
                  opacity: [0.28, 0.42, 0.28],
                }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-8%] top-20 h-[28rem] w-[36rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,90,31,0.24)_0%,rgba(251,146,60,0.12)_48%,transparent_72%)] blur-3xl"
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 25, 0],
                  y: [0, -18, 0],
                  opacity: [0.26, 0.4, 0.26],
                }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-8%] top-44 h-[26rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.22)_0%,rgba(0,102,255,0.10)_50%,transparent_72%)] blur-3xl"
        />

        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.045)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_85%_65%_at_50%_28%,black_40%,transparent_100%)]" />
      </div>

      <HoverBg className="opacity-90" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-5 sm:px-8"
      >
        {/* Top Bright Ecosystem Announcement Pill */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <a
            href={productsHref}
            onClick={(event) => handleSectionLink(event, productsHref)}
            className="group inline-flex items-center gap-2.5 rounded-full border border-blue-500/25 bg-white/90 py-1.5 pl-2 pr-4 text-xs font-semibold text-slate-700 shadow-[0_6px_24px_-6px_rgba(0,102,255,0.18)] backdrop-blur-md transition-all duration-300 hover:border-blue-500/45 hover:shadow-[0_8px_28px_-4px_rgba(0,102,255,0.26)] sm:text-sm"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#0052D4] via-[#0066FF] to-[#FF5A1F] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs">
              <Sparkles className="size-3" aria-hidden="true" />
              AOTMS Suite
            </span>
            <span className="hidden text-slate-400 sm:inline">•</span>
            <span className="font-medium text-slate-700">
              6 Products · Smart Automation · Integrated Solutions
            </span>
            <ArrowRight
              aria-hidden="true"
              className="size-3.5 text-[#0066FF] transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>

        {/* Main Hero Headline & Subheadline */}
        <div className="mt-7 flex w-full flex-col items-center text-center sm:mt-8">
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="max-w-4xl text-balance text-4xl font-extrabold leading-[1.06] tracking-[-0.03em] text-slate-950 sm:text-6xl lg:text-[4.35rem]"
          >
            Power Your Business with{" "}
            <span className="relative mt-1 inline-block">
              <span className="bg-gradient-to-r from-[#0052D4] via-[#0066FF] to-[#FF5A1F] bg-clip-text text-transparent">
                Smarter Digital Solutions
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 420 14"
                fill="none"
                className="pointer-events-none mx-auto mt-1 h-2.5 w-[88%] sm:h-3.5"
              >
                <motion.path
                  d="M4 10C95 3 285 2 416 10"
                  stroke="url(#hero-underline-gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient
                    id="hero-underline-gradient"
                    x1="4"
                    y1="10"
                    x2="416"
                    y2="10"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#0052D4" />
                    <stop offset="0.5" stopColor="#38BDF8" />
                    <stop offset="1" stopColor="#FF5A1F" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8"
          >
            From intelligent automation to connected business management, AOTMS
            brings{" "}
            <span className="font-semibold text-slate-900">
              LMS, CRM, WhatsApp AI, Voice Calling, Auction &amp; ERP
            </span>{" "}
            together so your teams work smarter, connect faster, and scale
            effortlessly.
          </motion.p>
        </div>

        {/* High-Impact CTA Row */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row sm:gap-4"
        >
          <OriginButton
            href={productsHref}
            onClick={(event) => handleSectionLink(event, productsHref)}
            size="lg"
            className="h-12 w-full rounded-xl px-7 text-base font-semibold sm:w-auto"
          >
            Explore Our Products
            <ArrowRight className="size-4" aria-hidden="true" />
          </OriginButton>

          <OriginButton
            href={demoHref}
            onClick={(event) => handleSectionLink(event, demoHref)}
            variant="outline"
            size="lg"
            className="h-12 w-full rounded-xl px-7 text-base font-semibold sm:w-auto"
          >
            <Play className="size-4 fill-current" aria-hidden="true" />
            Get a Live Demo
          </OriginButton>
        </motion.div>

        {/* Crisp Trust & Value Strip */}
        <motion.ul
          variants={itemVariants}
          aria-label="Key platform highlights"
          className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs font-medium text-slate-600 sm:text-sm"
        >
          {trustHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label} className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-blue-500/10 text-[#0066FF]">
                  <Icon className="size-3.5" aria-hidden="true" />
                </span>
                <span>{item.label}</span>
              </li>
            );
          })}
        </motion.ul>

        {/* Full-Width Product Photo Showcase */}
        <motion.div
          variants={itemVariants}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mt-10 w-full max-w-6xl sm:mt-12"
        >
          {/* Interactive Product Selector Tabs */}
          <div
            role="tablist"
            aria-label="AOTMS Product Showcase"
            className="mx-auto mb-5 flex max-w-fit flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-slate-200/90 bg-white/85 p-1.5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl"
          >
            {products.map((product, index) => {
              const selected = index === activeIndex;

              return (
                <button
                  key={product.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "group/tab relative inline-flex cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold outline-none transition-colors duration-200 focus-visible:ring-3 focus-visible:ring-ring/40 sm:px-4 sm:py-2.5 sm:text-sm",
                    selected
                      ? "text-white"
                      : "text-slate-600 hover:bg-blue-500/10 hover:text-[#0066FF]",
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId="hero-product-tab"
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-[#FF5A1F] via-[#F97316] to-[#FB923C] shadow-md transition-all duration-300 group-hover/tab:from-[#0052D4] group-hover/tab:via-[#0066FF] group-hover/tab:to-[#38BDF8]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  ) : null}
                  <ProductIcon
                    id={product.id}
                    className={cn(
                      "size-4 shrink-0 transition-colors",
                      selected
                        ? "text-white"
                        : "text-[#FF5A1F] group-hover/tab:text-[#0066FF]",
                    )}
                  />
                  <span>{product.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Complete Full-Width Photo Frame (No Left-Side Matter) */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-950 shadow-[0_28px_80px_-20px_rgba(0,102,255,0.22),0_12px_32px_-12px_rgba(15,23,42,0.12)] ring-1 ring-blue-500/15">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.99 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full"
              >
                {activeProduct.image ? (
                  <a
                    href={activeProduct.url ?? productsHref}
                    target={activeProduct.url ? "_blank" : undefined}
                    rel={activeProduct.url ? "noreferrer noopener" : undefined}
                    aria-label={`Open ${activeProduct.name} website`}
                    className="block w-full"
                  >
                    <Image
                      src={activeProduct.image}
                      alt={`${activeProduct.name} full preview`}
                      width={1920}
                      height={1000}
                      sizes="(max-width: 1280px) 100vw, 1152px"
                      priority
                      className="block h-auto w-full"
                    />
                  </a>
                ) : (
                  <div className="flex aspect-[16/8.5] w-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,#1e1b4b_0%,#0f172a_60%,#020617_100%)] px-6 py-12 text-center text-white">
                    <span className="flex size-16 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/20 text-violet-300 shadow-lg">
                      <PhoneCall className="size-8" aria-hidden="true" />
                    </span>
                    <span className="mt-5 rounded-full border border-violet-400/30 bg-violet-500/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-violet-200">
                      AI Voice Automation
                    </span>
                    <h2 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                      {activeProduct.name}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                      {activeProduct.description}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                      {activeProduct.highlights.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
