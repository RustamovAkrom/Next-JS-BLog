import { Metadata } from "next";
import PostPage from "./PostPage";
import { PostType, RelatedPostType } from "@/types/post";

type PageProps = {
  params: Promise<{ slug: string }>; // 👈 ключ: params может быть Promise
};

// ✅ Генерация метаданных
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params; // 👈 обязательно await
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/${slug}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    return { title: "Post not found" };
  }

  const post: PostType = await res.json();

  return {
    title: post.title,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      images: post.mainImage ? [post.mainImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.title,
      images: post.mainImage ? [post.mainImage] : [],
    },
  };
}

// ✅ Страница поста (SSR + ISR)
export default async function Page({ params }: PageProps) {
  const { slug } = await params; // 👈 обязательно await

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/${slug}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    return (
      <p className="text-center text-muted-foreground py-20 text-lg">
        Post not found 🥲
      </p>
    );
  }

  const post: PostType = await res.json();

  // Related posts
  let related: RelatedPostType[] = [];
  if (post.categories?.length) {
    const cat = post.categories[0].title;
    const relRes = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/related?category=${encodeURIComponent(
        cat
      )}&slug=${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } }
    );
    if (relRes.ok) {
      related = await relRes.json();
    }
  }

  return <PostPage post={post} related={related} />;
}
