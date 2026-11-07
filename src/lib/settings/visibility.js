// Which pages and homepage sections are switched on, as set in the dashboard
// under Visibility.
//
// The flags live at settings.navigation.visibility rather than at the top of
// the settings record: the settings table has one column per section
// (branding, navigation, socialLinks, footer, seo) and the API persists only
// those five, so a new top-level key would be dropped on save. Navigation is
// the closest fit, since hiding a page also drops it from the menu. Move this
// to a column of its own if one is ever added.

/** Pages that may be switched off. Key -> the route it covers. */
export const HIDEABLE_PAGES = {
  gallery: "/gallery",
  equipment: "/equipment",
  clients: "/clients",
  partners: "/partners",
  certifications: "/about/certifications",
};

/** Homepage sections that may be switched off, in the order they render. */
export const HIDEABLE_HOME_SECTIONS = [
  "stats",
  "about",
  "services",
  "projects",
  "cta",
  "partners",
  "clients",
  "equipment",
  "gallery",
];

// Switched off until the client turns them on. Saving the Visibility page in
// the dashboard writes an explicit flag for every key, which then wins, so
// this only decides what a site with no flags saved yet shows. Drop the
// entries once the client has made the call.
const OFF_BY_DEFAULT = {
  pages: ["gallery", "equipment"],
  // Their homepage bands link to those pages, so they go too.
  homeSections: ["gallery", "equipment"],
};

function defaults(keys, off) {
  return Object.fromEntries(keys.map((k) => [k, !off.includes(k)]));
}

/**
 * Reads the flags off a settings record. A key the record says nothing about
 * falls back to OFF_BY_DEFAULT above.
 */
export function getVisibility(settings) {
  const stored = settings?.navigation?.visibility ?? {};

  return {
    pages: {
      ...defaults(Object.keys(HIDEABLE_PAGES), OFF_BY_DEFAULT.pages),
      ...(stored.pages ?? {}),
    },
    homeSections: {
      ...defaults(HIDEABLE_HOME_SECTIONS, OFF_BY_DEFAULT.homeSections),
      ...(stored.homeSections ?? {}),
    },
  };
}

/** The routes that are switched off, for the nav and the sitemap. */
export function hiddenRoutes(visibility) {
  return Object.entries(HIDEABLE_PAGES)
    .filter(([key]) => visibility.pages[key] === false)
    .map(([, route]) => route);
}
