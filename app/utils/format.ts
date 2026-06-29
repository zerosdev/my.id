export function formatRoles(roles: string[]): string {
  if (roles.length <= 1) return roles[0] ?? ''
  return `${roles.slice(0, -1).join(', ')} & ${roles[roles.length - 1]}`
}

export function sanitizeFilename(value: string): string {
  return value
    // eslint-disable-next-line no-control-regex -- strip Windows-reserved chars + control chars from filenames
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
}
