# Portfolio Template

A personal portfolio template built with [Nuxt 4](https://nuxt.com), [Nuxt UI](https://ui.nuxt.com), and Tailwind CSS, deployable to Cloudflare Workers.

## Quick Start

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` and start customizing. The first `pnpm dev`/`pnpm build` run auto-creates `portfolio.config.json` from `portfolio.config.example.json` if it doesn't exist yet (see `scripts/setup-config.mjs`).

## Customization

Everything you need to make this your own lives in three places:

### 1. Content — `portfolio.config.json`

All page content (profile, social links, nav, experience, projects, skills) lives in this single JSON file at the project root. It's gitignored — like a `.env` file but for structured content — so your personal data never gets committed and never conflicts when you pull template updates.

Edit `portfolio.config.json` directly (not `portfolio.config.example.json`, which is just the committed template/fallback). The shape of each section is defined in `app/data/types.ts`; `app/data/index.ts` just reads from the config and shouldn't need editing.

| Config key | What it controls |
| --- | --- |
| `profile` | Name, role, bio, avatar, email, resume link |
| `social` | Social links shown in the header/footer |
| `navLinks` | Header navigation items |
| `experience` | Work experience timeline + achievements |
| `projects` | Project cards |
| `skills` | Tech stack badges, grouped by category |

Replace the placeholder assets referenced in `portfolio.config.json`:

- `public/avatar.jpg` — your profile photo
- `public/resume.pdf` — your CV/resume
- `public/projects/*.png` — project screenshots

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

Since `portfolio.config.json` is gitignored, Cloudflare's build environment won't have it. Set a `PORTFOLIO_CONFIG` build environment variable in the Cloudflare dashboard (Workers & Pages → your project → Settings → Variables) containing the full JSON content of your `portfolio.config.json`. `scripts/setup-config.mjs` writes it to disk before the build runs. If the variable isn't set, the build falls back to the generic `portfolio.config.example.json` content instead of failing.

## License

MIT — see [LICENSE](./LICENSE). Free to use for your own portfolio.
