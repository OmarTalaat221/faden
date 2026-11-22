# Changes since the last handover

Read this next to `BACKEND-REQUESTS.md`. That document still stands; this one
says what changed on 22 November, what to **cancel** if it is already built,
and what is **already done** so it is not done twice.

---

## First, what is live right now

Checked against `api.faden.digital` on 22 November, nothing from the handover
is deployed yet:

| Asked for | On the live API |
|---|---|
| `Service.audiences` | not there |
| `Project.audiences` | not there |
| `services_meta.intro`, `coreHeading` | not there |
| `projects_meta.audienceCopy` | not there |
| `contact_page.partner` | not there |
| `settings.heroStats` | not there |
| `projects.country` dropped | still there, still required |

If the work exists but is not deployed, ignore this table and read the rest.
If it does not exist yet, then item 1 below saves you the trouble of building
something that is no longer wanted.

---

## 1. CANCEL: `Service.audiences`

**The handover asked for an `audiences` column on both `Service` and
`Project`. Services no longer need it.**

The Companies / Private Clients split has been taken off the services page.
Five services are a short enough list to read whole, and splitting them only
made a private client wonder what they were not being shown. The services
page now shows one list under one heading.

- **If you have not built it yet:** build it on `Project` only.
- **If you have built it on `Service`:** drop the column, or leave it in
  place unused. Nothing reads it any more; the front-end map it replaced has
  been deleted, not repointed. Dropping it is tidier.

`Project.audiences` is still wanted exactly as written in `BACKEND-REQUESTS.md`
§1. The projects page keeps the split: nineteen records is a long enough list
that narrowing it genuinely helps.

---

## 2. CHANGE: what to seed into `services_meta.coreHeading`

Still wanted (`BACKEND-REQUESTS.md` §2), but the value has changed. The
heading over the list of services used to name an audience. It does not any
more:

```json
{ "eyebrow": "Our Services", "subtitle": "Five disciplines, delivered by one contractor — so nothing is lost between them." }
```

Not `"For Companies"`, which is what the earlier document would have had you
seed.

---

## 3. NEW: one more key inside `settings.navigation.visibility`

`BACKEND-REQUESTS.md` §0 lists the nested JSON keys that are alive and must
survive any validation added to the update routes. One has been added:

```
settings.navigation.visibility.homeSections.whyChoose
```

"Why Choose FADEN" now appears on the homepage as well as on the About page,
and can be switched off there like every other homepage band.

Nothing to build. It is listed because §0 is the thing that can quietly break
what already works.

---

## 3b. NEW: the contact form needs to accept a file

Asked for by the client after the first handover. It is written up as
`BACKEND-REQUESTS.md` §5b, next to the PDF upload, because both are the same
endpoint problem seen from two sides.

Short version: `ContactSubmission` needs an `attachment` column, and
`POST /api/contact/submissions` needs to take `multipart/form-data`. That
route is public, so it needs limits the dashboard upload does not: one file,
10 MB, images and PDF only, sniffed not trusted, rate limited by IP, and
never served back with a content type taken from the request.

The site and the dashboard are already built for it and are waiting behind a
switch. Nothing changes for them until you ship.

---

## 4. ALREADY DONE — please do not redo these

Three things were done directly against the live API. They need no work from
you, and repeating them would duplicate data.

**The image migration (`BACKEND-REQUESTS.md` §6).** 144 images that lived in
the site repo were uploaded through `POST /api/dashboard/uploads`, and every
record was repointed at its `/uploads/media/...` URL. The script and the
old-path-to-new-URL map are in the dashboard repo:
`scripts/migrate-images.mjs` and `scripts/migrate-images.map.json`.

Two files were left in the site repo on purpose: `logo.webp` and
`logo-light.png`. The FADEN mark is part of the design, not the content, and
moving it into the database lets anyone replace a logo with anything.

**The partner's logo.** `about_partners.intro.logo` was a square badge whose
wordmark could not be read at the size the site draws it. The partner's wide
lockup was uploaded and saved in its place.

**One line of copy.** `services_meta.whyChoose.items[3]` read "A proven track
record Saudi Arabia and Egypt." It now reads "A proven track record across
the Kingdom." That block is the one described in §5 below.

---

## 5. FOR INFORMATION: `services_meta.whyChoose` is now edited from the About page

No change needed, but it is worth knowing where writes to that field come
from, because it is not where you would guess.

"Why Choose FADEN" is stored on the services page record and is rendered in
two places: the foot of the Company Overview page, and the homepage. It is
edited in the dashboard under **About pages → About the company**, which
saves it back to `services_meta.whyChoose` through
`PUT /api/dashboard/services/meta`.

So that route is now called by a screen that is otherwise about
`about_overview`. If you ever split `services_meta` or move `whyChoose` to a
record of its own, that is the screen to tell us about.

Note that this is a different block from the one at
`GET /services/why-choose-faden`, which is the singleton swapped into every
service's detail page. Same name, different content, different record. Both
are in use.

---

## Everything else

`BACKEND-REQUESTS.md` is unchanged and still the list to work from. In
particular these are untouched by anything above and still the priority:

- **§0** — do not add validation that strips unknown JSON keys.
- **§9 `CORS_ORIGINS`** — the contact form is broken on the live domain until
  this is set. One line.
- §2 the remaining copy columns, §3 the partner's contact details, §4 the
  hero figures, §5 PDF uploads, §7 `projects.country`, §8 the two strings.
