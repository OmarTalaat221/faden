# FADEN Contracting

Responsive FADEN Contracting Company website built from the approved Home design.

## Stack

- Next.js 16 App Router
- React 19
- JavaScript / JSX
- Tailwind CSS v4
- Inter through `next/font`
- Lucide React icons

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production checks

```bash
npm run lint
npm run build
```

## Design tokens

The global Tailwind v4 theme is defined in `src/app/globals.css`.

- Primary: `#E42421`
- Primary hover: `#C91D1A`
- Secondary: `#13283A`
- Font: Inter

## Structure

- `src/app` — App Router entry, metadata, and global theme
- `src/components/common` — Brand components
- `src/components/layout` — Container, header, and footer
- `src/components/ui` — Reusable buttons and section headings
- `src/sections/home` — Complete Home page composition
- `public/images/faden` — FADEN project imagery

All Home sections use the shared Tailwind-powered `Container` component to keep spacing and alignment consistent across breakpoints.
