// Who a service is offered to. A private client and a developer do not want
// to read the same list, so the services page lets the visitor say which they
// are and shows only what applies.
//
// The rule, and the reason the two are not symmetric: a company can commission
// anything a private client can, so the corporate list is the whole catalogue.
// A private client cannot commission a wastewater plant or a road network, so
// their list is the subset marked for them.
//
// DEMO — the Service table has no audience column, so nothing can be saved
// against a service yet. Until the API sends `audiences`, the map below
// decides, and the dashboard's Audience field is read-only.

export const AUDIENCES = [
  {
    key: "corporate",
    label: "Companies",
    caption: "Developers, institutions and public bodies — the full catalogue.",
  },
  {
    key: "individual",
    label: "Private Clients",
    caption: "Villas, palaces and private estates, handled end to end.",
  },
];

export const DEFAULT_AUDIENCE = "corporate";

// Every service is open to a company. Only those a private owner would ever
// commission carry "individual" as well.
const DEMO_AUDIENCES = {
  "integrated-engineering-works": ["corporate", "individual"],
  "integrated-construction-works": ["corporate", "individual"],
  "mep-works": ["corporate", "individual"],
  "sewage-and-water-treatment-plants": ["corporate"],
  "roads-infrastructure-works": ["corporate"],
};

/** The audiences a service is offered to, whatever the record says. */
export function audiencesOf(service) {
  const fromApi = service?.audiences;
  if (Array.isArray(fromApi) && fromApi.length) return fromApi;
  return DEMO_AUDIENCES[service?.slug] || ["corporate"];
}

/** The services on offer to one audience. */
export function servicesFor(services, audience) {
  return services.filter((service) => audiencesOf(service).includes(audience));
}
