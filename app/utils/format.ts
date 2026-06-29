export function formatRoles(roles: string[]): string {
  if (roles.length <= 1) return roles[0] ?? ''
  return `${roles.slice(0, -1).join(', ')} & ${roles[roles.length - 1]}`
}
