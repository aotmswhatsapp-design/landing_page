"use client";

import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { OriginButton } from "@/components/ui/origin-button";
import { demoHref } from "@/lib/content/navigation";
import { handleSectionLink } from "@/lib/scroll";

const productsHref = "/#products";

const highlights = [
  { value: "6", label: "Powerful Products" },
  { value: "Smart", label: "Business Automation" },
  { value: "Integrated", label: "Business Solutions" },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  } satisfies MotionProps["variants"];

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: "easeOut" as const,
      },
    },
  } satisfies MotionProps["variants"];

  return (
    <section id="hero" className="relative isolate scroll-mt-18 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex min-h-[calc(100dvh-4.5rem)] w-full max-w-7xl flex-col items-center justify-center px-5 py-16 text-center sm:px-8"
      >
        <motion.h1
          variants={itemVariants}
          className="max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Power Your Business with
          <br />
          <span className="bg-linear-to-r from-foreground to-brand bg-clip-text text-transparent">
            Smarter Digital Solutions
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg"
        >
          From automation to business management, AOTMS brings powerful
          technology solutions together to help businesses work smarter, connect
          better and grow faster.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
        >
          <OriginButton
            href={productsHref}
            onClick={(event) => handleSectionLink(event, productsHref)}
            size="lg"
            className="w-full sm:w-auto"
          >
            Explore Our Products
            <ArrowRight className="size-4" aria-hidden="true" />
          </OriginButton>
          <OriginButton
            href={demoHref}
            onClick={(event) => handleSectionLink(event, demoHref)}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            Get a Demo
          </OriginButton>
        </motion.div>

        <motion.ul
          variants={itemVariants}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-5 text-foreground/60 sm:gap-x-0"
        >
          {highlights.map((highlight, index) => (
            <li
              key={highlight.label}
              className="flex items-center gap-6 sm:gap-8"
            >
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="hidden h-8 w-px bg-border sm:block"
                />
              ) : null}
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {highlight.value}
                </div>
                <div className="mt-1 text-xs sm:text-sm">{highlight.label}</div>
              </div>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
