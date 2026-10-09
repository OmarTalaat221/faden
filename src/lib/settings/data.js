// Site-wide settings — footer contact details, social links, quick links,
// navigation and SEO copy — managed from the admin dashboard.
//
// This is the single source of truth for the address / phone / email. The
// footer and the /contact page both read it, so they can never drift apart
// (they used to show two different phone numbers).

import { apiGet } from "@/lib/api";

export async function getSettings() {
  return apiGet("/settings");
}

/** Strips everything but digits and a leading +, for tel: links. */
export function telHref(phone) {
  return `tel:${String(phone || "").replace(/[^\d+]/g, "")}`;
}
