"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import { MenuIcon, XIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { demoHref, primaryNav } from "@/lib/content/navigation";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const navLinkClassName =
  "flex items-center rounded-lg py-3.5 text-base font-medium text-foreground/90 transition-colors hover:text-foreground";

const iconButtonClassName =
  "inline-flex size-10 items-center justify-center rounded-lg text-foreground outline-none transition-colors hover:bg-foreground/[0.06] focus-visible:ring-3 focus-visible:ring-ring/40";

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
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 lg:hidden" />
        <Dialog.Popup className="fixed inset-0 z-50 flex h-dvh flex-col overflow-y-auto bg-background text-foreground outline-none transition-[opacity,translate] duration-200 ease-out data-[ending-style]:-translate-y-3 data-[ending-style]:opacity-0 data-[starting-style]:-translate-y-3 data-[starting-style]:opacity-0 lg:hidden">
          <div className="flex h-18 shrink-0 items-center justify-between border-b border-border/80 px-5">
            <Link
              href="/"
              aria-label="AOTMS Global — Home"
              className="flex items-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
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

          <nav aria-label="Mobile" className="flex-1 px-5 py-4">
            <ul className="divide-y divide-border/60">
              {primaryNav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={navLinkClassName}
                    onClick={goToSection(item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 pb-8">
              <a
                href={demoHref}
                className={cn(buttonVariants({ size: "md" }), "w-full")}
                onClick={goToSection(demoHref)}
              >
                Get a Demo
              </a>
            </div>
          </nav>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
