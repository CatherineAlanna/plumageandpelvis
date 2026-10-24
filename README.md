# Plumage & Pelvis

*A Comparative Archive of Human and Avian Courtship Displays.* An Unnecessary by Design project.

Next.js (App Router) + TypeScript, fully static, deployable on Vercel with zero configuration.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes prerender statically)
```

## Routes

| Route | Page |
|---|---|
| `/` | Landing: masthead, featured exhibit, archive preview |
| `/archive` | Exhibit index with search and movement-type filter |
| `/archive/[slug]` | Exhibit detail: `the-chest-thruster`, `the-moonwalker`, `the-ballerina` |
| `/methodology` | Selection criteria, limitations, sources |
| `/about` | Project, footage licensing, accessibility |

`/archive/the-showman` (the original Exhibit 001) redirects to `/archive/the-chest-thruster`.

## Editing content

All content lives in `src/data/exhibits.ts` (types in `src/data/types.ts`). Adding an exhibit
means adding an object to `exhibits`; no UI code changes are needed.

- `status`: `candidate` until both clips are watched and the pairing confirmed, then `verified`
  or `published`. The badge on the page follows it.
- `matchStrength`: `unassessed`, `conceptual`, `moderate` or `uncanny`. Shown as satirical
  editorial judgment, never as measurement.
- `bird.naturalHistory` and `bird.facts` must be sourced (`bird.citations`). Comedy goes in
  `description`, `observation` and the human column of `ledger`, never in the bird facts.

### Video sources

Each specimen's `video` uses the publisher's own player. Nothing is downloaded or re-hosted.

| `provider` | What the page shows |
|---|---|
| `youtube` | Privacy-enhanced YouTube embed of `videoId` |
| `vimeo` | Vimeo embed of `videoId` |
| `external` | A "view at source" panel linking to `sourceUrl` (for clips that can't or shouldn't be embedded) |

Every player has a "Watch original" link to `sourceUrl`. `startSeconds` / `endSeconds` stay
`null` until someone has watched the clip and confirmed the segment; when set, they're passed to
the player as a start time (YouTube also honours the end time). The two players are independent;
there is no synchronised playback.

## Design system

Tokens are CSS variables at the top of `src/app/globals.css` (dark archival palette, Oct 24
revision). Fonts load via `next/font/google`: Barlow Condensed (display), Source Serif 4 (body),
Barlow (controls), IBM Plex Mono (labels).

## Deploying on Vercel

1. In Vercel, **Add New → Project**, and import this GitHub repository.
2. Framework preset: **Next.js** (auto-detected). Leave build settings at their defaults.
3. Deploy. Every push to `main` redeploys; pull requests get preview URLs.

No environment variables are required. Social-card URLs use Vercel’s
`VERCEL_PROJECT_PRODUCTION_URL` automatically.
