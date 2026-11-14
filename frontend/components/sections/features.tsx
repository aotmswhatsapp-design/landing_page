"use client";

import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import {
  ChartNoAxesCombined,
  Expand,
  LayoutDashboard,
  MessageCircle,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { features, type FeatureId } from "@/lib/content/features";

const featureIcons: Record<FeatureId, LucideIcon> = {
  "workflow-automation": Workflow,
  "centralized-management": LayoutDashboard,
  "real-time-insights": ChartNoAxesCombined,
  "improved-productivity": Zap,
  "customer-engagement": MessageCircle,
  "scalable-technology": Expand,
};

export function Features() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
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
      id="features"
      className="relative scroll-mt-18 border-t border-border/60 py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Features & Benefits"
          title="Everything Your Business Needs to Work Smarter"
          description="Powerful capabilities designed to simplify workflows, improve productivity and create better business experiences."
        />

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {features.map((feature) => {
            const Icon = featureIcons[feature.id];

            return (
              <motion.li
                key={feature.id}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/80 p-6 shadow-sm transition-[background-color,border-color,box-shadow] duration-300 hover:border-brand/30 hover:bg-card hover:shadow-md sm:p-7"
              >
                {/* hairline that washes in on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-6 top-0 h-px origin-center scale-x-0 bg-linear-to-r from-transparent via-brand/60 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />

                <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-muted text-brand transition-colors duration-300 group-hover:border-brand/40 group-hover:bg-brand/10">
                  <Icon className="size-5" aria-hidden="true" />
                </span>

                <h3 className="mt-6 text-base font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
