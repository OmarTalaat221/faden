import { apiGet } from "@/lib/api";

// ========================================
// FETCH HELPERS (LIST + PAGE META)
// ========================================
export async function getAllServices() {
  // The API returns a bare array; this site has always consumed the
  // { items: [...] } envelope, so it is re-applied here.
  const items = await apiGet("/services");
  return { items };
}

export async function getServicesPageMeta() {
  return apiGet("/services/meta");
}

// ========================================
// SERVICE DETAIL DATA — ALL 5 SERVICES
// ========================================

// Shared "Why Choose FADEN" section (same across all services)
export async function getServiceBySlug(slug) {
  // The API resolves the shared "Why Choose FADEN" block into `sections`.
  return apiGet(`/services/by-slug/${slug}`);
}

export async function getAllServiceSlugs() {
  const { items } = await getAllServices();
  return items.map((s) => s.slug);
}