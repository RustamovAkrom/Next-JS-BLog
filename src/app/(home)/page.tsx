"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import HomeStats from "@/components/HomeStats";
import LatestPosts from "@/components/LatestPosts";
import Hero from "@/components/Hero";
import { PostType } from "@/types/post";

type StatsType = { totalPosts: number; totalCategories: number; totalViews: number };

export default function HomePage() {
  const [stats, setStats] = useState<StatsType>({ totalPosts: 0, totalCategories: 0, totalViews: 0 });
  const [latestPosts, setLatestPosts] = useState<PostType[]>([]);

  useEffect(() => {
    fetch("/api/home/stats")
      .then(res => res.json())
      .then(setStats)
      .catch(console.error);

    fetch("/api/home/latest-posts")
      .then(res => res.json())
      .then(setLatestPosts)
      .catch(console.error);
  }, []);

  // Контейнер для stagger анимации
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  // Анимация для каждого блока
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="container max-w-7xl mx-auto px-4 py-16 space-y-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero */}
      <motion.div variants={itemVariants}>
        <Hero />
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants}>
        <HomeStats posts={stats.totalPosts} categories={stats.totalCategories} views={stats.totalViews} />
      </motion.div>

      {/* Latest Posts */}
      <motion.section variants={itemVariants}>
        <h2 className="text-2xl font-bold mb-6">Последние статьи</h2>
        <LatestPosts posts={latestPosts} />
      </motion.section>
    </motion.div>
  );
}
