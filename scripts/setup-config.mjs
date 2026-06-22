import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const target = `${root}portfolio.config.json`
const example = `${root}portfolio.config.example.json`

if (existsSync(target)) {
  process.exit(0)
}

if (process.env.PORTFOLIO_CONFIG) {
  writeFileSync(target, process.env.PORTFOLIO_CONFIG)
  console.log('[setup-config] wrote portfolio.config.json from PORTFOLIO_CONFIG env var')
} else {
  writeFileSync(target, readFileSync(example))
  console.log('[setup-config] portfolio.config.json not found, falling back to portfolio.config.example.json')
}
