"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import PostAuthor from "@/components/PostAuthor";
import PostCategories from "@/components/PostCategories";
import PostContent from "@/components/PostContent";
import ShareButtons from "@/components/ShareButtons";
import PostCard from "@/components/PostCard";
import type { PostPageProps } from "@/types/post";
import { Eye } from "lucide-react";


export default function PostPage({ post, related }: PostPageProps) {
  const [views, setViews] = useState<number>(post.views ?? 0);

  useEffect(() => {
    let isMounted = true;
    const updateViews = async () => {
      try {
        const res = await fetch(`/api/posts/${post.slug}/views`, { method: "POST" });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.views !== undefined) {
            setViews(data.views);
          }
        }
      } catch (err) {
        console.error("Failed to update views:", err);
      }
    };
    updateViews();

    return () => {
      isMounted = false;
    };
  }, [post.slug]);



  return (
    <div className="container max-w-3xl mx-auto px-4 py-12">
      {/* Заголовок */}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-snug">
        {post.title}
      </h1>

      {/* Инфо: автор, категории, views */}
      <div className="mb-6">
        {/* Верхняя строка: автор слева, views справа */}
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <PostAuthor author={post.author} publishedAt={post.publishedAt} />
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Eye className="w-4 h-4" />
            {views} views
          </span>
        </div>

        {/* Нижняя строка: категории */}
        <div>
          <PostCategories categories={post.categories} />
        </div>
      </div>


      <Separator className="my-6" />

      {/* Главное изображение */}
      {post.mainImage && (
        <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden">
          <Image
            src={post.mainImage}
            alt={post.title}
            fill
            priority
            placeholder="blur"
            blurDataURL="/blur-placeholder.png"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1000px"
            className="object-cover rounded-2xl"
          />
        </div>
      )}

      {/* Контент поста */}
      <PostContent body={post.body} />

      {/* Кнопки поделиться */}
      <div className="mt-8">
        <ShareButtons slug={post.slug} title={post.title} />
      </div>

      {/* Похожие посты */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {related.map((rel) => (
              <PostCard key={rel.slug} post={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
