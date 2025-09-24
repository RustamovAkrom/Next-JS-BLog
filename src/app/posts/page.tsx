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

// API fetch
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

export default function PostsPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetchCategoriesAPI().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchPostsAPI(0, limit, category)
      .then((data) => setPosts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [limit, category]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.categories?.some((cat) =>
        cat.title.toLowerCase().includes(search.toLowerCase())
      )
  );

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
    <div className="container max-w-7xl mx-auto px-4 py-16 space-y-12">
      {/* Filters */}
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

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <p className="text-muted-foreground">No posts found.</p>
      ) : (
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post: PostType) => (
            <Link
              key={post.slug}
              href={`/post/${post.slug}`}
              className="group block overflow-hidden rounded-xl border bg-background transition hover:shadow-xl"
            >
              <div className="relative w-full h-48 bg-muted">
                {post.mainImage && (
                  <Image
                    src={post.mainImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <CardContent className="p-5 space-y-3">
                <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {post.publishedAt
                    ? format(new Date(post.publishedAt), "dd MMM yyyy")
                    : ""}
                </p>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </CardContent>
            </Link>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-10">
        <Button size="lg" onClick={loadMore} disabled={loading} className="px-8">
          {loading ? "Loading..." : "Load more"}
        </Button>
      </div>
    </div>
  );
}
