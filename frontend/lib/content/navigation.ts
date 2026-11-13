export type NavItem = {
  label: string;
  href: string;
};

/**
 * Primary navigation, shared by the desktop bar and the mobile panel.
 * Every item is an in-page section, in page order.
 */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/#hero" },
  { label: "Why AOTMS", href: "/#why" },
  { label: "Products", href: "/#products" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Features & Benefits", href: "/#features" },
  { label: "Contact", href: "/#contact" },
];

/**
 * Demo call to action: the enquiry form on the right of the Contact section,
 * not the section heading on the left.
 */
export const demoHref = "/#demo-form";
