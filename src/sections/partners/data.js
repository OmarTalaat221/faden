import { Leaf, Users, Wrench } from "lucide-react";

export const partnersData = {
  banner: {
    title: "Partners",
    subtitle: "Building success together with our trusted partners.",
    backgroundImage: "/images/faden/banner-partners.webp",
  },
  intro: {
    eyebrow: "PARTNERS",
    subtitle: "Building success together with our strategic partners.",
    logo: "/images/faden/partner-global-energy.webp",
    logoAlt: "Global Energy SAE",
    badge: "Strategic Partner \u2014 2024",
    title: "Global Energy SAE",
    description:
      "In 2024, Faden entered a strategic partnership with Global Energy SAE to revolutionize the construction sector in Saudi Arabia. The collaboration aims to deliver engineering excellence, sustainable infrastructure, and integrated project solutions.",
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
      "Projects by Faden and Global Energy SAE, showcasing excellence in infrastructure, power, and water.",
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
    eyebrow: "GLOBAL ENERGY SAE'S INTERNATIONAL ISO CERTIFICATIONS",
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

// What the site shows until something is uploaded on the Partners page.
//
// The photo: a landmark build rather than one of the three partner snapshots,
// because the band has one picture and it carries the whole section.
//
// The logo: the partner's wide lockup. The one saved against the partner is a
// square badge whose wordmark cannot be read at logo size, so the Partners
// page asks for a wide, trimmed one and this stands in until there is one.
const DEMO_PARTNER_IMAGE = "/images/faden/projects-section-1.webp";
const DEMO_PARTNER_LOGO = "/images/faden/partner-global-energy.webp";

/**
 * The partner record, used by /partners and by the Partners band on the
 * homepage, so the photo is resolved once here rather than in each section.
 */
export async function getPartners() {
  const data = await apiGet("/about/partners");

  return {
    ...data,
    intro: {
      ...data.intro,
      logo: data.intro.logo || DEMO_PARTNER_LOGO,
      image: data.intro.image || DEMO_PARTNER_IMAGE,
      imageAlt: data.intro.imageAlt || data.intro.title,
    },
  };
}
