import { Globe, ShieldCheck, Users, Wrench } from "lucide-react";

export const overviewData = {
  banner: {
    title: "Company Overview",
    subtitle: "A Track Record Spanning 50 Years",
    backgroundImage: "/images/faden/company-overview.webp",
  },
  intro: {
    eyebrow: "COMPANY OVERVIEW",
    lead: "An introduction to Faden Construction — dedicated to excellence in building and design.",
    paragraphs: [
      {
        parts: [
          { text: "Established in " },
          { text: "1976", highlight: true },
          { text: " and headquartered in " },
          { text: "Riyadh, Saudi Arabia", highlight: true },
          {
            text: ", FADEN has evolved into one of the region's leading construction enterprises. Over nearly five decades, the company has earned a strong reputation for delivering complex projects with exceptional quality, precision, and on-time performance.",
          },
        ],
      },
      {
        parts: [
          {
            text: "FADEN's expertise spans a wide range of services, including integrated engineering and construction works, MEP systems, water and sewage treatment plants, roads and infrastructure development. This comprehensive approach allows the company to meet diverse client needs with efficiency and innovation.",
          },
        ],
      },
      {
        parts: [
          { text: "In 2024, FADEN formed a strategic partnership with " },
          {
            text: "Global Energy for Investment and Industry",
            highlight: true,
          },
          {
            text: ", combining both companies' strengths to advance sustainable development and modernize the construction landscape across Saudi Arabia and Egypt. Together, they aim to promote innovation, energy efficiency, and long-term growth in the region's infrastructure sector.",
          },
        ],
      },
      {
        parts: [
          {
            text: "Driven by a culture of excellence and continuous improvement, FADEN remains committed to shaping the future of construction through quality, sustainability, and innovation.",
          },
        ],
      },
    ],
    quote:
      "At FADEN, we don't just construct buildings; we build ambitions, aspirations, and a legacy.",
  },
  stats: [
    {
      icon: Wrench,
      value: "48+ Years",
      description: "of engineering and construction excellence",
    },
    {
      icon: Users,
      value: "1000+ Experts",
      description: "skilled engineers and technicians",
    },
    {
      icon: Globe,
      value: "Regional Reach",
      description: "Projects across Saudi Arabia & Egypt",
    },
    {
      icon: ShieldCheck,
      value: "ISO Certified",
      description: "Quality, Safety & Environment Standards",
    },
  ],
};

// ========================================
// API ACCESSOR (falls back to the data above)
// ========================================

import { apiGet, apiGetObject } from "@/lib/api";

export async function getAboutOverview() {
  return apiGetObject("/about/overview", overviewData);
}
