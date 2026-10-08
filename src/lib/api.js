// Content for this site comes from the FADEN admin API. Every fetch here
// falls back to the static data that used to be hardcoded, so an API
// outage degrades to the last-known content instead of a broken page.

const API_URL = (process.env.NEXT_PUBLIC_FADEN_API_URL || "https://api.faden.digital/api").replace(
  /\/$/,
  "",
);

// Uploaded images live on the API host; everything else ships in /public.
const UPLOADS_ORIGIN = API_URL.replace(/\/api$/, "");

const REVALIDATE_SECONDS = 60;

/**
 * Rewrites every "/uploads/..." path in a fetched payload to an absolute URL
 * on the API host, so components can render `src` as-is no matter whether an
 * image was shipped with the site or uploaded from the dashboard.
 */
function resolveUploads(value) {
  if (typeof value === "string") {
    return value.startsWith("/uploads/") ? UPLOADS_ORIGIN + value : value;
  }
  if (Array.isArray(value)) return value.map(resolveUploads);
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = resolveUploads(v);
    return out;
  }
  return value;
}

/**
 * GET a public endpoint. Returns `fallback` if the API is unreachable, slow,
 * or answers with an error — never throws, so a page can always render.
 */
export async function apiGet(path, fallback) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) throw new Error(`${path} -> ${res.status}`);
    const payload = await res.json();
    const data = payload?.data !== undefined ? payload.data : payload;
    if (data === null || data === undefined) throw new Error(`${path} -> empty`);
    return resolveUploads(data);
  } catch (error) {
    console.warn(`[faden-api] falling back for ${path}: ${error.message}`);
    return fallback;
  }
}

/**
 * Same as `apiGet`, for the single-object endpoints (page meta, settings,
 * About pages), but falls back key by key instead of all-or-nothing: a
 * section the API has no column for yet keeps its original copy rather than
 * silently vanishing from the page.
 */
export async function apiGetObject(path, fallback) {
  const data = await apiGet(path, null);
  if (!data || typeof data !== "object" || Array.isArray(data)) return fallback;
  return { ...fallback, ...data };
}
