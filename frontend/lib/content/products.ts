export type ProductId =
  | "lms"
  | "crm"
  | "whatsapp-automation"
  | "ai-calling"
  | "auction-platform"
  | "erp";

export type Product = {
  id: ProductId;
  name: string;
  /** Compact label for pills and chips. */
  shortName: string;
  description: string;
  highlights: string[];
  /** Product screenshot in `public/src` when available. */
  image: string | null;
  /**
   * The product's own website. Paste the URL here and the card's arrow opens
   * it in a new tab; while it is null the arrow falls back to the demo anchor.
   */
  url: string | null;
};

/** Single source of truth for the six AOTMS products. */
export const products: Product[] = [
  {
    id: "lms",
    name: "LMS",
    shortName: "LMS",
    description:
      "Simplify learning and course management with a centralized platform for students, trainers, courses and assessments.",
    highlights: [
      "Course Management",
      "Student Management",
      "Trainer Management",
      "Learning Progress Tracking",
    ],
    image: "/src/44623.jpg",
    url: "https://lms.academyoftechmasters.com/",
  },
  {
    id: "crm",
    name: "CRM",
    shortName: "CRM",
    description:
      "Manage leads, employees, customer interactions and business activities through one centralized platform.",
    highlights: [
      "Lead Management",
      "Employee Management",
      "Task Management",
      "Attendance and Performance Tracking",
    ],
    image: "/src/44621.jpg",
    url: "https://crm.aotms.com/",
  },
  {
    id: "whatsapp-automation",
    name: "WhatsApp Automation",
    shortName: "WhatsApp Automation",
    description:
      "Automate customer communication, manage conversations and streamline follow-ups using intelligent WhatsApp automation.",
    highlights: [
      "Automated Messaging",
      "WhatsApp Chatbot",
      "AI Agent",
      "Customer Follow-ups",
    ],
    image: "/src/44624.jpg",
    url: "https://whatsapp.aotms.com/",
  },
  {
    id: "ai-calling",
    name: "AI Calling",
    shortName: "AI Calling",
    description:
      "Transform business communication with AI-powered calling that handles customer conversations, lead qualification and follow-ups.",
    highlights: [
      "Inbound and Outbound Calling",
      "AI Voice Conversations",
      "Lead Qualification",
      "Call Analytics and Reports",
    ],
    image: "/src/Screenshot 2026-11-14 144659.png",
    url: "https://www.aotms.si/",
  },
  {
    id: "auction-platform",
    name: "Auction",
    shortName: "Auction",
    description:
      "Run live player auctions with team management, transparent bidding and auction handling across different sports.",
    highlights: [
      "Player Auction Management",
      "Team Management",
      "Live Bidding",
      "Multi-Sport Auctions",
    ],
    image: "/src/44622.jpg",
    url: "https://auction.aotms.com/",
  },
  {
    id: "erp",
    name: "ERP Solutions",
    shortName: "ERP",
    description:
      "Bring business processes, inventory, finance and daily operations together in one connected ERP platform.",
    highlights: [
      "Business Process Management",
      "Inventory Management",
      "Finance Management",
      "Operational Management",
    ],
    image: "/src/44625.jpg",
    url: "https://www.biriyani-box.com/",
  },
];
