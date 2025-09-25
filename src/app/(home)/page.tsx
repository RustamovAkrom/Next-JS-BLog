"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, Variants, LazyMotion, domAnimation } from "framer-motion";
import HomeStats from "@/components/HomeStats";
import LatestPosts from "@/components/LatestPosts";
import Hero from "@/components/Hero";
import { PostType } from "@/types/post";

type StatsType = { totalPosts: number; totalCategories: number; totalViews: number };

export default function HomePage() {
  const [stats, setStats] = useState<StatsType>({ totalPosts: 0, totalCategories: 0, totalViews: 0 });
  const [latestPosts, setLatestPosts] = useState<PostType[]>([]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/home/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchLatestPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/home/latest-posts");
      if (!res.ok) throw new Error("Failed to fetch latest posts");
      const data = await res.json();
      setLatestPosts(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    fetchLatestPosts();
  }, [fetchStats, fetchLatestPosts]);

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        className="container max-w-7xl mx-auto px-4 py-16 space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Hero />
        </motion.div>

        <motion.div variants={itemVariants}>
          <HomeStats posts={stats.totalPosts} categories={stats.totalCategories} views={stats.totalViews} />
        </motion.div>

        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6">Последние статьи</h2>
          <LatestPosts posts={latestPosts} />
        </motion.section>
      </motion.div>
    </LazyMotion>
  );
}
