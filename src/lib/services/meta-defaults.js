// DEMO — services_meta holds four JSON columns (banner, sectors, whyChoose,
// cta) and the dashboard saves only those, so an intro or a heading written
// there would be dropped. Until a column exists, the page falls back to the
// copy below; anything the API does send wins over it.

export const DEMO_SERVICES_INTRO = {
  eyebrow: "One Contractor, End To End",
  subtitle:
    "From the first drawing to the final handover, one team answers for the whole build.",
  paragraph:
    "Forty-eight years across Saudi Arabia and Egypt, more than a thousand professionals on site, and a record that runs from landmark towers and hospitals to private residences and national infrastructure. Whether the brief is a master plan or a single exceptional home, it is led by the same senior team, held to the same standard, under one contract and one point of accountability.",
  highlights: [
    "Established 1976",
    "1,000+ professionals",
    "Riyadh · Cairo",
    "One point of accountability",
  ],
};

export const DEMO_SERVICES_CORE_HEADING = {
  eyebrow: "Our Core Services",
  subtitle:
    "Five disciplines, delivered by one contractor — so nothing is lost between them.",
};

/** The page meta with the demo copy filled in where the API has nothing. */
export function withServicesDefaults(meta) {
  return {
    ...meta,
    intro: { ...DEMO_SERVICES_INTRO, ...(meta?.intro ?? {}) },
    coreHeading: { ...DEMO_SERVICES_CORE_HEADING, ...(meta?.coreHeading ?? {}) },
  };
}
