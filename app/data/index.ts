import type {
  ExperienceItem,
  Profile,
  Project,
  SkillGroup,
  SocialLink,
  UsesGroup
} from './types'
import { formatRoles, sanitizeFilename } from '../utils/format'
import config from '../../portfolio.config.json'

const isExternalUrl = (url: string) => /^https?:\/\//i.test(url)

export const profile: Profile = {
  ...config.profile,
  resumeUrl: isExternalUrl(config.profile.resumeUrl)
    ? config.profile.resumeUrl
    : `/${sanitizeFilename(`${config.profile.name} - ${formatRoles(config.profile.roles)}`)}.pdf`
}
export const social: SocialLink[] = config.social
export const experience: ExperienceItem[] = config.experience
export const projects: Project[] = config.projects
export const skills: SkillGroup[] = config.skills
export const uses: UsesGroup[] = config.uses ?? []
