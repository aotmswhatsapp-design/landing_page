import { BeamWordmarkFooter } from "@/components/ui/beam-wordmark-footer";
import {
  footerColumns,
  footerCompany,
  footerCredits,
  footerSocials,
  footerYear,
} from "@/lib/content/footer";

/**
 * Section 8. Opaque closing surface: the beam footer paints its own backdrop so
 * the site-wide shader stops at the hairline rule on its top edge.
 */
export function Footer() {
  return (
    <BeamWordmarkFooter
      brand="AOTMS Global"
      columns={footerColumns}
      company={footerCompany}
      credits={footerCredits}
      socials={footerSocials}
      wordmark="AOTMS"
      year={footerYear}
    />
  );
}
