# What the API needs from here

This is everything the FADEN site and dashboard still want from the backend,
in one place. None of it is a bug report. The site works today and so does
the dashboard; what is listed here is content the client cannot change
themselves, and a handful of things that will bite at launch.

Each item says what to add, what to seed so nothing changes visually on the
day it ships, and which front-end files to delete afterwards. **Please delete
them.** A fallback that is never reached is a second source of truth, and it
will drift.

Repos:

- API — `fadenback` (Express + Prisma + PostgreSQL)
- Site — `faden` (Next.js 16)
- Dashboard — `faden-dash` (Vite + React + antd)

Read **§0 first**. It is the one thing that can quietly break what already
works.

---

## 0. Do not add validation that strips unknown JSON keys

`Settings`, `AboutOverview`, `AboutPartners`, `ServicesMeta`, `ProjectsMeta`
and `ContactPage` are `Json?` columns, and the dashboard update services
deep-merge whatever they are sent. A nested key that no DTO knows about
survives a save, which is the only reason several things below work at all
without a migration.

These keys are live right now, written by the dashboard and read by the site:

| Where | Key | What it is |
|---|---|---|
| `settings.branding` | `images` | `{ pageBanner, ctaBackground, visionMark }` — the pictures that are the same on every page |
| `settings.branding` | `siteUrl` | The site's own address, used by the dashboard's preview |
| `settings.navigation` | `visibility` | `{ pages: {...}, homeSections: {...} }` — the show/hide switches |
| `about_overview.intro` | `companyProfile` | The PDF the About page offers as a download |
| `about_partners.intro` | `logo`, `image` | The partner's mark and photo |
| `services_meta.banner` | `fallbackImage` | The picture behind a service that has none of its own |
| `projects_meta.banner` | `title`, `subtitle`, `bannerImage` | The top of the projects page |

If a DTO, a Zod schema or a `pick()` is added to those update routes, allow
these through or move them into real columns in the same change. Dropping
them silently is the failure mode: nothing errors, the client saves, and the
value is gone on the next read.

---

## 1. Who each service and project is for

**The problem.** The site splits the services page and the projects page into
*Companies* and *Private Clients*. A visitor picks one and the list narrows.
Which bucket a record is in is decided by a map keyed on its slug, written in
the front-end code, so the client cannot change it.

The rule is asymmetric and has to stay that way: a company can commission
anything a private client can, but not the reverse. A private-client record
belongs to **both** lists; a corporate one belongs to **corporate only**.

```prisma
model Service {
  // ...
  audiences String[] @default(["corporate"])
}

model Project {
  // ...
  audiences String[] @default(["corporate"])
}
```

Allowed values: `"corporate"` and `"individual"`. Return the array from the
public `GET /services`, `GET /projects`, `GET /services/by-slug/:slug` and
`GET /projects/by-slug/:slug`, and accept it on the dashboard's create and
update routes. Validate that every element is one of the two.

**Seed these, or the site changes on the day it ships.**

Services that are **both**: `integrated-engineering-works`,
`integrated-construction-works`, `mep-works`.
Services that are **corporate only**: everything else, which today is
`sewage-and-water-treatment-plants` and `roads-infrastructure-works`.

Projects that are **both**: `al-muhaiza-residential-palace`,
`royal-palace-um-alhamam`, `private-residence-complex-vip`.
Projects that are **corporate only**: every other project.

**Then delete.** Site: the `DEMO_AUDIENCES` map in
`src/lib/services/audience.js`, and `DEMO_PRIVATE_PROJECTS` and
`PRIVATE_CLIENT` in `src/lib/projects/audience.js`. Both then read
`record.audiences`. Dashboard: `src/lib/serviceAudience.js` and
`src/lib/projectAudience.js`, and the `DemoTag`s on the Services and Projects
list pages come off so the field becomes an editable multi-select.

---

## 2. Page copy the client cannot reach

Three blocks are written in the front end because the singleton that should
hold them has no column.

**Services page.** `ServicesMeta` has `banner`, `sectors`, `whyChoose`, `cta`.
The page also renders an intro block and a heading over the list of services.

```prisma
model ServicesMeta {
  // ...
  intro       Json?   // { eyebrow, subtitle, paragraph, highlights: string[] }
  coreHeading Json?   // { eyebrow, subtitle }
}
```

**Projects page.** `ProjectsMeta` has only `banner`. The portfolio prints a
different heading and sentence for each of its three tabs.

```prisma
model ProjectsMeta {
  // ...
  audienceCopy Json?  // { all: {title, body}, corporate: {...}, individual: {...} }
}
```

Current values to seed are in the files named below.

**Then delete.** Site: `src/lib/services/meta-defaults.js` and
`src/lib/projects/audience-copy.js`. Dashboard: `src/lib/servicesCopy.js` and
`src/lib/projectsCopy.js`; the read-only `DemoTag` fields in the Services and
Projects page-settings drawers become ordinary inputs.

---

## 3. The partner's contact details

The contact page shows FADEN's address and phone, and under them Global
Energy's. `ContactPage` carries one set, so the partner's are in code.

```prisma
model ContactPage {
  // ...
  partner Json?  // { name, caption, website, websiteLabel, items: [{ icon, label, value, href }] }
}
```

Two things to settle before seeding:

- The partner's own website gives **two different Riyadh addresses**, one on
  their contact page and one in their footer. The site uses the contact-page
  one. Someone should ask them which is right.
- Their email is served through Cloudflare's email protection and never
  appears as plain text, so there is nothing to seed. Ask them for one.

Only the Riyadh branch is listed. Their Alexandria and Cairo offices are
deliberately left off, because Egypt was removed from this site (§8).

**Then delete.** Site: `src/lib/contact/partner-contact.js`. Dashboard:
`src/lib/partnerContact.js`.

---

## 4. The four figures over the homepage hero

`48+ Years Excellence`, `40+ Projects Delivered`, `100% Client Satisfaction`,
`1000+ Expert Team`. The dashboard already has an editor. It is disabled,
because there is nowhere to save them.

```prisma
model Settings {
  // ...
  heroStats Json?  // [{ value, label }]
}
```

**Then delete.** Dashboard: the notice in
`src/components/editors/HeroStatsEditor.jsx`.

---

## 5. The upload endpoint takes images only

`POST /api/dashboard/uploads` is built with
`localMulterUpload({ customPath: "media", validation: fileValidation.image })`,
so anything that is not an image is rejected.

**The company profile PDF.** The About page offers it as a download. It is
stored on `about_overview.intro.companyProfile` and ships in the site's
`public/docs/` folder as a stand-in, because it could not be uploaded. The
dashboard shows it as a plain text box on the About page with a note saying
only pictures can be uploaded.

Either widen the validation to accept `application/pdf` with a size limit (the
current profile is 4.4 MB), or add `POST /api/dashboard/uploads/document`.
Either is fine; the dashboard will be pointed at whichever you pick.

**Then delete.** Site: `DEMO_COMPANY_PROFILE` in
`src/sections/about-overview/data.js`. Dashboard: the note on the About page,
and the text box becomes an upload field.

---

## 6. The site's own images are not in the API

This needs a decision, so here is the whole picture.

**Where images live now.** Two places.

- Anything uploaded from the dashboard goes to the API host as
  `/uploads/media/...`. The site turns that into an absolute URL as it
  fetches (`normalizeStrings` in `src/lib/api.js`).
- Everything that shipped with the build lives in the site repo under
  `public/images/faden/`, and records point at it by path, like
  `/images/faden/projects-page-1.webp`. That is what the client sees in the
  dashboard where they expected a picture they had uploaded.

So roughly 150 images are in git, not in the database, and the client cannot
replace them without a developer and a deploy.

**The migration.** Run once against production, then never again:

1. Read every record that holds an image path: `projects` (`img`, and paths
   inside `detail`), `services` (`img`, `bannerImage`, `ctaBackgroundImage`,
   and inside `sections`), `gallery`, `equipment`, `clients`,
   `about_overview`, `about_partners`, `about_leadership`,
   `services_meta.banner.fallbackImage`, `settings.branding.images`.
2. For each distinct `/images/faden/...` path, read the file from the site
   repo's `public` folder and POST it to the upload endpoint.
3. Rewrite the record with the `/uploads/media/...` URL that comes back.
4. Write a map of old path to new URL to a file, so the run can be repeated
   safely and a mistake can be undone.

Two things make this safe: the site already resolves `/uploads/...`, so
nothing on the site changes; and the files stay in `public/` afterwards, so
nothing breaks if a record is missed.

**It needs from you:** the upload endpoint (which already returns `{ url }`),
and somewhere to run it with the production database and a dashboard token. I
can write the script — say whether you want it as a Prisma script in the API
repo (simplest, the connection is there) or a standalone Node script against
the HTTP API.

**One decision first.** Some of those 150 are decorative and belong to the
design rather than the content: the brand marks, the page patterns, the
Vision 2030 mark. Moving those into the database lets a client replace a logo
with anything. I would migrate the *content* images — projects, services,
gallery, equipment, clients, leadership, partners — and leave the brand
assets in the repo. Say if you would rather move everything.

---

## 7. `projects.country` is dead but still required

```prisma
country String   // "Saudi Arabia" | "Egypt"
```

Nothing reads this. The site no longer splits projects by country and no
longer mentions Egypt. The column is `NOT NULL`, so the dashboard cannot
create a project without sending something, and it sends the literal string
`"Saudi Arabia"` to satisfy the constraint.

Drop the column, or make it nullable and stop requiring it on create.
Dropping is better.

**Then delete.** Dashboard: `COUNTRY_PLACEHOLDER` in
`src/data/projects.service.js`, and the `RemovedTag` on the projects pages.

---

## 8. Two strings in the database say what the site no longer says

Content, not schema. Fix with a query, or tell the client to edit them.

**Egypt.** `about_partners.intro.description` still reads "...in Saudi Arabia
and Egypt." The site strips that phrasing as it fetches — `EGYPT_PAIRINGS` in
`src/lib/api.js` — and the dashboard shows a warning under the field saying
the site does not render it as written. Edit the sentence and both can go.

**"Our Partners".** `about_partners.banner.title` and `intro.eyebrow` still
say "Our Partners" where the site says "Partners".

---

## 9. `CORS_ORIGINS` is not set in production

`src/app.controller.ts` falls back to `localhost:3000` and `localhost:5173`
when `CORS_ORIGINS` is unset, plus any localhost origin via the regex below
it.

**The contact form fails on the live domain because of this.** A visitor
fills it in, submits, and the browser blocks the request before it reaches
the API. Nothing is logged server-side, so it looks like nobody is writing in.

Set `CORS_ORIGINS` on the API host to the site's and the dashboard's real
origins, comma separated, before launch.

---

## 10. For information: the preview routes

The dashboard now shows the page being edited beside the form, redrawing as
the client types. It works entirely in the browser: the dashboard posts the
unsaved record into an iframe, and the site draws it with its own sections.

Thirteen routes under `/preview/*` — project, service, partners,
about-overview, vision-mission, leadership, gallery, clients, equipment,
projects, services, contact, footer.

**Nothing is needed from the API.** They are `noindex`, disallowed in
`robots.txt`, fetch only what the matching public page fetches, and write
nothing. Listed here so they are not a surprise in the route table, and so
nobody deletes them thinking they are dead code.

---

## Two front-end notes, so they are not forgotten

Neither is your job, but both will be missed if nobody writes them down.

- **Caching is off site-wide** so the client sees dashboard edits on the next
  refresh: `export const dynamic = "force-dynamic"` in `src/app/layout.js`,
  and `cache: "no-store"` in `src/lib/api.js`. Restore
  `{ next: { revalidate: 60 } }` once the content is signed off.
- **The Saudi Vision 2030 mark** in the footer needs written permission from
  the Vision Realization Office before launch. If it is not granted, clear
  the Vision 2030 image in Site Settings → Images and it disappears.

---

## Suggested order

1. §0 — read it before touching any update route.
2. §9 `CORS_ORIGINS` — the contact form is broken on the live domain without
   it, and it is a one-line change.
3. §1 audiences — the client will ask for this first.
4. §5 PDF uploads, then §6 the image migration — they are the same endpoint.
5. §2, §3, §4 — copy and figures.
6. §7, §8 — tidying.
