import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Gavel,
  GraduationCap,
  MessageCircle,
  PhoneCall,
  Users,
} from "lucide-react";

import type { ProductId } from "@/lib/content/products";

const productIcons: Record<ProductId, LucideIcon> = {
  lms: GraduationCap,
  crm: Users,
  "whatsapp-automation": MessageCircle,
  "ai-calling": PhoneCall,
  "auction-platform": Gavel,
  erp: Boxes,
};

export function ProductIcon({
  id,
  className,
}: {
  id: ProductId;
  className?: string;
}) {
  const Icon = productIcons[id];

  return <Icon aria-hidden="true" strokeWidth={1.75} className={className} />;
}
