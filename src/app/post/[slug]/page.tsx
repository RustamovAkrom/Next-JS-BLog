import { client } from "@/sanity/lib/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { PortableText } from "@portabletext/react"
import { Button } from "@/components/ui/button"

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
  const { slug } = params
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
      <div className="flex items-center gap-4 mb-6">
        <Avatar>
          {post.author?.image ? (
            <AvatarImage src={post.author.image} alt={post.author.name} />
          ) : null}
          <AvatarFallback>{post.author?.name?.[0] ?? "A"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{post.author?.name}</p>
          <p className="text-sm text-muted-foreground">
            {post.publishedAt
              ? format(new Date(post.publishedAt), "dd MMM yyyy")
              : ""}
          </p>
        </div>
      </div>

      {/* Категории */}
      {post.categories?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.categories.map((cat: any) => (
            <Link
              key={cat.slug}
              href={`/?category=${cat.slug}`}
              className="px-3 py-1 text-xs rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      )}

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
      <article className="prose dark:prose-invert max-w-none leading-relaxed">
        <PortableText
          value={post.body}
          components={{
            types: {
              image: ({ value }) => {
                if (!value?.asset?.url) return null
                return (
                  <div className="my-6">
                    <Image
                      src={value.asset.url}
                      alt={value.alt || "Post image"}
                      width={800}
                      height={500}
                      className="rounded-lg"
                    />
                  </div>
                )
              },
            },
            marks: {
              link: ({ children, value }) => (
                <a
                  href={value?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:no-underline"
                >
                  {children}
                </a>
              ),
            },
            block: {
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                  {children}
                </blockquote>
              ),
            },
          }}
        />
      </article>

      {/* Share buttons */}
      <div className="flex gap-3 mt-10">
        <Button
          variant="outline"
          asChild
        >
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(
              `https://your-site.com/post/${slug}`
            )}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
          >
            Share Telegram
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a
            href={`https://twitter.com/intent/tweet?url=https://your-site.com/post/${slug}&text=${post.title}`}
            target="_blank"
          >
            Share Twitter
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=https://your-site.com/post/${slug}`}
            target="_blank"
          >
            Share LinkedIn
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a
            href={`https://api.whatsapp.com/send?text=${post.title} https://your-site.com/post/${slug}`}
            target="_blank"
          >
            Share WhatsApp
          </a>
        </Button>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {related.map((rel: any) => (
              <Link
                key={rel.slug}
                href={`/post/${rel.slug}`}
                className="group block rounded-lg overflow-hidden hover:shadow-md transition"
              >
                <div className="relative w-full h-40 bg-gray-100 dark:bg-gray-800">
                  {rel.mainImage && (
                    <Image
                      src={rel.mainImage}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium group-hover:text-primary">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(rel.publishedAt), "dd MMM yyyy")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Комментарии (Giscus/Disqus) */}
      <div className="mt-16">
        <Separator className="mb-8" />
        {/* Giscus как пример */}
        <section>
          <script
            src="https://giscus.app/client.js"
            data-repo="yourusername/yourrepo"
            data-repo-id="REPO_ID"
            data-category="General"
            data-category-id="CATEGORY_ID"
            data-mapping="pathname"
            data-strict="0"
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-input-position="bottom"
            data-theme="light"
            data-lang="en"
            crossOrigin="anonymous"
            async
          ></script>
        </section>
      </div>
    </div>
  )
}
