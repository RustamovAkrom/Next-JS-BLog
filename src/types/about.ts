export interface SocialLinkType {
  label: string
  href: string
  icon: React.ElementType
}

export interface AboutDataType {
  name: string
  role: string
  skills: string[]
  experience: string[]
  description: string[]
  image: string
  socials: SocialLinkType[]
}
