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

function allOn(keys) {
  return Object.fromEntries(keys.map((k) => [k, true]));
}

/**
 * Reads the flags off a settings record. Anything not switched off explicitly
 * counts as on, so a record saved before this existed shows the whole site.
 */
export function getVisibility(settings) {
  const stored = settings?.navigation?.visibility ?? {};

  return {
    pages: { ...allOn(Object.keys(HIDEABLE_PAGES)), ...(stored.pages ?? {}) },
    homeSections: {
      ...allOn(HIDEABLE_HOME_SECTIONS),
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
