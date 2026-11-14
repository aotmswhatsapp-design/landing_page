"use client";

import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import {
  Brain,
  Network,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";

type Highlight = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const highlights: Highlight[] = [
  {
    title: "Smart Technology",
    description:
      "Modern technology designed to solve real business challenges and improve everyday operations.",
    icon: Brain,
  },
  {
    title: "Intelligent Automation",
    description:
      "Reduce repetitive manual work and simplify everyday workflows with intelligent automation.",
    icon: Workflow,
  },
  {
    title: "Connected Solutions",
    description:
      "Bring essential business processes together through practical and connected software solutions.",
    icon: Network,
  },
  {
    title: "Built for Growth",
    description:
      "Flexible and scalable solutions that adapt to changing business requirements.",
    icon: TrendingUp,
  },
];

export function WhyAotms() {
  const shouldReduceMotion = useReducedMotion();

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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
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
    <section
      id="why"
      className="relative scroll-mt-18 border-t border-border/60 py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why AOTMS"
          title="Technology That Moves Your Business Forward"
          description="We combine intelligent technology, automation and practical business solutions to simplify the way businesses operate."
        />

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;

            return (
              <motion.li
                key={highlight.title}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                className="group relative flex h-full flex-col rounded-2xl border border-border bg-card/80 p-6 shadow-sm transition-[background-color,border-color,box-shadow] duration-300 hover:border-brand/30 hover:bg-card hover:shadow-md sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-muted text-brand transition-colors duration-300 group-hover:border-brand/40 group-hover:bg-brand/10">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[11px] font-medium tabular-nums tracking-[0.14em] text-muted-foreground/60 transition-colors duration-300 group-hover:text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 text-base font-semibold tracking-tight text-foreground">
                  {highlight.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {highlight.description}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
