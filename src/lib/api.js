// Content for this site comes from the FADEN admin API.
//
// There is deliberately NO fallback to static data: if an endpoint is down,
// missing or returns the wrong shape, the page must fail loudly rather than
// quietly render stale copy that hides the problem.

const API_URL = (
  process.env.NEXT_PUBLIC_FADEN_API_URL || "https://api.faden.digital/api"
).replace(/\/$/, "");

// Uploaded images live on the API host; everything else ships in /public.
const UPLOADS_ORIGIN = API_URL.replace(/\/api$/, "");

// TEMPORARY, while the client is reviewing content: every call goes to the
// API and nothing is served from cache, so a change saved in the dashboard
// shows up on the next refresh.
//
// Swap this back to { next: { revalidate: 60 } } once the content is signed
// off, together with the dynamic export in src/app/layout.js.
const FETCH_OPTIONS = { cache: "no-store" };

// The site no longer presents Egypt as a market, but some copy saved in the
// dashboard still names it alongside Saudi Arabia. Only the conjunction forms
// are rewritten, so nothing else in a sentence moves. This is a stopgap: once
// the strings are edited in the dashboard, delete EGYPT_PAIRINGS and the
// branch that uses it.
const EGYPT_PAIRINGS = [
  [/Saudi Arabia and Egypt/g, "Saudi Arabia"],
  [/Egypt and Saudi Arabia/g, "Saudi Arabia"],
  [/KSA and Egypt/g, "KSA"],
  [/Egypt and KSA/g, "KSA"],
  [/the Kingdom and Egypt/g, "the Kingdom"],
];

function dropEgypt(text) {
  let out = text;
  for (const [pattern, replacement] of EGYPT_PAIRINGS) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

/**
 * Walks a fetched payload once and fixes up every string in it: "/uploads/..."
 * paths become absolute URLs on the API host, so components can render `src`
 * as-is whether an image shipped with the site or was uploaded from the
 * dashboard, and copy that still pairs Egypt with Saudi Arabia loses the pair.
 */
function normalizeStrings(value) {
  if (typeof value === "string") {
    return value.startsWith("/uploads/")
      ? UPLOADS_ORIGIN + value
      : dropEgypt(value);
  }
  if (Array.isArray(value)) return value.map(normalizeStrings);
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = normalizeStrings(v);
    return out;
  }
  return value;
}

function describe(data) {
  if (Array.isArray(data)) return `array(${data.length})`;
  if (data && typeof data === "object")
    return `object{${Object.keys(data).join(",")}}`;
  return typeof data;
}

/** GET a public endpoint. Throws on anything that isn't a usable response. */
export async function apiGet(path) {
  const startedAt = Date.now();
  const url = `${API_URL}${path}`;

  let res;
  try {
    res = await fetch(url, FETCH_OPTIONS);
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
  return normalizeStrings(data);
}
