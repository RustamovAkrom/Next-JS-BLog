import type { PortableTextBlock } from "@portabletext/react"

export interface AuthorType {
  name: string
  image?: string
}

export interface CategoryType {
  title: string
  slug: string
}

export interface PostType {
  title: string
  body: PortableTextBlock[]
  slug: string
  excerpt: string
  mainImage?: string
  author: AuthorType
  publishedAt: string
  categories: CategoryType[]
}

export interface RelatedPostType {
  title: string
  slug: string
  mainImage?: string
  publishedAt: string
}