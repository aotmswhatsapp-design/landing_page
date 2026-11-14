import type {
  FooterColumn,
  FooterCredit,
  FooterSocial,
} from "@/components/ui/beam-wordmark-footer";
import { products } from "@/lib/content/products";

/** Bumped by hand so the prerendered route stays deterministic. */
export const footerYear = 2026;

export const footerCompany = "AOTMS Global Pvt. Ltd.";

/**
 * Social profiles. Add real URLs here — an entry without an account behind it
 * would be a dead button, so the list stays empty until the profiles exist.
 */
export const footerSocials: FooterSocial[] = [];

export const footerColumns: FooterColumn[] = [
  {
    title: "Products",
    links: products.map((product) => ({
      label: product.shortName,
      // Product sites are not live yet, so the links fall back to the cards.
      href: product.url ?? "/#products",
    })),
  },
  {
    title: "Explore",
    links: [
      { label: "Why AOTMS", href: "/#why" },
      { label: "Solutions", href: "/#solutions" },
      { label: "Features & Benefits", href: "/#features" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

export const footerCredits: FooterCredit[] = [
  { lead: "Email: ", label: "ameen@aotms.in", href: "mailto:ameen@aotms.in" },
  { lead: "Phone: ", label: "8019952233", href: "tel:8019952233" },
  { lead: "Want a walkthrough? ", label: "Request a demo", href: "/#demo-form" },
];
