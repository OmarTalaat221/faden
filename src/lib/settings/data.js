// Site-wide settings — footer contact details, social links, quick links,
// navigation and SEO copy — managed from the admin dashboard.
//
// This is the single source of truth for the address / phone / email. The
// footer and the /contact page both read it, so they can never drift apart
// (they used to show two different phone numbers).

import { apiGetObject } from "@/lib/api";

export const SETTINGS_FALLBACK = {
  socialLinks: [
    { label: "Instagram", icon: "instagram", href: "#" },
    { label: "Twitter", icon: "twitter", href: "#" },
    {
      label: "LinkedIn",
      icon: "linkedin",
      href: "https://www.linkedin.com/company/faden-contracting/",
    },
  ],
  footer: {
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Projects", href: "#projects" },
      { label: "Clients", href: "#clients" },
      { label: "Contact Us", href: "#contact" },
    ],
    contact: {
      address: "Riyadh, Saudi Arabia",
      phone: "+966 11 2158333",
      email: "info@fadensa.com",
    },
    copyrightText: "© 2026 By FADEN Contracting C.E. All Rights Reserved",
  },
};

export async function getSettings() {
  return apiGetObject("/settings", SETTINGS_FALLBACK);
}

/** Strips everything but digits and a leading +, for tel: links. */
export function telHref(phone) {
  return `tel:${String(phone || "").replace(/[^\d+]/g, "")}`;
}
