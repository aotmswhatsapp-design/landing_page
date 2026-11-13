"use client";

import {
  useState,
  type ComponentProps,
  type FormEvent,
} from "react";
import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import { Check, ChevronDown, CircleCheck } from "lucide-react";

import { OriginButton } from "@/components/ui/origin-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactDetails, contactEmail, contactPoints } from "@/lib/content/contact";
import { products } from "@/lib/content/products";
import { cn } from "@/lib/utils";

const interestOptions = [
  ...products.map((product) => ({ value: product.id, label: product.shortName })),
  { value: "not-sure", label: "Not sure yet" },
];

const fieldClassName =
  "h-11 w-full rounded-lg border border-foreground/15 bg-white/60 px-3.5 text-sm text-foreground outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-muted-foreground/70 hover:border-foreground/25 focus:border-brand/60 focus:bg-white focus:ring-2 focus:ring-brand/25";

const labelClassName = "mb-2 block text-xs font-medium text-foreground/70";

function Field({
  id,
  label,
  wrapperClassName,
  ...props
}: ComponentProps<"input"> & { id: string; label: string; wrapperClassName?: string }) {
  return (
    <div className={wrapperClassName}>
      <label className={labelClassName} htmlFor={id}>
        {label}
      </label>
      <input id={id} name={id} className={fieldClassName} {...props} />
    </div>
  );
}

export function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [sent, setSent] = useState(false);
  const configured = contactEmail !== null;

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contactEmail) return;

    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const interest = interestOptions.find((option) => option.value === value("interest"));

    const lines = [
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      ...(value("company") ? [`Company: ${value("company")}`] : []),
      ...(value("phone") ? [`Phone: ${value("phone")}`] : []),
      `Interested in: ${interest?.label ?? "Not sure yet"}`,
      "",
      value("message"),
    ];

    const subject = `Product enquiry — ${value("name") || "AOTMS website"}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <SectionHeading
              align="left"
              eyebrow="Contact"
              title="Let's Talk About Your Business"
              description="Tell us what you'd like to simplify and we'll show you the AOTMS products that fit."
            />

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={itemVariants}
              className="mt-8 space-y-3"
            >
              {contactPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm leading-relaxed text-foreground/75"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-brand/35 bg-brand/10 text-brand">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </motion.ul>

            {contactDetails.length > 0 ? (
              <ul className="mt-8 space-y-3 border-t border-border/70 pt-6">
                {contactDetails.map((detail) => (
                  <li key={detail.label} className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      {detail.label}
                    </span>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="text-sm text-foreground underline-offset-4 hover:underline"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <span className="text-sm text-foreground">{detail.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={itemVariants}
            className="md:col-span-5 md:col-start-8"
          >
            <div
              id="demo-form"
              className="scroll-mt-28 rounded-2xl border border-border/70 bg-card p-6 sm:p-8"
            >
              {sent ? (
                <div className="flex flex-col items-start gap-3">
                  <span className="flex size-11 items-center justify-center rounded-full border border-brand/35 bg-brand/10 text-brand">
                    <CircleCheck className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    Your enquiry is ready
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Your email app should have opened with the details filled in. Send it from
                    there and we&rsquo;ll take it forward.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="text-sm font-medium text-brand underline-offset-4 hover:underline"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    Request a Demo
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Share a few details and we&rsquo;ll get back to you.
                  </p>

                  <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field id="name" label="Full name" autoComplete="name" required />
                      <Field
                        id="email"
                        label="Work email"
                        type="email"
                        autoComplete="email"
                        required
                      />
                      <Field id="company" label="Company" autoComplete="organization" />
                      <Field id="phone" label="Phone" type="tel" autoComplete="tel" />
                    </div>

                    <div>
                      <label className={labelClassName} htmlFor="interest">
                        Interested in
                      </label>
                      <div className="relative">
                        <select
                          id="interest"
                          name="interest"
                          defaultValue="not-sure"
                          className={cn(fieldClassName, "appearance-none pr-10")}
                        >
                          {interestOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          aria-hidden="true"
                          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClassName} htmlFor="message">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className={cn(fieldClassName, "h-auto min-h-28 resize-y py-3")}
                      />
                    </div>

                    <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
                      <input
                        type="checkbox"
                        name="consent"
                        required
                        className="mt-0.5 size-4 shrink-0 rounded border-foreground/25 bg-white accent-brand"
                      />
                      <span>I agree to be contacted about my enquiry.</span>
                    </label>

                    <OriginButton
                      type="submit"
                      size="lg"
                      disabled={!configured}
                      className="w-full"
                    >
                      Request a Demo
                    </OriginButton>

                    {!configured ? (
                      <p className="text-xs leading-relaxed text-muted-foreground/70">
                        Form delivery isn&rsquo;t connected yet — set the business email in{" "}
                        <code className="rounded bg-foreground/[0.06] px-1 py-0.5 text-[11px] text-foreground/80">
                          lib/content/contact.ts
                        </code>{" "}
                        to enable sending.
                      </p>
                    ) : null}
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
