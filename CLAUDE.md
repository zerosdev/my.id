# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install       # install deps
pnpm dev           # dev server at localhost:3000 (auto-bootstraps portfolio.config.json first)
pnpm build         # production build for Cloudflare Workers (cloudflare_module preset)
pnpm generate      # static generation
pnpm preview       # preview a build
pnpm config:encode # gzip+base64 portfolio.config.json -> paste into Cloudflare as PORTFOLIO_CONFIG_GZIP
pnpm deploy        # build + wrangler deploy
pnpm cf:preview    # build + wrangler dev (local Workers runtime preview)
```

No test suite or lint script is configured. `@nuxt/eslint` is wired into `eslint.config.mjs` but there's no `lint` script — run `eslint .` directly if needed.

## Architecture

This is a single-page Nuxt 4 portfolio (Nuxt UI + Tailwind v4) deployed as a Cloudflare Worker (`wrangler.jsonc`, Nitro `cloudflare_module` preset). All page content lives in one place and flows through a build-time pipeline before it ever reaches a `.vue` file:

```
portfolio.config.json (gitignored, real content)
        ↓ statically imported by
app/data/index.ts (re-exports profile, social, navLinks, experience, projects, skills)
        ↓ imported by
app/pages/index.vue, app/layouts/default.vue
```

- **`portfolio.config.json`** is the single source of truth for content and is gitignored — it's never committed, so personal data doesn't pollute the repo and template updates never conflict with it. `portfolio.config.example.json` (committed) is the generic fallback/template.
- **`app/data/types.ts`** defines the shape of every section (`Profile`, `SocialLink`, `NavLink`, `ExperienceItem`, `Project`, `SkillGroup`). **`app/data/index.ts`** just imports the JSON and re-exports typed consts — it's a thin loader and normally shouldn't need edits. Don't recreate the old per-section files (`profile.ts`, `social.ts`, etc.) — they were intentionally consolidated into `index.ts`.
- **`scripts/setup-config.mjs`** runs before `dev`/`build`/`generate` (chained directly in the npm scripts, not a `pre*` lifecycle hook, since pnpm doesn't run those by default). If `portfolio.config.json` is missing it writes one, in priority order: decompress `PORTFOLIO_CONFIG_GZIP` (base64 gzip) → write `PORTFOLIO_CONFIG` (raw JSON) verbatim → fall back to `portfolio.config.example.json`.
- **`scripts/encode-config.mjs`** (`pnpm config:encode`) gzips + base64-encodes `portfolio.config.json` for pasting into a Cloudflare **build-time** environment variable named `PORTFOLIO_CONFIG_GZIP`. This exists because Cloudflare's dashboard caps plain-text variable values at 5000 characters, and the minified JSON is close to that limit on its own.
- **`scripts/generate-resume.mjs`** also runs before `dev`/`build`/`generate` (after `setup-config.mjs`) and regenerates `public/resume.pdf` from `portfolio.config.json` every time, via `pdfmake` using the standard (non-embedded) Helvetica font. The layout is deliberately single-column with no tables so ATS resume parsers read it in the correct order — don't introduce multi-column `columns:` layouts here. `public/resume.pdf` is gitignored (it's a build artifact, not a source file) — unlike `avatar.jpg`/`projects/*.png`, which are committed normally since `public/` isn't gitignored otherwise.
- **`scripts/generate-favicon.mjs`** runs last in the same chain and regenerates `public/favicon.ico` (16/32/48 multi-size) from the initials of `profile.name`, rendered with `@napi-rs/canvas` onto a gradient square and packed via `to-ico`. It registers `pdfmake`'s bundled `Roboto-Medium.ttf` as the canvas font explicitly (`GlobalFonts.registerFromPath`) rather than relying on system fonts, so rendering is pixel-identical locally and on Cloudflare's build container. `public/favicon.ico` is gitignored for the same reason as `resume.pdf`.
- Content is baked into the JS bundle at build time via a static `import` — it is **not** read at request time. This means: (a) Cloudflare's "Variables & Secrets" (runtime bindings, read via `env` in the Worker) are *not* visible to the build step — only a build-scoped variable works; (b) any content change requires re-running `pnpm config:encode`, updating the Cloudflare variable, and triggering a rebuild — there's no way to update live content without a redeploy in the current architecture.

### Theming

- `app/app.config.ts` sets Nuxt UI's color aliases (`primary: 'neutral'`, `neutral: 'slate'`). The orange/amber accent used in the hero (name highlight, ambient glow behind the avatar, the headline status badge) is applied via raw Tailwind utility classes in `index.vue`, not through the theme config.
- Fonts are set via the `--font-sans` CSS variable in `app/assets/css/main.css` (Geist Mono, loaded through `@nuxt/fonts`).

### Page structure (`app/pages/index.vue`)

Single long page: `UPageHero` (headline badge + title + description + avatar with ambient glow) → Tech Stack (`skills`) → Experience (`UTimeline`) → Projects (`UPageGrid`/`UPageCard`) → `UPageCTA` contact section. `app/layouts/default.vue` renders the header (`UHeader` + nav from `navLinks` + `social`) and footer.
