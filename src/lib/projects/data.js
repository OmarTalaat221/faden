import { apiGet } from "@/lib/api";

// Mock data matching API response structure (ready for backend integration)

export const PROJECTS_PAGE_META = {
  title: "Our Projects",
  subtitle: "A portfolio of successful projects across diverse sectors.",
  bannerImage: "/images/faden/projects-banner.webp",
};

// Service categories
const SERVICES = {
  engineering: {
    id: "fed36a99-7848-42fa-87b2-666be37ce2a3",
    name: "Integrated Engineering Works",
    slug: "integrated-engineering-works",
  },
  construction: {
    id: "89d4afb2-e665-4327-a2af-9afd7232a91c",
    name: "Integrated Construction Works",
    slug: "integrated-construction-works",
  },
  mep: {
    id: "a6b44f1b-f7f6-4f3c-ad3f-68368bc4a278",
    name: "MEP Works",
    slug: "mep-works",
  },
  water: {
    id: "33d47a6c-11ea-445c-a0f7-c56b77514f78",
    name: "Sewage and Water Treatment Plants",
    slug: "sewage-and-water-treatment-plants",
  },
  roads: {
    id: "118b8d3a-6064-4697-91a9-fbf07242e7ee",
    name: "Roads & Infrastructure Works",
    slug: "roads-and-infrastructure-works",
  },
};

export const PROJECTS_ITEMS = [
  // Integrated Engineering Works (6)
  {
    id: "d92212e1-ee28-480c-a5d8-22c4e327ddc4",
    title: "King Road Tower - JEDDAH",
    slug: "king-road-tower-jeddah",
    img: "/images/faden/projects-page-1.webp",
    status: "Finished",
    partnershipType: "Faden Only",
    order: 1,
    client: "Al Amoudi Holding",
    location: "Jeddah, Saudi Arabia",
    country: "Saudi Arabia",
    service: SERVICES.engineering,
    createdAt: "2024-01-15T00:00:00.000Z",
  },
  {
    id: "0f4638e7-8d41-43db-a924-50834442a802",
    title: "American International School",
    slug: "american-international-school",
    img: "/images/faden/projects-page-2.webp",
    status: "Finished",
    partnershipType: "Faden Only",
    order: 2,
    client: "AIS Educational Group",
    location: "Riyadh, Saudi Arabia",
    country: "Saudi Arabia",
    service: SERVICES.engineering,
    createdAt: "2024-02-10T00:00:00.000Z",
  },
  {
    id: "061718ad-8cce-4707-88c4-39a838eadf76",
    title: "Al Muhaiza Residential Palace",
    slug: "al-muhaiza-residential-palace",
    img: "/images/faden/projects-page-3.webp",
    status: "Finished",
    partnershipType: "With Global Energy",
    order: 3,
    client: "Private Client",
    location: "Riyadh, Saudi Arabia",
    country: "Saudi Arabia",
    service: SERVICES.engineering,
    createdAt: "2024-03-05T00:00:00.000Z",
  },

  // Integrated Construction Works (3)
  {
    id: "945e0cae-eebf-4d2a-8e95-4b3458c04606",
    title: "Royal Palace (Um Alhamam)",
    slug: "royal-palace-um-alhamam",
    img: "/images/faden/projects-page-4.webp",
    status: "Finished",
    partnershipType: "Faden Only",
    order: 4,
    client: "Royal Protocol",
    location: "Um Alhamam, Riyadh, Saudi Arabia",
    country: "Saudi Arabia",
    service: SERVICES.construction,
    createdAt: "2024-04-01T00:00:00.000Z",
  },
  {
    id: "916e4efe-26f3-452f-a4cb-15fee2cb022c",
    title: "Salboukh Air Operation Building",
    slug: "salboukh-air-operation-building",
    img: "/images/faden/projects-page-5.webp",
    status: "Finished",
    partnershipType: "With Global Energy",
    order: 5,
    client: "Aviation Authority",
    location: "Salboukh, Saudi Arabia",
    country: "Saudi Arabia",
    service: SERVICES.construction,
    createdAt: "2024-04-15T00:00:00.000Z",
  },
  {
    id: "55e1e099-e9d3-4e2f-ad31-9590c3cd8368",
    title: "King Faisal Air Academy-VIP Terminal",
    slug: "king-faisal-air-academy-vip-terminal",
    img: "/images/faden/projects-page-6.webp",
    status: "Finished",
    partnershipType: "Faden Only",
    order: 6,
    client: "Royal Saudi Air Force",
    location: "Riyadh, Saudi Arabia",
    country: "Saudi Arabia",
    service: SERVICES.construction,
    createdAt: "2024-05-01T00:00:00.000Z",
  },

  // MEP Works (3)
  {
    id: "0f1171e8-bff6-43e5-a843-30bca2e277a6",
    title: "ARGO Egypt",
    slug: "argo-egypt",
    img: "/images/faden/projects-page-7.webp",
    status: "Finished",
    partnershipType: "With Global Energy",
    order: 7,
    client: "ARGO Industrial",
    location: "Cairo, Egypt",
    country: "Egypt",
    service: SERVICES.mep,
    createdAt: "2024-05-20T00:00:00.000Z",
  },
  {
    id: "0f1171e8-bff6-43e5-a843-30bca2e277a7",
    title: "Scientific Research & Tech City",
    slug: "scientific-research-tech-city",
    img: "/images/faden/projects-page-8.webp",
    status: "Finished",
    partnershipType: "Faden Only",
    order: 8,
    client: "Ministry of Science",
    location: "Riyadh, Saudi Arabia",
    country: "Egypt",
    service: SERVICES.mep,
    createdAt: "2024-06-05T00:00:00.000Z",
  },
  {
    id: "0f1171e8-bff6-43e5-a843-30bca2e277a8",
    title: "Cairo West Supercritical Power Plant",
    slug: "cairo-west-supercritical-power-plant",
    img: "/images/faden/projects-page-9.webp",
    status: "Finished",
    partnershipType: "With Global Energy",
    order: 9,
    client: "Egyptian Electricity Holding",
    location: "Cairo, Egypt",
    country: "Egypt",
    service: SERVICES.mep,
    createdAt: "2024-06-20T00:00:00.000Z",
  },

  // Sewage and Water Treatment Plants (3)
  {
    id: "e921aba6-e9b7-430e-93cb-afa86681cb85",
    title: "Al-Alamein SWRO Plant",
    slug: "al-alamein-swro-plant",
    img: "/images/faden/projects-page-10.webp",
    status: "Finished",
    partnershipType: "With Global Energy",
    order: 10,
    client: "National Water Company",
    location: "Al-Alamein, Egypt",
    country: "Egypt",
    service: SERVICES.water,
    createdAt: "2024-07-10T00:00:00.000Z",
  },
  {
    id: "e921aba6-e9b7-430e-93cb-afa86681cb86",
    title: "El-Husseiniya & Saoud WTPs",
    slug: "el-husseiniya-saoud-wtps",
    img: "/images/faden/projects-page-11.webp",
    status: "In Progress",
    partnershipType: "Faden Only",
    order: 11,
    client: "Ministry of Water",
    location: "Egypt",
    country: "Egypt",
    service: SERVICES.water,
    createdAt: "2024-08-01T00:00:00.000Z",
  },
  {
    id: "e921aba6-e9b7-430e-93cb-afa86681cb87",
    title: "Abo Jalal WTP",
    slug: "abo-jalal-wtp",
    img: "/images/faden/projects-page-12.webp",
    status: "Finished",
    partnershipType: "With Global Energy",
    order: 12,
    client: "National Water Company",
    location: "Egypt",
    country: "Egypt",
    service: SERVICES.water,
    createdAt: "2024-08-20T00:00:00.000Z",
  },

  // Roads & Infrastructure Works (3)
  {
    id: "62762e6c-b5b4-4ccd-8e5e-6bfb907e20b6",
    title: "Marassi Blanca 85",
    slug: "marassi-blanca-85",
    img: "/images/faden/projects-page-13.webp",
    status: "Finished",
    partnershipType: "With Global Energy",
    order: 13,
    client: "EMAAR MISR – Egypt",
    location: "Marassi, North Coast – Egypt",
    country: "Egypt",
    service: SERVICES.roads,
    createdAt: "2024-09-10T00:00:00.000Z",
  },
  {
    id: "62762e6c-b5b4-4ccd-8e5e-6bfb907e20b7",
    title: "SODIC Westown Irrigation System",
    slug: "sodic-westown-irrigation-system",
    img: "/images/faden/projects-page-14.webp",
    status: "In Progress",
    partnershipType: "With Global Energy",
    order: 14,
    client: "SODIC",
    location: "West Cairo, Egypt",
    country: "Egypt",
    service: SERVICES.roads,
    createdAt: "2024-09-25T00:00:00.000Z",
  },
  {
    id: "62762e6c-b5b4-4ccd-8e5e-6bfb907e20b8",
    title: "Westown Residence Block 26 ONE 16",
    slug: "westown-residence-block-26",
    img: "/images/faden/projects-page-15.webp",
    status: "Finished",
    partnershipType: "Faden Only",
    order: 15,
    client: "SODIC",
    location: "West Cairo, Egypt",
    country: "Egypt",
    service: SERVICES.roads,
    createdAt: "2024-10-05T00:00:00.000Z",
  },
  {
    id: "62762e6c-b5b4-4ccd-8e5e-6bfb907e20b9",
    title: "Westown Courtyard Block 46",
    slug: "westown-courtyard-block-46",
    img: "/images/faden/projects-page-15.webp",
    status: "Finished",
    partnershipType: "Faden Only",
    order: 19,
    client: "SODIC",
    location: "West Cairo, Egypt",
    country: "Saudi Arabia",
    service: SERVICES.roads,
    createdAt: "2024-10-10T00:00:00.000Z",
  },

  // Additional Engineering Works (3 more)
  {
    id: "0f4638e7-8d41-43db-a924-50834442a803",
    title: "Park Inn Hotel - By Radisson",
    slug: "park-inn-hotel-by-radisson",
    img: "/images/faden/projects-page-16.webp",
    status: "Finished",
    partnershipType: "Faden Only",
    order: 16,
    client: "Radisson Hospitality",
    location: "Riyadh, Saudi Arabia",
    country: "Saudi Arabia",
    service: SERVICES.engineering,
    createdAt: "2024-10-20T00:00:00.000Z",
  },
  {
    id: "0f4638e7-8d41-43db-a924-50834442a804",
    title: "Jockey Club",
    slug: "jockey-club",
    img: "/images/faden/projects-page-17.webp",
    status: "Finished",
    partnershipType: "With Global Energy",
    order: 17,
    client: "Riyadh Equestrian Society",
    location: "Riyadh, Saudi Arabia",
    country: "Saudi Arabia",
    service: SERVICES.engineering,
    createdAt: "2024-11-05T00:00:00.000Z",
  },
  {
    id: "0f4638e7-8d41-43db-a924-50834442a805",
    title: "Private Residence Complex VIP",
    slug: "private-residence-complex-vip",
    img: "/images/faden/projects-page-18.webp",
    status: "Finished",
    partnershipType: "Faden Only",
    order: 18,
    client: "Private Client",
    location: "Riyadh, Saudi Arabia",
    country: "Saudi Arabia",
    service: SERVICES.engineering,
    createdAt: "2024-11-20T00:00:00.000Z",
  },
];

// Categories with count (auto-computed)
export const PROJECTS_CATEGORIES = Object.values(SERVICES).map((svc) => ({
  ...svc,
  _count: {
    projects: PROJECTS_ITEMS.filter((p) => p.service.id === svc.id).length,
  },
}));

export const PROJECTS_PARTNERSHIP_TYPES = ["Faden Only", "With Global Energy"];

export const PROJECTS_STATUS_OPTIONS = ["Finished", "In Progress"];

export const PROJECTS_COUNTRIES = ["Saudi Arabia", "Egypt"];

export const SORT_OPTIONS = [
  { value: "default", label: "Default Sorting" },
  { value: "name-asc", label: "Name (A - Z)" },
  { value: "name-desc", label: "Name (Z - A)" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

// ========================================
// PROJECT DETAIL DATA (Project Details page)
// ========================================

// Recycle the existing gallery photos as project-photo filler (same
// "recycle until more images are added" approach used in lib/gallery/data.js)
function recyclePhotos(order, count = 4) {
  return Array.from({ length: count }, (_, i) => {
    const imgIndex = ((order - 1 + i) % 12) + 1;
    return `/images/faden/gallery-page-${imgIndex}.webp`;
  });
}

// Generic, plausible detail content generated from the base project fields.
// Used for every project that doesn't have hand-authored Figma copy below.
function defaultProjectDetail(project) {
  return {
    overview: {
      label: "PROJECT OVERVIEW",
      caption:
        "An overview of the project, presenting a concise summary and overall context.",
      paragraphs: [
        `${project.title} is a ${project.service.name.toLowerCase()} project delivered for ${project.client} in ${project.location}.`,
        project.partnershipType === "Faden Only"
          ? "FADEN Contracting Company served as the main contractor and executed the project independently, delivering the works to the highest standards of safety and quality."
          : "FADEN Contracting Company partnered with Global Energy to jointly execute the project, delivering the works to the highest standards of safety and quality.",
      ],
    },
    infoTabs: {
      details: {
        left: [
          { label: "Category", value: `${project.service.name}.` },
          { label: "Client", value: `${project.client}.` },
          { label: "Location", value: `${project.location}.` },
        ],
        right: [
          { label: "Partnership", value: `${project.partnershipType}.` },
          { label: "Status", value: `${project.status}.` },
        ],
      },
      composition: {
        left: [
          { label: "Sector", value: `${project.service.name}.` },
          { label: "Structure", value: "Single main structure." },
        ],
        right: [
          { label: "Status", value: `${project.status}.` },
        ],
      },
    },
    designIntent: {
      label: "DESIGN INTENT",
      caption:
        "A general overview describing the main objectives and inspiration of the design concept.",
      paragraphs: [
        `The design approach for ${project.title} focused on functionality, durability, and alignment with FADEN's quality standards, ensuring a result that serves its intended purpose efficiently.`,
      ],
      image: project.img,
    },
    amenitiesFeatures: {
      label: "AMENITIES & FEATURES",
      caption:
        "An overview of the facilities and key features enhancing the project's functionality and comfort.",
      items: [
        "Quality-assured structural and finishing works.",
        "Efficient project scheduling and resource management.",
        "Compliance with international safety standards.",
        "Skilled multidisciplinary engineering team.",
      ],
    },
    keyAchievements: {
      label: "KEY ACHIEVEMENTS",
      caption:
        "An overview of the major successes achieved throughout the project's development.",
      items: [
        "Delivered to the client's full satisfaction.",
        "Executed in line with FADEN's quality and safety protocols.",
        "Completed with efficient resource and time management.",
      ],
    },
    photos: recyclePhotos(project.order),
  };
}

// Hand-authored overrides, matching the Figma "Projects Details" designs.
const PROJECT_DETAIL_OVERRIDES = {
  "king-road-tower-jeddah": {
    overview: {
      label: "PROJECT OVERVIEW",
      caption:
        "An overview of the project, presenting a concise summary and overall context.",
      paragraphs: [
        "King Road Tower is a landmark high-rise located at the intersection of King Abdulaziz Road and Corniche Road, near Al-Tahlia Square in Jeddah. This tower has become an architectural icon due to its distinctive curved glass façade and elegant skyline presence.",
        "FADEN Contracting Company served as the Main Contractor and executed the project on a full Turn-Key basis, encompassing structural works, MEP systems, façade installation, and premium interior finishes. The project was delivered on schedule with the highest standards of safety and quality.",
      ],
    },
    infoTabs: {
      details: {
        left: [
          { label: "Category", value: "Integrated Engineering Works." },
          { label: "Client", value: "Confidential / TBD." },
          { label: "Project Type", value: "Commercial High-Rise Tower." },
          { label: "Built-Up Area", value: "136,000 m²." },
          { label: "Floors", value: "35 Above Ground + 2 Basement." },
          { label: "Elevators", value: "17." },
          {
            label: "Scope",
            value:
              "Full structural, façade, interior finishing, and MEP execution.",
          },
        ],
        right: [
          {
            label: "Partnership",
            value: "Exclusively executed by FADEN Contracting Company.",
          },
          { label: "Contract Type", value: "Turn-Key." },
          { label: "Architectural Height", value: "143 m." },
          { label: "Parking Capacity", value: "1,000 Cars." },
          { label: "Duration", value: "2008 – 2010." },
          { label: "Status", value: "Finished." },
        ],
      },
      composition: {
        left: [
          {
            label: "Main Structure",
            value: "1 main tower + 2 annexes (North & South).",
          },
          { label: "Ground Floor", value: "1." },
          { label: "Podium Floors (Parking)", value: "5." },
          { label: "VIP & Restaurant Floors", value: "4." },
        ],
        right: [
          { label: "Basements", value: "2." },
          { label: "Mezzanine Floor", value: "1." },
          { label: "Typical Floors", value: "22." },
          { label: "Roof", value: "Helipad." },
        ],
      },
    },
    designIntent: {
      label: "DESIGN INTENT",
      caption:
        "A general overview describing the main objectives and inspiration of the design concept.",
      paragraphs: [
        "The design of King Road Tower was conceived to establish a modern architectural landmark within Jeddah's evolving skyline. Our design philosophy intends to create a structure that merges aesthetic appeal with functional. The vertical massing and fluid form were developed to optimize natural light penetration, enhance interior flexibility, and provide visual balance between the tower and its annexes. The curved façade highlights elegance and transparency, symbolizing progress and innovation.",
      ],
      image: "/images/faden/projects-page-1.webp",
    },
    amenitiesFeatures: {
      label: "AMENITIES & FEATURES",
      caption:
        "An overview of the facilities and key features enhancing the project's functionality and comfort.",
      items: [
        "Executive lounges and VIP reception areas.",
        "Smart building management and automation systems.",
        "Secure underground service and parking access.",
        "High-end restaurants with panoramic city views.",
        "Energy-efficient double-glazed façade.",
        "Integrated fire safety and monitoring systems.",
      ],
    },
    keyAchievements: {
      label: "KEY ACHIEVEMENTS",
      caption:
        "An overview of the major successes achieved throughout the project's development.",
      items: [
        "Delivered on time and within budget.",
        "Recognized as a modern landmark in Jeddah's skyline.",
        "Advanced façade and MEP systems integrated with sustainable materials.",
        "Exceptional safety record throughout the construction phase.",
      ],
    },
  },
  "al-muhaiza-residential-palace": {
    overview: {
      label: "PROJECT OVERVIEW",
      caption:
        "An overview of the project, presenting a concise summary and overall context.",
      paragraphs: [
        "Thamer Al Muhaiza – Al Hada Palace is a prestigious luxury residential development designed to deliver exclusive and refined living experience. The project reflects a perfect balance between architectural elegance, functional planning, and complete privacy.",
        "Executed by FADEN Contracting Company, the project was developed as a fully integrated luxury palace, combining high-end construction standards with meticulous attention to detail to meet elite residential requirements.",
      ],
    },
    infoTabs: {
      details: {
        left: [
          { label: "Category", value: "Integrated Engineering Works." },
          { label: "Client", value: "Private / Confidential." },
          { label: "Project Type", value: "Luxury Residential Palace." },
          { label: "Built-Up Area", value: "4,598 m²." },
          {
            label: "Scope",
            value:
              "Full structural works, architectural execution, premium interior and exterior finishing, landscaping, and complete MEP works.",
          },
        ],
        right: [
          {
            label: "Partnership",
            value: "Exclusively executed by FADEN Contracting Company.",
          },
          { label: "Contract Type", value: "Turn-Key." },
          { label: "Status", value: "Completed." },
        ],
      },
      composition: {
        left: [
          {
            label: "Main Residence",
            children: [
              {
                label: "Basement",
                value: "1,018 m² (Indoor swimming pool & recreational facilities).",
              },
              { label: "Ground Floor", value: "683 m²." },
              { label: "First Floor", value: "793 m²." },
              { label: "Second Floor", value: "819 m²." },
            ],
          },
        ],
        right: [
          {
            label: "Sunroom Building",
            children: [
              { label: "Basement", value: "645 m²." },
              { label: "Ground Floor", value: "523 m²." },
            ],
          },
          {
            label: "Girl's Majlis",
            children: [{ label: "Built-up Area", value: "117 m²." }],
          },
        ],
      },
    },
    designIntent: {
      label: "DESIGN INTENT",
      caption:
        "A general overview describing the main objectives and inspiration of the design concept.",
      paragraphs: [
        "The design of Al Hada Palace was conceived to establish a luxurious and private residential environment that supports comfort, elegance, and functionality. The architectural concept emphasizes spatial harmony, seamless indoor-outdoor integration, and clear zoning between living, reception, and leisure areas.",
        "The result is a refined residential palace that reflects sophistication, exclusivity, and timeless architectural value.",
      ],
      image: "/images/faden/projects-page-3.webp",
    },
    amenitiesFeatures: {
      label: "AMENITIES & FEATURES",
      caption:
        "An overview of the facilities and key features enhancing the project's functionality and comfort.",
      items: [
        "Indoor swimming pool.",
        "Landscaped outdoor areas.",
        "Dedicated majlis facilities.",
        "Multi-level luxury living spaces.",
        "Family gathering and entertainment areas.",
        "High-end architectural and interior finishes.",
      ],
    },
    keyAchievements: {
      label: "KEY ACHIEVEMENTS",
      caption:
        "An overview of the major successes achieved throughout the project's development.",
      items: [
        "Delivery of a high-end VIP residential palace.",
        "Exceptional construction and finishing quality.",
        "Intelligent spatial planning ensuring maximum privacy.",
        "Seamless integration of architecture and landscape.",
        "Creation of a fully self-contained luxury residence.",
      ],
    },
    photosCaption:
      "An overview of photographs highlighting major design and construction elements.",
  },
  "marassi-blanca-85": {
    overview: {
      label: "PROJECT OVERVIEW",
      caption:
        "An overview of the project, presenting a concise summary and overall context.",
      paragraphs: [
        "Marassi Blanca 85 is a premium residential infrastructure project located within the Marassi development on Egypt's North Coast. The project was executed by Global Energy for Investment & Industry, covering execution, testing, and commissioning of integrated infrastructure networks, including water supply, drainage, irrigation, firefighting, electrical, and telecommunication systems.",
        "The project was delivered in compliance with approved technical specifications, safety standards, and quality requirements, ensuring reliable and efficient infrastructure to support the residential community.",
      ],
    },
    infoTabs: {
      details: {
        left: [
          { label: "Category", value: "Roads & Infrastructure Works." },
          { label: "Client", value: "EMAAR MISR – Egypt." },
          {
            label: "Project Type",
            value: "Residential Infrastructure Development.",
          },
          {
            label: "Scope",
            value:
              "Water supply network, Drainage networks, Irrigation systems, Firefighting networks, Electrical networks, and Telecommunication networks.",
          },
        ],
        right: [
          {
            label: "Partnership",
            value: "Executed by Global Energy for Investment & Industry.",
          },
          { label: "Contract Type", value: "Execution, Testing & Commissioning." },
          { label: "Status", value: "Completed." },
        ],
      },
    },
    designIntent: {
      label: "DESIGN INTENT",
      caption:
        "A general overview describing the main objectives and inspiration of the design concept.",
      paragraphs: [
        "The infrastructure design of Marassi Blanca 85 was developed to support a luxury residential environment through robust, efficient, and future-ready utility systems. Emphasizing sustainability, operational efficiency, and seamless integration with the surrounding Marassi development, ensuring uninterrupted services and enhanced living comfort for residents.",
      ],
      image: "/images/faden/projects-page-13.webp",
    },
    amenitiesFeatures: {
      label: "AMENITIES & FEATURES",
      caption:
        "An overview of the facilities and key features enhancing the project's functionality and comfort.",
      items: [
        "Fully integrated water systems.",
        "Advanced drainage network systems.",
        "Efficient irrigation infrastructure solutions.",
        "Reliable firefighting safety systems.",
        "High performance electrical networks.",
        "Scalable infrastructure for maintenance.",
      ],
    },
    keyAchievements: {
      label: "KEY ACHIEVEMENTS",
      caption:
        "An overview of the major successes achieved throughout the project's development.",
      items: [
        "Successful execution and commissioning within planned timelines.",
        "High-quality infrastructure supporting luxury residential standards.",
        "Compliance with international safety and engineering regulations.",
        "Contribution to the overall value and functionality of the Marassi development.",
      ],
    },
    photosCaption:
      "An overview of photographs highlighting major design and construction elements.",
  },
};

function buildProjectFallback(slug) {
  const project = PROJECTS_ITEMS.find((p) => p.slug === slug);
  if (!project) return null;

  const detail = {
    ...defaultProjectDetail(project),
    ...(PROJECT_DETAIL_OVERRIDES[slug] || {}),
  };

  const relatedProjects = PROJECTS_ITEMS.filter(
    (p) => p.service.id === project.service.id && p.slug !== project.slug,
  )
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  return { ...project, detail, relatedProjects };
}

// ========================================
// API ACCESSORS (fall back to the data above)
// ========================================

export async function getProjects() {
  return apiGet("/projects");
}

export async function getProjectsPageMeta() {
  // The API nests the banner copy one level down.
  const meta = await apiGet("/projects/meta");
  return meta.banner ?? meta;
}

export async function getProjectCategories() {
  return apiGet("/projects/categories");
}

// Returns the project with its detail page resolved and `relatedProjects`
// already computed by the server.
export async function getProjectBySlug(slug) {
  return apiGet(`/projects/by-slug/${slug}`);
}

export async function getAllProjectSlugs() {
  const projects = await getProjects();
  return projects.map((p) => p.slug);
}