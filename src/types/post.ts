export interface AuthorType {
  name: string
  image?: string
}

export interface CategoryType {
  title: string
}

export interface PostType {
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  mainImage?: string
  author?: AuthorType
  categories?: CategoryType[]
}
