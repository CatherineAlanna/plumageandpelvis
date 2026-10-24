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
| `/archive` | Exhibit index, plus reserved “Awaiting Field Observation” slots |
| `/archive/[slug]` | Exhibit detail (e.g. `/archive/the-showman`) |
| `/methodology` | Selection criteria, limitations, sources |
| `/about` | Project, footage licensing, accessibility |

## Editing content

All content lives in `src/data/exhibits.ts` (types in `src/data/types.ts`). Adding an exhibit
means adding an object to `exhibits`; no UI code changes are needed.

Unknown values stay explicit: a bird `commonName` of `"TBD"` renders as “Species to be confirmed”,
and comparison rows with `verified: false` show “Pending verification”.

### Adding footage

Each side’s `video` is a `VideoSource`. The player adapts to what the sources can actually do:

| Human / Bird `kind` | What the page shows |
|---|---|
| either is `placeholder` | Labelled “Footage pending” panels; no playback controls |
| both `selfHosted` | Shared controls: Play/Pause both, Restart, shared seek, audio selector (defaults to both muted), loop |
| `youtube` / `vimeo` involved | Two independent embedded players with a “play each clip” note |

- `selfHosted`: put the licensed file in `public/media/` and set `url: "/media/clip.mp4"`.
  Add `captionsUrl` (WebVTT) and `posterUrl` if available.
- `youtube` / `vimeo`: set `url` to the video **ID** only.
- `startAtSeconds` / `endAtSeconds` align the key moments. The shared timeline uses the shorter
  of the two segments.
- Fill in `creator`, `creditUrl`, `licenseNotes`; they appear in the Footage Credits section.

When both clips and the bird species are confirmed, set the exhibit’s `status` to `"published"`.

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
