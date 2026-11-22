// Who each project was built for, so the portfolio can be read the same way
// the services are: a private owner looking for a house should not have to
// scan past power plants, and a developer should see the whole record.
//
// DEMO — the Project table has no audience column, so nothing can be saved
// against a project yet. Until the API sends `audiences`, a project counts as
// private when it is named below or when its client says so, and as corporate
// otherwise. The same reading is mirrored in the dashboard at
// src/lib/projectAudience.js; change one without the other and they disagree.

// The two readers the portfolio is split for. The rule, and the reason the
// two are not symmetric: a company can commission anything a private client
// can, so the corporate list is everything. A private client cannot
// commission a wastewater plant or a road network, so their list is the
// subset marked for them.
export const AUDIENCES = [
  {
    key: "corporate",
    label: "Companies",
    caption: "Developers, institutions and public bodies — the full record.",
  },
  {
    key: "individual",
    label: "Private Clients",
    caption: "Villas, palaces and private estates, handled end to end.",
  },
];

export const DEFAULT_AUDIENCE = "corporate";

/** Projects commissioned by a private owner rather than a company or a body. */
const DEMO_PRIVATE_PROJECTS = new Set([
  "al-muhaiza-residential-palace",
  "royal-palace-um-alhamam",
  "private-residence-complex-vip",
]);

/** A client name that is a person rather than an organisation. */
const PRIVATE_CLIENT = /private client|private owner|royal protocol/i;

/** The audiences a project record belongs to, API value first. */
export function projectAudiencesOf(project) {
  const fromApi = project?.audiences;
  if (Array.isArray(fromApi) && fromApi.length) return fromApi;

  const isPrivate =
    DEMO_PRIVATE_PROJECTS.has(project?.slug) ||
    PRIVATE_CLIENT.test(project?.client ?? "");

  // A private commission is still work a company could ask for, so it stays in
  // the corporate list too — the same asymmetry the services use.
  return isPrivate ? ["corporate", "individual"] : ["corporate"];
}

/** The projects on offer to one audience; null means everything. */
export function projectsFor(projects, audience) {
  if (!audience) return projects;
  return projects.filter((project) =>
    projectAudiencesOf(project).includes(audience),
  );
}
