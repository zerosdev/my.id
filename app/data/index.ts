import type {
  ExperienceItem,
  NavLink,
  Profile,
  Project,
  SkillGroup,
  SocialLink,
  UsesGroup
} from './types'
import config from '../../portfolio.config.json'

export const profile: Profile = config.profile
export const social: SocialLink[] = config.social
export const navLinks: NavLink[] = config.navLinks
export const experience: ExperienceItem[] = config.experience
export const projects: Project[] = config.projects
export const skills: SkillGroup[] = config.skills
export const uses: UsesGroup[] = config.uses ?? []
