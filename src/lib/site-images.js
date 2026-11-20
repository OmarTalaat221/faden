// The images the site used to hardcode, in one place, each replaceable from
// the dashboard.
//
// They are stored under `branding.images` on Site Settings. That column is
// JSON and the API deep-merges whatever it is sent, so a new key needs no
// migration — which is why these live here rather than waiting on a column
// of their own. Anything the dashboard has not set falls back to the file
// that shipped with the site, so the page never renders without an image.
//
// The same list is mirrored in the dashboard at src/lib/siteImages.js, which
// is what draws the pickers. Add a key to one and add it to the other, or the
// dashboard will offer a slot nothing reads, or read one nothing offers.

import { cache } from "react";

import { getSettings } from "@/lib/settings/data";

export const SITE_IMAGES = [
  {
    key: "pageBanner",
    label: "Default page banner",
    hint: "Behind the title on any page whose own banner is not set.",
    fallback: "/images/faden/image-05.jpg",
  },
  {
    key: "ctaBackground",
    label: "Call to action background",
    hint: "The 'Ready to start your project?' band at the foot of most pages.",
    fallback: "/images/faden/start-project-section.webp",
  },
  {
    key: "servicesBanner",
    label: "Service page banner",
    hint: "Behind the title on a service that has no banner of its own.",
    fallback: "/images/faden/our-services-banner.webp",
  },
  {
    key: "partnerLogo",
    label: "Partner logo",
    hint: "Shown beside FADEN's own mark on the homepage and the contact page.",
    fallback: "/images/faden/partner-global-energy.webp",
  },
  {
    key: "partnerPhoto",
    label: "Partner photo",
    hint: "The photo in the Partners band, used until one is uploaded on the Partners page.",
    fallback: "/images/faden/projects-section-1.webp",
  },
  {
    key: "aboutOverview",
    label: "About overview photo",
    hint: "Used until one is uploaded on the About page.",
    fallback: "/images/faden/about-us-section.webp",
  },
  {
    key: "visionMark",
    label: "Vision 2030 mark",
    hint: "The second mark in the footer, under FADEN's. Leave it blank to show nothing there.",
    fallback: "/images/faden/vision-2030.png",
    optional: true,
  },
];

const FALLBACKS = Object.fromEntries(
  SITE_IMAGES.map((image) => [image.key, image.fallback]),
);

/**
 * The overrides saved in the dashboard. Cached for the render, because
 * settings are read in several places on a page and caching is off while the
 * client reviews content.
 */
export const getSiteImageOverrides = cache(async () => {
  const settings = await getSettings();
  const images = settings?.branding?.images;
  return images && typeof images === "object" ? images : {};
});

/**
 * One image by key. A key the dashboard has set wins; otherwise the file that
 * shipped with the site. An image marked optional can be cleared to nothing.
 */
export async function siteImage(key) {
  const overrides = await getSiteImageOverrides();
  const saved = overrides[key];

  if (typeof saved === "string") {
    const trimmed = saved.trim();
    if (trimmed) return trimmed;
    // Cleared on purpose: an optional mark is meant to disappear, while
    // anything else falls back rather than leaving a hole in the layout.
    const entry = SITE_IMAGES.find((image) => image.key === key);
    if (entry?.optional) return null;
  }

  return FALLBACKS[key] ?? null;
}

// Files, rather than pictures: things a visitor downloads. Same idea and the
// same JSON column, under branding.documents.
//
// The company profile ships in /public for now. The API's upload endpoint
// accepts images only, so a PDF cannot be uploaded from the dashboard until
// it accepts documents too - see docs/BACKEND-REQUESTS.md.
export const SITE_DOCUMENTS = [
  {
    key: "companyProfile",
    label: "Company profile (PDF)",
    hint: "Offered as a download on the About page. Clear it and the button disappears.",
    fallback: "/docs/faden-company-profile-2026.pdf",
    optional: true,
  },
];

const DOCUMENT_FALLBACKS = Object.fromEntries(
  SITE_DOCUMENTS.map((doc) => [doc.key, doc.fallback]),
);

/** One downloadable file by key, or null when it has been cleared. */
export async function siteDocument(key) {
  const settings = await getSettings();
  const saved = settings?.branding?.documents?.[key];

  if (typeof saved === "string") {
    const trimmed = saved.trim();
    if (trimmed) return trimmed;
    const entry = SITE_DOCUMENTS.find((doc) => doc.key === key);
    if (entry?.optional) return null;
  }

  return DOCUMENT_FALLBACKS[key] ?? null;
}
