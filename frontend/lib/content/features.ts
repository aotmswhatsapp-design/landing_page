export type FeatureId =
  | "workflow-automation"
  | "centralized-management"
  | "real-time-insights"
  | "improved-productivity"
  | "customer-engagement"
  | "scalable-technology";

export type Feature = {
  id: FeatureId;
  title: string;
  description: string;
};

/** The six advantages shared by the AOTMS product range. */
export const features: Feature[] = [
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description:
      "Reduce repetitive tasks and simplify everyday business processes through intelligent automation.",
  },
  {
    id: "centralized-management",
    title: "Centralized Management",
    description:
      "Manage essential business activities through organized and connected software platforms.",
  },
  {
    id: "real-time-insights",
    title: "Real-Time Insights",
    description:
      "Access useful information and reports to understand business activities and performance.",
  },
  {
    id: "improved-productivity",
    title: "Improved Productivity",
    description:
      "Help teams save time, reduce manual effort and focus on important business activities.",
  },
  {
    id: "customer-engagement",
    title: "Better Customer Engagement",
    description:
      "Create smoother and more consistent customer interactions through digital communication solutions.",
  },
  {
    id: "scalable-technology",
    title: "Scalable Technology",
    description:
      "Adapt your technology solutions as your business requirements and operations evolve.",
  },
];
