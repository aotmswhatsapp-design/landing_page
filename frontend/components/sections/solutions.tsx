"use client";

import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import {
  Building2,
  GraduationCap,
  Headset,
  Megaphone,
  Store,
  Trophy,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { products } from "@/lib/content/products";
import { solutions, type SolutionId } from "@/lib/content/solutions";

const solutionIcons: Record<SolutionId, LucideIcon> = {
  education: GraduationCap,
  "small-business": Store,
  "sales-marketing": Megaphone,
  sports: Trophy,
  enterprises: Building2,
  "service-business": Headset,
};

const productMap = new Map(products.map((product) => [product.id, product]));

export function Solutions() {
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
      id="solutions"
      className="relative scroll-mt-18 border-t border-border/60 py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Solutions for every business"
          title="Technology Solutions for Every Industry"
          description="Whether you're managing an institution, growing a business or running a sports organization, AOTMS provides technology to simplify your operations."
        />

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {solutions.map((solution) => {
            const Icon = solutionIcons[solution.id];

            return (
              <motion.li
                key={solution.id}
                variants={itemVariants}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card/80 p-6 shadow-sm transition-[background-color,border-color,box-shadow] duration-300 hover:border-brand/30 hover:bg-card hover:shadow-md"
              >
                <span className="flex size-12 items-center justify-center rounded-xl border border-border bg-muted text-brand transition-colors duration-300 group-hover:border-brand/40 group-hover:bg-brand/10">
                  <Icon className="size-6" aria-hidden="true" />
                </span>

                <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
                  {solution.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {solution.description}
                </p>

                <ul
                  aria-label="Relevant AOTMS products"
                  className="mt-auto flex flex-wrap gap-1.5 pt-6"
                >
                  {solution.products.map((productId) => {
                    const product = productMap.get(productId);
                    if (!product) return null;
                    return (
                      <li key={productId}>
                        <a
                          href={product.url ?? "/#products"}
                          target={product.url ? "_blank" : undefined}
                          rel={product.url ? "noreferrer noopener" : undefined}
                          className="inline-block rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-medium leading-none text-muted-foreground transition-colors hover:border-brand/40 hover:bg-brand/10 hover:text-brand"
                        >
                          {product.shortName}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
