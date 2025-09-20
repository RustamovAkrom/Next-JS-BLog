// src/components/PostCard.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

export type PostSummary = {
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  mainImage?: string | null;
  author?: { name?: string; image?: string };
  categories?: { title: string; slug?: string }[];
};

export default function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="group bg-transparent rounded-2xl overflow-hidden border border-transparent hover:border-gray-200/60 transition-shadow shadow-sm hover:shadow-md">
      <Link href={`/post/${post.slug}`} className="block">
        <div className="relative w-full aspect-[16/9] bg-gray-100 dark:bg-gray-800">
          {post.mainImage ? (
            <Image
              src={post.mainImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : null}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold leading-tight line-clamp-2">{post.title}</h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">
              {post.publishedAt ? format(new Date(post.publishedAt), "dd MMM yyyy") : ""}
            </p>
            <div className="flex gap-2">
              {post.categories?.slice(0,2).map((c) => (
                <span key={c.title} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {c.title}
                </span>
              ))}
            </div>
          </div>
          {post.excerpt && <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>}
        </div>
      </Link>
    </article>
  );
}
