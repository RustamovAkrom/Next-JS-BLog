import { client } from "@/sanity/lib/client"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

import PostAuthor from "@/components/PostAuthor"
import PostCategories from "@/components/PostCategories"
import PostContent from "@/components/PostContent"
import ShareButtons from "@/components/ShareButtons"
import PostCard from "@/components/PostCard"


// ===== Запрос к Sanity =====
async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      "mainImage": mainImage.asset->url,
      "author": author->{name, "image": image.asset->url},
      publishedAt,
      categories[]-> {title, "slug": slug.current}
    }`,
    { slug }
  )
}

async function getRelatedPosts(category: string, slug: string) {
  return client.fetch(
    `*[_type == "post" && references(*[_type == "category" && title == $category]._id) && slug.current != $slug][0...3]{
      title,
      "slug": slug.current,
      "mainImage": mainImage.asset->url,
      publishedAt
    }`,
    { category, slug }
  )
}

// ===== Рендеринг поста =====
export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return (
      <p className="text-center text-muted-foreground py-20 text-lg">
        Post not found 🥲
      </p>
    )
  }

  // Related posts (берём первую категорию)
  const related =
    post.categories?.length > 0
      ? await getRelatedPosts(post.categories[0].title, slug)
      : []

  return (
    <div className="container max-w-3xl mx-auto px-4 py-12">

      {/* Заголовок */}
      <h1 className="text-4xl font-extrabold tracking-tight mb-6 leading-snug">
        {post.title}
      </h1>

      {/* Автор и дата */}
      <PostAuthor author={post.author} publishedAt={post.publishedAt} />

      {/* Категории */}
      <PostCategories categories={post.categories}/>

      <Separator className="my-6" />

      {/* Главная картинка */}
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

      {/* Контент поста */}
      <PostContent body={post.body}/>

      {/* Share buttons */}
      <ShareButtons slug={slug} title={post.title}/>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {related.map((rel: any) => (
              <PostCard key={rel.slug} post={rel}/>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
