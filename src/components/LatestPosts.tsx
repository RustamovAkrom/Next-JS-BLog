"use client";

import Link from "next/link";
import Image from "next/image";
import { PostType } from "@/types/post";
import { motion, Variants, LazyMotion, domAnimation } from "framer-motion";

type Props = { posts: PostType[] };

// вынесено за пределы компонента
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function LatestPosts({ posts }: Props) {
  if (!posts.length) return <p className="text-muted-foreground">Нет статей.</p>;

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {posts.map((post, i) => (
          <motion.div key={post.slug} variants={itemVariants}>
            <Link
              href={`/post/${post.slug}`}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer 
                         transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Фоновая картинка */}
              {post.mainImage && (
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={post.mainImage}
                    alt={post.title}
                    fill
                    priority={i === 0} // только первая картинка грузится приоритетно
                    loading={i === 0 ? "eager" : "lazy"}
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}

              {/* Текст поверх картинки */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-bold line-clamp-2">{post.title}</h3>
                {post.excerpt && <p className="text-sm line-clamp-2 mt-1">{post.excerpt}</p>}
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </LazyMotion>
  );
}
