import { Compass, Rocket, Workflow, Sparkles, TrendingUp, HeartHandshake } from "lucide-react";
import type { ProductCardProps } from "./ProductCard";

export const products: ProductCardProps[] = [
  {
    name: "Compass™",
    tagline: "Find Your Direction",
    description:
      "A premium business discovery and strategy experience. Understand where you are, uncover opportunities, and leave with a clear roadmap.",
    to: "/compass",
    icon: Compass,
    accent: "electric",
  },
  {
    name: "Launch™",
    tagline: "Build With Confidence",
    description:
      "Modern, conversion-focused websites and redesigns built on a strong digital foundation.",
    to: "/solutions/launch",
    icon: Rocket,
    accent: "electric",
  },
  {
    name: "Flow™",
    tagline: "Work Smarter",
    description:
      "Automation that removes repetitive work so your team can focus on the work that matters.",
    to: "/solutions/flow",
    icon: Workflow,
    accent: "growth",
  },
  {
    name: "Accelerate™",
    tagline: "Unlock Your Potential",
    description:
      "Practical AI adoption and team enablement: real use cases, adopted well, measured properly.",
    to: "/solutions/accelerate",
    icon: Sparkles,
    accent: "electric",
  },
  {
    name: "Growth™",
    tagline: "Be Found. Be Chosen.",
    description:
      "SEO, Google Business Profile, content and conversion improvements that turn visibility into pipeline.",
    to: "/solutions/growth",
    icon: TrendingUp,
    accent: "growth",
  },
  {
    name: "Partner™",
    tagline: "Grow Without Limits",
    description:
      "Ongoing support and strategic partnership for continuous improvement and long-term growth.",
    to: "/solutions/partner",
    icon: HeartHandshake,
    accent: "navy",
  },
];