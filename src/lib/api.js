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
  [/Saudi Arabia and Egypt/g, "Saudi Arabia"],
  [/Saudi Arabia & Egypt/g, "Saudi Arabia"],
  [/Egypt & Saudi Arabia/g, "Saudi Arabia"],
  [/KSA & Egypt/g, "KSA"],
  [/Egypt and Saudi Arabia/g, "Saudi Arabia"],
  [/KSA and Egypt/g, "KSA"],
  [/Egypt and KSA/g, "KSA"],
  [/the Kingdom and Egypt/g, "the Kingdom"],
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
  return request(path, { optional: false });
}

/**
 * The same, but a 404 answers `null` instead of throwing.
 *
 * This is for one case only: a section the API has not shipped yet. The news
 * store is the current one. Everything else must keep failing loudly — a page
 * that quietly renders nothing is how a broken endpoint goes unnoticed for
 * weeks. Any status other than 404 still throws here too.
 */
export async function apiGetOptional(path) {
  return request(path, { optional: true });
}

// The API host refuses connections often enough that a single attempt fails
// several times an hour, and one failed call takes a whole page down with it:
// a homepage is ten of these at once, and apiGet throws on purpose rather
// than render half a page.
//
// Only a connection that never opened is retried. A reply from the server is
// a real answer however unwelcome, and retrying a 500 would turn one broken
// endpoint into three requests for it. Each attempt is bounded, so a host
// that is genuinely down fails in seconds rather than holding the render
// open for the platform's own timeout.
const ATTEMPTS = 4;
const ATTEMPT_TIMEOUT_MS = 8000;
const BACKOFF_MS = [300, 800, 1600];

// And it is the burst that breaks it, not the volume. A homepage render asks
// for ten things at once and the host drops most of them; the same ten asked
// a few at a time mostly answer in a second or two. So requests queue here,
// three in flight at most, and a request that still times out is tried again
// rather than taking the page down with it.
//
// This is a workaround for the host, not a design: take it out once the API
// stops refusing connections.
const MAX_IN_FLIGHT = 3;
let inFlight = 0;
const waiting = [];

function acquire() {
  if (inFlight < MAX_IN_FLIGHT) {
    inFlight += 1;
    return Promise.resolve();
  }
  return new Promise((resolve) => waiting.push(resolve));
}

function release() {
  const next = waiting.shift();
  if (next) next();
  else inFlight -= 1;
}

async function request(path, { optional }) {
  const startedAt = Date.now();
  const url = `${API_URL}${path}`;

  let res;
  let lastError;

  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    await acquire();
    try {
      res = await fetch(url, {
        ...FETCH_OPTIONS,
        signal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS),
      });
      break;
    } catch (error) {
      lastError = error;
      if (attempt === ATTEMPTS) break;
      console.warn(
        `[api] GET ${path} -> ${error.message}, retrying (${attempt}/${ATTEMPTS - 1})`,
      );
      await new Promise((resolve) =>
        setTimeout(resolve, BACKOFF_MS[attempt - 1]),
      );
    } finally {
      release();
    }
  }

  if (!res) {
    console.error(
      `[api] GET ${path} -> NETWORK ERROR after ${ATTEMPTS} attempts: ${lastError?.message}`,
    );
    // Raised as a plain Error rather than rethrown. An abort hands back a
    // DOMException whose `message` is a getter, and something between here
    // and Next's error overlay tries to write to it, which turns one failed
    // request into an unhandled rejection that says nothing useful.
    throw new Error(`GET ${path} failed: ${lastError?.message}`);
  }

  const ms = Date.now() - startedAt;

  if (res.status === 404 && optional) {
    console.warn(`[api] GET ${path} -> 404, treated as not shipped yet (${ms}ms)`);
    return null;
  }

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
