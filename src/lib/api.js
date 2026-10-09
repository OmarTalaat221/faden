// Content for this site comes from the FADEN admin API.
//
// There is deliberately NO fallback to static data: if an endpoint is down,
// missing or returns the wrong shape, the page must fail loudly rather than
// quietly render stale copy that hides the problem.

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

function describe(data) {
  if (Array.isArray(data)) return `array(${data.length})`;
  if (data && typeof data === "object") return `object{${Object.keys(data).join(",")}}`;
  return typeof data;
}

/** GET a public endpoint. Throws on anything that isn't a usable response. */
export async function apiGet(path) {
  const startedAt = Date.now();
  const url = `${API_URL}${path}`;

  let res;
  try {
    res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  } catch (error) {
    console.error(`[api] GET ${path} -> NETWORK ERROR: ${error.message}`);
    throw error;
  }

  const ms = Date.now() - startedAt;

  if (!res.ok) {
    console.error(`[api] GET ${path} -> HTTP ${res.status} (${ms}ms)`);
    throw new Error(`GET ${path} failed with ${res.status}`);
  }

  const payload = await res.json();
  const data = payload?.data !== undefined ? payload.data : payload;

  if (data === null || data === undefined) {
    console.error(`[api] GET ${path} -> 200 but no data (${ms}ms)`);
    throw new Error(`GET ${path} returned no data`);
  }

  console.log(`[api] GET ${path} -> ${res.status} ${describe(data)} (${ms}ms)`);
  return resolveUploads(data);
}
