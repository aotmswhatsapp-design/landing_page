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
        "flex flex-col gap-4",
        centered
          ? "mx-auto max-w-3xl items-center text-center"
          : "max-w-2xl text-left",
        className,
      )}
    >
      <motion.span
        variants={itemVariants}
        className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
      >
        {eyebrow}
      </motion.span>

      <motion.h2
        variants={itemVariants}
        style={{
          fontSize: "clamp(1.85rem, 4vw, 2.75rem)",
          letterSpacing: "-0.03em",
        }}
        className="text-balance font-semibold leading-[1.1] text-foreground"
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-base leading-relaxed text-foreground/70"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
