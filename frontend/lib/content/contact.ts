/**
 * Contact details for the "Get a Demo" section.
 *
 * Paste the business email below. Until it is set, the enquiry form renders
 * with the submit disabled rather than silently pretending to send.
 */
export const contactEmail: string | null = null;

/** Optional rows shown under the intro, e.g. email / phone / address. */
export const contactDetails: {
  label: string;
  value: string;
  href?: string;
}[] = [];

/** What a first conversation covers — no response-time or pricing claims. */
export const contactPoints = [
  "A walkthrough of the products that fit your work.",
  "Clear answers on setup and everyday use.",
  "Next steps shaped around your team.",
];
