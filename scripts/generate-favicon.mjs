import { createRequire } from 'node:module'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createCanvas, GlobalFonts } from '@napi-rs/canvas'
import toIco from 'to-ico'

const root = fileURLToPath(new URL('..', import.meta.url))
const config = JSON.parse(readFileSync(`${root}portfolio.config.json`, 'utf8'))

// Reuse the Roboto font bundled with pdfmake so rendering is identical on every
// machine/CI, instead of depending on whatever fonts happen to be installed.
const require = createRequire(import.meta.url)
const fontPath = require.resolve('pdfmake/fonts/Roboto/Roboto-Medium.ttf')
GlobalFonts.registerFromPath(fontPath, 'Roboto Medium')

const initials = config.profile.name
  .split(' ')
  .filter(Boolean)
  .map((word) => word[0].toUpperCase())
  .slice(0, 4)
  .join('')

function renderIcon(size) {
  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext('2d')

  const gradient = ctx.createLinearGradient(0, 0, size, size)
  gradient.addColorStop(0, '#f97316')
  gradient.addColorStop(1, '#fbbf24')
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.roundRect(0, 0, size, size, size * 0.18)
  ctx.fill()

  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  let fontSize = size * (initials.length > 2 ? 0.42 : 0.5)
  ctx.font = `${fontSize}px "Roboto Medium"`
  while (ctx.measureText(initials).width > size * 0.8 && fontSize > 1) {
    fontSize -= 1
    ctx.font = `${fontSize}px "Roboto Medium"`
  }

  ctx.fillText(initials, size / 2, size / 2 + size * 0.03)
  return canvas.toBuffer('image/png')
}

const sizes = [16, 32, 48]
const ico = await toIco(sizes.map(renderIcon))
writeFileSync(`${root}public/favicon.ico`, ico)
console.log(`[generate-favicon] wrote public/favicon.ico (initials: ${initials})`)
