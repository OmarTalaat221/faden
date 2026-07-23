// ========================================
// FALLBACK DATA (until backend is ready)
// ========================================

export const SERVICES_LIST_FALLBACK = {
  items: [
    {
      id: "svc-001",
      name: "Integrated Engineering Works",
      slug: "integrated-engineering-works",
      description: "Comprehensive design and engineering services.",
      img: "/images/faden/services-section-1.webp",
      order: 1,
    },
    {
      id: "svc-002",
      name: "Integrated Construction Works",
      slug: "integrated-construction-works",
      description: "Full-scale construction and building services.",
      img: "/images/faden/services-section-2.webp",
      order: 2,
    },
    {
      id: "svc-003",
      name: "MEP Works",
      slug: "mep-works",
      description: "Mechanical, electrical, and plumbing solutions.",
      img: "/images/faden/services-section-3.webp",
      order: 3,
    },
    {
      id: "svc-004",
      name: "Sewage and Water Treatment Plants",
      slug: "sewage-and-water-treatment-plants",
      description: "Water and sewage infrastructure specialists.",
      img: "/images/faden/services-section-4.webp",
      order: 4,
    },
    {
      id: "svc-005",
      name: "Roads & Infrastructure Works",
      slug: "roads-infrastructure-works",
      description: "Roads, bridges, and infrastructure projects.",
      img: "/images/faden/services-section-5.webp",
      order: 5,
    },
  ],
};

export const SERVICES_PAGE_META = {
  banner: {
    title: "Our Services",
    subtitle: "End-to-end services with excellence and precision.",
    image: "/images/faden/our-services-banner.webp",
  },
  intro: {
    eyebrow: "Our Services",
    subtitle: "End-to-end services with excellence and precision.",
    paragraph:
      "At Faden, we deliver a comprehensive range of construction and engineering services, combining innovation, technical expertise, and sustainable practice. Our multidisciplinary teams manage every stage of the project life cycle, from design and planning to execution and final delivery, ensuring that each project meets the highest international standards of quality, safety, and environment.",
  },
  coreHeading: {
    eyebrow: "Our Core Services",
    subtitle:
      "Delivering comprehensive construction and engineering solutions with excellence.",
  },
  sectors: {
    eyebrow: "Key Sectors We Serve",
    subtitle:
      "Serving major sectors with precision and innovation, creating value beyond construction.",
    items: [
      { title: "Commercial Developments", image: "/images/faden/our-services-1.webp" },
      { title: "Residential Developments", image: "/images/faden/our-services-2.webp" },
      { title: "Infrastructure & Roads", image: "/images/faden/our-services-3.webp" },
      { title: "Water & Wastewater Treatment", image: "/images/faden/our-services-4.webp" },
      { title: "Hospitality", image: "/images/faden/our-services-5.webp" },
      { title: "Industrial Facilities", image: "/images/faden/our-services-6.webp" },
      { title: "Government Projects", image: "/images/faden/our-services-7.webp" },
      { title: "Education & Institutional Buildings", image: "/images/faden/our-services-8.webp" },
    ],
  },
  whyChoose: {
    eyebrow: "Why Choose FADEN?",
    subtitle: "Building trust through experience, innovation, and proven results.",
    items: [
      "48+ years of construction excellence.",
      "A multidisciplinary team of over 1,000 professionals.",
      "Advanced project management ensuring on-time delivery.",
      "A proven track record Saudi Arabia and Egypt.",
      "Strong commitment to safety, quality, and sustainability.",
      "Trusted by top-tier clients and government sectors.",
    ],
  },
  cta: {
    title: "Ready to Start Your Project?",
    subtitle:
      "Contact us today for a personalized consultation, and let's bring your construction vision to life.",
    backgroundImage: "/images/faden/start-project-section.webp",
  },
};

// ========================================
// FETCH HELPERS (LIST + PAGE META)
// ========================================
export async function getAllServices() {
  return SERVICES_LIST_FALLBACK;
}

export async function getServicesPageMeta() {
  return SERVICES_PAGE_META;
}

// ========================================
// SERVICE DETAIL DATA — ALL 5 SERVICES
// ========================================

// Shared "Why Choose FADEN" section (same across all services)
const WHY_CHOOSE_FADEN_SECTION = {
  id: "why-choose",
  type: "BULLETS",
  title: "Why Choose FADEN",
  subtitle: "Discover what makes us stand out in every project we deliver.",
  content: {
    items: [
      "Trusted & Experienced Engineering Experts.",
      "Innovative & Reliable Solutions.",
      "Client-Centered Approach.",
      "Timely & Efficient Project Delivery.",
      "Comprehensive Quality Assurance.",
      "Commitment to Sustainability.",
    ],
  },
  order: 5,
};

export const SERVICES_FALLBACK = {
  // ============================================
  // 1. INTEGRATED ENGINEERING WORKS
  // ============================================
  "integrated-engineering-works": {
    id: "svc-001",
    name: "Integrated Engineering Works",
    slug: "integrated-engineering-works",
    description: "Smart, unified engineering solutions that bring every idea to life.",
    bannerImage: "/images/faden/services-section-1.webp",
    bannerSubtitle: "Smart, unified engineering solutions that bring every idea to life.",
    ctaTitle: "Looking for expert Integrated Engineering solutions?",
    ctaSubtitle: "Smart, integrated engineering solutions to bring your vision to life.",
    ctaBackgroundImage: "/images/faden/start-project-section.webp",
    sections: [
      {
        id: "eng-s1",
        type: "OVERVIEW",
        title: "Overview",
        subtitle: "A brief insight into this service, its scope, and the value it delivers.",
        content: {
          paragraphs: [
            "Our Integrated Engineering Division provides comprehensive design and engineering services for projects of all scales. We handle every stage — from feasibility studies to detailed design — ensuring that every project we deliver meets international standards of quality, safety, and efficiency.",
          ],
        },
        img: "/images/faden/service-details-1.webp",
        order: 1,
      },
      {
        id: "eng-s2",
        type: "BULLETS",
        title: "Scope of Work",
        subtitle: "Detailed insights into our process and deliverables.",
        content: {
          items: [
            "Feasibility and concept design.",
            "Structural and civil design development.",
            "Mechanical and electrical coordination.",
            "Value engineering and design optimization.",
            "Shop drawings and technical documentation.",
          ],
        },
        order: 2,
      },
      {
        id: "eng-s3",
        type: "PROCESS",
        title: "Our Process",
        subtitle:
          "Our process turns ideas into solutions, from consultation and planning to execution and delivery.",
        content: {
          steps: ["Feasibility", "Concept Design", "Engineering", "Coordination", "Approval"],
        },
        order: 3,
      },
      WHY_CHOOSE_FADEN_SECTION,
    ],
    projects: [
      { id: "eng-p1", title: "American International School", subtitle: "Integrated Engineering Works", img: "/images/faden/services-section-3.webp" },
      { id: "eng-p2", title: "Al Muhaiza Residential Palace", subtitle: "Integrated Engineering Works", img: "/images/faden/services-section-4.webp" },
      { id: "eng-p3", title: "Park Inn Hotel - By Radisson", subtitle: "Integrated Engineering Works", img: "/images/faden/services-section-5.webp" },
      { id: "eng-p4", title: "Corporate Tower Riyadh", subtitle: "Integrated Engineering Works", img: "/images/faden/services-section-1.webp" },
    ],
  },

  // ============================================
  // 2. INTEGRATED CONSTRUCTION WORKS
  // ============================================
  "integrated-construction-works": {
    id: "svc-002",
    name: "Integrated Construction Works",
    slug: "integrated-construction-works",
    description: "Smart, integrated construction solutions turning ideas into reality.",
    bannerImage: "/images/faden/services-section-2.webp",
    bannerSubtitle: "Smart, integrated construction solutions turning ideas into reality.",
    ctaTitle: "Looking for reliable expert Integrated Construction solutions?",
    ctaSubtitle: "Smart, integrated construction solutions turning your projects into reality.",
    ctaBackgroundImage: "/images/faden/start-project-section.webp",
    sections: [
      {
        id: "con-s1",
        type: "OVERVIEW",
        title: "Overview",
        subtitle: "A brief insight into this service, its scope, and the value it delivers.",
        content: {
          paragraphs: [
            "Our Integrated Construction Division provides complete construction management and execution services for projects of all sizes. We oversee every stage — from initial planning and feasibility to final delivery — ensuring that every project we complete adheres to international standards of quality, safety, and efficiency.",
          ],
        },
        img: "/images/faden/service-details-2.webp",
        order: 1,
      },
      {
        id: "con-s2",
        type: "BULLETS",
        title: "Scope of Work",
        subtitle: "Detailed insights into our process and deliverables.",
        content: {
          items: [
            "Comprehensive Site Assessment & Planning.",
            "Detailed Structural Design & Implementation.",
            "Effective Project Scheduling & Management.",
            "Optimized Resource Allocation & Coordination.",
            "Strict Quality Control & Timely Final Delivery.",
          ],
        },
        order: 2,
      },
      {
        id: "con-s3",
        type: "PROCESS",
        title: "Our Process",
        subtitle:
          "Our process turns ideas into solutions, from consultation and planning to execution and delivery.",
        content: {
          steps: ["Planning", "Execution", "Finishing", "Inspection", "Handover"],
        },
        order: 3,
      },
      WHY_CHOOSE_FADEN_SECTION,
    ],
    projects: [
      { id: "con-p1", title: "Royal Palace (Um Alhamam)", subtitle: "Integrated Construction Works", img: "/images/faden/services-section-4.webp" },
      { id: "con-p2", title: "Salboukh Air Operation Building", subtitle: "Integrated Construction Works", img: "/images/faden/services-section-5.webp" },
      { id: "con-p3", title: "King Faisal VIP Terminal", subtitle: "Integrated Construction Works", img: "/images/faden/services-section-1.webp" },
    ],
  },

  // ============================================
  // 3. MEP WORKS
  // ============================================
  "mep-works": {
    id: "svc-003",
    name: "MEP Works",
    slug: "mep-works",
    description: "Building performance through advanced MEP systems.",
    bannerImage: "/images/faden/services-section-3.webp",
    bannerSubtitle: "Building performance through advanced MEP systems.",
    ctaTitle: "Looking for expert MEP solutions?",
    ctaSubtitle: "Smart, efficient, and innovative MEP solutions — built for your success.",
    ctaBackgroundImage: "/images/faden/start-project-section.webp",
    sections: [
      {
        id: "mep-s1",
        type: "OVERVIEW",
        title: "Overview",
        subtitle: "A brief insight into this service, its scope, and the value it delivers.",
        content: {
          paragraphs: [
            "Our MEP Works division provides full-scale design, installation, and maintenance for all mechanical, electrical, and plumbing MEP systems. We focus on integrating sustainable engineering solutions that enhance performance, improve reliability, and enhance overall energy efficiency.",
          ],
        },
        img: "/images/faden/service-details-3.webp",
        order: 1,
      },
      {
        id: "mep-s2",
        type: "BULLETS",
        title: "Scope of Work",
        subtitle: "Detailed insights into our process and deliverables.",
        content: {
          items: [
            "HVAC System Design & Installation.",
            "Firefighting & Fire Alarm Systems.",
            "Electrical (Power distribution, lighting systems, and emergency power systems).",
            "Plumbing (Water supply, Drainage and sanitary systems).",
            "Testing, Commissioning & Maintenance.",
          ],
        },
        order: 2,
      },
      {
        id: "mep-s3",
        type: "PROCESS",
        title: "Our Process",
        subtitle:
          "Our process turns ideas into solutions, from consultation and planning to execution and delivery.",
        content: {
          steps: ["Design", "Planning", "Procurement", "Installation", "Testing", "Commissioning"],
        },
        order: 3,
      },
      WHY_CHOOSE_FADEN_SECTION,
    ],
    projects: [
      { id: "mep-p1", title: "ARGO Egypt", subtitle: "MEP Works", img: "/images/faden/services-section-5.webp" },
      { id: "mep-p2", title: "Scientific Research & Tech City", subtitle: "MEP Works", img: "/images/faden/services-section-1.webp" },
      { id: "mep-p3", title: "Cairo West Supercritical Power Plant", subtitle: "MEP Works", img: "/images/faden/services-section-2.webp" },
    ],
  },

  // ============================================
  // 4. SEWAGE AND WATER TREATMENT PLANTS
  // ============================================
  "sewage-and-water-treatment-plants": {
    id: "svc-004",
    name: "Sewage & Water Systems",
    slug: "sewage-and-water-treatment-plants",
    description: "Smart and sustainable solutions for clean water and efficient wastewater management.",
    bannerImage: "/images/faden/services-section-4.webp",
    bannerSubtitle: "Smart and sustainable solutions for clean water and efficient wastewater management.",
    ctaTitle: "Looking for reliable expert Sewage and Water Treatment solutions?",
    ctaSubtitle: "Smart and reliable solutions for clean water and efficient wastewater management.",
    ctaBackgroundImage: "/images/faden/start-project-section.webp",
    sections: [
      {
        id: "sew-s1",
        type: "OVERVIEW",
        title: "Overview",
        subtitle: "A brief insight into this service, its scope, and the value it delivers.",
        content: {
          paragraphs: [
            "Our Sewage and Water Treatment Division provides comprehensive solutions for the design, construction, and management of Water supply & water treatment plants. We manage every stage of the project lifecycle, from feasibility studies to final commissioning, ensuring sustainable, safe, and efficient water and water sanitation management solutions tailored to each project's requirements.",
          ],
        },
        img: "/images/faden/service-details-4.webp",
        order: 1,
      },
      {
        id: "sew-s2",
        type: "BULLETS",
        title: "Scope of Work",
        subtitle: "Detailed insights into our process and deliverables.",
        content: {
          items: [
            "Site and process feasibility.",
            "Mechanical, civil, and electrical design.",
            "On-site construction and equipment.",
            "System testing and verification.",
            "Monitoring and maintenance.",
          ],
        },
        order: 2,
      },
      {
        id: "sew-s3",
        type: "PROCESS",
        title: "Our Process",
        subtitle:
          "Our process turns ideas into solutions, from consultation and planning to execution and delivery.",
        content: {
          steps: ["Assessment", "Design", "Construction/Installation", "Testing", "Operation & Maintenance"],
        },
        order: 3,
      },
      WHY_CHOOSE_FADEN_SECTION,
    ],
    projects: [
      { id: "sew-p1", title: "Al-Alamein SWRO plant", subtitle: "Sewage and Water Treatment Plants", img: "/images/faden/services-section-1.webp" },
      { id: "sew-p2", title: "El-Husseiniya & Saoud WTPs", subtitle: "Sewage and Water Treatment Plants", img: "/images/faden/services-section-2.webp" },
      { id: "sew-p3", title: "Abo Jalal WTP", subtitle: "Sewage and Water Treatment Plants", img: "/images/faden/services-section-3.webp" },
    ],
  },

  // ============================================
  // 5. ROADS & INFRASTRUCTURE WORKS
  // ============================================
  "roads-infrastructure-works": {
    id: "svc-005",
    name: "Roads & Infrastructure Works",
    slug: "roads-infrastructure-works",
    description: "Seamless road and infrastructure works designed for performance and durability.",
    bannerImage: "/images/faden/services-section-5.webp",
    bannerSubtitle: "Seamless road and infrastructure works designed for performance and durability.",
    ctaTitle: "Looking for reliable expert Roads & Infrastructure solutions?",
    ctaSubtitle: "Smart, reliable infrastructure solutions turning projects into lasting results.",
    ctaBackgroundImage: "/images/faden/start-project-section.webp",
    sections: [
      {
        id: "road-s1",
        type: "OVERVIEW",
        title: "Overview",
        subtitle: "A brief insight into this service, its scope, and the value it delivers.",
        content: {
          paragraphs: [
            "Our Roads & Infrastructure Division delivers comprehensive civil engineering solutions, specializing in the design, construction, and maintenance of transportation networks and urban infrastructure. Our team manages every phase of project lifecycle from initial planning and design to final delivery, ensuring projects meet international standards of quality, safety, and efficiency.",
          ],
        },
        img: "/images/faden/service-details-5.webp",
        order: 1,
      },
      {
        id: "road-s2",
        type: "BULLETS",
        title: "Scope of Work",
        subtitle: "Detailed insights into our process and deliverables.",
        content: {
          items: [
            "Site & route planning.",
            "Road, bridge & utility design.",
            "On-site construction & development.",
            "System testing & verification.",
            "Monitoring & upgrades.",
          ],
        },
        order: 2,
      },
      {
        id: "road-s3",
        type: "PROCESS",
        title: "Our Process",
        subtitle:
          "Our process turns ideas into solutions, from consultation and planning to execution and delivery.",
        content: {
          steps: ["Surveying", "Design", "Excavation", "Paving", "Maintenance"],
        },
        order: 3,
      },
      WHY_CHOOSE_FADEN_SECTION,
    ],
    projects: [
      { id: "road-p1", title: "Marassi Blanca 85", subtitle: "Roads & Infrastructure Works", img: "/images/faden/services-section-2.webp" },
      { id: "road-p2", title: "SODIC Westown Irrigation System", subtitle: "Roads & Infrastructure Works", img: "/images/faden/services-section-3.webp" },
      { id: "road-p3", title: "Westown Residence Block 26 ONE 16", subtitle: "Roads & Infrastructure Works", img: "/images/faden/services-section-4.webp" },
    ],
  },
};

export async function getServiceBySlug(slug) {
  return SERVICES_FALLBACK[slug] || null;
}

export async function getAllServiceSlugs() {
  return Object.keys(SERVICES_FALLBACK);
}