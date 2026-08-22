# Mahmoud Adel — Portfolio

Personal portfolio for **Mahmoud Adel**, Full-Stack & AI SaaS Engineer.
Editorial, dark-first design built with Next.js App Router, TypeScript strict
mode and Tailwind CSS v4. All project content is curated from the public
repositories at [github.com/mahmoud-adel-dev](https://github.com/mahmoud-adel-dev).

## Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Server Components by default) |
| Language | TypeScript (strict, `noUncheckedIndexedAccess`) |
| Styling | Tailwind CSS v4 with centralized design tokens |
| Motion | Motion for React — restrained entrance reveals only |
| Primitives | Base UI (accessible mobile navigation dialog) |
| Icons | Lucide React |
| Fonts | Geist Sans + Geist Mono via `next/font` |

## Local development

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## Environment variables

Copy `.env.example` to `.env.local` and adjust:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical production origin used for metadata, canonical URLs, sitemap and robots. Falls back to `http://localhost:3000`. |

No other configuration is required; the site makes no runtime API calls.

## Production build

```bash
pnpm build      # static generation + type checking + linting
pnpm start      # serve the production build locally
```

## Deployment

The project deploys to Vercel with zero configuration:

1. Push the repository to GitHub.
2. Import it in Vercel.
3. Set `NEXT_PUBLIC_SITE_URL` to the final domain (e.g. `https://your-domain.com`).
4. Deploy.

## Project structure

```text
app/
  layout.tsx              Root shell: fonts, metadata, JSON-LD, skip link
  page.tsx                Homepage (assembles all sections)
  projects/[slug]/        Case-study routes (statically generated)
  opengraph-image.tsx     Homepage OG image, generated at build time
  sitemap.ts / robots.ts  SEO infrastructure
components/
  layout/                 Header, mobile navigation, footer
  home/                   Hero, work previews, capabilities, stack, …
  projects/               Case-study frame, diagrams, shared pieces
  ui/                     Section frame, reveal, button link
data/
  site.ts                 Site config (name, URL, contact email placeholder)
  projects.ts             Typed project & case-study content
  expertise.ts            Capabilities, stack groups, principles
lib/                      Utilities (cn) and metadata helpers
styles/globals.css        Design tokens + base styles (Tailwind v4)
```

## Customization guide

- **Content** — everything lives in `data/`. Project case studies are typed;
  add or edit a `Project` object and its route, metadata, OG image, sitemap
  entry and prev/next navigation update automatically.
- **Contact email** — set `contactEmail` in `data/site.ts`. The contact
  section renders an email link only when a real address is configured.
- **Domain** — set `NEXT_PUBLIC_SITE_URL`; it flows into canonicals,
  Open Graph URLs, sitemap and robots.
- **Design tokens** — all colors, fonts and type utilities are defined once in
  `styles/globals.css`.

## Content integrity

Every capability and technology claim on this site traces back to public
repositories. No invented metrics, clients, employers or dates.
