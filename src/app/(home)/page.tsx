"use client";

import Link from "next/link";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import type { PostType } from "@/types/post";
import type { CategoryType } from "@/types/category";

// Fetch через API route
async function fetchPostsAPI(start = 0, limit = 6, category?: string) {
  const url = `/api/posts?start=${start}&limit=${limit}${category ? `&category=${category}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

async function fetchCategoriesAPI() {
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export default function HomePage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);

  // Загружаем категории при старте
  useEffect(() => {
    fetchCategoriesAPI().then(setCategories).catch(console.error);
  }, []);

  // Загружаем посты при изменении limit или category
  useEffect(() => {
    setLoading(true);
    fetchPostsAPI(0, limit, category)
      .then((data) => setPosts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [limit, category]);

  // Фильтрация по поиску
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.categories?.some((cat) => cat.title.toLowerCase().includes(search.toLowerCase()))
  );

  // Load more без перезаписи
  const loadMore = async () => {
    setLoading(true);
    try {
      const newPosts = await fetchPostsAPI(posts.length, 6, category);
      setPosts((prev) => [...prev, ...newPosts]);
      setLimit((prev) => prev + 6);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
          <Input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Select onValueChange={(val) => setCategory(val === "all" ? undefined : val)}>
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
                  <h3 className="text-lg font-semibold line-clamp-2">{post.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {post.publishedAt ? format(new Date(post.publishedAt), "dd MMM yyyy") : ""}
                  </p>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  )}
                </CardContent>
              </Link>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <Button onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load more"}
          </Button>
        </div>
      </section>
    </div>
  );
}
