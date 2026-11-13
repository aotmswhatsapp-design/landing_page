import type { ProductId } from "@/lib/content/products";

export type SolutionId =
  | "education"
  | "small-business"
  | "sales-marketing"
  | "sports"
  | "enterprises"
  | "service-business";

export type Solution = {
  id: SolutionId;
  title: string;
  description: string;
  /** AOTMS products that address this industry, in display order. */
  products: ProductId[];
};

/** The six industries this section speaks to. */
export const solutions: Solution[] = [
  {
    id: "education",
    title: "Education & Training",
    description:
      "Manage students, courses, learning activities and institutional operations through digital solutions.",
    products: ["lms", "crm", "ai-calling", "whatsapp-automation"],
  },
  {
    id: "small-business",
    title: "Small & Medium Businesses",
    description:
      "Simplify business processes, manage customers and streamline everyday business operations.",
    products: ["crm", "erp", "whatsapp-automation", "ai-calling"],
  },
  {
    id: "sales-marketing",
    title: "Sales & Marketing Teams",
    description:
      "Automate customer communication, manage leads, improve follow-ups and organize sales workflows.",
    products: ["crm", "ai-calling", "whatsapp-automation"],
  },
  {
    id: "sports",
    title: "Sports Organizations",
    description:
      "Manage player auctions, teams, bidding activities and sports auction operations.",
    products: ["auction-platform"],
  },
  {
    id: "enterprises",
    title: "Enterprises",
    description:
      "Connect essential business processes, organize resources and improve operational efficiency.",
    products: ["crm", "erp", "whatsapp-automation"],
  },
  {
    id: "service-business",
    title: "Service-Based Businesses",
    description:
      "Organize customer interactions, manage enquiries and simplify service operations.",
    products: ["crm", "ai-calling", "whatsapp-automation", "erp"],
  },
];
