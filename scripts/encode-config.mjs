import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

const root = fileURLToPath(new URL('..', import.meta.url))
const source = `${root}portfolio.config.json`

const json = JSON.stringify(JSON.parse(readFileSync(source, 'utf8')))
const encoded = gzipSync(json).toString('base64')

console.log(encoded)
console.error(`\n[encode-config] ${encoded.length} characters — paste this as the PORTFOLIO_CONFIG_GZIP variable value in the Cloudflare dashboard`)
