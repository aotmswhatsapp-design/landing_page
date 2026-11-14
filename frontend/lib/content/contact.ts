/**
 * Contact details for the "Get a Demo" section.
 */
export const contactEmail: string | null = "ameen@aotms.in";

/** Contact rows shown under the intro in the Contact section. */
export const contactDetails: {
  label: string;
  value: string;
  href?: string;
}[] = [
  {
    label: "Email",
    value: "ameen@aotms.in",
    href: "mailto:ameen@aotms.in",
  },
  {
    label: "Phone",
    value: "8019952233",
    href: "tel:8019952233",
  },
];

/** What a first conversation covers — no response-time or pricing claims. */
export const contactPoints = [
  "A walkthrough of the products that fit your work.",
  "Clear answers on setup and everyday use.",
  "Next steps shaped around your team.",
];
