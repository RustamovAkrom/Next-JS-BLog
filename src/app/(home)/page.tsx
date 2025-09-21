"use client"

import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import type { PostType } from "@/types/post"
import type { CategoryType } from "@/types/category"

// Загружаем посты
async function fetchPosts(limit = 6, category?: string): Promise<PostType[]> {
  const query = `
    *[_type == "post" ${
      category ? `&& "${category}" in categories[]->title` : ""
    }]
    | order(publishedAt desc)[0...${limit}]{
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      "mainImage": mainImage.asset->url,
      "author": author->{name, "image": image.asset->url},
      categories[]->{title}
    }
  `
  return client.fetch(query)
}

// Загружаем категории
async function fetchCategories(): Promise<CategoryType[]> {
  const query = `*[_type == "category"]{title}`
  return client.fetch(query)
}

export default function HomePage() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [limit, setLimit] = useState(6)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string | undefined>(undefined)

  // Загружаем посты при изменении лимита или категории
  useEffect(() => {
    setLoading(true)
    fetchPosts(limit, category).then((data) => {
      setPosts(data)
      setLoading(false)
    })
  }, [limit, category])

  // Загружаем категории при старте
  useEffect(() => {
    fetchCategories().then((data) => setCategories(data))
  }, [])

  // Фильтрация по поиску
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      // post.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
      post.categories?.some((cat) =>
        cat.title.toLowerCase().includes(search.toLowerCase())
      )
  )

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Welcome to <span className="text-primary">Blog App</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover insightful articles, useful tips, and inspiring stories.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/posts">Browse Posts</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">About</Link>
          </Button>
        </div>
      </section>

      {/* Latest Posts */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          {/* Поиск */}
          <Input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />

          {/* Фильтр категорий */}
          <Select
            onValueChange={(val) => setCategory(val === "all" ? undefined : val)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat: CategoryType) => (
                <SelectItem key={cat.title} value={cat.title}>
                  {cat.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredPosts.length === 0 ? (
          <p className="text-muted-foreground">No posts found.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post: PostType) => (
              <Link
                key={post.slug}
                href={`/post/${post.slug}`}
                className="group block overflow-hidden rounded-lg transition-shadow hover:shadow-lg"
              >
                <div className="relative w-full h-44 bg-gray-100 dark:bg-gray-800">
                  {post.mainImage && (
                    <Image
                      src={post.mainImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  )}
                </div>
                <CardContent className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {post.publishedAt
                      ? format(new Date(post.publishedAt), "dd MMM yyyy")
                      : ""}
                  </p>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                </CardContent>
              </Link>
            ))}
          </div>
        )}

        {/* Кнопка "Load more" */}
        <div className="flex justify-center mt-8">
          <Button onClick={() => setLimit(limit + 6)} disabled={loading}>
            {loading ? "Loading..." : "Load more"}
          </Button>
        </div>
      </section>
    </div>
  )
}
