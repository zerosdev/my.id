import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { gunzipSync } from 'node:zlib'

const root = fileURLToPath(new URL('..', import.meta.url))
const target = `${root}portfolio.config.json`
const example = `${root}portfolio.config.example.json`

if (existsSync(target)) {
  process.exit(0)
}

if (process.env.PORTFOLIO_CONFIG_GZIP) {
  const json = gunzipSync(Buffer.from(process.env.PORTFOLIO_CONFIG_GZIP, 'base64')).toString('utf8')
  writeFileSync(target, json)
  console.log('[setup-config] wrote portfolio.config.json from PORTFOLIO_CONFIG_GZIP env var')
} else if (process.env.PORTFOLIO_CONFIG) {
  writeFileSync(target, process.env.PORTFOLIO_CONFIG)
  console.log('[setup-config] wrote portfolio.config.json from PORTFOLIO_CONFIG env var')
} else {
  writeFileSync(target, readFileSync(example))
  console.log('[setup-config] portfolio.config.json not found, falling back to portfolio.config.example.json')
}
