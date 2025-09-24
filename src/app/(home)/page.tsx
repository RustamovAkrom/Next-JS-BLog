"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HomeStats from "@/components/HomeStats";
import LatestPosts from "@/components/LatestPosts";
import { PostType } from "@/types/post";


type StatsType = { totalPosts: number; totalCategories: number; totalViews: number };

export default function HomePage() {
  const [stats, setStats] = useState<StatsType>({ totalPosts: 0, totalCategories: 0, totalViews: 0 });
  const [latestPosts, setLatestPosts] = useState<PostType[]>([]);

  useEffect(() => {
    fetch("/api/home/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);

    fetch("/api/home/latest-posts")
      .then((res) => res.json())
      .then(setLatestPosts)
      .catch(console.error);
  }, []);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-16 space-y-16">
      {/* Hero */}
      <section className="relative w-full rounded-2xl border p-12
        bg-neutral-100 text-neutral-900 border-neutral-200
        dark:bg-neutral-900 dark:text-white dark:border-neutral-800
        transition-colors">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            My Blog App
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8">
            Статьи о технологиях, программировании и новостях — просто и со вкусом.
          </p>
          <Link
            href="/posts"
            className="inline-block px-6 py-3 rounded-lg font-medium
              border border-neutral-300 text-neutral-900 hover:bg-neutral-200
              dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800
              transition-colors"
          >
            Читать статьи
          </Link>
        </div>
      </section>

      {/* Stats */}
      <HomeStats posts={stats.totalPosts} categories={stats.totalCategories} views={stats.totalViews} />

      {/* Latest Posts */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Последние статьи</h2>
        <LatestPosts posts={latestPosts} />
      </section>
    </div>
  );
}
