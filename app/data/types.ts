export interface Profile {
  name: string
  role: string
  location: string
  headline: string
  bio: string
  avatar: string
  email: string
  resumeUrl: string
}

export interface SocialLink {
  label: string
  icon: string
  to: string
}

export interface NavLink {
  label: string
  to: string
}

export interface ExperienceItem {
  date: string
  title: string
  company: string
  description: string
  icon: string
  highlights: string[]
}

export interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  link: string
}

export interface SkillItem {
  name: string
  icon: string
}

export interface SkillGroup {
  category: string
  items: SkillItem[]
}
