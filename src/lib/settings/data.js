// Site-wide settings — footer contact details, social links, quick links,
// navigation and SEO copy — managed from the admin dashboard.
//
// This is the single source of truth for the address / phone / email. The
// footer and the /contact page both read it, so they can never drift apart
// (they used to show two different phone numbers).

import { notFound } from "next/navigation";

import { apiGet } from "@/lib/api";
import { getVisibility } from "./visibility";

export async function getSettings() {
  return apiGet("/settings");
}

/** The visibility flags on their own, for pages that need nothing else. */
export async function getSiteVisibility() {
  return getVisibility(await getSettings());
}

/**
 * 404s a page that has been switched off in the dashboard. Call it first in
 * the page component, so a hidden page is gone rather than merely unlinked.
 */
export async function requirePageVisible(key) {
  const visibility = await getSiteVisibility();
  if (visibility.pages[key] === false) notFound();
}

/** Strips everything but digits and a leading +, for tel: links. */
export function telHref(phone) {
  return `tel:${String(phone || "").replace(/[^\d+]/g, "")}`;
}
