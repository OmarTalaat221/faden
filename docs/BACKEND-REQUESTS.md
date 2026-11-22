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

## 1. Who each project is for

**The problem.** The projects page splits the portfolio into *Companies* and
*Private Clients*. A visitor picks one and the list narrows. Which bucket a
project is in is decided by a map keyed on its slug, written in the front-end
code, so the client cannot change it.

The rule is asymmetric and has to stay that way: a company can commission
anything a private client can, but not the reverse. A private-client project
belongs to **both** lists; a corporate one belongs to **corporate only**.

```prisma
model Project {
  // ...
  audiences String[] @default(["corporate"])
}
```

Allowed values: `"corporate"` and `"individual"`. Return the array from the
public `GET /projects` and `GET /projects/by-slug/:slug`, and accept it on the
dashboard's create and update routes. Validate that every element is one of
the two.

**Seed these, or the page changes on the day it ships.**

Projects that are **both**: `al-muhaiza-residential-palace`,
`royal-palace-um-alhamam`, `private-residence-complex-vip`.
Projects that are **corporate only**: every other project.

Services do **not** need this. The split was on that page too and has been
taken off: five services are a short enough list to read whole, and splitting
them only made a private client wonder what they were not being shown.

**Then delete.** Site: `DEMO_PRIVATE_PROJECTS` and `PRIVATE_CLIENT` in
`src/lib/projects/audience.js`, which then reads `project.audiences`.
Dashboard: `src/lib/projectAudience.js`, and the `DemoTag` on the Projects
list page comes off so the field becomes an editable multi-select.

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

## 5b. The contact form needs to accept a file

**The client asked for this.** A visitor should be able to attach a photo or
a drawing to a message. Today they cannot, for two reasons:

- `ContactSubmission` has no column for it, and `createSubmission` in
  `src/Modules/Website/contact/contact.service.ts` whitelists five named
  fields, so anything else in the body is dropped silently.
- The only upload route is `POST /api/dashboard/uploads`, which needs a
  dashboard token. A public page cannot be given one: anybody could then
  upload anything into the media store.

**What to add.**

```prisma
model ContactSubmission {
  // ...
  attachment String?   // "/uploads/contact/..." or null
}
```

And `POST /api/contact/submissions` accepts `multipart/form-data` as well as
JSON. The five text fields keep their names. The file arrives as
`attachment`. Store it somewhere of its own rather than in `media`, so a
stranger's upload is never mixed with the client's own pictures.

This route is **public and unauthenticated**, so it needs limits the
dashboard one does not:

- One file per message.
- 10 MB maximum. The site enforces the same number before sending.
- Accept `image/jpeg`, `image/png`, `image/webp`, `image/heic`, `image/heif`
  and `application/pdf`. Reject on the server by sniffing the content, not by
  trusting the name or the declared type.
- Rate limit by IP. Without one this is free storage for anybody who finds
  the endpoint.
- Never serve an upload from this route with a content type taken from the
  request. An HTML file served as HTML from your own domain is a cross-site
  scripting hole.

Return the stored path on the submission, and include `attachment` in the
dashboard's `GET /api/dashboard/contact/submissions`.

**The front end is already built and waiting.** The site sends the message as
multipart when a file is attached and as JSON when it is not, so nothing
about the existing path changes. The field is hidden behind
`NEXT_PUBLIC_CONTACT_ATTACHMENTS`, which is `0` today: a control that
silently drops a visitor's drawing is worse than no control. Set it to `1` in
the same deploy that ships this, and the dashboard inbox already has the
column to open what arrives.

---

## 6. The site's own images are not in the API

**Done, 22 November.** 144 images were uploaded and every record repointed at
its `/uploads/media/...` URL. The script and the old-path-to-new-URL map are
in the dashboard repo at `scripts/migrate-images.mjs` and
`scripts/migrate-images.map.json`. Nothing is needed from you; the rest of
this section is kept because it says what was done and what was left alone.

Two things were deliberately left in the site repo: `logo.webp` and
`logo-light.png`. The FADEN mark is part of the design, not the content, and
moving it into the database lets anyone replace a logo with anything. The
script takes `--include-brand` if that call is ever reversed.

The original write-up follows.

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
   (Already done - see the note at the end of this section.)
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

Fourteen routes under `/preview/*` — project, service, partners,
about-overview, vision-mission, leadership, gallery, clients, equipment,
projects, services, contact, footer, news.

**Nothing is needed from the API.** They are `noindex`, disallowed in
`robots.txt`, fetch only what the matching public page fetches, and write
nothing. Listed here so they are not a surprise in the route table, and so
nobody deletes them thinking they are dead code.

---

## 11. News — the one part of the site with nowhere to keep it

**The client asked for this.** "News: writing with a picture." It is the only
thing on the site that has no table, so this is the one section here that is
entirely new work rather than a column or a limit.

Everything else is done. The news page, the story pages, the dashboard screen
and the preview are all built and in the two repos. They do nothing today
because `GET /news` answers 404, and the site treats that 404 as "not shipped
yet" and keeps the page hidden rather than showing an empty shell.

### The record

```prisma
model News {
  id        String   @id @default(uuid())
  title     String
  slug      String   @unique
  image     String
  excerpt   String?
  body      String   @db.Text
  date      DateTime
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("news")
}
```

`body` is **HTML**. The dashboard writes it with a rich-text editor, so it
arrives with headings, lists, quotes and links in it.

Store it and hand it back as it was sent — **do not sanitise, rewrite or
escape it on the way through**. The site sanitises it against a fixed
allow-list before rendering (`toArticleHtml` in `src/lib/news/data.js`), and
a second pass here would only disagree with that one. Escaping it on save is
the failure to watch for: the client would see their own tags printed on the
page as text.

`date` is the date shown to a reader and the one the list sorts by. The
dashboard sends it on create, so a default is a safety net rather than the
usual path. It is separate from `createdAt` because the client may later want
to date a story to when the thing happened rather than when it was typed.

`slug` is sent too — the dashboard makes it from the headline, because the
client asked for a form of four fields and a web address is not one of them.
It never changes after the story is created, so links already shared keep
working.

### The routes

Public, matching every other resource here:

| Route | Returns |
|---|---|
| `GET /api/news` | every story, **newest `date` first** |
| `GET /api/news/meta` | the page's banner and CTA copy |
| `GET /api/news/:slug` | one story, 404 when there is no such slug |

`/news/meta` must be matched **before** `/news/:slug`, or "meta" is read as a
slug. Same as `/gallery/meta` and `/services/meta` already are.

Dashboard, behind the token:

| Route | Does |
|---|---|
| `POST /api/dashboard/news` | create |
| `PUT /api/dashboard/news/:id` | update |
| `DELETE /api/dashboard/news/:id` | delete |
| `PUT /api/dashboard/news/meta` | the page copy |

A `NewsMeta` singleton like the others, with `banner Json?` and `cta Json?`,
is enough for the meta route. The dashboard writes:

```json
{
  "banner": { "title": "News", "subtitle": "..." },
  "cta": { "title": "...", "subtitle": "..." }
}
```

### Two things that are easy to get wrong

- **Return `date` as an ISO string.** The dashboard sends one and the site
  parses one. A `YYYY-MM-DD` with no time is fine; a localised string is not.
- **Reject a duplicate `slug` with a 409 or a message that says "slug".** The
  dashboard retries with a number on the end rather than showing the client
  an error about a field they have never seen, and it needs to be able to
  tell that kind of failure from any other.

### The tags the site will render

Anything outside this list is stripped before the page is drawn, so there is
no point storing more:

`p` `br` `strong` `b` `em` `i` `u` `s` `h2` `h3` `h4` `ul` `ol` `li`
`blockquote` `hr` `a` `code` `pre`, and on a link, `href` only.

No `h1`: the headline is a field of its own and a page gets one.

### What happens when you ship it

Nothing needs changing in either front end. The dashboard's News screen stops
showing "not switched on yet" and becomes the editor. The site's news page
can then be switched on in the dashboard under **Show or hide pages** — it is
off by default precisely so that it stays invisible until there is something
behind it.

Two things the client does by hand afterwards, both in the dashboard: add
**News** to the menu under Site Settings → Navigation, and to the footer's
quick links if they want it there. Those lists live in the database, so
neither is a code change.

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
3. §1 project audiences — the client will ask for this first.
4. §5 PDF uploads and §5b the contact attachment, then §6 the image migration — they are the same endpoint.
5. §2, §3, §4 — copy and figures.
6. §11 news — new work, and the only item with no code waiting on it.
7. §7, §8 — tidying.
