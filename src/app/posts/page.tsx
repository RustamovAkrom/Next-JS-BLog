"use client";

import Link from "next/link";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { format } from "date-fns";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { motion, Variants, LazyMotion, domAnimation } from "framer-motion";

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

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

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

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchPostsAPI(0, limit, category);
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [limit, category]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const filteredPosts = useMemo(() => {
    if (!search) return posts;
    const lowerSearch = search.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerSearch) ||
        post.categories?.some((cat) => cat.title.toLowerCase().includes(lowerSearch))
    );
  }, [search, posts]);

  const loadMore = useCallback(async () => {
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
  }, [posts.length, category]);

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
            {categories.map((cat) => (
              <SelectItem key={cat.title} value={cat.title}>{cat.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <p className="text-muted-foreground">No posts found.</p>
      ) : (
        <LazyMotion features={domAnimation}>
          <motion.div
            className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.slug} variants={itemVariants}>
                <Link
                  href={`/post/${post.slug}`}
                  className="group block relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition hover:scale-105 hover:shadow-2xl"
                >
                  <div className="relative w-full aspect-[16/9] bg-muted">
                    {post.mainImage && (
<Image
    src={post.mainImage}
    alt={post.title}
    fill
    className="object-cover object-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
    priority={true} // для LCP
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  />

                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <CardContent className="p-5 space-y-2 absolute bottom-0 left-0 w-full text-white">
                    <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs">{post.publishedAt ? format(new Date(post.publishedAt), "dd MMM yyyy") : ""}</p>
                    {post.excerpt && <p className="text-sm line-clamp-2 mt-1">{post.excerpt}</p>}
                  </CardContent>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </LazyMotion>
      )}

      <div className="flex justify-center mt-10">
        <Button
          onClick={loadMore}
          disabled={loading}
          className="px-6 py-2 rounded-full border border-primary/30 bg-transparent text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 shadow-sm disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load more"}
        </Button>
      </div>
    </div>
  );
}
