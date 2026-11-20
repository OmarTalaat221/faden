// What the portfolio says about itself, per reader. A procurement panel and a
// private owner are looking for different proof, so the line above the grid
// changes with the split rather than staying one line that suits neither.
//
// DEMO — projects_meta has one JSON column for the banner and nothing else,
// and the dashboard saves only that, so this copy lives here until a column
// exists. Anything the API sends should win over it.

export const AUDIENCE_COPY = {
  all: {
    title: "The full record",
    body: "Towers, schools, hospitals, treatment plants, road networks and private residences, built across the Kingdom.",
  },
  corporate: {
    title: "For companies and government",
    body: "Developers, ministries and operators. Master plans, infrastructure and facilities, run by one contractor under one contract.",
  },
  individual: {
    title: "For private clients",
    body: "Palaces, villas and private estates, handled end to end by the same senior team, with the discretion a private build asks for.",
  },
};

/** The copy for a selection; null means the whole portfolio. */
export function copyForAudience(audience) {
  return AUDIENCE_COPY[audience ?? "all"] ?? AUDIENCE_COPY.all;
}
