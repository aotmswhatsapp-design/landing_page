"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowRight, MenuIcon, Sparkles, XIcon } from "lucide-react";

import { ProductIcon } from "@/components/layout/product-icon";
import { buttonVariants } from "@/components/ui/button";
import { demoHref, primaryNav } from "@/lib/content/navigation";
import { products } from "@/lib/content/products";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const navLinkClassName =
  "group flex items-center justify-between rounded-xl px-3.5 py-3 text-base font-semibold text-slate-800 transition-all hover:bg-blue-50/80 hover:text-[#0066FF]";

const iconButtonClassName =
  "inline-flex size-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/90 text-slate-900 shadow-xs outline-none transition-colors hover:border-blue-500/30 hover:bg-blue-50/60 focus-visible:ring-3 focus-visible:ring-ring/40";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  // Close the panel if the viewport grows into the desktop breakpoint.
  useEffect(() => {
    if (!open) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };

    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [open]);

  // Close the panel first, then scroll the page behind it.
  const goToSection = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    window.setTimeout(() => scrollToSection(href), 250);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className={cn(iconButtonClassName, "lg:hidden")}
      >
        <MenuIcon className="size-5" aria-hidden="true" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 lg:hidden" />
        <Dialog.Popup className="fixed inset-0 z-50 flex h-dvh flex-col overflow-y-auto bg-white/95 text-slate-900 backdrop-blur-2xl outline-none transition-[opacity,translate] duration-200 ease-out data-[ending-style]:-translate-y-3 data-[ending-style]:opacity-0 data-[starting-style]:-translate-y-3 data-[starting-style]:opacity-0 lg:hidden">
          <div
            aria-hidden="true"
            className="h-1 w-full bg-gradient-to-r from-[#0052D4] via-[#38BDF8] to-[#FF5A1F]"
          />

          <div className="flex h-18 shrink-0 items-center justify-between border-b border-slate-200/80 px-5">
            <Link
              href="/"
              aria-label="AOTMS Global — Home"
              className="flex items-center rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
              onClick={() => setOpen(false)}
            >
              <Image
                src="/brand/logo.png"
                alt="AOTMS Global Pvt. Ltd."
                width={738}
                height={195}
                className="h-9 w-auto"
              />
            </Link>

            <Dialog.Close aria-label="Close menu" className={iconButtonClassName}>
              <XIcon className="size-5" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <Dialog.Title className="sr-only">Main menu</Dialog.Title>

          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-between px-5 py-5">
            <div className="space-y-6">
              <ul className="space-y-1">
                {primaryNav.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={navLinkClassName}
                      onClick={goToSection(item.href)}
                    >
                      <span>{item.label}</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#0066FF]"
                      />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Product Suite (6)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href="/#products"
                      onClick={goToSection("/#products")}
                      className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white p-2.5 text-xs font-semibold text-slate-800 shadow-2xs transition-colors hover:border-blue-500/40 hover:text-[#0066FF]"
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-[#0066FF]">
                        <ProductIcon id={product.id} className="size-3.5" />
                      </span>
                      <span className="truncate">{product.shortName}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pb-6 pt-4">
              <a
                href={demoHref}
                className={cn(buttonVariants({ size: "lg" }), "w-full")}
                onClick={goToSection(demoHref)}
              >
                <Sparkles className="size-4" aria-hidden="true" />
                Get a Demo
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
