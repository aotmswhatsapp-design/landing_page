"use client";

import { motion, useReducedMotion, type MotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** `center` for the default stack, `left` for a left-aligned intro block. */
  align?: "center" | "left";
  className?: string;
};

/**
 * Shared section header: uppercase eyebrow, clamp-sized headline and a
 * supporting paragraph. Reveals itself once when it scrolls into view.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();
  const centered = align === "center";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={cn(
        "flex flex-col gap-5",
        centered
          ? "mx-auto max-w-3xl items-center text-center"
          : "max-w-2xl text-left",
        className,
      )}
    >
      <motion.span
        variants={itemVariants}
        className={cn(
          "inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground shadow-sm",
          // A column flex parent stretches its children; pin the pill to its
          // own width in the left-aligned layout.
          !centered && "self-start",
        )}
      >
        <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
        {eyebrow}
      </motion.span>

      <motion.h2
        variants={itemVariants}
        style={{
          fontSize: "clamp(1.9rem, 4vw, 2.85rem)",
          letterSpacing: "-0.035em",
        }}
        className="text-balance font-extrabold leading-[1.07] text-foreground"
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
