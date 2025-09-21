"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import PostAuthor from "@/components/PostAuthor";
import PostCategories from "@/components/PostCategories";
import PostContent from "@/components/PostContent";
import ShareButtons from "@/components/ShareButtons";
import PostCard from "@/components/PostCard";
import { PostType, RelatedPostType } from "@/types/post";

export default function PostPage() {
  const params = useParams();
  const slug = params?.slug as string; // ✅ теперь TypeScript видит что slug может быть undefined
  const [post, setPost] = useState<PostType | null>(null);
  const [related, setRelated] = useState<RelatedPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug || typeof slug !== "string") return; // ✅ проверка на undefined

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch post
        const postRes = await fetch(`/api/posts/${slug}`);
        if (!postRes.ok) throw new Error("Failed to fetch post");
        const postData: PostType = await postRes.json();
        setPost(postData);

        // Fetch related posts
        if (postData.categories?.length) {
          const cat = postData.categories[0].title;
          const relatedRes = await fetch(
            `/api/posts/related?category=${encodeURIComponent(cat)}&slug=${encodeURIComponent(slug)}`
          );
          if (!relatedRes.ok) throw new Error("Failed to fetch related posts");
          const relatedData: RelatedPostType[] = await relatedRes.json();
          setRelated(relatedData);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!post)
    return (
      <p className="text-center text-muted-foreground py-20 text-lg">
        Post not found 🥲
      </p>
    );

  return (
    <div className="container max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight mb-6 leading-snug">
        {post.title}
      </h1>

      <PostAuthor author={post.author} publishedAt={post.publishedAt} />
      <PostCategories categories={post.categories} />
      <Separator className="my-6" />

      {post.mainImage && (
        <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden">
          <Image
            src={post.mainImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <PostContent body={post.body} />
      <ShareButtons slug={slug} title={post.title} />

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
