// TEMPORARY. The stories live here because the API has no news store yet.
//
// ============================ READ THIS FIRST ============================
// The three stories below are PLACEHOLDERS. I wrote them to show the design
// working; they are not real FADEN announcements and the facts in them are
// invented. Replace them with real copy before this site goes to the public
// domain, or delete them and leave the list empty — the page handles an
// empty list and says there is nothing yet.
// =========================================================================
//
// Nothing here is editable from the dashboard. A change means editing this
// file and deploying, which is why it is a stopgap and not the plan.
//
// When the API ships `GET /news` (docs/BACKEND-REQUESTS.md section 11) the
// data layer prefers it automatically, with no code change. At that point
// delete this file and the import in src/lib/news/data.js.
//
// The shape is the one the API will return, so nothing downstream has to
// know which of the two it is reading:
//
//   id       anything unique
//   title    the headline
//   slug     the end of the link, lowercase words joined by dashes
//   image    a file in /public, or a full URL
//   excerpt  one or two sentences, shown in the list and the homepage slider
//   date     ISO date; the list is sorted by it, newest first
//   body     HTML — the same tags the editor produces. The allow-list is in
//            src/lib/news/data.js and anything outside it is stripped.

export const LOCAL_NEWS = [
  {
    id: "local-1",
    title: "FADEN awarded the King Salman Energy Park substation package",
    slug: "ksep-substation-package",
    image: "/images/faden/gallery-page-3.webp",
    date: "2026-11-10T00:00:00.000Z",
    excerpt:
      "The scope covers two 132/13.8 kV substations and the connecting cable route, with handover set for the fourth quarter of 2027.",
    body: [
      "<p>FADEN Contracting has been awarded the substation package at King Salman Energy Park, the Kingdom's industrial city for the energy sector.</p>",
      "<h2>What the package covers</h2>",
      "<p>The scope runs from the civil works through to energisation, under <strong>one contractor and one programme</strong>. Nothing is handed between trades at the fence line.</p>",
      "<ul>",
      "<li>Two 132/13.8 kV substations, complete with control buildings</li>",
      "<li>Roughly eleven kilometres of connecting cable route</li>",
      "<li>All associated earthworks, drainage and access roads</li>",
      "</ul>",
      "<p>Site mobilisation begins in January, and the first substation is scheduled for energisation eighteen months later.</p>",
      "<blockquote><p>This is the kind of work the company was built for. Heavy civil and MEP under one contractor, on one programme, answering to one site team.</p></blockquote>",
      "<h2>How it will be run</h2>",
      "<p>The project is run from the Riyadh office, with a site team of around two hundred at peak. The programme is split into four stages:</p>",
      "<ol>",
      "<li>Enabling works and temporary power</li>",
      "<li>Civil structures and control buildings</li>",
      "<li>Primary plant installation and cable pulling</li>",
      "<li>Testing, commissioning and energisation</li>",
      "</ol>",
      "<h3>Health and safety</h3>",
      '<p>The site runs to the company\'s <em>ISO 45001</em> system. Full details of the work FADEN does in this sector are on the <a href="/services">services page</a>.</p>',
    ].join(""),
  },
  {
    id: "local-2",
    title: "Fifty years in the Kingdom",
    slug: "fifty-years",
    image: "/images/faden/gallery-page-7.webp",
    date: "2026-09-02T00:00:00.000Z",
    excerpt:
      "The company was registered in Riyadh in 1976. Half a century later it is still run from the same city.",
    body: [
      "<p>The company was registered in Riyadh in 1976 with eleven employees and a single pickup.</p>",
      "<p>Half a century later it is still run from the same city, and three of the families who joined in the first decade still have a member on the payroll.</p>",
      "<h2>Fifty years, in short</h2>",
      "<ol>",
      "<li>1976 — registered in Riyadh</li>",
      "<li>1994 — first MEP division</li>",
      "<li>2011 — first works outside the Kingdom</li>",
      "<li>2026 — fifty years</li>",
      "</ol>",
    ].join(""),
  },
  {
    id: "local-3",
    title: "ISO 45001 recertification completed with no major findings",
    slug: "iso-45001-recertification",
    image: "/images/faden/gallery-page-11.webp",
    date: "2026-06-18T00:00:00.000Z",
    excerpt:
      "The audit covered six active sites and the Riyadh yard over four days.",
    body: [
      "<p>The audit covered six active sites and the Riyadh yard over four days.</p>",
      "<p>It closed with <strong>no major findings</strong> and two observations, both already addressed.</p>",
    ].join(""),
  },
];

/** The banner and contact band on the news page, while the store is local. */
export const LOCAL_NEWS_META = {
  banner: {
    title: "News",
    subtitle: "Awards, milestones and what the sites are doing this month.",
  },
};
