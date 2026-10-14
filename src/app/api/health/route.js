// GET /api/health — a live report of every API endpoint this site depends on.
//
// Why this exists: all content fetching happens in server components, so none
// of it ever shows up in the browser's Network tab. Opening this route makes
// one request you *can* watch, and its body says what the server saw when it
// called each endpoint.
//
// It runs on the server on purpose. The API only accepts cross-origin requests
// from localhost, so the browser cannot call it directly from a real domain.

const API_URL = (
  process.env.NEXT_PUBLIC_FADEN_API_URL || "https://api.faden.digital/api"
).replace(/\/$/, "");

// Never cached — the point is to show the state right now.
export const dynamic = "force-dynamic";

// Every path the site reads, in the order the pages need them.
const ENDPOINTS = [
  "/settings",
  "/home-features",
  "/about/overview",
  "/about/vision-mission",
  "/about/leadership",
  "/about/partners",
  "/gallery",
  "/gallery/meta",
  "/projects",
  "/projects/meta",
  "/projects/categories",
  "/services",
  "/services/meta",
  "/clients",
  "/clients/meta",
  "/equipment",
  "/equipment/meta",
  "/contact/page",
];

function describe(data) {
  if (Array.isArray(data)) return `array(${data.length})`;
  if (data && typeof data === "object") return `object{${Object.keys(data).join(",")}}`;
  return typeof data;
}

async function check(path) {
  const startedAt = Date.now();
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    const ms = Date.now() - startedAt;

    if (!res.ok) {
      return { path, ok: false, status: res.status, ms, error: `HTTP ${res.status}` };
    }

    const payload = await res.json();
    const data = payload?.data !== undefined ? payload.data : payload;

    if (data === null || data === undefined) {
      return { path, ok: false, status: res.status, ms, error: "200 but no data" };
    }

    return { path, ok: true, status: res.status, ms, shape: describe(data) };
  } catch (error) {
    return {
      path,
      ok: false,
      status: 0,
      ms: Date.now() - startedAt,
      error: error.message,
    };
  }
}

export async function GET() {
  const startedAt = Date.now();

  const results = await Promise.all(ENDPOINTS.map(check));

  // The two detail endpoints need a real slug, so they run once the lists are in.
  const projects = results.find((r) => r.path === "/projects");
  const services = results.find((r) => r.path === "/services");

  if (projects?.ok) {
    const list = await fetch(`${API_URL}/projects`, { cache: "no-store" })
      .then((r) => r.json())
      .then((p) => p?.data ?? p)
      .catch(() => null);
    const slug = Array.isArray(list) ? list[0]?.slug : null;
    if (slug) results.push(await check(`/projects/by-slug/${slug}`));
  }

  if (services?.ok) {
    const list = await fetch(`${API_URL}/services`, { cache: "no-store" })
      .then((r) => r.json())
      .then((p) => p?.data ?? p)
      .catch(() => null);
    // /services answers with a bare array; the site re-wraps it as { items }.
    const items = Array.isArray(list) ? list : list?.items;
    const slug = items?.[0]?.slug;
    if (slug) results.push(await check(`/services/by-slug/${slug}`));
  }

  const failed = results.filter((r) => !r.ok);

  return Response.json(
    {
      ok: failed.length === 0,
      apiUrl: API_URL,
      checkedAt: new Date().toISOString(),
      totalMs: Date.now() - startedAt,
      passed: results.length - failed.length,
      failed: failed.length,
      results,
    },
    { status: failed.length === 0 ? 200 : 503 },
  );
}
