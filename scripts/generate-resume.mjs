import { readdirSync, readFileSync, unlinkSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import pdfMake from 'pdfmake'
import fontsModule from 'pdfmake/standard-fonts/Helvetica.js'

const root = fileURLToPath(new URL('..', import.meta.url))
const config = JSON.parse(readFileSync(`${root}portfolio.config.json`, 'utf8'))
const { profile, experience, projects, skills, social } = config

pdfMake.setFonts(fontsModule.default || fontsModule)
pdfMake.setUrlAccessPolicy(() => false)
pdfMake.setLocalAccessPolicy(() => true)

const contactLine = [profile.location, profile.email, profile.phone, ...social.map((s) => s.to)]
  .filter(Boolean)
  .join('   |   ')

function formatRoles(roles) {
  if (roles.length <= 1) return roles[0] ?? ''
  return `${roles.slice(0, -1).join(', ')} & ${roles[roles.length - 1]}`
}

function sanitizeFilename(value) {
  return value
    // eslint-disable-next-line no-control-regex -- strip Windows-reserved chars + control chars from filenames
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
}

const docDefinition = {
  pageMargins: [40, 40, 40, 40],
  defaultStyle: { font: 'Helvetica', fontSize: 10, lineHeight: 1.25 },
  styles: {
    name: { fontSize: 20, bold: true },
    role: { fontSize: 12, margin: [0, 2, 0, 4] },
    status: { fontSize: 9.5, bold: true, color: '#ea580c', margin: [0, 0, 0, 8] },
    contact: { fontSize: 9, color: '#444444', margin: [0, 0, 0, 14] },
    sectionTitle: { fontSize: 12, bold: true, margin: [0, 14, 0, 6] },
    itemTitle: { fontSize: 10.5, bold: true },
    itemMeta: { fontSize: 9.5, italics: true, color: '#444444', margin: [0, 0, 0, 3] },
    bullet: { fontSize: 9.5, margin: [0, 1, 0, 1] }
  },
  // Single-column, top-to-bottom layout only (no tables/side-by-side columns)
  // so ATS parsers read the text in the correct order.
  content: [
    { text: profile.name, style: 'name' },
    { text: formatRoles(profile.roles), style: 'role' },
    { text: contactLine, style: 'contact' },

    { text: 'Summary', style: 'sectionTitle' },
    { text: profile.bio },

    { text: 'Skills', style: 'sectionTitle' },
    ...skills.map((group) => ({
      text: [
        { text: `${group.category}: `, bold: true },
        group.items.map((item) => item.name).join(', ')
      ],
      margin: [0, 0, 0, 4]
    })),

    { text: 'Experience', style: 'sectionTitle' },
    ...experience.map((item) => ({
      stack: [
        { text: `${item.title} — ${item.company}`, style: 'itemTitle' },
        { text: `${item.date} • ${item.location} • ${item.employment_type}`, style: 'itemMeta' },
        { text: item.description, margin: [0, 0, 0, 3] },
        ...(item.highlights ?? []).map((highlight) => ({ text: `•  ${highlight}`, style: 'bullet' }))
      ],
      margin: [0, 0, 0, 12]
    })),

    ...(projects?.length
      ? [
          { text: 'Projects', style: 'sectionTitle' },
          ...projects.map((project) => ({
            stack: [
              { text: project.title, style: 'itemTitle' },
              { text: project.description, margin: [0, 0, 0, 2] },
              {
                text: [project.link, project.tags?.length ? `  (${project.tags.join(', ')})` : ''].join(''),
                style: 'itemMeta'
              }
            ],
            margin: [0, 0, 0, 12]
          }))
        ]
      : [])
  ]
}

const fileName = `${sanitizeFilename(`${profile.name} - ${formatRoles(profile.roles)}`)}.pdf`

for (const entry of readdirSync(`${root}public`)) {
  if (entry.endsWith('.pdf') && entry !== fileName) unlinkSync(`${root}public/${entry}`)
}

const pdfDoc = pdfMake.createPdf(docDefinition)
await pdfDoc.write(`${root}public/${fileName}`)
console.log(`[generate-resume] wrote public/${fileName}`)
