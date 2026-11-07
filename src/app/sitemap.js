import { getSiteVisibility } from "@/lib/settings/data";
import { HIDEABLE_PAGES } from "@/lib/settings/visibility";

// Reads the visibility flags from the API, so it is built per request rather
// than frozen at build time.
export const dynamic = "force-dynamic";

export default async function sitemap() {
  const baseUrl = "https://www.fadensa.com";
  const lastModified = new Date();

  // A page switched off in the dashboard 404s, so it must not be listed.
  const visibility = await getSiteVisibility();
  const hidden = Object.entries(HIDEABLE_PAGES)
    .filter(([key]) => visibility.pages[key] === false)
    .map(([, route]) => `${baseUrl}${route}`);

  const entries = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#clients`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  return entries.filter((e) => !hidden.includes(e.url));
}
