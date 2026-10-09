export const CLIENTS_PAGE_META = {
  banner: {
    title: "Our Clients",
    subtitle:
      "Organizations and Businesses Who Trust Us to Transform Their Ambitions into Reality.",
    image: "/images/faden/clients-banner.webp",
  },
  intro: {
    eyebrow: "TRUSTED BY",
    title: "Global Partners",
    description:
      "Our continuous growth is a testament to the trust and collaboration placed in us by leading global enterprises. They rely on our proven expertise, value our integrity, and share our vision for delivering outstanding, high-quality outcomes.",
  },
  cta: {
    title: "Want to be one of our satisfied clients?",
    subtitle:
      "Join the growing list of partners who trusted us to bring their vision to life.",
    image: "/images/faden/start-project-section.webp",
    primaryButton: { label: "Contact Us", href: "/contact" },
  },
};

// Auto-generate 59 clients (client-1.png -> client-58.png)
export const CLIENTS_LIST = Array.from({ length: 58 }, (_, i) => {
  return {
    id: `client-${i + 1}`,
    name: `Client ${i + 1}`,
    logo: `/images/faden/client-${i + 1}.png`,
  };
});

// ========================================
// API ACCESSORS (fall back to the data above)
// ========================================

import { apiGet } from "@/lib/api";

export async function getClientsList() {
  return apiGet("/clients");
}

export async function getClientsPageMeta() {
  return apiGet("/clients/meta");
}
