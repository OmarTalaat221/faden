# What the API still needs

Eight pieces of content on the FADEN site are rendered from values written
into the two front-end repos, because the database has nowhere to put them.
Each is already marked **DEMO** in the dashboard, with a note telling the
client it cannot be edited yet.

Nothing here is broken. Everything works today. The cost is that the client
cannot change any of it themselves, and a developer has to edit two
repositories by hand every time a word needs changing.

They are in the order I would do them: the first two are what the client will
ask for first, the last ones are small.

Repos:

- API — `fadenback` (Express + Prisma + PostgreSQL)
- Site — `faden` (Next.js 16)
- Dashboard — `faden-dash` (Vite + React + antd)

Every item says which front-end files to delete once the column exists.
Please delete them. A fallback that is never reached is a second source of
truth, and it will drift.

---

## 1. Who each service and project is for

**The problem.** The site splits the services page and the projects page into
*Companies* and *Private Clients*. A visitor picks one and the list narrows.
Which bucket a record is in is decided by a map keyed on the record's slug,
written in the front-end code.

The rule is asymmetric and has to stay that way: a company can commission
anything a private client can, but not the reverse. So a private-client record
belongs to **both** lists; a corporate one belongs to **corporate only**.

**What to add.**

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

Please seed the existing rows rather than leaving them all corporate. This is
the mapping the site renders today.

Services that are **both** corporate and individual:

- `integrated-engineering-works`
- `integrated-construction-works`
- `mep-works`

Services that are **corporate only**: everything else, which today is
`sewage-and-water-treatment-plants` and `roads-infrastructure-works`.

Projects that are **both**:

- `al-muhaiza-residential-palace`
- `royal-palace-um-alhamam`
- `private-residence-complex-vip`

Projects that are **corporate only**: every other project.

**Then delete.** Site: the `DEMO_AUDIENCES` map in
`src/lib/services/audience.js`, and the `DEMO_PRIVATE_PROJECTS` set and
`PRIVATE_CLIENT` pattern in `src/lib/projects/audience.js`. Both then read
`record.audiences` directly. Dashboard: `src/lib/serviceAudience.js` and
`src/lib/projectAudience.js` go, and the `DemoTag`s on the Services and
Projects list pages come off so the field becomes an editable multi-select.

---

## 2. Page headings the client cannot reach

Three blocks of copy are written in the front end because the singleton that
should hold them has no column for them.

**Services page.** `ServicesMeta` has `banner`, `sectors`, `whyChoose` and
`cta`. The page also renders an intro block and a heading over the list of
services, and neither can be saved.

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

The current values are in the files named below. Please seed them, so nothing
changes visually on the day this ships.

**Then delete.** Site: `src/lib/services/meta-defaults.js` and
`src/lib/projects/audience-copy.js`. Dashboard: `src/lib/servicesCopy.js` and
`src/lib/projectsCopy.js`, and the read-only `DemoTag` fields in the Services
and Projects page-settings drawers become ordinary inputs.

---

## 3. The upload endpoint takes images only

`POST /api/dashboard/uploads` is built with
`localMulterUpload({ customPath: "media", validation: fileValidation.image })`,
so anything that is not an image is rejected.

Two things need this.

**The company profile PDF.** The About page now offers it as a download. It
ships in the site's `public/docs/` folder because it could not be uploaded.
The dashboard shows the field as a plain text box with a note saying only
pictures can be uploaded.

**Everything in item 4 below.**

Please either widen the validation to accept `application/pdf` (with a size
limit — the current profile is 4.4 MB), or add a second route such as
`POST /api/dashboard/uploads/document`. Either is fine; the dashboard will be
pointed at whichever you pick.

**Then delete.** Site: the `/public/docs` fallback in `SITE_DOCUMENTS`
(`src/lib/site-images.js`). Dashboard: the note in the Images and files tab,
and the text box becomes an upload field.

---

## 4. The site's own images are not in the API

This is the one that needs a decision, so here is the full picture.

**Where images live now.** Two places.

- Anything uploaded from the dashboard goes to the API host and is stored as
  `/uploads/media/...`. The site turns that into an absolute URL as it fetches
  (`resolveUploads`, now `normalizeStrings`, in `src/lib/api.js`).
- Everything that shipped with the build lives in the site repo under
  `public/images/faden/`. Records in the database point at it by path, like
  `/images/faden/projects-page-1.webp`. That is what the client sees in the
  dashboard where they expected a picture they had uploaded.

So roughly 150 images are in git, not in the database, and the client cannot
replace them without a developer and a deploy.

**What I would do.** A one-time migration, run once against production, then
never again:

1. Read every record that holds an image path — `projects` (`img`, and the
   paths inside `detail`), `services` (`img`, `bannerImage`,
   `ctaBackgroundImage`, and inside `sections`), `gallery`, `equipment`,
   `clients`, `about_overview`, `about_partners`, `about_leadership`,
   `settings.branding.images`.
2. For each distinct `/images/faden/...` path, read the file from the site
   repo's `public` folder and POST it to the upload endpoint.
3. Rewrite the record with the `/uploads/media/...` URL that comes back.
4. Keep a map of old path to new URL, written to a file, so the run can be
   repeated safely and so a mistake can be undone.

Two things make this safe to do:

- The site resolves `/uploads/...` already, so nothing on the site needs to
  change. The day after the migration the pages render identically.
- The files stay in `public/` afterwards. Nothing breaks if a record is
  missed, and they can be deleted in a later release once the database is
  confirmed clean.

**What it needs from you.**

- The upload endpoint to accept being called repeatedly with a Bearer token
  (it already does).
- Ideally a way to upload with a chosen filename, or at least to get the
  final URL back, so the map in step 4 is reliable. The current response
  returns `{ url }`, which is enough.
- Somewhere to run it. It needs the production database and a dashboard
  token. I cannot run it: I have no credentials for either.

I can write the script. Tell me whether you want it in the API repo as a
Prisma script (simplest — it has the database connection already) or as a
standalone Node script that talks only to the HTTP API.

**One thing to decide first.** Some of those 150 images are decorative and
belong to the design rather than to the content: the brand marks, the page
patterns, the Vision 2030 mark. Moving those into the database means a client
can replace a logo with anything. I would migrate the *content* images —
projects, services, gallery, equipment, clients, leadership, partners — and
leave the brand assets in the repo. Say if you would rather move everything.

---

## 5. The partner's contact details

The contact page shows FADEN's address and phone, and under them Global
Energy's. `ContactPage` carries one set of details, so the partner's are
written in the front end.

```prisma
model ContactPage {
  // ...
  partner Json?  // { name, caption, website, websiteLabel, items: [{ icon, label, value, href }] }
}
```

Two things to settle before seeding it:

- The partner's own website gives **two different Riyadh addresses**, one on
  their contact page and one in their footer. The site uses the contact-page
  one. Somebody should ask them which is right.
- Their email is served through Cloudflare's email protection and never
  appears as plain text on their site, so there is nothing to seed. Ask them
  for one.

Only the Riyadh branch is listed. Their Alexandria and Cairo offices are
deliberately left off, because Egypt was removed from this site entirely
(item 8).

**Then delete.** Site: `src/lib/contact/partner-contact.js`. Dashboard:
`src/lib/partnerContact.js`.

---

## 6. The four figures over the homepage hero

`48+ Years Excellence`, `40+ Projects Delivered`, `100% Client Satisfaction`,
`1000+ Expert Team`. The dashboard already has an editor for them. It is
disabled, because there is nowhere to save them.

Either a column on `Settings`, or on whichever singleton owns the homepage:

```prisma
model Settings {
  // ...
  heroStats Json?  // [{ value, label }]
}
```

**Then delete.** Dashboard: the notice in
`src/components/editors/HeroStatsEditor.jsx`; its inputs bind to the new field.

---

## 7. `projects.country` is dead but still required

```prisma
country String   // "Saudi Arabia" | "Egypt"
```

Nothing reads this any more. The site no longer splits projects by country and
no longer mentions Egypt at all. But the column is `NOT NULL`, so the
dashboard cannot create a project without sending something, and it currently
sends the literal string `"Saudi Arabia"` to satisfy the constraint.

Please drop the column, or make it nullable and stop requiring it on create.
Dropping it is better.

**Then delete.** Dashboard: `COUNTRY_PLACEHOLDER` in
`src/data/projects.service.js`, and the `RemovedTag` on the projects pages.

---

## 8. Two things in the database say what the site no longer says

Both are content, not schema. Fix them with a query, or tell the client to
edit them in the dashboard.

**Egypt.** `about_partners.intro.description` still reads "...in Saudi Arabia
and Egypt." Egypt was removed from the site, so the front end strips that
phrasing as it fetches — `EGYPT_PAIRINGS` in `src/lib/api.js`. The dashboard
shows a warning under that field saying the site does not render it as
written. Edit the sentence and both can go.

**"Our Partners".** `about_partners.banner.title` and `intro.eyebrow` still
say "Our Partners" where the site says "Partners".

---

## 9. `CORS_ORIGINS` is not set in production

`src/app.controller.ts` falls back to `localhost:3000` and `localhost:5173`
when `CORS_ORIGINS` is unset, plus any localhost origin via the regex below
it.

That means **the contact form fails on the live domain**. A visitor fills it
in, submits, and the browser blocks the request before it reaches the API.
Nothing is logged server-side, so it looks like nobody is writing in.

Set `CORS_ORIGINS` on the API host to the site's and the dashboard's real
origins, comma separated, before launch.

---

## For information: the preview route

The dashboard now shows the real project page beside its editor, updating as
the client types. It posts the unsaved draft into `/preview/project` on the
site, which draws it with the site's own sections.

Nothing is needed from the API. The route is noindex, disallowed in
`robots.txt`, writes nothing and fetches nothing. Mentioned only so it is not
a surprise in the route list.

---

## Two front-end notes, so they are not forgotten

Neither is your job, but both will be missed if nobody writes them down.

- Caching is off site-wide so the client sees dashboard edits on the next
  refresh: `export const dynamic = "force-dynamic"` in `src/app/layout.js`,
  and `cache: "no-store"` in `src/lib/api.js`. Restore
  `{ next: { revalidate: 60 } }` once the content is signed off.
- The Saudi Vision 2030 mark in the footer needs **written permission from the
  Vision Realization Office** before launch. If it is not granted, clear the
  Vision 2030 image in Site Settings → Images and files, and it disappears.
