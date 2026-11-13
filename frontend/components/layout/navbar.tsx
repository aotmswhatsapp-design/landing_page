"use client";

import Image from "next/image";
import Link from "next/link";

import { MobileNav } from "@/components/layout/mobile-nav";
import { OriginButton } from "@/components/ui/origin-button";
import { demoHref, primaryNav } from "@/lib/content/navigation";
import { handleSectionLink } from "@/lib/scroll";

const navLinkClassName =
  "inline-flex h-9 items-center whitespace-nowrap rounded-md px-4 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40";

const logoClassName =
  "flex shrink-0 items-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/40";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" aria-label="AOTMS Global — Home" className={logoClassName}>
          <Image
            src="/brand/logo.png"
            alt="AOTMS Global Pvt. Ltd."
            width={738}
            height={195}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={navLinkClassName}
                  onClick={(event) => handleSectionLink(event, item.href)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <OriginButton
            className="hidden rounded-lg sm:inline-flex"
            href={demoHref}
            onClick={(event) => handleSectionLink(event, demoHref)}
            size="sm"
          >
            Get a Demo
          </OriginButton>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
