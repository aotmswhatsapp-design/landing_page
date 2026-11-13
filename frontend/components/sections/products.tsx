"use client";

import { motion, useReducedMotion, type MotionProps } from "framer-motion";

import { ProductIcon } from "@/components/layout/product-icon";
import { NotchedProjectCard } from "@/components/ui/notched-project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { products } from "@/lib/content/products";

/** Where a card leads until the product's own site is added. */
const fallbackHref = "/#contact";

export function Products() {
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
    <section id="products" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our Products"
          title="Powerful Products. Smarter Possibilities."
          description="Explore our range of technology solutions designed to simplify operations, automate workflows and empower business growth."
        />

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {products.map((product, index) => (
            <motion.li
              key={product.id}
              variants={itemVariants}
              className="h-full"
            >
              <NotchedProjectCard
                href={product.url ?? fallbackHref}
                title={product.name}
                description={product.description}
                icon={<ProductIcon id={product.id} className="size-7" />}
                badge={String(index + 1).padStart(2, "0")}
                tags={product.highlights}
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
