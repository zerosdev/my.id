# Portfolio Template

A personal portfolio template built with [Nuxt 4](https://nuxt.com), [Nuxt UI](https://ui.nuxt.com), and Tailwind CSS, deployable to Cloudflare Workers.

## Quick Start

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` and start customizing. `portfolio.config.json` is committed with real content already, so there's nothing to bootstrap.

## Customization

Everything you need to make this your own lives in three places:

### 1. Content — `portfolio.config.json`

All page content (profile, social links, nav, experience, projects, skills) lives in this single JSON file at the project root. It's committed to the repo, since it's public-facing portfolio content rather than a secret — if you fork this template, just edit it in place with your own data.

Edit `portfolio.config.json` directly. The shape of each section is defined in `app/data/types.ts`; `app/data/index.ts` just reads from the config and shouldn't need editing.

| Config key   | What it controls                            |
| ------------ | ------------------------------------------- |
| `profile`    | Name, role, bio, avatar, email, resume link |
| `social`     | Social links shown in the header/footer     |
| `navLinks`   | Header navigation items                     |
| `experience` | Work experience timeline + achievements     |
| `projects`   | Project cards                               |
| `skills`     | Tech stack badges, grouped by category      |

Replace the placeholder assets referenced in `portfolio.config.json`:

- `public/avatar.jpg` — your profile photo
- `public/projects/*.png` — project screenshots

`public/resume.pdf` doesn't need to be supplied — `scripts/generate-resume.mjs` auto-generates (and overwrites) it from `portfolio.config.json` on every `pnpm dev`/`build`/`generate` run, using a single-column, ATS-friendly layout (profile, summary, experience, skills, projects). It's gitignored since it's a build artifact, not a source file. To change its design, edit that script's `docDefinition`.

`public/favicon.ico` is also auto-generated the same way — `scripts/generate-favicon.mjs` derives initials from `profile.name` (e.g. "Rony Wisnu Wardana" → "RWW") and renders them on a gradient square. It's gitignored too; tweak the colors/gradient directly in that script.

### 2. Theme colors — `app/app.config.ts`

Nuxt UI's color palette (`primary`, `neutral`) is configured here. See the [Nuxt UI theme docs](https://ui.nuxt.com/getting-started/theme) for available colors.

### 3. Fonts & global styles — `app/assets/css/main.css`

Font family is set via the `--font-sans` CSS variable here (currently Geist Mono, loaded through `@nuxt/fonts`). Change it to any font name and the module will fetch it automatically.

## Deployment

This project is preconfigured for Cloudflare Workers (see `wrangler.jsonc` and the `cloudflare_module` Nitro preset in `nuxt.config.ts`).

```bash
pnpm deploy
```

Or connect the repo to Cloudflare Workers Builds for automatic deploys on push. See the [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment) for other targets.

Since `portfolio.config.json` is committed to the repo, Cloudflare's build environment already has it — no environment variables or build-time encoding needed. Just push to the branch Cloudflare watches and it builds the latest `portfolio.config.json` directly.

## License

MIT — see [LICENSE](./LICENSE). Free to use for your own portfolio.
