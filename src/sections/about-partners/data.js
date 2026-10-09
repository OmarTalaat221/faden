import { Leaf, Users, Wrench } from "lucide-react";

export const partnersData = {
  banner: {
    title: "Our Partners",
    subtitle: "Building success together with our trusted partners.",
    backgroundImage: "/images/faden/banner-partners.webp",
  },
  intro: {
    eyebrow: "OUR PARTNERS",
    subtitle: "Building success together with our strategic partners.",
    logo: "/images/faden/partner-global-energy.webp",
    logoAlt: "Global Energy for Investment & Industry",
    badge: "Strategic Partner \u2014 2024",
    title: "Global Energy for Investment & Industry",
    description:
      "In 2024, Faden entered a strategic partnership with Global Energy for Investment and Industry to revolutionize the construction sector in Saudi Arabia and Egypt. The collaboration aims to deliver engineering excellence, sustainable infrastructure, and integrated project solutions.",
    bullets: [
      "Founded in 2010 with expertise in engineering, MEP, and power projects.",
      "Executed over 85 large-scale projects with more than 1,800 professionals.",
      "Integrated engineering works, integrated construction works, electrical and mechanical engineering, light current systems, water and wastewater treatment plants, power stations, and infrastructure development.",
    ],
  },
  achievements: {
    eyebrow: "JOINT ACHIEVEMENTS",
    subtitle:
      "Building lasting achievements through strong and strategic partnerships.",
    items: [
      {
        icon: Wrench,
        title: "Infrastructure Development",
        description:
          "Collaborative projects in roads, utilities, and large-scale construction.",
      },
      {
        icon: Leaf,
        title: "Sustainability Initiatives",
        description:
          "Partnerships aligned with UN Sustainable Development Goals (SDGs).",
      },
      {
        icon: Users,
        title: "Expert Workforce",
        description:
          "A joint team of more than 2,700 professionals ensuring project excellence.",
      },
    ],
  },
  projects: {
    eyebrow: "JOINT PROJECTS",
    subtitle:
      "Projects by Faden and Global Energy, showcasing excellence in infrastructure, power, and water.",
    items: [
      {
        image: "/images/faden/partner-project-1.webp",
        title: "Marassi Blanca 85",
        meta: "Roads & Infrastructure Works",
      },
      {
        image: "/images/faden/partner-project-2.webp",
        title: "SODIC Westown Irrigation System",
        meta: "Roads & Infrastructure Works",
      },
      {
        image: "/images/faden/partner-project-3.webp",
        title: "Westown Residence Block 28 ONE 16",
        meta: "Roads & Infrastructure Works",
      },
    ],
  },
  certifications: {
    eyebrow: "GLOBAL ENERGY'S INTERNATIONAL ISO CERTIFICATIONS",
    subtitle:
      "International certifications reflecting our commitment to excellence.",
    items: [
      {
        image: "/images/faden/cert-iso-9001.webp",
        fullImage: "/images/faden/cert-iso-9001-full.webp",
        title: "ISO 9001:2015",
        description:
          "Quality Management System \u2014 Ensures consistent delivery of high-quality services that meet and exceed client expectations.",
      },
      {
        image: "/images/faden/cert-iso-45001.webp",
        fullImage: "/images/faden/cert-iso-9001-full.webp",
        title: "ISO 45001:2018",
        description:
          "Occupational Health & Safety Management System \u2014 Ensures a safe, healthy, and efficient workplace for all employees.",
      },
    ],
  },
};

import { apiGet } from "@/lib/api";

export async function getAboutPartners() {
  return apiGet("/about/partners");
}
