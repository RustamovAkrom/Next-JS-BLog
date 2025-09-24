"use client";

import Link from "next/link";
import Image from "next/image";
import { PostType } from "@/types/post";


type Props = { posts: PostType[] };

export default function LatestPosts({ posts }: Props) {
  if (!posts.length) return <p className="text-muted-foreground">Нет статей.</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link
          key={post._id}
          href={`/post/${post.slug}`}
          className="group block overflow-hidden rounded-xl border bg-background transition hover:shadow-xl"
        >
          {post.mainImage && (
            <div className="relative w-full h-48 bg-muted">
              <Image
                src={post.mainImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold line-clamp-2">{post.title}</h3>
            {post.excerpt && (
              <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
